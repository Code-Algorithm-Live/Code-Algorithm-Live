package com.ssafy.coala.domain.friend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.coala.domain.member.dto.MemberDto;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class FriendDto {
    private MemberDto sender;
    private MemberDto receiver;
    private boolean success;
}
