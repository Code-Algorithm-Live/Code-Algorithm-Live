import { styled } from 'styled-components';
import Message from '@/components/Chat/Chatting/Message';
import MyMessage from '@/components/Chat/Chatting/MyMessage';
import QuestionBanner from './QuestionBanner';

const Container = styled.div`
  position: relative;
  height: 600px;
  width: 30%;
  min-width: 327px;
  background: var(--editorBlack, #282a36);

  overflow: hidden;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  min-width: 327px;
  height: 488px;
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

interface IMessageProps {
  messageProps: string[][];
  messageSender: string;
}

const QuestionChatting = ({ messageProps, messageSender }: IMessageProps) => {
  const sender = messageSender;
  return (
    <div>
      <Container>
        <QuestionBanner />
        <MessageContainer>
          {messageProps.map((message, index) => {
            let isFirst = false;
            if (
              index === 0 ||
              messageProps[index - 1][0] !== message[index][0]
            ) {
              isFirst = true;
            }
            if (sender === message[0]) {
              return (
                <MyMessage
                  key={index}
                  first={isFirst}
                  message={message[1]}
                  date=""
                />
              );
            }
            return (
              <Message
                key={index}
                first={isFirst}
                message={message[1]}
                date=""
              />
            );
          })}
        </MessageContainer>
      </Container>
    </div>
  );
};

export default QuestionChatting;
