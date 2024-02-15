package com.ssafy.coala.domain.chat.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(indexes = {
        @Index(columnList = "room_id")})
@NoArgsConstructor
@AllArgsConstructor
public class CodeHistory {
    @Id
    @GeneratedValue
    private Long id;
    @Column(name = "room_id")
    private UUID roomId;

    private int idx;
    @Column(columnDefinition = "text")
    private String pre;
    @Column(columnDefinition = "text")
    private String next;
    private LocalDateTime time;


}
