package com.ssafy.coala.domain.member.dto;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@Embeddable
public class MemberDto {

    private String email;
    private String image;
    private String kakaoname;
    private String solvedId;
    private String nickname;
}
