package com.ssafy.coala.domain.help.service;

import com.ssafy.coala.domain.help.dto.WaitDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;


@Service
public class MatchingServiceImpl implements MatchingService{

    @Autowired
    private RedisService redisService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;


    @Override
    public void notifyMatching(WaitDto waitDto) {
        if(redisService.isExist(waitDto)){
            waitDto.setSuccess(true);
            messagingTemplate.convertAndSend( "/sub/queue/match/"+waitDto.getSender().getEmail(), waitDto);
            messagingTemplate.convertAndSend( "/sub/queue/match/"+waitDto.getReceiver().getEmail(), waitDto);
            redisService.removeUser(waitDto);
        }else{
            System.out.println("만료된 요청입니다.");
        }

    }

    @Override
    public void sendHelp(WaitDto waitDto) { //수신자 이메일
//        messagingTemplate.convertAndSend( "/sub/queue/match", "도움 요청이 도착했습니다.");
//        System.out.println(waitDto.getReceiver().getEmail());
        messagingTemplate.convertAndSend( "/sub/queue/match/"+waitDto.getReceiver().getEmail(), waitDto);
        System.out.println("알림 전송");
    }

//    private MessageHeaders createHeaders(@Nullable String sessionId) {
//        SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE);
//        if (sessionId != null) headerAccessor.setSessionId(sessionId);
//        headerAccessor.setLeaveMutable(true);
//        return headerAccessor.getMessageHeaders();
//    }
}
