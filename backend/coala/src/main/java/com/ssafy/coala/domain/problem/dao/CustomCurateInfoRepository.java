package com.ssafy.coala.domain.problem.dao;

import com.ssafy.coala.domain.problem.domain.CurateInfo;
import com.ssafy.coala.domain.problem.dto.ProblemDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.time.Duration;
import java.util.List;
import java.util.Map;

@Repository
public class CustomCurateInfoRepository {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public void saveWithTTL(CurateInfo curateInfo, long ttlInMinutes) {
        String key = generateKey(curateInfo.getId()); // 키 생성 로직
        redisTemplate.opsForValue().set(key, curateInfo, Duration.ofMinutes(ttlInMinutes));
    }
    @SuppressWarnings("unchecked")
    public CurateInfo findById(String id) {
        String key = generateKey(id);
        Map<?, ?> map = (Map<?,?>) redisTemplate.opsForValue().get(key);
        if (map==null) return null;
//        System.out.println(map);
        return new CurateInfo(id,(List<ProblemDto>) map.get("curateFromRecent"),(List<ProblemDto>) map.get("curateFromQuestionCnt"));

    }

    // 다른 메서드들...

    private String generateKey(String id) {
        // 적절한 키 생성 로직
        return "curateInfo:" + id;
    }
    // 다른 메서드들...
}