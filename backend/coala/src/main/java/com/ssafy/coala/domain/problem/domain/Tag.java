package com.ssafy.coala.domain.problem.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@IdClass(TagId.class)
public class Tag {
    public Problem getProblem_id() {
        return problem;
    }

    public String getName() {
        return name;
    }

    @Id
    @ManyToOne
    private Problem problem;
    @Id
    private String name;

    public Tag(Problem problem_id, String name) {
        this.problem = problem_id;
        this.name = name;
    }
}
