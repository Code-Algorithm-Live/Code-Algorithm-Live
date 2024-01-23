package com.ssafy.coala.domain.member.dao;

import com.ssafy.coala.domain.member.domain.UserEntity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {


    Boolean existsByNickname(String nickname);

//    UserEntity findByNickname(String nickname);

    UserEntity findById(Long id);

    Optional<Object> findByEmail(String email);

    Optional<UserEntity> findByNickname(String nickname);
}
