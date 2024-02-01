package com.ssafy.coala.domain.help.controller;


import com.ssafy.coala.domain.help.dto.WaitDto;
import com.ssafy.coala.domain.help.service.MatchingService;
import com.ssafy.coala.domain.help.service.RedisService;
import com.ssafy.coala.domain.member.application.MemberService;
import com.ssafy.coala.domain.member.domain.Member;
import com.ssafy.coala.domain.member.domain.MemberProfile;
import com.ssafy.coala.domain.member.dto.MemberDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@RequestMapping("/help")
@RestController
public class HelpController {

    private final RedisService redisService;
    private final MatchingService matchingService;


//    @Operation(summary = "도움 요청 폼 작성", description = "문제 번호, 도움 제목, 도움 요청 내용 작성해서 캐시에 등록")
//    @ApiResponses({
//            @ApiResponse(responseCode = "200", description = "OK !!"),
//            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
//            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
//            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
//    })
//    @PostMapping("/form")
//    public ResponseEntity<String> form(@Parameter(description = "문제 번호", required = true, example = "1000") @RequestParam int num,
//                                       @Parameter(description = "도움 제목", required = true, example = "반례를 찾아주세요") @RequestParam String title,
//                                       @Parameter(description = "도움 내용", required = true, example = "제발요ㅠㅠ") @RequestParam String content) {
//        return ResponseEntity.ok("문제번호 " + num + " 도움 제목 " +title+" 도움 내용 " + content);
//    }
//
//    @Operation(summary = "도움 요청 폼 수정", description = "문제 번호, 도움 제목, 도움 요청 내용 수정")
//    @ApiResponses({
//            @ApiResponse(responseCode = "200", description = "OK !!"),
//            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
//            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
//            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
//    })
//    @PutMapping("/form")
//    public ResponseEntity<String> formupdate(@Parameter(description = "문제 번호", required = true, example = "1000") @RequestParam int num,
//                                       @Parameter(description = "도움 제목", required = true, example = "반례를 찾아주세요") @RequestParam String title,
//                                       @Parameter(description = "도움 내용", required = true, example = "제발요ㅠㅠ") @RequestParam String content) {
//        return ResponseEntity.ok("문제번호 " + num + " 도움 제목 " +title+" 도움 내용 " + content);
//    }

    @Operation(summary = "GPT에게 힌트 받기", description = "Chat GPT에게 문제에 대한 힌트를 받습니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @GetMapping("/hint/{num}")
    public ResponseEntity<String> GPTHint(@Parameter(description = "문제 번호", required = true, example = "1000") @PathVariable int num) {
        return ResponseEntity.ok("문제번호 " + num);
    }

    @Operation(summary = "최근 푼 사람의 리스트", description = "해당 문제를 최근 푼 사람의 리스트를 반환합니다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @GetMapping("/solvedlist/{num}")
    public ResponseEntity<String> solvedlist(@Parameter(description = "문제 번호", required = true, example = "1000") @PathVariable int num) {
        return ResponseEntity.ok("문제번호 " + num);
    }

    @Operation(summary = "질문 히스토리 리스트", description = "최근 질문 히스토리 리스트를 반환합니다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @GetMapping("/questionlist/{id}")
    public ResponseEntity<String> questionlist(@Parameter(description = "유저 아이디", required = true, example = "test") @PathVariable String id) {
        return ResponseEntity.ok("아이디 " + id);
    }


    @Operation(summary = "도움 요청 대기열 문제 별 리스트 반환", description = "요청 대기열의 문제 별 리스트를 반환합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @GetMapping("/waitqueue/{probid}")
    public ResponseEntity<?> waitqueuelistbyprobid(@Parameter(description = "문제번호", required = true, example = "12233") @PathVariable int probid) {
        return ResponseEntity.ok(redisService.getProbUsers(probid));
    }

    @Operation(summary = "도움 요청 대기열 등록", description = "요청 대기열에 등록합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @PostMapping("/waitqueue")
    public ResponseEntity<String> waitqueue(@Parameter(description = "멤버", required = true, example = "test") @RequestBody WaitDto waitDto) {
        redisService.addUser(waitDto);
        return ResponseEntity.ok("queue 푸쉬 완료");
    }

    @Operation(summary = "도움 요청 대기열 전체 리스트", description = "도움 요청 전체 대기열을 반환")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @GetMapping("/waitqueue")
    public ResponseEntity<?> waitqueuelist() {
        return ResponseEntity.ok(redisService.getAllUsers());
    }

    @Operation(summary = "도움 요청 대기열 내가 푼 문제 리스트", description = "도움 요청 내가 푼 문제 대기열을 반환")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @GetMapping("/waitqueue/solvedlist")
    public ResponseEntity<?> waitqueuesolvedlist(@RequestBody String solvedId) {
        return ResponseEntity.ok(redisService.getSolvedListUsers(solvedId));
    }


    @Operation(summary = "도움 요청 대기열 삭제", description = "대기열에 등록된 도움 요청을 삭제합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @DeleteMapping("/waitqueue")
    public ResponseEntity<String> waitqueuedelete(@Parameter(description = "멤버", required = true, example = "test") @RequestBody WaitDto waitDto) {
        redisService.removeUser(waitDto);

        return ResponseEntity.ok("아이디 " + waitDto);
    }

    @Operation(summary = "도움 요청 보내기", description = "멘토에게 도움 요청을 보낸다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @PostMapping("/send")
    public ResponseEntity<String> send(@Parameter(description = "도움 요청", required = true, example = "test") @RequestBody WaitDto waitDto) {
        matchingService.sendHelp(waitDto);
        return ResponseEntity.ok("알림 전달 완료");
    }

    @Operation(summary = "도움 요청 수락", description = "멘티에게 받은 요청을 수락, 방 입장을 위한 방 번호를 리턴한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @PostMapping("/accept")
    public ResponseEntity<String> accept(@Parameter(description = "요청", required = true, example = "test") @RequestBody WaitDto waitDto) {
        matchingService.notifyMatching(waitDto);
        return ResponseEntity.ok("매칭 수락!!! 페어프로그래밍으로 이동");
    }
}