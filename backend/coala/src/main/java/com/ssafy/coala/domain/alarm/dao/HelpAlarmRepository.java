package com.ssafy.coala.domain.alarm.dao;

import com.ssafy.coala.domain.alarm.domain.HelpAlarm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HelpAlarmRepository extends JpaRepository<HelpAlarm,Integer> {

    List<HelpAlarm> findByReceiverNickname(String nickname);

    void deleteById(Long id);
}
