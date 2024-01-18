package com.ssafy.coala.test.repository;

import com.ssafy.coala.test.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

}
