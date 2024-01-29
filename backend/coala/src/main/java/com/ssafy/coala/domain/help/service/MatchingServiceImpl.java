package com.ssafy.coala.domain.help.service;

import com.ssafy.coala.domain.help.dto.WaitDto;
import com.ssafy.coala.domain.member.domain.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class MatchingServiceImpl implements MatchingService{

    @Autowired
    private RedisService redisService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;


    @Override
    public void notifyMatching(WaitDto waitDto) {
//        messagingTemplate.convertAndSendToUser(user1Id, "/queue/match", "매칭이 성공했습니다");
//        messagingTemplate.convertAndSendToUser(user2Id, "/queue/match", "매칭이 성공했습니다");
    }

    @Override
    public void sendHelp(WaitDto waitDto) { //수신자 이메일
        messagingTemplate.convertAndSendToUser(waitDto.getPair(), "/queue/match", "도움 요청이 도착했습니다.");
    }
}
