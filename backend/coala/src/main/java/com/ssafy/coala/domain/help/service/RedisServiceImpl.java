package com.ssafy.coala.domain.help.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.coala.domain.chat.dao.ChatRoomRepository;
import com.ssafy.coala.domain.help.dto.HelpDto;
import com.ssafy.coala.domain.help.dto.WaitDto;
import com.ssafy.coala.domain.help.repository.RedisRepository;
import com.ssafy.coala.domain.member.domain.Member;
import com.ssafy.coala.domain.member.dto.MemberDto;
import com.ssafy.coala.domain.problem.application.ProblemService;
import com.ssafy.coala.domain.problem.application.ProblemServiceImpl;
import com.ssafy.coala.domain.problem.domain.Problem;
import lombok.RequiredArgsConstructor;
import org.h2.command.dml.Help;
import org.springframework.cache.annotation.CacheEvict;
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
    private final ProblemServiceImpl problemService;

    private static final String MATCH_QUEUE_KEY = "waiting_queue";


    private final RedisTemplate<String, Object> redisTemplate;

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

    @Override
    public void expiredRemove() {
        List<Object> elements = redisTemplate.opsForList().range(MATCH_QUEUE_KEY, 0, -1);

        if (elements != null) {
            for (Object element : elements) {
                // element에 대한 만료 여부를 확인하고 만료된 경우 삭제
                if (isMemberExpired((WaitDto)element)) {
                    redisTemplate.opsForList().remove(MATCH_QUEUE_KEY, 1, element);
                }
            }
        }
    }

    @Override
    @Transactional
    public void addUser(WaitDto waitDto) {
        removeUser(waitDto);
        redisTemplate.opsForList().rightPush(MATCH_QUEUE_KEY, waitDto);
        redisTemplate.opsForList().rightPush(Integer.toString(waitDto.getHelpDto().getNum()), waitDto);
        String hashKey = Integer.toString(waitDto.getSender().hashCode());
        redisTemplate.opsForHash().put(MATCH_QUEUE_KEY + ":expiration", hashKey, System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(15));

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

    @Override
    public List<Object> getAllUsers() {
        List<Object> list = redisTemplate.opsForList().range(MATCH_QUEUE_KEY, 0, -1);

        return list;
    }

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

    @Override
    public List<Object> getProbUsers(int probid) {
        List<Object> list = redisTemplate.opsForList().range(Integer.toString(probid), 0, -1);

        return list;
    }

    @Override
    @CachePut(value = "HelpDto", key = "#solvedId", cacheManager = "cacheManager")
    public HelpDto saveHelp(HelpDto helpDto, String solvedId) {
        return helpDto;
    }

    @Override
    @Cacheable(value = "HelpDto", key = "#solvedId", cacheManager = "cacheManager")
    public HelpDto getHelp(String solvedId) {
        return null;
    }

    @Override
    public List<Object> getSolvedListUsers(String solvedId) {
        List<Integer> problemList = problemService.getProblem(solvedId);
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
