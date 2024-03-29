package com.ssafy.coala.domain.problem.dao;

import com.ssafy.coala.domain.problem.domain.MemberProblem;
import com.ssafy.coala.domain.problem.domain.MemberProblemId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface MemberProblemRepository extends JpaRepository<MemberProblem, MemberProblemId> {
    @Query("select m from MemberProblem m where m.member.id = :memberId")
    List<MemberProblem> findByMemberId(@Param("memberId") UUID memberId);

    @Query(value = "select id from member where solved_id = :solvedId", nativeQuery = true)
    UUID findMemberBySolveId(@Param("solvedId") String solvedId);

    @Query(value = "select problem_id from member_problem mp join member m on m.id = mp.member_id where solved_id = :solvedId", nativeQuery = true)
    List<Integer> findProblemIdBySolvedId(@Param("solvedId") String solvedId);

//    @Query(value = "select m.solved_id from member m join member_problem mp on mp.member_id = m.id where mp.problem_id = :problemId", nativeQuery = true)
//    List<String> findSolveIdByProblemId(@Param("problemId") int problemId);

//    @Query(value = "select m.nick_name from member m join member_problem mp on mp.member_id = m.id where mp.problem_id = :problemId order by mp.last_solved", nativeQuery = true)
//    List<String> findRecentNickNameByProblemId(@Param("problemId")int problemId);


//    List<Integer> findProlbm

//    default UUID findUUIDBySolveId(String solvedId) {
//        byte[] result = findMemberBySolveId(solvedId);
//        ByteBuffer byteBuffer = ByteBuffer.wrap(result);
//        long high = byteBuffer.getLong();
//        long low = byteBuffer.getLong();
//        return new UUID(high, low);
//    }

}
