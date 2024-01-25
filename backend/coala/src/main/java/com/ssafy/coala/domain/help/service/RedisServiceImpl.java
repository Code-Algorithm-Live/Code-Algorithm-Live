package com.ssafy.coala.domain.help.service;

import com.ssafy.coala.domain.help.repository.RedisRepository;
import com.ssafy.coala.domain.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RedisServiceImpl implements RedisService {

    private final RedisRepository redisRepository;

    private static final String MATCH_QUEUE_KEY = "sorted_set";


    private final RedisTemplate<String, Object> redisTemplate;

//    public RedisServiceImpl(RedisRepository redisRepository, RedisTemplate<String, Member> redisTemplate){
//
//        this.redisRepository = redisRepository;
//        this.redisTemplate = redisTemplate;
//    }

    @Override
    @Transactional
    public void joinMember(Member member) {
        redisRepository.save(member);
    }

    @Override
    @CachePut(value = "Member", key = "#memberId", cacheManager = "cacheManager")
    @Transactional
    public Member updateMember(Member member, Long memberId) {
        return redisRepository.save(member);
    }

    @Override
    @Cacheable(value = "Member", key = "#memberId", cacheManager = "cacheManager", unless = "#result == null")
    public Member getMemberInfo(Long memberId) {
        return redisRepository.findOne(memberId);
    }

    @Override
    @CacheEvict(value = "Member", key = MATCH_QUEUE_KEY, cacheManager = "cacheManager")
    @Transactional
    public void removeMember(Long memberId) {
        Member member = redisRepository.findOne(memberId);
        redisRepository.remove(member);
    }

    @Override
    @Transactional
    public void addUser(Member member) {
        redisTemplate.opsForZSet().add(MATCH_QUEUE_KEY, member,1);
        String hashKey = Integer.toString(member.hashCode());
        redisTemplate.opsForHash().put(MATCH_QUEUE_KEY + ":expiration", hashKey, System.currentTimeMillis() + TimeUnit.SECONDS.toMillis(10000));
    }


    @Override
    public Set<Object> getAllUsers() {
        return redisTemplate.opsForZSet().range(MATCH_QUEUE_KEY, 0, -1);
    }

    @Override
    public boolean isMemberExpired(String key, Member member) {
        String hashKey = Integer.toString(member.hashCode());
        Long expirationTime = (Long) redisTemplate.opsForHash().get(MATCH_QUEUE_KEY + ":expiration", hashKey);
        if (expirationTime != null) {
            return expirationTime < System.currentTimeMillis();
        }
        return false;
    }


}
