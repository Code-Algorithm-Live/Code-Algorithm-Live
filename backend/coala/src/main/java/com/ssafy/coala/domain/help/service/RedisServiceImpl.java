package com.ssafy.coala.domain.help.service;

import com.ssafy.coala.domain.help.repository.RedisRepository;
import com.ssafy.coala.domain.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RedisServiceImpl implements RedisService {

    private final RedisRepository redisRepository;

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
    @CacheEvict(value = "Member", key = "#memberId", cacheManager = "cacheManager")
    @Transactional
    public void removeMember(Long memberId) {
        Member member = redisRepository.findOne(memberId);
        redisRepository.remove(member);
    }
}
