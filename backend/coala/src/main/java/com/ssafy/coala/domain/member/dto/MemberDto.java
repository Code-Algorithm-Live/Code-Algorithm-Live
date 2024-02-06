package com.ssafy.coala.domain.member.dto;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.ToString;

//member_profile 정보들 담는 용도의 DTO
@Data
@ToString
@Embeddable
public class MemberDto {

    private String email;
    private String image;
    private String kakaoname;
    private String nickname;

    private int exp;

    //유저한테 직접 입력받는 부분
    private String solvedId;
}
