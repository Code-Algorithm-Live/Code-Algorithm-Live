package com.ssafy.coala.domain.friend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Friend {

    @Id @GeneratedValue
    private Long Id;
    private String fromNickname;
    private String toNickname;

}
