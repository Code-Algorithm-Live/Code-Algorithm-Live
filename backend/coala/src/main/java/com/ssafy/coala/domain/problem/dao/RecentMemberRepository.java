package com.ssafy.coala.domain.problem.dao;

import com.ssafy.coala.domain.problem.domain.RecentMember;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RecentMemberRepository extends MongoRepository<RecentMember, Integer> {
}
