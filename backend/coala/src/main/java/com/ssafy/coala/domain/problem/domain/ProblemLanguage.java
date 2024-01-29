package com.ssafy.coala.domain.problem.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.ManyToOne;
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
public class ProblemLanguage {

    @Id
    @ManyToOne
    Problem problem;
    @Id
    String language;
    String title;
}
