package com.ssafy.coala.domain.member.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class MemberDto {

    private String email;
    private String image;
    private String name;
    private String solvedId;
}
