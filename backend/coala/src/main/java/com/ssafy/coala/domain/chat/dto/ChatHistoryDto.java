package com.ssafy.coala.domain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatHistoryDto {
    private List<CodeHistoryDto> historyDto;
    private List<MessageDto> messageDto;
}

