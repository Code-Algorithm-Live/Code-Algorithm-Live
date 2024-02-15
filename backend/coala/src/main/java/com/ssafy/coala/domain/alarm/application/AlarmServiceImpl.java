package com.ssafy.coala.domain.alarm.application;

import com.ssafy.coala.domain.alarm.domain.HelpAlarm;
//import com.ssafy.coala.domain.alarm.dao.FriendAlarmRepository;
import com.ssafy.coala.domain.alarm.dao.HelpAlarmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlarmServiceImpl implements AlarmService{

    @Autowired
    private HelpAlarmRepository helpAlarmRepository;

//    @Autowired
//    private FriendAlarmRepository friendAlarmRepository;

    @Override
    public List<HelpAlarm> getAlarms(String receiver) {
        return helpAlarmRepository.findByReceiver(receiver);
    }

//    @Override
//    public List<FriendAlarm> getFriendAlarms(String nickname) {
//        return friendAlarmRepository.findByReceiverNickname(nickname);
//    }

    @Override
    public void deleteHelpAlram(long id) {
        helpAlarmRepository.deleteById(id);
    }

//    @Override
//    public void deleteFriendAlram(long id) {
//        friendAlarmRepository.deleteById(id);
//    }
}
