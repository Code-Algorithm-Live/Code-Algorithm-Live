package com.ssafy.coala.domain.problem.dao;

import com.ssafy.coala.domain.problem.domain.Problem;
import org.h2.command.query.Select;
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

    @Query("SELECT p FROM Problem p " +
            "JOIN p.languages l " +
            "WHERE p.level BETWEEN :low AND :high AND l.language = 'ko' AND p.give_no_rating = false")
    List<Problem> findProblemsByLevelRange(@Param("low") int low, @Param("high") int high);

    @Query("Select p.question_cnt from Problem p where p.id In:ids order by p.id")
    List<Integer> findAllQuestionCntById(List<Integer> ids);
    @Modifying
    @Transactional
    @Query(value = "UPDATE problem SET question_cnt = question_cnt + 1 WHERE id = :problemId", nativeQuery = true)
    void questionCntIncrease(@Param("problemId") int problemId);

    @Query("Select p.question_cnt from Problem p where p.id=:id")
    Object findQuestionCntById(@Param("id") Integer id);
}
