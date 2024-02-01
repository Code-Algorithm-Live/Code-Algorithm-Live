package com.ssafy.coala.domain.friend.application;

import com.ssafy.coala.domain.friend.dto.FriendDto;

public interface FriendService {
    void send(FriendDto friendDto);

    void accept(FriendDto friendDto);
}
