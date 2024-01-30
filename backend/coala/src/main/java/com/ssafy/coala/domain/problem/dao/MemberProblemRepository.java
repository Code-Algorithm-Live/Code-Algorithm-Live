package com.ssafy.coala.domain.problem.dao;

import com.ssafy.coala.domain.problem.domain.MemberProblem;
import com.ssafy.coala.domain.problem.domain.MemberProblemId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.nio.ByteBuffer;
import java.util.List;
import java.util.UUID;

public interface MemberProblemRepository extends JpaRepository<MemberProblem, MemberProblemId> {
    @Query("select m from MemberProblem m where m.member.id = :memberId")
    List<MemberProblem> selectByMemberId(@Param("memberId") UUID memberId);

    @Query(value = "select id from member where solved_id = :solvedId", nativeQuery = true)
    byte[] findBySolveId(@Param("solvedId") String solvedId);

    default UUID findUUIDBySolveId(String solvedId) {
        byte[] result = findBySolveId(solvedId);
        ByteBuffer byteBuffer = ByteBuffer.wrap(result);
        long high = byteBuffer.getLong();
        long low = byteBuffer.getLong();
        return new UUID(high, low);
    }

}
