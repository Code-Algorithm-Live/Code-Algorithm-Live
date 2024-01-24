package com.ssafy.coala.domain.problem.application;

import com.ssafy.coala.domain.problem.domain.Problem;
import com.ssafy.coala.domain.problem.domain.RecentProblem;
import com.ssafy.coala.domain.problem.domain.Tag;

import java.util.List;
import java.util.Optional;

public interface ProblemService {
    public List<Problem> insertProblem(List<Problem> list);
    public Integer maxId();
    public Optional<Problem> getProblem(int id);
    public  void updateDescriptionById(int id, String description);
    RecentProblem updateRecentProblem(RecentProblem inputRP);
}
