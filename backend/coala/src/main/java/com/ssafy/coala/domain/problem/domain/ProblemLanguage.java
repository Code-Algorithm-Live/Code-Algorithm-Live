package com.ssafy.coala.domain.problem.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@IdClass(ProblemLanguageId.class)
@Table(indexes = {
        @Index(columnList = "problem_id")})
public class ProblemLanguage {

    @Id
    @ManyToOne
    Problem problem;
    @Id
    String language;
    String title;
}
