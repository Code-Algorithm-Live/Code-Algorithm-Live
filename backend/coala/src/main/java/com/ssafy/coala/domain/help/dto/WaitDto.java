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

    //요청 보내는 사람
    private MemberDto sender;
    //요청을 받는 사람
    private MemberDto receiver;
    //도움 요청 내용
    private HelpDto helpDto;
    //매칭 성공 시 입장할 채팅방의 id, frontend에서 생성해서 보내줄거임
    private UUID roomUuid;
    //매칭 수락 여부
    private boolean success;

    //매칭 대기열에 존재하는지 검사하는 코드 sender의 정보로만 검사한다. 매칭에 존재할 수 있는 sender는 한명뿐이기에
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
