package com.ssafy.coala.domain.problem.dao;

import com.ssafy.coala.domain.problem.domain.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface ProblemRepository extends JpaRepository<Problem, Integer> {
    @Query("select ifnull(Max(id),999) from Problem")
    Integer findMaxId();
}
