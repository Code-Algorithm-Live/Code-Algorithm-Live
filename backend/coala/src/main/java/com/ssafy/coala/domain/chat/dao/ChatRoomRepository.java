package com.ssafy.coala.domain.chat.dao;


import com.ssafy.coala.domain.chat.domain.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
}