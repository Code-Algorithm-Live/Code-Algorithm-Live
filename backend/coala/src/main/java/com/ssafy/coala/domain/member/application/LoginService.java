package com.ssafy.coala.domain.member.application;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.coala.domain.member.dto.KakaoTokenDto;
import com.ssafy.coala.domain.member.dto.KakaoUserDto;

public interface LoginService {
    public KakaoTokenDto getKakaoAccessToken(String code);
    public KakaoUserDto kakaoLogin(String kakaoAccessToken)throws Exception;

    public KakaoUserDto getKakaoInfo(String kakaoAccessToken) throws JsonProcessingException;
}