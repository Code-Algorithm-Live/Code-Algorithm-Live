package com.ssafy.coala.domain.chat.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
@Slf4j
public class StompHandler implements ChannelInterceptor {

//    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message); // 헤더의 세션 정보 가져옴?
        if(accessor.getCommand() == StompCommand.CONNECT) {
//            if(!jwtTokenProvider.validateToken(accessor.getFirstNativeHeader("token")))
//                try {
//                    throw new AccessDeniedException("");
//                } catch (AccessDeniedException e) {
//                    e.printStackTrace();
//                }
//            List<String> authorization = accessor.getNativeHeader("Authorization");
//            System.out.println(authorization);

        }

        return message;
    }

}
