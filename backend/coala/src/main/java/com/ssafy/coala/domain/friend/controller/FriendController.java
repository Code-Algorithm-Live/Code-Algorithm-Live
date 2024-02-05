package com.ssafy.coala.domain.friend.controller;

import com.ssafy.coala.domain.friend.application.FriendService;
import com.ssafy.coala.domain.friend.dto.FriendDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/friend")
@RequiredArgsConstructor
public class FriendController {

    private FriendService friendService;

    @Operation(summary = "친구 목록 가져오기", description = "친구 목록을 가져올 수 있다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })

    // 친구 목록 가져오기
    @GetMapping(value = "/list")
    ResponseEntity<String> getListFriend(@Parameter(description = "내id", required = true, example = "내 아이디로 친구목록 가져오기")
                                        @PathVariable Long id){
        return ResponseEntity.ok("new List<String>()");

    }

    @Operation(summary = "친구 추가하기", description = "친구를 추가할 수 있다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    // 친구 추가하기
    @PostMapping(value = "/plus")
    ResponseEntity<String> registerFreiend(@Parameter(description = "내id", required = true, example = "친구 아이디로 친구 닉네임 추가하기")
                                        @PathVariable Long id){
        FriendDto friendDto = new FriendDto();
        id = 1L;
        return ResponseEntity.ok("friendDto");
    }

    @Operation(summary = "친구 삭제하기", description = "친구를 삭제할 수 있다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    // 친구 삭제하기
    @GetMapping(value = "/delete")
    ResponseEntity<String> deleteFreiend(@Parameter(description = "내id", required = true, example = "친구 아이디 삭제")
                                           @PathVariable Long id){
        FriendDto friendDto = new FriendDto();
        id = 1L;
        return ResponseEntity.ok("friendDto");
    }

    @Operation(summary = "친구 정보 조회하기", description = "친구 정보를 조회할 수 있다..")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    // 친구 정보 조회하기
    @PostMapping(value = "/{id}")
    ResponseEntity<String> getFreiend(@Parameter(description = "내id", required = true, example = "내 아이디로 친구목록 가져오기")
                                         @PathVariable Long id){
        FriendDto friendDto = new FriendDto();
        id = 1L;
        return ResponseEntity.ok("friendDto");
    }

    @PostMapping(value = "/send")
    ResponseEntity<String> send(@Parameter(description = "친구 요청 보내기 - sender : 필수, receivernickname : 필수, success : 안보내도됨", required = true, example = "친구 요청 보내기")
                                      @RequestBody FriendDto friendDto){
        friendService.send(friendDto);
        return ResponseEntity.ok("friendDto");
    }

    @PostMapping(value = "/accept")
    ResponseEntity<String> accept(@Parameter(description = "친구 요청 보내기 - sender : 필수, receivernickname : 필수, success : 안보내도됨", required = true, example = "친구 요청 수락")
                                @RequestBody FriendDto friendDto){
        friendService.accept(friendDto);
        return ResponseEntity.ok("friendDto");
    }
}
