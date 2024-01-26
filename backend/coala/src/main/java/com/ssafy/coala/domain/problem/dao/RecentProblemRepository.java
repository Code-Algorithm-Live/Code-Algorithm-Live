package com.ssafy.coala.domain.problem.dao;

import com.ssafy.coala.domain.problem.domain.RecentProblem;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RecentProblemRepository extends MongoRepository<RecentProblem, String> {
}
