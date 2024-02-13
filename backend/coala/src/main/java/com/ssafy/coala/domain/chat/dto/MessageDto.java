package com.ssafy.coala.domain.chat.dto;

import com.ssafy.coala.domain.chat.domain.ChatMessage;
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
public class MessageDto {

    private ChatMessage.MessageType type;

    // 방 아이디
    private UUID roomId;

    //보내는 사람
    private String sender;
    //내용
    private String message;

    private Timestamp date;

    public MessageDto(ChatMessage chatMessage){
        sender = chatMessage.getSender();
        type = chatMessage.getType();
        message = chatMessage.getMessage();
        date = Timestamp.valueOf(chatMessage.getDate());
    }

}
