package com.ssafy.coala.domain.alarm.application;

import com.ssafy.coala.domain.alarm.domain.FriendAlarm;
import com.ssafy.coala.domain.alarm.domain.HelpAlarm;

import java.util.List;

public interface AlarmService {
    List<HelpAlarm> getAlarms(String nickname);

    List<FriendAlarm> getFriendAlarms(String nickname);

    void deleteHelpAlram(long id);

    void deleteFriendAlram(long id);
}
