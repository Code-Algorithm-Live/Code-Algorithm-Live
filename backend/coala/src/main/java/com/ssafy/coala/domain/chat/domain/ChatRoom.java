package com.ssafy.coala.domain.chat.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity(name = "chatRoom")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoom {
    @Id
    @GeneratedValue
    @Column(name = "room_id")
    private UUID roomUuid;

    private String sender;
    private String receiver;

    @JsonIgnore
    @OneToMany(mappedBy = "")
    @Builder.Default
    private List<ChatMessage> messages = new ArrayList<>();
    
}