package com.ssafy.coala.domain.chat.controller;

import com.ssafy.coala.domain.chat.application.ChatService;
import com.ssafy.coala.domain.chat.domain.ChatMessage;
import com.ssafy.coala.domain.chat.dto.MessageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api")
@Slf4j
@RequiredArgsConstructor
public class StompChatController {

    private final SimpMessagingTemplate template; //특정 Broker 로 메세지를 전달
    private final ChatService chatService;
    @MessageMapping("/chat/enter")
    public void enter(MessageDto message) {
//        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
//            message.setMessage(message.getSender()+"님이 입장하였습니다.");
//        }

        System.out.println("enter()........");
        log.info("roodID = {}", message.getRoomId());

//        chatService.saveMessage(message.getRoomId(), message);
        message.setMessage(message.getSender() + "님이 채팅방에 참여하였습니다.");
        template.convertAndSend("/sub/chat/" + message.getRoomId(), message);
    }

    // /pub/chat/message 에 메세지가 오면 동작
    @MessageMapping(value = "/chat/message")
    public void message(MessageDto message){
        ChatMessage savedMessage = chatService.saveMessage(message.getRoomId(), message);
        System.out.println(savedMessage.getMessage());
        template.convertAndSend("/sub/chat/" + savedMessage.getChatRoom().getRoomId(), savedMessage);
    }
}
