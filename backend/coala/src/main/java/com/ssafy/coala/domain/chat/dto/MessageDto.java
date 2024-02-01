package com.ssafy.coala.domain.chat.dto;

import com.ssafy.coala.domain.chat.domain.ChatMessage;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
public class MessageDto {

    private ChatMessage.MessageType type;

    // 방 아이디
    private UUID roomUuid;

    //보내는 사람
    private String sender;
    //내용
    private String message;

    private LocalDateTime date;

}
