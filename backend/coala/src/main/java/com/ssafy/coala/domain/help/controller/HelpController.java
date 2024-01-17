package com.ssafy.coala.domain.help.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/help")
@RestController
public class HelpController {

    @Operation(summary = "도움 요청 폼 작성", description = "문제 번호, 도움 제목, 도움 요청 내용 작성")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @PostMapping("/form")
    public ResponseEntity<String> form(@Parameter(description = "문제 번호", required = true, example = "1000") @RequestParam int num,
                                       @Parameter(description = "도움 제목", required = true, example = "반례를 찾아주세요") @RequestParam String title,
                                       @Parameter(description = "도움 내용", required = true, example = "제발요ㅠㅠ") @RequestParam String content) {
        return ResponseEntity.ok("문제번호 " + num + " 도움 제목 " +title+" 도움 내용 " + content);
    }

    @Operation(summary = "도움 요청 폼 수정", description = "문제 번호, 도움 제목, 도움 요청 내용 수정")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @PutMapping("/form")
    public ResponseEntity<String> formupdate(@Parameter(description = "문제 번호", required = true, example = "1000") @RequestParam int num,
                                       @Parameter(description = "도움 제목", required = true, example = "반례를 찾아주세요") @RequestParam String title,
                                       @Parameter(description = "도움 내용", required = true, example = "제발요ㅠㅠ") @RequestParam String content) {
        return ResponseEntity.ok("문제번호 " + num + " 도움 제목 " +title+" 도움 내용 " + content);
    }

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

    @Operation(summary = "도움 요청 대기열 등록", description = "요청 대기열에 등록합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @PostMapping("/waitqueue/{id}")
    public ResponseEntity<String> waitqueue(@Parameter(description = "유저 아이디", required = true, example = "test") @PathVariable String id) {
        return ResponseEntity.ok("아이디 " + id);
    }

    @Operation(summary = "도움 요청 대기열 삭제", description = "대기열에 등록된 도움 요청을 삭제합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @DeleteMapping("/waitqueue/{id}")
    public ResponseEntity<String> waitqueuedelete(@Parameter(description = "유저 아이디", required = true, example = "test") @PathVariable String id) {
        return ResponseEntity.ok("아이디 " + id);
    }
}
