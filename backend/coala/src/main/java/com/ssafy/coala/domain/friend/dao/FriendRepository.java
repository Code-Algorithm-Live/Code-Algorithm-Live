package com.ssafy.coala.domain.friend.dao;

import com.ssafy.coala.domain.friend.domain.Friend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendRepository extends JpaRepository<Friend, Long> {
}
