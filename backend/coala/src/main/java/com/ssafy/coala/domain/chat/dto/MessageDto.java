package com.ssafy.coala.domain.chat.dto;

import com.ssafy.coala.domain.chat.domain.ChatMessage;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageDto {

    private ChatMessage.MessageType type;

    // 방 아이디
    private Long roomId;

    //보내는 사람
    private String sender;
    //내용
    private String message;

    private String date;

}
