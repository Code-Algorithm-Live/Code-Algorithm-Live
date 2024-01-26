package com.ssafy.coala.domain.problem.application;

import com.ssafy.coala.domain.member.domain.Member;
import com.ssafy.coala.domain.problem.domain.Problem;

import java.util.List;
import java.util.Optional;

public interface ProblemService {
    public List<Problem> insertProblem(List<Problem> list);
    public Integer maxId();
    public Optional<Problem> getProblem(int id);
    public  void updateDescriptionById(int id, String description);
    List<Problem> getCurateProblem(List<Integer> problem, List<String[]> recentProblem, String solvedId);

}
