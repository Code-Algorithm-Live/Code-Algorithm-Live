package com.ssafy.coala.domain.help.service;

import com.ssafy.coala.domain.member.domain.Member;

import java.util.List;

public interface RedisService {
    void joinMember(Member member);
    Member updateMember(Member member, Long memberId);
    Member getMemberInfo(Long memberId);
    void removeMember(Long memberId);

    void addUser(Member member);


    List<Object> getAllUsers();

}
