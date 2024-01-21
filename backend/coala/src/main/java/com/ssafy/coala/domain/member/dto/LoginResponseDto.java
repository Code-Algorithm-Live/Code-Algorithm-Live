package com.ssafy.coala.domain.member.dto;

import com.ssafy.coala.domain.member.domain.Member;
import com.ssafy.coala.test.entity.UserEntity;
import lombok.Data;

@Data
public class LoginResponseDto {
    private boolean loginSuccess;
    private UserEntity user;
}
