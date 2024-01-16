//package com.ssafy.coala.domain.chat.controller;
//
//import com.ssafy.coala.domain.chat.domain.ChatRoom;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.*;
//
//
//@RequiredArgsConstructor
//@Controller
//@RequestMapping("/chat")
//public class ChatRoomController {
//
////    private final ChatRoomRepository chatRoomRepository;
////    private final JwtTokenProvider jwtTokenProvider;
//
//    @GetMapping("/room")
//    public String rooms() {
//        return "/chat/room";
//    }
//
////    @GetMapping("/rooms")
////    @ResponseBody
////    public List<ChatRoom> room() {
//////        List<ChatRoom> chatRooms = chatRoomRepository.findAllRoom();
//////        chatRooms.stream().forEach(room -> room.setUserCount(chatRoomRepository.getUserCount(room.getRoomId())));
//////        return chatRooms;
////        return new ChatRoom;
//    }
//
////    @PostMapping("/room")
////    @ResponseBody
////    public ChatRoom createRoom(@RequestParam String name) {
//////        return chatRoomRepository.createChatRoom(name);
////    }
//
////    @GetMapping("/room/enter/{roomId}")
////    public String roomDetail(Model model, @PathVariable String roomId) {
////        model.addAttribute("roomId", roomId);
////        return "/chat/roomdetail";
////    }
////
////    @GetMapping("/room/{roomId}")
////    @ResponseBody
////    public ChatRoom roomInfo(@PathVariable String roomId) {
////        return chatRoomRepository.findRoomById(roomId);
////    }
////
////    @GetMapping("/user")
////    @ResponseBody
////    public LoginInfo getUserInfo() {
////        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
////        String name = auth.getName();
////        return LoginInfo.builder().name(name).token(jwtTokenProvider.generateToken(name)).build();
////    }
//
//}
