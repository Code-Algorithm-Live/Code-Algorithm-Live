package com.ssafy.coala.domain.chat.controller;

import com.ssafy.coala.domain.chat.application.ChatService;
import com.ssafy.coala.domain.chat.dto.MessageDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping
@Slf4j
@RequiredArgsConstructor
public class StompChatController {

    private final SimpMessagingTemplate template; //특정 Broker 로 메세지를 전달
    private final ChatService chatService;

    @Operation(summary = "채팅 방 입장", description = "api를 호출하면 /sub/channel/{roomId}를 ")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @MessageMapping("/chat")
    public void enter(MessageDto message) {
//        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
//            message.setMessage(message.getSender()+"님이 입장하였습니다.");
//        }

        System.out.println("enter()........");
        log.info("roodID = {}", message.getRoomId());


//        chatService.saveMessage(message.getRoomId(), message);
        message.setMessage(message.getSender() + "님이 채팅방에 참여하였습니다.");
        log.info("Message = {}", message.getMessage());
        System.out.println("enter: " + message.getMessage());
        template.convertAndSend("/sub/channel/" + message.getRoomId(), message);
    }

    // /pub/chat/message 에 메세지가 오면 동작
    @Operation(summary = "메세지 보내기", description = "api를 호출하면 /sub/channel/{roomId}에 메세지를 보냄")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @MessageMapping(value = "/chat/message")
    public void message(MessageDto message){
//        ChatMessage savedMessage = chatService.saveMessage(message.getRoomId(), message);
//        System.out.println(savedMessage.getMessage());
        System.out.println("message: " + message.getMessage());
        template.convertAndSend("/sub/channel" + message.getRoomId(), message.getMessage());
    }
}
