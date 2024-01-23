package com.ssafy.coala.domain.friend.dto;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class FriendDto {
    private Long Id;
    private String fromNickname;
    private String toNickname;

}
