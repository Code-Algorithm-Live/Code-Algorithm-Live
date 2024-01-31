package com.ssafy.coala.domain.member.dto;

import com.ssafy.coala.domain.member.domain.MemberProfile;
import lombok.Data;

@Data
public class LoginResponseDto {
    private boolean loginSuccess;
    private MemberProfile user;
}
