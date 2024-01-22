package com.ssafy.coala.domain.chat.utils;

public class RoomIdGenerator {
    private static Long id = 0L;

    public static Long createId() {
        id += 1;
        return id;
    }
}
