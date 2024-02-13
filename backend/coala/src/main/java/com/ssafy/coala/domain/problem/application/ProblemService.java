package com.ssafy.coala.domain.problem.application;

import com.ssafy.coala.domain.member.domain.Member;
import com.ssafy.coala.domain.problem.domain.CurateInfo;
import com.ssafy.coala.domain.problem.domain.MemberProblem;
import com.ssafy.coala.domain.problem.domain.Problem;
import com.ssafy.coala.domain.problem.dto.ProblemDto;

import java.util.List;
import java.util.Optional;

public interface ProblemService {
    public void insertProblem(List<Problem> list);
    public Integer maxId();
    public Problem getProblem(int id);
    public  void updateDescriptionById(int id, String description);
    public CurateInfo getCurateProblem(String solvedId);
    public List<Integer> getProblemByMember(String solvedId);
    public List<String> getSolvedIdByProblem(int problemId);
    public List<MemberProblem> getRecentMemberProblem(int problemId);
}
