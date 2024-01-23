package com.ssafy.coala.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class KakaoUserDto {
    private Long id;
    private String email;
    private String nickname;
    private String img_url;
}
