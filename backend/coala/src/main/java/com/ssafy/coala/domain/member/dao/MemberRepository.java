package com.ssafy.coala.domain.member.dao;

import com.ssafy.coala.domain.member.domain.MemberProfile;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberProfile, Integer> {


    Boolean existsByNickname(String nickname);

//    UserEntity findByNickname(String nickname);

    MemberProfile findBySolvedId(String solveid);

    Optional<Object> findByEmail(String email);

    Optional<MemberProfile> findByNickname(String nickname);

    boolean existsByEmail(String email);
}
