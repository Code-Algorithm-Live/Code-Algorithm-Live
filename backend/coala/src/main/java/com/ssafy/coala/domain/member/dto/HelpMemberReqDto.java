package com.ssafy.coala.domain.member.dto;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@Embeddable
public class HelpMemberReqDto {

    private String email;
    private String image;
    private String nickname;
    private int exp;

    //유저한테 직접 입력받는 부분
    private String solvedId;

}
