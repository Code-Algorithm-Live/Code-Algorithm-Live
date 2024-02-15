import { styled } from 'styled-components';
import Message from '@/components/Chat/Chatting/Message';
import MyMessage from '@/components/Chat/Chatting/MyMessage';
// import MyBubble from '@/components/Chat/Chatting/MyMessage';

const Container = styled.div`
  position: relative;
  height: 550px;
  width: 30%;
  min-width: 327px;
  background: var(--editorBlack, #282a36);
  overflow: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--editorTypo-color);
    border-radius: 10px;
    background-clip: padding-box;
    border: 3px solid transparent;
  }
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

interface IMessageProps {
  messageProps: string[][];
  messageSender: string;
  messageSelect: (index: number) => void;
}

const QuestionChatting = ({
  messageProps,
  messageSender,
  messageSelect,
}: IMessageProps) => {
  const sender = messageSender;
  const handleMessageSelect = (index: number) => {
    messageSelect(index);
  };

  return (
    <div>
      <Container>
        <MessageContainer>
          {messageProps.map((message, index) => {
            let isFirst = false;
            if (index === 0 || messageProps[index - 1][0] !== message[0]) {
              isFirst = true;
            }
            if (sender === message[0]) {
              return (
                <div key={index} onClick={() => handleMessageSelect(index)}>
                  <MyMessage first={isFirst} message={message[1]} date="" />
                </div>
              );
            }
            return (
              <div key={index} onClick={() => handleMessageSelect(index)}>
                <Message first={isFirst} message={message[1]} date="" />
              </div>
            );
          })}
        </MessageContainer>
      </Container>
    </div>
  );
};

export default QuestionChatting;
