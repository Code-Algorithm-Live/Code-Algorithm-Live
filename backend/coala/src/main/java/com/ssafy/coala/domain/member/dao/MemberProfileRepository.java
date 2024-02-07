package com.ssafy.coala.domain.member.dao;

import com.ssafy.coala.domain.member.domain.MemberProfile;

import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

public interface MemberProfileRepository extends JpaRepository<MemberProfile, Integer> {


    Boolean existsByNickname(String nickname);

//    UserEntity findByNickname(String nickname);

    MemberProfile findBySolvedId(String solveid);

    Optional<Object> findByEmail(String email);

    Optional<MemberProfile> findByNickname(String nickname);

    boolean existsByEmail(String email);

    MemberProfile findById(UUID uuid);

    MemberProfile findByKakaoname(String username);

    @Modifying
    @Transactional
    @Query("update MemberProfile m set m.lastRequest = CURRENT_TIMESTAMP where m.nickname = :nickname")
    void updateLastRequestByNickname(@Param("nickname") String nickname);
}
