package com.ssafy.coala.domain.help.application;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.coala.domain.chat.dao.ChatRoomRepository;
import com.ssafy.coala.domain.help.dto.HelpDto;
import com.ssafy.coala.domain.help.dto.WaitDto;
import com.ssafy.coala.domain.help.dao.RedisRepository;
import com.ssafy.coala.domain.problem.application.ProblemService;
import com.ssafy.coala.domain.problem.application.ProblemServiceImpl;
import com.ssafy.coala.domain.problem.dao.MemberProblemRepository;
import com.ssafy.coala.domain.problem.dao.ProblemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RedisServiceImpl implements RedisService {

    private final RedisRepository redisRepository;
    private final MemberProblemRepository memberProblemRepository;
    private static final String MATCH_QUEUE_KEY = "waiting_queue";


    private final RedisTemplate<String, Object> redisTemplate;
    private final ProblemService problemService;
//    public RedisServiceImpl(RedisRepository redisRepository, RedisTemplate<String, Member> redisTemplate){
//
//        this.redisRepository = redisRepository;
//        this.redisTemplate = redisTemplate;
//    }

//    @Override
//    @Transactional
//    public void joinMember(Member member) {
//        redisRepository.save(member);
//    }
//
//    @Override
//    @CachePut(value = "Member", key = "#memberId", cacheManager = "cacheManager")
//    @Transactional
//    public Member updateMember(Member member, String id) {
//        return redisRepository.save(member);
//    }
//
//    @Override
//    @Cacheable(value = "Member", key = "#memberId", cacheManager = "cacheManager", unless = "#result == null")
//    public Member getMemberInfo(String id) {
//        return redisRepository.findOne(id);
//    }
//
//    @Override
//    @CacheEvict(value = "Member", key = MATCH_QUEUE_KEY, cacheManager = "cacheManager")
//    @Transactional
//    public void removeMember(String id) {
//        Member member = redisRepository.findOne(id);
//        redisRepository.remove(member);
//    }

    //매칭 대기열에서 삭제
    @Override
    public void removeUser(WaitDto waitDto) {
        if(isExist(waitDto)){
            List<Object> list = redisTemplate.opsForList().range(MATCH_QUEUE_KEY, 0, -1);
            if (list != null) {
                ObjectMapper objectMapper = new ObjectMapper();

                for (Object obj : list) {
                    if (obj instanceof LinkedHashMap) {
                        LinkedHashMap<?, ?> map = (LinkedHashMap<?, ?>) obj;

                        // 역직렬화하여 WaitDto로 변환
                        WaitDto dtoInList = objectMapper.convertValue(map, WaitDto.class);

                        if (Objects.equals(dtoInList.getSender(), waitDto.getSender())) {
                            redisTemplate.opsForList().remove(MATCH_QUEUE_KEY, 1, obj);
                            redisTemplate.opsForList().remove(Integer.toString(waitDto.getHelpDto().getNum()),1,obj);
                            String hashKey = Integer.toString(waitDto.getSender().hashCode());
                            redisTemplate.opsForHash().delete(MATCH_QUEUE_KEY + ":expiration",hashKey);
                            break;
                        }
                    }
                }
            }

            System.out.println("대기열에서 삭제");
        }else{
            System.out.println("삭제할 데이터가 없습니다!!!!");
        }
        
    }

    // 매칭 대기열에 등록
    @Override
    @Transactional
    public void addUser(WaitDto waitDto) {
        //기존에 대기열에 존재하면 기존의 요청을 삭제
        removeUser(waitDto);
        //문제번호 상관없는 전체 대기열에 push
        redisTemplate.opsForList().rightPush(MATCH_QUEUE_KEY, waitDto);
        //문제 별 대기열에 push -> 문제 별 데이터를 얻어올 때 활용하기 쉽게 하기 위해
        redisTemplate.opsForList().rightPush(Integer.toString(waitDto.getHelpDto().getNum()), waitDto);
        //대기열 만료 시간 설정
        String hashKey = Integer.toString(waitDto.getSender().hashCode());
        redisTemplate.opsForHash().put(MATCH_QUEUE_KEY + ":expiration", hashKey, System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(15));

        problemService.questionCntIncrease(waitDto.getHelpDto().getNum());
    }

    //현재 매칭 대기열에 존재하는지 검사
    @Override
    public boolean modifying(WaitDto waitDto){
        if(isExist(waitDto)){
            List<Object> list = redisTemplate.opsForList().range(MATCH_QUEUE_KEY, 0, -1);
            if (list != null) {
                ObjectMapper objectMapper = new ObjectMapper();

                for (Object obj : list) {
                    if (obj instanceof LinkedHashMap) {
                        LinkedHashMap<?, ?> map = (LinkedHashMap<?, ?>) obj;

                        // 역직렬화하여 WaitDto로 변환
                        WaitDto dtoInList = objectMapper.convertValue(map, WaitDto.class);

                        if (Objects.equals(dtoInList.getSender(), waitDto.getSender())) {
                            redisTemplate.opsForList().remove(MATCH_QUEUE_KEY, 1, obj);
                            redisTemplate.opsForList().remove(Integer.toString(waitDto.getHelpDto().getNum()),1,obj);
                            //문제번호 상관없는 전체 대기열에 push
                            redisTemplate.opsForList().rightPush(MATCH_QUEUE_KEY, waitDto);
                            //문제 별 대기열에 push -> 문제 별 데이터를 얻어올 때 활용하기 쉽게 하기 위해
                            redisTemplate.opsForList().rightPush(Integer.toString(waitDto.getHelpDto().getNum()), waitDto);
                            break;
                        }
                    }
                }
            }

            System.out.println("대기열에서 삭제");
            return true;
        }else{
            return false;
        }
    }

    @Override
    public boolean isExist(WaitDto waitDto){
        List<Object> list = redisTemplate.opsForList().range(MATCH_QUEUE_KEY, 0, -1);
        if (list != null) {
            ObjectMapper objectMapper = new ObjectMapper();

            for (Object obj : list) {
                if (obj instanceof LinkedHashMap) {
                    LinkedHashMap<?, ?> map = (LinkedHashMap<?, ?>) obj;

                    // 역직렬화하여 WaitDto로 변환
                    WaitDto dtoInList = objectMapper.convertValue(map, WaitDto.class);

                    if (Objects.equals(dtoInList.getSender(), waitDto.getSender())) {
                        System.out.println("suceess true 반환");
                        return true;
                    }
                }
            }
        }

        return false;
    }

    //매칭 대기중인 유저들의 전체 리스트
    @Override
    public List<Object> getAllUsers() {
        // range()의 end인자값을 바꿔서 원하는 만큼만 가져올 수 있음 -> pagenation 구현 할 때 생각해봐도 될듯
        List<Object> list = redisTemplate.opsForList().range(MATCH_QUEUE_KEY, 0, -1);
        return list;
    }

    // 매칭 만료시간을 검사하는 메소드 스케쥴러에서 계속 호출하며 검사한다.
    @Override
    public boolean isMemberExpired(WaitDto waitDto) {
        String hashKey = Integer.toString(waitDto.getSender().hashCode());
        Long expirationTime = (Long) redisTemplate.opsForHash().get(MATCH_QUEUE_KEY + ":expiration", hashKey);
        System.out.println(expirationTime);
        if (expirationTime != null) {
//            System.out.println(expirationTime+","+System.currentTimeMillis()+"만료 검사");
            return expirationTime < System.currentTimeMillis();
        }
        return false;
    }

    //문제 별 매칭 대기중인 유저 리스트
    @Override
    public List<Object> getProbUsers(int probid) {
        List<Object> list = redisTemplate.opsForList().range(Integer.toString(probid), 0, -1);

        return list;
    }

    //내가 푼 문제를 현재 도움요청중인 유저의 리스트를 반환한다
    @Override
    public List<Object> getSolvedListUsers(String solvedId) {
        List<Integer> problemList = memberProblemRepository.findProblemIdBySolvedId(solvedId);
        List<Object> list = new ArrayList<>();
        for(int problem : problemList){
            System.out.println(problem+"check");
            String key = Integer.toString(problem);
            if (Boolean.TRUE.equals(redisTemplate.hasKey(key))) {
                System.out.println("문제 존재");
                list.addAll(Objects.requireNonNull(redisTemplate.opsForList().range(key, 0, -1)));
            } else {
                // 키가 존재하지 않는 경우에 대한 처리
                System.out.println("Key not found for problem: " + problem);
                // 또는 다른 처리를 수행하거나 예외를 던질 수 있습니다.
            }
        }

        return list;
    }

}
