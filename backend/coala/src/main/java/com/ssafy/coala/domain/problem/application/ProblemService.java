package com.ssafy.coala.domain.problem.application;

import com.ssafy.coala.domain.problem.domain.Problem;
import com.ssafy.coala.domain.problem.domain.RecentProblem;
import com.ssafy.coala.domain.problem.domain.Tag;

import java.util.List;

public interface ProblemService {
    public List<Problem> insertProblem(List<Problem> list);
    public Integer maxId();

    RecentProblem updateRecentProblem(RecentProblem inputRP);
}
