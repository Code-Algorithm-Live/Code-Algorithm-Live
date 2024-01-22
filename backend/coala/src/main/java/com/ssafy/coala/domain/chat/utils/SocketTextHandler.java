package com.ssafy.coala.domain.chat.utils;

import com.ssafy.coala.domain.chat.dao.RoomRepository;
import com.ssafy.coala.domain.chat.domain.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashSet;
import java.util.Set;
@Configuration
//클라이언트가 전송한 텍스트 요청을 처리할 TextWebSocketHandler를 상속받은 socketTextHandler를 작성
public class SocketTextHandler extends TextWebSocketHandler {

    private final Set<WebSocketSession> sessions = new HashSet<>();
    @Autowired
    private RoomRepository roomRepository;

    // 채팅 세션 연결
    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        Long roomId = getRoomId(session);

        roomRepository.room(roomId).getSessions().add(session);

        System.out.println("새 클라이언트와 연결되었습니다.");
    }

    @Override
    protected void handleTextMessage(WebSocketSession session,
                                     TextMessage message) throws Exception {
        Long roomId = getRoomId(session);

        Room room = roomRepository.room(roomId);

        System.out.println(message.getPayload());

        for (WebSocketSession connectedSession : room.getSessions()) {
            connectedSession.sendMessage(message);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session,
                                      CloseStatus status) {
        Long roomId = getRoomId(session);

        roomRepository.room(roomId).getSessions().remove(session);

        System.out.println("특정 클라이언트와의 연결이 해제되었습니다.");
    }

    private Long getRoomId(WebSocketSession session) {
        return Long.parseLong(
                session.getAttributes()
                        .get("roomId")
                        .toString()
        );
    }

}
