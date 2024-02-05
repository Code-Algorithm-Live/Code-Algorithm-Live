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
public class ProblemLanguageId implements Serializable {
    Integer problem;
    String language;
}
