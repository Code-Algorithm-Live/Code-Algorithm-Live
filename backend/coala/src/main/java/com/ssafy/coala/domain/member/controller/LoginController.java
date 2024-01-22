package com.ssafy.coala.domain.member.controller;

import com.ssafy.coala.domain.member.application.LoginService;
import com.ssafy.coala.domain.member.dto.KakaoTokenDto;
import com.ssafy.coala.domain.member.dto.KakaoUserDto;
import com.ssafy.coala.test.service.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.support.RequestContextUtils;
import org.springframework.web.servlet.view.RedirectView;

import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Controller
@RequiredArgsConstructor
@RequestMapping("/login")
public class LoginController {

    @Autowired
    LoginService service;
    @Autowired
    JwtService jwtService;

//    @Operation(summary = "Oauth2", description = "kakao 인가코드를 인자로 받아 kakao accesstoken 발급")
//    @ApiResponses({
//            @ApiResponse(responseCode = "200", description = "OK !!"),
//            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
//            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
//            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
//    })

    @GetMapping("/oauth2/callback/kakao")
    public ResponseEntity<Object> kakaoLogin(@Parameter(description = "code", required = true) @RequestParam String code, HttpServletRequest request, HttpServletResponse response, RedirectAttributes redirectAttributes) throws Exception {
//        String code = request.getParameter("code");
        KakaoTokenDto kakaoTokenDto = service.getKakaoAccessToken(code);
//        System.out.println(kakaoTokenDto);
        KakaoUserDto user = service.kakaoLogin(kakaoTokenDto.getAccess_token());
//        String kakaoAccessToken = authService.getKakaoAccessToken(code).getAccess_token();
//        return new ResponseEntity<>(user,HttpStatus.OK);
        System.out.println(user);

        String accessToken = jwtService.createAccessToken(user.getId(), user.getEmail());
//        response.setHeader("Authorization","Bearer "+accessToken);
        System.out.println(accessToken);

        HttpHeaders headers = new HttpHeaders();
//        headers.add(HttpHeaders.LOCATION, "/login/jwt");
        headers.add("Authorization","Bearer "+accessToken);
        // ResponseEntity를 사용하여 HTTP 상태 코드와 헤더를 설정
        ResponseEntity<Object> responseEntity = new ResponseEntity<>(headers, HttpStatus.SEE_OTHER);

        return responseEntity;


//        response.sendRedirect("/login/jwt");
//        return new RedirectView("/login/jwt?accessToken=");
    }

    @GetMapping("/jwt")
    public String jwt(HttpServletRequest request,HttpServletResponse response){
        String authorization= (String) request.getHeader("Authorization");
//
        String accesstoken = authorization.split(" ")[1];
        return request.toString();
    }


}
