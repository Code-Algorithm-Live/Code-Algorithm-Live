package com.ssafy.coala.domain.help.service;

import com.ssafy.coala.domain.member.domain.Member;
import org.h2.command.dml.Help;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface RedisService {
    void joinMember(Member member);
    Member updateMember(Member member, String id);
    Member getMemberInfo(String id);
    void removeMember(String id);

    void addUser(int probId, Member member);


    Set<Object> getAllUsers();
    boolean isMemberExpired(String key, Member member);

    Set<Object> getProbUsers(int probid);

    Help saveHelp(Help help,String solvedId);

    Help getHelp(String solvedId);
}
