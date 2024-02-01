package com.ssafy.coala.domain.problem.dao;

import com.ssafy.coala.domain.problem.domain.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface ProblemRepository extends JpaRepository<Problem, Integer> {
    @Query("select ifnull(Max(id),999) from Problem")
    Integer findMaxId();

    @Modifying
    @Transactional
    @Query("update Problem set description = :desc where id = :id")
    void updateProblemDescription(@Param("id") int id,@Param("desc") String description);

    @Query("select p from Problem p where p.level between :low and :high")
    List<Problem> findProblemsByLevelRange(@Param("low") int low, @Param("high") int high);
}