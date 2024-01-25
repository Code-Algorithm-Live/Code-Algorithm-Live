package com.ssafy.coala.domain.chat.handler;

import com.ssafy.coala.domain.member.jwt.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
@Slf4j
@Order(Ordered.HIGHEST_PRECEDENCE)
public class StompHandler implements ChannelInterceptor {

//    private final JwtTokenProvider jwtTokenProvider;
    private final JWTUtil jwtUtil;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        System.out.println("StompHandler Aceess");
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message); // 헤더의 세션 정보 가져옴?
        System.out.println("StompHandler Aceess");
        if(accessor.getCommand() == StompCommand.CONNECT) {
            System.out.println("startStomp...");
        }

        return message;
    }

}
