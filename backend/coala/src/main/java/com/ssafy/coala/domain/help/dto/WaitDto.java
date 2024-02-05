package com.ssafy.coala.domain.help.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.coala.domain.member.dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Objects;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class WaitDto {
    private MemberDto sender;
    private MemberDto receiver;
    private HelpDto helpDto;
    private UUID roomUuid;
    private boolean success;
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WaitDto waitDto = (WaitDto) o;
        return Objects.equals(sender, waitDto.sender);
    }

    @Override
    public int hashCode() {
        return Objects.hash(sender);
    }
}
