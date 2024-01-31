package com.ssafy.coala.domain.member.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@ToString
public class Member implements Serializable {

//    @Id @GeneratedValue(generator = "uuid2")
//    @GenericGenerator(name="uuid2", strategy = "uuid2")
    @Id
    @Column(name = "id", columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(name = "regist_date")
    @CreatedDate
    private LocalDateTime registDate;

    private String password;

    @ColumnDefault("0")
    @Column(name = "member_exp")
    private int exp;

    @Column(name = "solved_id", unique = true)
    private String solvedId;

    @Column(name = "email")
    private String email;

    @Column(name = "nick_name")
    private String nickname;
}
