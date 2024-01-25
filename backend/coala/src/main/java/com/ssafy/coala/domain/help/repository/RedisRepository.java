package com.ssafy.coala.domain.help.repository;

import com.ssafy.coala.domain.member.domain.Member;

public interface RedisRepository {
    Member save(Member member);
    Member findOne(Long memberId);
    void remove(Member member);
}
