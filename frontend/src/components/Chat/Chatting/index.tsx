'use client';

import { useState } from 'react';

import { styled } from 'styled-components';
import Message from '@/components/Chat/Chatting/Message';
import MyMessage from '@/components/Chat/Chatting/MyMessage';
import Input from '@/components/Chat/Chatting/Input';

const Container = styled.div`
  position: relative;
  height: 100%;
  background: var(--editorBlack, #282a36);
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  min-width: 327px;
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

const Chatting = () => {
  const [messages] = useState(mockMessages);
  const userId = 'me';

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

      <Input onSubmit={() => {}} />
    </Container>
  );
};

export default Chatting;
