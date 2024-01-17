package com.ssafy.coala.domain.member.controller;

import com.ssafy.coala.domain.member.application.LoginService;
import com.ssafy.coala.domain.member.dto.KakaoTokenDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/login")
public class LoginController {

    @Autowired
    LoginService service;

    @Operation(summary = "Oauth2", description = "kakao 인가코드를 인자로 받아 kakao accesstoken 발급")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })

    @GetMapping("/oauth2/callback/kakao")
    public ResponseEntity<String> kakaoLogin(@Parameter(description = "code", required = true) @RequestParam String code) {
//        String code = request.getParameter("code");
        KakaoTokenDto kakaoTokenDto = service.getKakaoAccessToken(code);
        System.out.println(kakaoTokenDto);
//        String code = request.getParameter("code");
//        String kakaoAccessToken = authService.getKakaoAccessToken(code).getAccess_token();
//        return authService.kakaoLogin(kakaoAccessToken);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
