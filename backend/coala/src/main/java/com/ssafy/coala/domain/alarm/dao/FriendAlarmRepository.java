package com.ssafy.coala.domain.alarm.dao;

import com.ssafy.coala.domain.alarm.domain.FriendAlarm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendAlarmRepository extends JpaRepository<FriendAlarm,Integer> {

    List<FriendAlarm> findByReceiverNickname(String nickname);

    void deleteById(Long id);
}
