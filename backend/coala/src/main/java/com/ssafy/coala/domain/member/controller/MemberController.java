package com.ssafy.coala.domain.member.controller;

import com.ssafy.coala.domain.member.domain.Member;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/member")
public class MemberController {

    @Operation(summary = "member", description = "member api")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })

    @PostMapping("/signUp")
    public ResponseEntity<?> signUp(@RequestBody Member member){
        return ResponseEntity.ok(HttpStatus.OK);
    }


    @GetMapping("/signIn")
    public ResponseEntity<String> signIn(@Parameter(description = "로그인", required = true, example = "reqMember") @RequestParam String reqMember) {
        return ResponseEntity.ok("hello " + reqMember);
    }

}
