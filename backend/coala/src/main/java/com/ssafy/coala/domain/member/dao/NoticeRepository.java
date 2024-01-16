package com.ssafy.coala.domain.member.dao;

import com.ssafy.coala.domain.member.domain.Notices;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Queue;

public interface NoticeRepository extends MongoRepository<Notices, Integer> {

}
