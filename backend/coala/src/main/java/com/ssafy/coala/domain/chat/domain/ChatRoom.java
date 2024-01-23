package com.ssafy.coala.domain.chat.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "chatRoom")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "room_id")
    private Long roomId;

    private String sender;
    private String receiver;


    @OneToMany(mappedBy = "")
    private List<ChatMessage> messages = new ArrayList<>();
}