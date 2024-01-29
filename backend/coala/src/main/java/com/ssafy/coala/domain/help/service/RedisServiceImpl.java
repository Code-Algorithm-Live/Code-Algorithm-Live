package com.ssafy.coala.domain.help.service;

import com.ssafy.coala.domain.help.repository.RedisRepository;
import com.ssafy.coala.domain.member.domain.Member;
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
    public Member updateMember(Member member, String id) {
        return redisRepository.save(member);
    }

    @Override
    @Cacheable(value = "Member", key = "#memberId", cacheManager = "cacheManager", unless = "#result == null")
    public Member getMemberInfo(String id) {
        return redisRepository.findOne(id);
    }

    @Override
    @CacheEvict(value = "Member", key = MATCH_QUEUE_KEY, cacheManager = "cacheManager")
    @Transactional
    public void removeMember(String id) {
        Member member = redisRepository.findOne(id);
        redisRepository.remove(member);
    }

    @Override
    @Transactional
    public void addUser(int probId, Member member) {
        redisTemplate.opsForZSet().add(MATCH_QUEUE_KEY, member,1);
        redisTemplate.opsForZSet().add(Integer.toString(probId), member,1);
        String hashKey = Integer.toString(member.hashCode());
        redisTemplate.opsForHash().put(MATCH_QUEUE_KEY + ":expiration", hashKey, System.currentTimeMillis() + TimeUnit.SECONDS.toMillis(10000));
    }

    public boolean isExist(Member member){
        Double score = redisTemplate.opsForZSet().score(MATCH_QUEUE_KEY,member);
        if(score!=null){
            return true;
        }
        return false;
    }

    @Override
    public Set<Object> getAllUsers() {
        Set<Object> list = redisTemplate.opsForZSet().range(MATCH_QUEUE_KEY, 0, -1);


        return list;
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

    @Override
    public Set<Object> getProbUsers(int probid) {
        Set<Object> list = redisTemplate.opsForZSet().range(Integer.toString(probid), 0, -1);


        return list;
    }

    @Override
    @CachePut(value = "Help", key = "#solvedId", cacheManager = "cacheManager")
    public Help saveHelp(Help help,String solvedId) {
        return help;
    }

    @Override
    @Cacheable(value = "Help", key = "#solvedId", cacheManager = "cacheManager")
    public Help getHelp(String solvedId) {
        return null;
    }

}
