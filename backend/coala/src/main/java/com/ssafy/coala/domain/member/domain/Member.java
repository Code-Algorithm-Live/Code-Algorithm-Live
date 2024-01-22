package com.ssafy.coala.domain.member.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Data
public class Member {

    @Id @GeneratedValue
    @Column(name = "member_id")
    private Long Id;

    @Column(name = "member_password")
    private String password;

    @Column(name = "member_name")
    private String name;

    private LocalDateTime date;

    @Column(name = "member_nickname")
    private String nickname;

    @Column(name = "member_exp")
    private Integer exp;

}
