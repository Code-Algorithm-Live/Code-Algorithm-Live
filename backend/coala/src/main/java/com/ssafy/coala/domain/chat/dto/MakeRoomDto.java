package com.ssafy.coala.domain.chat.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class MakeRoomDto {
    private UUID roomUuid;
    private String sender;
    private String receiver;

    //isclose, title, content, problemId
}
