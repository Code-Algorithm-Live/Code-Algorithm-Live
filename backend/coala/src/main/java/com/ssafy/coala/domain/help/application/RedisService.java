package com.ssafy.coala.domain.help.application;

import com.ssafy.coala.domain.help.dto.HelpDto;
import com.ssafy.coala.domain.help.dto.WaitDto;

import java.util.List;

public interface RedisService {
//    void joinMember(Member member);
//    Member updateMember(Member member, String id);
//    Member getMemberInfo(String id);
//    void removeMember(String id);


    public void removeUser(WaitDto waitDto);


    void addUser(WaitDto waitDto);

    boolean isExist(WaitDto waitDto);

    List<Object> getAllUsers();
    boolean isMemberExpired(WaitDto waitDto);

    List<Object> getProbUsers(int probid);


    List<Object> getSolvedListUsers(String solvedId);

    boolean modifying(WaitDto waitDto);
}
