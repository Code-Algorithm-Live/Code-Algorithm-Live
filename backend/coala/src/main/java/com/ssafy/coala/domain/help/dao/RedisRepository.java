package com.ssafy.coala.domain.help.dao;

import com.ssafy.coala.domain.member.domain.Member;

// Redis 기본 CRUD 예제 코드, 프로젝트에서 사용되고 있지 않음
public interface RedisRepository {
    Member save(Member member);
    Member findOne(String solvedId);
    void remove(Member member);
}
