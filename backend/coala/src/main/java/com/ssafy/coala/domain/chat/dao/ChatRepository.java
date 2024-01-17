package com.ssafy.coala.domain.chat.dao;

import com.ssafy.coala.domain.chat.domain.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<ChatMessage, Long> {
}
