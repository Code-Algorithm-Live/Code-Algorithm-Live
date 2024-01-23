package com.ssafy.coala.domain.chat.dto;

import lombok.*;

@Builder
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class ChatMessageDto {

    private MessageType type;
    private String roomId;
    private String sender;
    private String message;

    public enum MessageType {
        ENTER, TALK
    }

}
