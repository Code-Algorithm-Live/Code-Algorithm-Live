package com.ssafy.coala.domain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HistoryRoomDto {
    private UUID roomId;
    private String sender;
//    private String receiver;//list x
    private String title;
//    private String content;//list x
    private int problemId;
    private LocalDateTime date;
}
