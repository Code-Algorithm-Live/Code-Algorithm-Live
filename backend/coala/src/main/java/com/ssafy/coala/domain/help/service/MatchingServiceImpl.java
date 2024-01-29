package com.ssafy.coala.domain.help.service;

import com.ssafy.coala.domain.member.domain.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class MatchingServiceImpl implements MatchingService{

    @Autowired
    private RedisService redisService;

    @Override
    public void performMatching() {
        Set<Object> waitingUsers = redisService.getAllUsers();

        // Implement your matching logic here based on waitingUsers
        // ...

        // Example: Pair the first two users in the queue
        if (waitingUsers.size() >= 2) {
//            Member user1 = waitingUsers.get(0);
//            Member user2 = waitingUsers.get(1);

            // Perform matching logic here...

            // Remove matched users from the queue

        }
    }
}
