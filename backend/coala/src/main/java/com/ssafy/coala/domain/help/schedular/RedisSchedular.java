package com.ssafy.coala.domain.help.schedular;

import com.ssafy.coala.domain.help.service.RedisService;
import com.ssafy.coala.domain.member.domain.Member;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class RedisSchedular {

    private final RedisService redisService;
    private final RedisTemplate<String,Object> redisTemplate;

    private static final String MATCH_QUEUE_KEY = "sorted_set";
    public RedisSchedular(RedisService redisService, RedisTemplate<String, Object> redisTemplate) {
        this.redisService = redisService;
        this.redisTemplate = redisTemplate;
    }

    @Scheduled(fixedRate = 1000) // 1초마다 실행
    public void cleanExpiredUsers() {
        // Redis Sorted Set에서 모든 객체 조회
        Set<Object> allObjects = redisService.getAllUsers();

        // 만료된 유저를 삭제
        for (Object member : allObjects) {
            if (redisService.isMemberExpired(MATCH_QUEUE_KEY, (Member) member)) {
                redisService.removeMember(((Member) member).getSolvedId());
            }
        }
    }


}
