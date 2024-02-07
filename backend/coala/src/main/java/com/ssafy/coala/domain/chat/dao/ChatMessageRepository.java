package com.ssafy.coala.domain.chat.dao;

import com.ssafy.coala.domain.chat.domain.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    @Query("select c from ChatMessage c where c.chatRoom = :roomId")
    List<ChatMessage> findByRoomId(@Param("roomId") UUID roomId);
}
