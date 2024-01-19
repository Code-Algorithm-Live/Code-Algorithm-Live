package com.ssafy.coala.test.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserSignUpDto {
    private String email;
    private String password;
    private String nickname;
    private int age;
    private String city;
}
