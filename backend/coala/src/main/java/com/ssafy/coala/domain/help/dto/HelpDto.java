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

    private int num;
    private String title;
    private String content;
}
