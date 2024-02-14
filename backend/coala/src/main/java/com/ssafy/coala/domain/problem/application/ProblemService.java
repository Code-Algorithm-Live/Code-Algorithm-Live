package com.ssafy.coala.domain.problem.application;

import com.ssafy.coala.domain.problem.domain.CurateInfo;
import com.ssafy.coala.domain.problem.domain.Problem;

import java.util.List;

public interface ProblemService {
    public void insertProblem(List<Problem> list);
    public Integer curId();
    public Problem getProblem(int id);
    public  void updateDescriptionById(int id, String description);
    public CurateInfo getCurateProblem(String solvedId);
    public List<Integer> getProblemByMember(String solvedId);
    public List<String> getSolvedIdByProblem(int problemId);
    public List<String> getRecentMemberByProblem(int problemId);
}
