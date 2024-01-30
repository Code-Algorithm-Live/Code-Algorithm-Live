package com.ssafy.coala.domain.help.service;

import com.ssafy.coala.domain.help.dto.HelpDto;
import com.ssafy.coala.domain.help.dto.WaitDto;
import com.ssafy.coala.domain.member.domain.Member;
import com.ssafy.coala.domain.member.dto.MemberDto;
import org.h2.command.dml.Help;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface RedisService {
//    void joinMember(Member member);
//    Member updateMember(Member member, String id);
//    Member getMemberInfo(String id);
//    void removeMember(String id);


    public void removeUser(WaitDto waitDto);

    public void expiredRemove();

    void addUser(WaitDto waitDto);

    boolean isExist(WaitDto waitDto);

    List<Object> getAllUsers();
    boolean isMemberExpired(WaitDto waitDto);

    List<Object> getProbUsers(int probid);

    HelpDto saveHelp(HelpDto helpDto, String solvedId);

    HelpDto getHelp(String solvedId);
}
