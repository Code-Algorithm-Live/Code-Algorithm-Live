'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { styled } from 'styled-components';
import { Client } from '@stomp/stompjs';
import Message from '@/components/Chat/Chatting/Message';
import MyMessage from '@/components/Chat/Chatting/MyMessage';
import Input, { INPUT_HEIGHT } from '@/components/Chat/Chatting/Input';

const Container = styled.div`
  position: relative;
  height: 100dvh;

  background: var(--editorBlack, #282a36);
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  min-width: 327px;
  height: calc(100dvh - ${INPUT_HEIGHT});
  padding: 7px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--editorSub, #343746);
  }
  &::-webkit-scrollbar-track {
    background: var(--editorBlack, #282a36);
  }
`;

const mockMessages = [
  { chatRoomId: 5, type: '안녕하세요~~', sender: 'me', date: '2024/01/22' },
  {
    chatRoomId: 5,
    type: '안녕하세요!!',
    sender: 'hamster',
    date: '2024/01/22',
  },
  {
    chatRoomId: 5,
    type: '시작해볼까요',
    sender: 'hamster',
    date: '2024/01/22',
  },
  { chatRoomId: 5, type: '넵', sender: 'me', date: '2024/01/22' },
  { chatRoomId: 5, type: '후비고~', sender: 'me', date: '2024/01/22' },
];

interface TMessage {
  chatRoomId: string;
  type: string;
  sender: string;
  date: string;
}

const BASE_URL = 'ws://localhost:8080';
const brokerURL = `${BASE_URL}/ws/chat`;
const userId = Math.random().toString();
const roomId = 2;
const enterDestination = `/pub/chat/${roomId}`; // 채팅방 참가
const subDestination = `/sub/channel/${roomId}`; // 채팅방 구독
const pubDestination = `/sub/channel/${roomId}`;  // 채팅방 메세지 전송

const Chatting = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<TMessage[]>([]);

  const client = useRef(new Client({ brokerURL }));

  const connect = () => {
    client.current.onConnect = () => {
      /** roomId에 참가합니다. */
      client.current.publish({
        destination: enterDestination,
        body: JSON.stringify({
          type: 'ENTER',
          roomId,
          sender: userId,
        }),
      });
      /** roomId 구독를 구독합니다.  */
      client.current.subscribe(subDestination, message => {
        console.log('메시지용', message);
      });
    };

    client.current.activate();
  };

  const onMessageReceived = (message: string) => {
    setMessages(prev => [
      ...prev,
      {
        chatRoomId: roomId.toString(),
        sender: userId,
        type: message,
        date: '',
      },
    ]);
  };

  const sendMessage = (message: string) => {
    if (!message) return;

    onMessageReceived(message);
    client.current.publish({
      destination: pubDestination,
      body: JSON.stringify({
        type: 'TALK',
        roomId,
        sender: userId,
        message,
      }),
    });
  };

  const disconnect = () => {};

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    return () => disconnect();
  });

  const handleSubmit = () => {
    const message = input || '';
    sendMessage(message);
    setInput('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
  };

  return (
    <Container>
      <MessageContainer>
        {messages.map(({ type, sender, date }, idx) => {
          const isCurrentUser = userId === sender;
          const isFirst = idx > 0 && sender !== messages[idx - 1].sender;

          const MessageComponent = isCurrentUser ? MyMessage : Message;

          return (
            <MessageComponent
              key={date + type}
              first={isFirst}
              message={type}
              date={date}
            />
          );
        })}
      </MessageContainer>

      <Input value={input} onChange={handleChange} onSubmit={handleSubmit} />
    </Container>
  );
};

export default Chatting;