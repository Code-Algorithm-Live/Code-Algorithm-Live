//package com.ssafy.coala.domain.chat.controller;
//
//import com.ssafy.coala.domain.chat.application.ChatService;
//import com.ssafy.coala.domain.chat.domain.ChatRoom;
//import io.swagger.v3.oas.annotations.Operation;
//import io.swagger.v3.oas.annotations.responses.ApiResponse;
//import io.swagger.v3.oas.annotations.responses.ApiResponses;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//
//import java.util.List;
//
//@Controller
//@RequiredArgsConstructor
//@Slf4j
//public class ChatController {
//
//    private ChatService chatService;
//
//    @Operation(summary = "chat", description = "chat api")
//    @ApiResponses({
//            @ApiResponse(responseCode = "200", description = "OK !!"),
//            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
//            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
//            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
//    })
//
//    @PostMapping
//    public ChatRoom createRoom(@RequestParam String name) {
////        return chatService.createRoom(name);
//        return new ChatRoom();
//    }
//
//    @GetMapping
//    public List<ChatRoom> findAllRoom() {
////        return chatService.findAllRoom();
//        List<ChatRoom> list = new List<ChatRoom>();
//         return list;
//    }
//
//
//
//
//}
