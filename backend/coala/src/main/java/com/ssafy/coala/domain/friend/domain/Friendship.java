package com.ssafy.coala.domain.friend.domain;

import com.ssafy.coala.domain.member.domain.Member;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Friendship {

    @Id @GeneratedValue
    private Long Id;

    private String userId;

    @OneToMany(fetch = FetchType.LAZY) // 한 유저는 여러 친구(Member) 목록을 가지고 있다.
    private List<Member> friendList;

}
