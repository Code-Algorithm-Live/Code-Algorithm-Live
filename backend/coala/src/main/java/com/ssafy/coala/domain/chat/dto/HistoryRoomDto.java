package com.ssafy.coala.domain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HistoryRoomDto {
    private UUID roomId;
    private String sender;
    private String receiver;
    private String title;
    private String content;
    private int problemId;
    private Timestamp date;
}
