package com.ssafy.coala.domain.chat.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class HistoryRoomDto {
    private UUID roomId;
    private String sender;
    private String receiver;
    private boolean isClose;
    private String title;
    private String content;
    private int problemId;
    private LocalDateTime date;
}
