package com.ssafy.coala.domain.chat.controller;

import com.ssafy.coala.domain.chat.application.ChatService;
import com.ssafy.coala.domain.chat.domain.ChatRoom;
import com.ssafy.coala.domain.chat.dto.MakeRoomDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatService chatService;

    // 채팅방 생성
    @PostMapping("/createRoom")
    public ResponseEntity<ChatRoom> createRoom(@RequestBody MakeRoomDto makeRoomDto){
        ChatRoom chatRoom = chatService.createRoom(makeRoomDto);
        return new ResponseEntity<>(chatRoom, HttpStatus.OK);
    }

    // 특정 채팅방 조회
    @GetMapping("/findRoom/{roomId}")
    public ResponseEntity<?> findRoom(@PathVariable("roomId") Long roomId){
        return chatService.findRoom(roomId);
    }
}
