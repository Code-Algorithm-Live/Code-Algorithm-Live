package com.ssafy.coala.domain.chat.controller;

import com.ssafy.coala.domain.chat.application.ChatService;
import com.ssafy.coala.domain.chat.domain.ChatMessage;
import com.ssafy.coala.domain.chat.dto.MessageDto;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@Slf4j
@RequiredArgsConstructor
public class StompChatController {

    private final SimpMessagingTemplate template; //특정 Broker 로 메세지를 전달
    private final ChatService chatService;

    @MessageMapping("/chat/{roomId}")
    public void enter(@DestinationVariable(value = "roomId") Long roomId, MessageDto message) {
        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
            System.out.println("enter()........" + message.getType());
            log.info("roomID = {}", message.getRoomId());
            message.setMessage(message.getSender() + "님이 채팅방에 참여하였습니다.");
        } else if (ChatMessage.MessageType.TALK.equals(message.getType())){
            log.info("roomID = {}", message.getRoomId());
            System.out.println(message.getMessage());
            chatService.saveMessage(message.getRoomId(), message);
        }

        template.convertAndSend("/sub/channel/" + message.getRoomId(), message);
    }

    // /pub/chat/roomId/message 에 메세지가 오면 동작
    @MessageMapping(value = "/chat/{roomId}/message")
    public void message(@DestinationVariable(value = "roomId") Long roomId, MessageDto message){
        chatService.saveMessage(message.getRoomId(), message);

        System.out.println("roomId: " + roomId);
        System.out.println("sender:" + message.getSender());
        System.out.println("message: " + message.getMessage());
        template.convertAndSend("/sub/channel" + roomId, message);
    }

}