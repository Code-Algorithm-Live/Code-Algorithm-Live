package com.ssafy.coala.domain.help.application;


import com.ssafy.coala.domain.chat.application.ChatService;
import com.ssafy.coala.domain.alarm.domain.HelpAlarm;
import com.ssafy.coala.domain.alarm.dao.HelpAlarmRepository;
import com.ssafy.coala.domain.chat.dto.MakeRoomDto;
import com.ssafy.coala.domain.help.dto.WaitDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID;


@Service
public class MatchingServiceImpl implements MatchingService{

    @Autowired
    private RedisService redisService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ChatService chatService;
    @Autowired
    private HelpAlarmRepository helpAlarmRepository;


    //매칭 완료
    @Override
    public void notifyMatching(WaitDto waitDto) {
        if(redisService.isExist(waitDto)){
            waitDto.setSuccess(true);
            messagingTemplate.convertAndSend( "/sub/queue/match/"+waitDto.getSender().getEmail(), waitDto);
            messagingTemplate.convertAndSend( "/sub/queue/match/"+waitDto.getReceiver().getEmail(), waitDto);
            redisService.removeUser(waitDto);

//            UUID roomUuid = waitDto.getRoomUuid();
            //룸 생성 helpDto 정보
            MakeRoomDto makeRoomDto = new MakeRoomDto();
            makeRoomDto.setRoomUuid(waitDto.getRoomUuid());
            makeRoomDto.setReceiver(waitDto.getReceiver().getNickname());
            makeRoomDto.setSender(waitDto.getSender().getNickname());
            makeRoomDto.setTitle(waitDto.getHelpDto().getTitle());
            makeRoomDto.setContent(waitDto.getHelpDto().getContent());
            makeRoomDto.setProblemId(waitDto.getHelpDto().getNum());

            chatService.createRoom(makeRoomDto);
        }else{
            System.out.println("만료된 요청입니다.");
        }

    }

    @Override
    public void sendHelp(WaitDto waitDto) { //수신자 이메일
        messagingTemplate.convertAndSend( "/sub/queue/match/"+waitDto.getReceiver().getEmail(), waitDto);
        HelpAlarm helpAlarm = HelpAlarm.builder()
                .sender(waitDto.getSender())
                .receiver(waitDto.getReceiver().getNickname())
                .helpDto(waitDto.getHelpDto())
                .roomUuid(waitDto.getRoomUuid())
                .build();
        helpAlarmRepository.save(helpAlarm);
        System.out.println("알림 전송");
    }

}
