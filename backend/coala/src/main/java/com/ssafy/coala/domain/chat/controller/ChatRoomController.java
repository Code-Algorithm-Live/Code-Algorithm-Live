package com.ssafy.coala.domain.chat.controller;

import com.ssafy.coala.domain.chat.application.ChatService;
import com.ssafy.coala.domain.chat.domain.ChatRoom;
import com.ssafy.coala.domain.chat.dto.MakeRoomDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatService chatService;

    @Operation(summary = "채팅 방 생성", description = "수락 버튼을 누르면 채팅방 생성 ")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    // 수락을 눌렀을 경우 상대방과 채팅방 생성
    @PostMapping("/room")
    public ResponseEntity<ChatRoom> createRoom(@RequestBody MakeRoomDto makeRoomDto){
        ChatRoom chatRoom = chatService.createRoom(makeRoomDto);
        return new ResponseEntity<>(chatRoom, HttpStatus.OK);
    }

         
    @Operation(summary = "채팅방 입장~", description = "사용자 2명이 채팅방에 입장한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    // 특정 채팅방 조회
    @GetMapping("/room/{roomId}")
    public ResponseEntity<?> findRoom(@PathVariable("roomId") UUID roomId){
        return chatService.findRoom(roomId);
    }

    // 방에 있는 채팅리스트 가져오기
    @PostMapping("/messages")
    public ResponseEntity<?> getMessages(@RequestBody Map<String, UUID> roomIdMap){
        return chatService.getMessage(roomIdMap.get("roomId"));
    }

}
