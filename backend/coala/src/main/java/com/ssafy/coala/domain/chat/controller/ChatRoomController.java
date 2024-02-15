package com.ssafy.coala.domain.chat.controller;

import com.ssafy.coala.domain.chat.application.ChatService;
import com.ssafy.coala.domain.chat.domain.ChatRoom;
import com.ssafy.coala.domain.chat.domain.CodeHistory;
import com.ssafy.coala.domain.chat.dto.ChatHistoryDto;
import com.ssafy.coala.domain.chat.dto.CodeHistoryDto;
import com.ssafy.coala.domain.chat.dto.HistoryRoomDto;
import com.ssafy.coala.domain.chat.dto.MakeRoomDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
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
    
    
    @Operation(summary = "특정 채팅 방 조회", description = "방 번호로 채팅 방 조회 ")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    // 특정 채팅방 조회
    @GetMapping("/room/{roomUuid}")
    public ResponseEntity<?> findRoom(@PathVariable("roomUuid") UUID roomUuid){
        System.out.println(roomUuid);
        return chatService.findRoom(roomUuid);
    }

    @Operation(summary = "채팅방 id로 히스토리 저장", description = "채팅방 id로 code history list를 서버에 저장")
    @PostMapping("history/{roomUuid}")
    public ResponseEntity<?> saveHistory(@PathVariable UUID roomUuid, @RequestBody List<CodeHistoryDto> codeHistoryDtoList){
        try {
            List<CodeHistory> codeHistoryList = new ArrayList<>();
            for (CodeHistoryDto codeHistoryDto : codeHistoryDtoList){
                codeHistoryList.add(codeHistoryDto.toCodeHistory(roomUuid));
            }
            chatService.saveHistory(codeHistoryList);
            return ResponseEntity.ok("code history save success!");
        } catch (Exception e){
            return ResponseEntity.internalServerError().body(null);
        }    }

    @Operation(summary = "채팅방 id로 히스토리 받기", description = "채팅방 id로 code/chat history 호출")
    @GetMapping("history/{roomUuid}")//paging 필요할 수 있음
    public ResponseEntity<ChatHistoryDto> findChatHistoryByRoomId(@PathVariable UUID roomUuid){
        try {
            return ResponseEntity.ok(chatService.findChatHistory(roomUuid));
        } catch (Exception e){
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @Operation(summary = "problem id로 히스토리 받기",
            description = "problem id로 history list 반환 페이징 필요?")
    @GetMapping("history/list/{problemId}")
    public ResponseEntity<List<HistoryRoomDto>> findHistoryListByProblemId(@PathVariable int problemId){

        try {
            return ResponseEntity.ok(chatService.findHistoryList(problemId));
        } catch (Exception e){
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @Operation(summary = "해당 유저가 질문한 히스토리 리스트",
            description = "{sender}=sender 인 history list 반환(sender 는 반환하지 않음)")
    @GetMapping("history/sender/{sender}")
    public ResponseEntity<List<HistoryRoomDto>> findHistoryListBySender(@PathVariable String sender){

        try {
            return ResponseEntity.ok(chatService.findHistoryBySender(sender));
        } catch (Exception e){
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @Operation(summary = "해당 유저가 도와준 히스토리 리스트",
            description = "{receiver}=receiver 인 history list 반환(sender 는 반환하지 않음)")
    @GetMapping("history/receiver/{receiver}")
    public ResponseEntity<List<HistoryRoomDto>> findHistoryListByReceiver(@PathVariable String receiver){

        try {
            return ResponseEntity.ok(chatService.findHistoryByReceiver(receiver));
        } catch (Exception e){
            return ResponseEntity.internalServerError().body(null);
        }
    }

//    @GetMapping("close/{roomUuId}")
//    public ResponseEntity<String> activeCloseRoom(@PathVariable UUID roomUuId){
//        chatService.closeRoom(roomUuId);
//        return ResponseEntity.ok("close");
//    }

}
