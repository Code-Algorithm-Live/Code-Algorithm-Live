package com.ssafy.coala.domain.help.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HelpDto {

    // 문제 번호
    private int num;
    // 도움 요청 제목
    private String title;
    // 도움 요청 내용
    private String content;
}
