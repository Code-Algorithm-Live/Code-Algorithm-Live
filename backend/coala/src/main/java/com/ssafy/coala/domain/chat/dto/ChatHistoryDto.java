package com.ssafy.coala.domain.chat.dto;

import com.ssafy.coala.domain.chat.domain.ChatMessage;
import com.ssafy.coala.domain.chat.domain.CodeHistory;

import java.time.LocalDateTime;
import java.util.List;

//dto
public class ChatHistoryDto {
    private int problem_id;
    private String title;
    private String content;
    private LocalDateTime registerDate;
    private String sender;
    private String receiver;
    private List<ChatMessage> messages;
    private List<CodeHistory> codeHistories;
}
