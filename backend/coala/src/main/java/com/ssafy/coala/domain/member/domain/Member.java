package com.ssafy.coala.domain.member.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Member implements Serializable {

    @Id @GeneratedValue
    @Column(name = "id")
    private Long Id;

    @Column(name = "member_name")
    private String name;

    @Column(name = "regist_date")
    private LocalDateTime registDate;

    @Column(name = "member_nickname")
    private String nickname;

    @Column(name = "member_exp")
    private Integer exp;

    @Column(name = "last_updated")
    private LocalDateTime lastupdated;

    @Column(name = "solved_id")
    private String solvedId;
}
