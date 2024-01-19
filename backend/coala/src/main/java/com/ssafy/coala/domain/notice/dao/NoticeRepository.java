package com.ssafy.coala.domain.notice.dao;

import com.ssafy.coala.domain.notice.domain.Notices;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NoticeRepository extends MongoRepository<Notices, Integer> {

}
