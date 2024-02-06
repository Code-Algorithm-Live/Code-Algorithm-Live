package com.ssafy.coala.domain.chat.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@RequiredArgsConstructor
public class ChatRoomDto {
    private Long Id;
    private String name;

    private Long userCount;

    private LocalDateTime registerdate;

}
