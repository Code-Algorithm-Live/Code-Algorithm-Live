package com.ssafy.coala.domain.chat.controller;

import com.ssafy.coala.domain.chat.application.ChatService;
import com.ssafy.coala.domain.chat.dto.ChatMessageDto;
import com.ssafy.coala.domain.member.application.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.net.Socket;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
@ServerEndpoint("/websocket")
public class ChatController extends Socket {

    private ChatService chatService;
    private MemberService memberService;
    private static final List<Session> session = new ArrayList<Session>();

    @Operation(summary = "chat", description = "chat api")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })

    @GetMapping("/")
    public String index(){
        return "index.html";
    }

    @Operation(summary = "채팅 전송", description = "사용자 채팅 전송")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
// 사용자한테 채팅 전송
    @MessageMapping("/chats/messages/{room-id}") // 클라이언트에서 받은 요청을 @SendTo 설정한 구독자들한테 보냄
    public void message(@DestinationVariable("room-id") Long roomId, ChatMessageDto chatMessageDto) {

//        PublishMessage publishMessage =
//                new PublishMessage(messageDto.getRoomId(), messageDto.getSenderId(), messageDto.getContent(), LocalDateTime.now());
//        log.info("publishMessage: {}", publishMessage.getContent());
//        // 채팅방에 메세지 전송
//        redisPublisher.publish(ChannelTopic.of("room" + roomId), publishMessage);
//        log.info("레디스 서버에 메세지 전송 완료");
//
//        chatService.saveMessage(messageDto, roomId);
    }


}
