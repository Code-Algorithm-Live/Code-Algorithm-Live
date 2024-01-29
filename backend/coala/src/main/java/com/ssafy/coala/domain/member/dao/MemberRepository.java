package com.ssafy.coala.domain.member.dao;

import com.ssafy.coala.domain.member.domain.Member;
import com.ssafy.coala.domain.member.domain.MemberProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MemberRepository extends JpaRepository<Member, Integer> {


    Member findById(UUID uuid);

    boolean existsByNickname(String nickname);
}
