package com.ssafy.coala.domain.chat.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity(name = "chatRoom")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class ChatRoom {
    @Id
    @Column(name = "room_id",length = 16)
    private UUID roomId;

    private String sender;
    private String receiver;

    private boolean isClose;
    private String title;
    @Column(columnDefinition = "text")
    private String content;
    private int problemId;

    @JsonIgnore
    @OneToMany(mappedBy = "")
    @Builder.Default
    private List<ChatMessage> messages = new ArrayList<>();

    @CreatedDate
    private LocalDateTime date;
}