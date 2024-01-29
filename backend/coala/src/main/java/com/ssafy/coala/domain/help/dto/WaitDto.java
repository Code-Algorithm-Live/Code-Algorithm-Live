package com.ssafy.coala.domain.help.dto;

import com.ssafy.coala.domain.member.dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class WaitDto {
    private MemberDto memberDto;
    private HelpDto helpDto;
    private UUID roomUuid;
    private String pair;
}
