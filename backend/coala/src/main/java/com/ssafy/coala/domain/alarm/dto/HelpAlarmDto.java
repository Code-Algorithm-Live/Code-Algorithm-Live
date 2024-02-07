package com.ssafy.coala.domain.alarm.dto;

import com.ssafy.coala.domain.help.dto.HelpDto;
import com.ssafy.coala.domain.member.dto.MemberDto;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@ToString
public class HelpAlarmDto {
    @Embedded
    private MemberDto sender;
    @Embedded
    private MemberDto receiver;
    @Embedded
    private HelpDto help;

}
