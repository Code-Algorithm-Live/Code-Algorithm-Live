package com.ssafy.coala.domain.problem.domain;

import com.ssafy.coala.domain.member.domain.Member;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
//@Table(indexes = {@Index(name = "idx_member", columnList = "id")})
@IdClass(MemberProblemId.class)
public class MemberProblem {

    @Id
    @ManyToOne
    private Problem problem;

    @Id
    @ManyToOne
    private Member member;

    MemberProblem (Problem problem, Member member){
        this.problem = problem;
        this.member = member;
    }
}
