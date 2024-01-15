package com.ssafy.coala.domain.member.controller;

import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@Api(tags = {"회원"})
@RequestMapping(value = "api/v1/member")
@RestController

public class SampleController {




    @ApiOperation(value = "회원 테스트", notes = "JWT AccessToken, RefreshToken 을 발급한다")
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
    public String getString(){
        return "test";
    }

}
