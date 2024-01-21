package com.ssafy.coala.domain.member.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Member {

    @Id @GeneratedValue
    @Column(name = "member_id")
    private Long Id;

    @Column(name = "member_name")
    private String name;

    private LocalDateTime date;

    @Column(name = "member_nickname")
    private String nickname;

    @Column(name = "member_exp")
    private Integer exp;

}
