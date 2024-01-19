package com.ssafy.coala.domain.problem.dao;


import com.ssafy.coala.domain.problem.domain.Tag;
import com.ssafy.coala.domain.problem.domain.TagId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, TagId> {
}
