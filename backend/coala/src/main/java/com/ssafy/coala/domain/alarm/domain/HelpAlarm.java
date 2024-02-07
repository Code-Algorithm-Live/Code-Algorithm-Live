package com.ssafy.coala.domain.alarm.domain;

import com.ssafy.coala.domain.help.dto.HelpDto;
import com.ssafy.coala.domain.member.dto.MemberDto;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@ToString
public class HelpAlarm {

    @Id
    @GeneratedValue
    private Long id;

    @Embedded
    @Column(insertable=false, updatable=false)
    private MemberDto sender;

    private String receiverNickname;

    @Embedded
    @Column(insertable=false, updatable=false)
    private HelpDto help;

    @CreatedDate
    private LocalDateTime sendDate;
}
