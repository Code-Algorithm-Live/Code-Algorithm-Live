package com.ssafy.coala.domain.chat.dao;


import com.ssafy.coala.domain.chat.domain.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, UUID> {


    @Query("select c from chatRoom c where c.problemId =:problemId and c.isClose = true order by c.date desc")
    List<ChatRoom> findRoomByProblemId(@Param("problemId") Integer problemId);

    @Query("select c from chatRoom c where c.sender =:sender and c.isClose = true order by c.date desc")
    List<ChatRoom> findRoomBySender(@Param("sender") String sender);

    @Query("select c from chatRoom c where c.receiver =:receiver and c.isClose = true order by c.date desc")
    List<ChatRoom> findRoomByReceiver(@Param("receiver") String receiver);

    @Transactional
    @Modifying
    @Query("update chatRoom set isClose = true where roomId = :roomId")
    void updateIsCloseByRoomId(@Param("roomId") UUID roomId);

    @Transactional
    @Modifying
    @Query("update chatRoom set isClose = true where roomId in :roomIds")
    void updateIsCloseByRoomIds(@Param("roomIds")List <UUID> roomIds);

    @Query("select c.roomId from chatRoom c where c.isClose = false")
    List<UUID> findCloseRoomID();
}