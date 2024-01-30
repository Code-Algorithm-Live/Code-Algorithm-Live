package com.ssafy.coala.domain.member.application;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.coala.domain.member.domain.Member;
import com.ssafy.coala.domain.member.domain.MemberProfile;
import com.ssafy.coala.domain.member.dto.KakaoTokenDto;
import com.ssafy.coala.domain.member.dto.KakaoUserDto;
import com.ssafy.coala.domain.member.dto.MemberDto;

import java.util.UUID;

public interface MemberService {
    public KakaoTokenDto getKakaoAccessToken(String code);
    public KakaoUserDto kakaoLogin(String kakaoAccessToken)throws Exception;

    public KakaoUserDto getKakaoInfo(String kakaoAccessToken) throws JsonProcessingException;

    boolean check(MemberDto member);

    void signUp(MemberDto memberDto, String solvedId);

    MemberProfile getMemberProfile(UUID uuid);

    Member getMember(UUID uuid);

    boolean dupCheck(String nickname);
}
