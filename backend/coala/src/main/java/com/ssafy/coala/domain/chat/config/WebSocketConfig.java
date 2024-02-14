package com.ssafy.coala.domain.chat.config;

import com.ssafy.coala.domain.chat.handler.StompHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer { // Spring 웹 서버에서 WebSocket을 사용하도록 Configuration을 추가해주는 작업을 진행했다.

    private final StompHandler stompHandler;
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        System.out.println("ChatConfig");
        registry.addEndpoint("/ws/chat").setAllowedOriginPatterns("*");
        // .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 메시지를 발행하는 요청 url -> 메시지를 보낼 때
        registry.setApplicationDestinationPrefixes("/pub"); // 구독자 -> 서버(메세지보낼때)
        // 메시지를 구독하는 요청 url -> 메시지를 받을 때
        registry.enableSimpleBroker("/sub"); // 브로커 -> 구독자들(메세지받을때)
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        System.out.println("Chat Interceptor start");
        registration.interceptors(stompHandler);
        System.out.println("Chat Interceptor end...");
    }
}