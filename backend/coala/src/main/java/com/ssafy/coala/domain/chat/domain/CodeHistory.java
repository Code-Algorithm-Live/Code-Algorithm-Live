package com.ssafy.coala.domain.chat.domain;

import jakarta.persistence.*;
import lombok.*;

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
    private UUID roomId;

    private int idx;
    private String pre;
    private String next;
    private int duration;


}
