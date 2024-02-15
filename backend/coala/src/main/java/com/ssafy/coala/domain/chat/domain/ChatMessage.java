package com.ssafy.coala.domain.chat.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Timestamp;
import java.time.LocalDateTime;


@Entity
@Builder
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class ChatMessage {
    @Id
    @GeneratedValue
    private Long id;
    public enum MessageType {
        ENTER, TALK, EXIT
    }

    private MessageType type;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "room_id")
    private ChatRoom chatRoom;

    //보내는 사람
    private String sender;
    //내용
    private String message;

    @CreatedDate
    private LocalDateTime date;

    // 채팅생성
}