package com.ssafy.coala.domain.member.controller;

import com.ssafy.coala.domain.member.domain.Sample;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/test")
@RestController

public class SampleController {




    @ApiOperation(value = "토큰 발급", notes = "JWT AccessToken, RefreshToken 을 발급한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 404, message = "No param")
            //Other Http Status code..
    })
    @ApiImplicitParam(
            name = "token"
            , value = "카카오 엑세스 토큰"
            , defaultValue = "None")
    @GetMapping
    String getString(){
        return "test";
    }

}
