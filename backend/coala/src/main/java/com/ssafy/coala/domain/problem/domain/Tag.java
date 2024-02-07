package com.ssafy.coala.domain.problem.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@IdClass(TagId.class)
@Table(indexes = {
        @Index(columnList = "problem_id")})
public class Tag {
    @Id
    @ManyToOne
    @JoinColumn(name = "problem_id")
    private Problem problem;

    @Id
    private String name;
}






