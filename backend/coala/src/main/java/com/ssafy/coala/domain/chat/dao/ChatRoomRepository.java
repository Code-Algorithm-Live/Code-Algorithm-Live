package com.ssafy.coala.domain.chat.dao;


import com.ssafy.coala.domain.chat.domain.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, UUID> {


    @Query("select c from chatRoom c where c.problemId =:problemId and c.isClose = true order by c.date desc")
    List<ChatRoom> findRoomByProblemId(@Param("problemId") Integer problemId);

}