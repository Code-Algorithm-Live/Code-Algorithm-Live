package com.ssafy.coala.domain.alarm.controller;

import com.ssafy.coala.domain.alarm.application.AlarmService;
import com.ssafy.coala.domain.alarm.domain.FriendAlarm;
import com.ssafy.coala.domain.alarm.domain.HelpAlarm;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/alarm")
@RestController
public class AlarmController {

    private final AlarmService alarmService;

    @Operation(summary = "도움요청 알람 리스트", description = "도움요청 알람 리스트를 반환합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })

    @GetMapping("/help/{nickname}")
    public ResponseEntity<?> helplist(@Parameter(description = "닉네임", required = true, example = "차승윤") @PathVariable("nickname") String nickname) {
        List<HelpAlarm> list = alarmService.getAlarms(nickname);
        return ResponseEntity.ok(list);
    }

    @PostMapping("/help")
    public String testhelp(){
        System.out.println("Ee");
        return "success";
    }

    @Operation(summary = "친구요청 알람 리스트", description = "친구요청 알람 리스트를 반환합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @GetMapping("/friend/{nickname}")
    public ResponseEntity<?> friendlist(@Parameter(description = "닉네임", required = true, example = "차승윤") @PathVariable String nickname) {
        List<FriendAlarm> list = alarmService.getFriendAlarms(nickname);
        return ResponseEntity.ok(list);
    }

    @Operation(summary = "도움요청 알람 삭제", description = "도움요청 알람 게시판에서 인자로 받은 id값의 알람을 삭제합니다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @DeleteMapping("/help/{id}")
    public ResponseEntity<?> deletehelplist(@Parameter(description = "도움 요청 알람 ID", required = true, example = "1") @PathVariable long id) {
        alarmService.deleteHelpAlram(id);
        return ResponseEntity.ok(true);
    }

    @Operation(summary = "친구요청 알람 삭제", description = "친구요청 알람 리스트에서 인자로 받은 id값의 알람을 삭제합니다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @DeleteMapping("/friend/{id}")
    public ResponseEntity<?> deletefriendlist(@Parameter(description = "친구 요청 알람 ID", required = true, example = "1") @PathVariable long id) {
        alarmService.deleteFriendAlram(id);
        return ResponseEntity.ok(true);
    }

    @PostMapping("/api/v1/test")
    public String test(){
        System.out.println("test success");
        return "test success";
    }

}
