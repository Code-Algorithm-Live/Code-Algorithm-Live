package com.ssafy.coala.domain.friend.application;

import com.ssafy.coala.domain.alarm.domain.FriendAlarm;
import com.ssafy.coala.domain.alarm.repository.FriendAlarmRepository;
import com.ssafy.coala.domain.friend.dao.FriendRepository;
import com.ssafy.coala.domain.friend.dto.FriendDto;
import com.ssafy.coala.domain.help.service.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class FriendServiceImpl implements FriendService{

    @Autowired
    private RedisService redisService;

    @Autowired
    private FriendAlarmRepository friendAlarmRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Override
    public void send(FriendDto friendDto) {
        messagingTemplate.convertAndSend( "/sub/friend/"+friendDto.getReceiver().getEmail(), friendDto);
        FriendAlarm friendAlarm = FriendAlarm.builder()
                .sender(friendDto.getSender())
                .receiverNickname(friendDto.getReceiver().getNickname())
                .build();
        friendAlarmRepository.save(friendAlarm);
        System.out.println("친구요청 보냄");
    }

    @Override
    public void accept(FriendDto friendDto) {
        friendDto.setSuccess(true);
        messagingTemplate.convertAndSend( "/sub/friend/"+friendDto.getSender().getEmail(), friendDto);
        messagingTemplate.convertAndSend( "/sub/friend/"+friendDto.getReceiver().getEmail(), friendDto);
        System.out.println("친구 요청 받음");
        //DB에 친구 저장
    }
}
