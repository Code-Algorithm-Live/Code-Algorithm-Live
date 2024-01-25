package com.ssafy.coala.domain.help.service;

import com.ssafy.coala.domain.member.domain.Member;

import java.util.List;
import java.util.Set;

public interface RedisService {
    void joinMember(Member member);
    Member updateMember(Member member, Long memberId);
    Member getMemberInfo(Long memberId);
    void removeMember(Long memberId);

    void addUser(Member member);


    Set<Object> getAllUsers();
    boolean isMemberExpired(String key, Member member);
}
