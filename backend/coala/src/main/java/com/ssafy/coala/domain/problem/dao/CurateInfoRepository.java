package com.ssafy.coala.domain.problem.dao;

import com.ssafy.coala.domain.problem.domain.CurateInfo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CurateInfoRepository extends MongoRepository<CurateInfo, String> {
}
