package com.ssafy.coala.domain.member.dao;

import com.ssafy.coala.domain.member.domain.MemberProfile;

import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
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

    @Query(value = "select mpf.email, mpf.image_url, mpf.kakao_name, mpf.nick_name, m.member_exp, mpf.solved_id " +
            "from member_profile mpf join member_problem mp on mpf.id = mp.member_id " +
            "join member m on m.id = mpf.id " +
            "where mp.problem_id = :problemId and mpf.last_request >= (now() - interval 60 minute) order by mp.last_solved desc", nativeQuery = true)
    List<Object[]> findAccessMemberByProblemId(@Param("problemId") int problemId);

    @Query("select m.imageUrl from MemberProfile m where m.nickname=:nickname")
    String findImageUrlByNickname(@Param("nickname") String nickname);

    @Modifying
    @Query ("update MemberProfile m set m.imageUrl=:imageUrl where m.nickname=:nickname")
    void updateImageUrlByNickname(@Param("imageUrl") String imageUrl, @Param("nickname") String nickname);
}
