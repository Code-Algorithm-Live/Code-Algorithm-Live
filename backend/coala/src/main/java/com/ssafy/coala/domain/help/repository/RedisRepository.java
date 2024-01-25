package com.ssafy.coala.domain.help.repository;

import com.ssafy.coala.domain.member.domain.Member;

import java.util.UUID;

public interface RedisRepository {
    Member save(Member member);
    Member findOne(UUID memberId);
    void remove(Member member);
}
