package com.ssafy.coala.domain.problem.domain;

import jakarta.persistence.Entity;

//@Entity
public class Problem {
    int id;
    String title;
    int acceptedUserCount;
    int level;
    boolean giveNoRating;
    float averageTries;
}
