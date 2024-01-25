package com.ssafy.coala.domain.help.service;

import com.ssafy.coala.domain.member.domain.Member;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface RedisService {
    void joinMember(Member member);
    Member updateMember(Member member, UUID memberId);
    Member getMemberInfo(UUID memberId);
    void removeMember(UUID memberId);

    void addUser(Member member);


    Set<Object> getAllUsers();
    boolean isMemberExpired(String key, Member member);
}
