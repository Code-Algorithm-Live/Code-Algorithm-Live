package com.ssafy.coala.domain.chat.dao;

import com.ssafy.coala.domain.chat.domain.CodeHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface CodeHistoryRepository extends JpaRepository <CodeHistory, Long> {
    @Query("select c from CodeHistory c where roomId = :roomId")
    List<CodeHistory> findByRoomId(UUID roomId);
}
