package com.ssafy.coala.domain.problem.domain;

import com.ssafy.coala.domain.member.domain.Member;
import jakarta.persistence.*;
import lombok.Getter;

//@Entity
//@Getter
//@Table(indexes = {@Index(name = "idx_member", columnList = "member")})
//@IdClass(MemberProbelmId.class)
public class MemberProblem {
    @Id
    @ManyToOne
    Member member;

    @Id
    @ManyToOne
    Problem problem;

    MemberProblem (Member member, Problem problem){
        this.member = member;
        this.problem = problem;
    }

}
