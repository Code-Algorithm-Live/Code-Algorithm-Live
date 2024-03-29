'use client';

import { Client } from '@stomp/stompjs';
import { useParams } from 'next/navigation';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { styled } from 'styled-components';
import Input from '@/components/Chat/Chatting/Input';
import Message from '@/components/Chat/Chatting/Message';
import MyMessage from '@/components/Chat/Chatting/MyMessage';
import { generateUUID } from '@/utils/uuid';

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
  height: calc(100% - 80px); // 채팅 입력창 만큼 높이를 조정
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

enum MessageType {
  ENTER = 'ENTER',
  TALK = 'TALK',
}

interface IMessage {
  chatId: string;
  type: MessageType;
  sender: string;
  message: string;
  date: string;
}

const brokerURL = process.env.NEXT_PUBLIC_BROKER_URL;
const userId = Math.random().toString();

/**
 * {hour}:{minutes}로 포맷팅합니다.
 */
const getHourMinutes = (timeStamp: Date) => {
  return `${timeStamp.getHours()}:${timeStamp.getMinutes()}`;
};

// eslint-disable-next-line react/display-name
const Chatting = forwardRef((_, ref) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { roomId } = useParams<{ roomId: string }>();

  const enterDestination = `/pub/chat/${roomId}`; // 채팅방 참가
  const subDestination = `/sub/channel/${roomId}`; // 채팅방 구독
  const pubDestination = `/sub/channel/${roomId}`; // 채팅방 메세지 전송
  const storeDestination = `/pub/chat/message`;
  const exitDestination = `/pub/chat/exit`;
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /**
     * 채팅방 스크롤바를 항상 하단으로 고정
     */
    const scrollToBottom = () => {
      if (!messageContainerRef.current) return;
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    };

    scrollToBottom();
  }, [messages]);

  /** 메세지를 수신했을 때 호출 */
  const onMessageReceived = ({ message, type, sender }: IMessage) => {
    const msgTime = getHourMinutes(new Date());
    const chatId = generateUUID();
    setMessages(prev => [
      ...prev,
      {
        chatId,
        sender,
        type,
        message,
        date: msgTime,
      },
    ]);
  };

  const client = useRef(
    new Client({
      brokerURL,
      onConnect: () => {
        /** roomId에 참가합니다. */
        client.current.publish({
          destination: enterDestination,
          body: JSON.stringify({
            type: MessageType.ENTER,
            roomId,
            sender: userId,
          }),
        });
        /** roomId를 구독합니다.  */
        client.current.subscribe(subDestination, msg => {
          const message = JSON.parse(msg.body) as IMessage;
          onMessageReceived(message);
        });
      },
    }),
  );

  const exitRoom = () => {
    client.current.publish({
      destination: exitDestination,
      body: JSON.stringify({
        roomId,
        sender: userId,
      }),
    });
  };
  useImperativeHandle(ref, () => ({
    closeChat: exitRoom,
  }));

  const sendMessage = (message: string) => {
    if (!message) return;

    client.current.publish({
      destination: pubDestination,
      body: JSON.stringify({
        type: MessageType.TALK,
        roomId,
        sender: userId,
        message,
      }),
    });

    client.current.publish({
      destination: storeDestination,
      body: JSON.stringify({
        type: MessageType.TALK,
        roomId,
        sender: userId,
        message,
      }),
    });
  };

  useEffect(() => {
    client.current.activate();
  }, []);

  useEffect(() => {
    const disconnect = () => {
      // FIXME 채팅방 종료가 되는지 확인
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      client.current.deactivate();
    };
    return () => disconnect();
  }, []);

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
      <MessageContainer ref={messageContainerRef}>
        {messages.map(({ chatId, type, sender, date, message }, idx) => {
          if (type !== MessageType.TALK) return <></>;

          const isCurrentUser = userId === sender;
          const isFirst = idx > 0 && sender !== messages[idx - 1].sender;

          const MessageComponent = isCurrentUser ? MyMessage : Message;

          return (
            <MessageComponent
              key={chatId}
              first={isFirst}
              message={message}
              date={date}
            />
          );
        })}
      </MessageContainer>

      <Input value={input} onChange={handleChange} onSubmit={handleSubmit} />
    </Container>
  );
});

export default Chatting;
