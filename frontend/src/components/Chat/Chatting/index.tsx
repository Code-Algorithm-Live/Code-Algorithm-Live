'use client';

import { useEffect, useRef, useState } from 'react';

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

const BASE_URL = 'ws://localhost:8080';
const brokerURL = `${BASE_URL}/ws/chat`;

const Chatting = () => {
  const roomId = 2;
  const userId = 'me';
  const [input, setInput] = useState('');

  const client = useRef(new Client({ brokerURL }));

  const connect = () => {
    console.log('connection 시작 ');

    // const destination = `${BASE_URL}/sub/channel/${roomId}`;
    const destination = `/sub/channel/${roomId}`;

    // "type" : "ENTER",     "roomId" : 2,     "sender" : "차승윤"
    // roomId 구독
    client.current.onConnect = () => {
      console.log(destination);
      client.current.subscribe(destination, message => {
        console.log('메시지용');
        console.log(message);
      });
    };

    client.current.activate();
  };

  const sendMessage = (message: string) => {
    if (!message) return;

    console.log('message 전송');

    // const destination = `${BASE_URL}/pub/chat/${roomId}/message`;
    const destination = `/pub/chat/${roomId}/message`;
    console.log(message, destination);
    client.current.publish({
      destination,
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

  const [messages] = useState(mockMessages);

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
