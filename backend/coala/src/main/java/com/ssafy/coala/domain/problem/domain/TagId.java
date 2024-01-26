package com.ssafy.coala.domain.problem.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TagId implements Serializable {

    private Integer problem;
    private String name;

    // default constructor, getters, and equals/hashCode methods
}
