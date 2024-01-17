package com.ssafy.coala.domain.member.application;


import com.ssafy.coala.domain.member.dto.KakaoTokenDto;

public interface LoginService {
    public KakaoTokenDto getKakaoAccessToken(String code);
}
