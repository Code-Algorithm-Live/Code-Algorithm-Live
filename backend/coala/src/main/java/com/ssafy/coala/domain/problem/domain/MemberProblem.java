package com.ssafy.coala.domain.problem.domain;

import com.ssafy.coala.domain.member.domain.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
//@Table(indexes = {@Index(name = "idx_member", columnList = "id")})
@IdClass(MemberProblemId.class)
@NoArgsConstructor
@AllArgsConstructor
public class MemberProblem {

    @Id
    @ManyToOne
    private Problem problem;

    @Id
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private LocalDateTime lastSolved;

    public MemberProblem (Problem problem, Member member){
        this.problem = problem;
        this.member = member;
    }
}
