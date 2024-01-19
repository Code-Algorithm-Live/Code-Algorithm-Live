package com.ssafy.coala.domain.problem.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@NoArgsConstructor
public class TagId implements Serializable {
    private Integer problem;
    private String name;

    public TagId(Integer problem_id, String name) {
        this.problem = problem;
        this.name = name;
    }
}