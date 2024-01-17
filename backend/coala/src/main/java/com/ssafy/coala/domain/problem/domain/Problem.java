package com.ssafy.coala.domain.problem.domain;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Problem {
    int id;
    String title;
    int accepted_user_count;
    int level;
    boolean give_no_rating;
    float average_tries;
}
