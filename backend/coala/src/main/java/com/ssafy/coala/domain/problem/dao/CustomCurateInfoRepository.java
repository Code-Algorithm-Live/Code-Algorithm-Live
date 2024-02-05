package com.ssafy.coala.domain.problem.dao;

import com.ssafy.coala.domain.problem.domain.CurateInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.time.Duration;

import static org.springframework.cache.interceptor.SimpleKeyGenerator.generateKey;

@Repository
public class CustomCurateInfoRepository {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public void saveWithTTL(CurateInfo curateInfo, long ttlInMinutes) {
        String key = generateKey(curateInfo.getId()).toString(); // 키 생성 로직
        redisTemplate.opsForValue().set(key, curateInfo, Duration.ofMinutes(ttlInMinutes));
    }
    public CurateInfo findById(String id) {
        String key = generateKey(id).toString();
        return (CurateInfo) redisTemplate.opsForValue().get(key);
    }

    // 다른 메서드들...

    private String generateKey(String id) {
        // 적절한 키 생성 로직
        return "curateInfo:" + id;
    }
    // 다른 메서드들...
}