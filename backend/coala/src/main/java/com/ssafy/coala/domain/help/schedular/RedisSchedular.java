package com.ssafy.coala.domain.help.schedular;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.coala.domain.help.dto.WaitDto;
import com.ssafy.coala.domain.help.service.RedisService;
import com.ssafy.coala.domain.member.domain.Member;
import com.ssafy.coala.domain.member.dto.MemberDto;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Set;

@Component
public class RedisSchedular {

    private final RedisService redisService;
    private final RedisTemplate<String,Object> redisTemplate;

    private static final String MATCH_QUEUE_KEY = "waiting_queue";
    public RedisSchedular(RedisService redisService, RedisTemplate<String, Object> redisTemplate) {
        this.redisService = redisService;
        this.redisTemplate = redisTemplate;
    }

    @Scheduled(fixedRate = 1000) // 1초마다 실행
    public void cleanExpiredUsers() {
        // Redis Sorted Set에서 모든 객체 조회
        List<Object> allObjects = redisService.getAllUsers();
//        System.out.println("만료 스케쥴러 작동");
        // 만료된 유저를 삭제
        if (allObjects != null) {
            ObjectMapper objectMapper = new ObjectMapper();
            for (Object object : allObjects) {
                if (object instanceof LinkedHashMap) {
                    LinkedHashMap<?, ?> map = (LinkedHashMap<?, ?>) object;

                    // 역직렬화하여 WaitDto로 변환
                    WaitDto dtoInList = objectMapper.convertValue(map, WaitDto.class);
                    if (redisService.isMemberExpired(dtoInList)) {
                        redisTemplate.opsForList().remove(MATCH_QUEUE_KEY, 1, dtoInList);
                    }
                }
            }
        }

    }


}
