package com.ssafy.coala.domain.member.dto;

import com.ssafy.coala.domain.member.domain.UserEntity;
import lombok.Data;

@Data
public class LoginResponseDto {
    private boolean loginSuccess;
    private UserEntity user;
}
