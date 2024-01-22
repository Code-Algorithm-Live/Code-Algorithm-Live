import { styled } from 'styled-components';

const Bubbles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Bubble = styled.div`
  display: flex;
  padding: 10px 8px;

  width: fit-content;

  border-radius: 15px;

  background: #dce7fc;
  color: var(--main-font, #090909);
  font-size: 15px;
`;

const FirstBubble = styled(Bubble)`
  border-radius: 16px 16px 0px 16px;
`;

const BubbleContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 8px;
`;

const Time = styled.span`
  color: var(--editorTypo, #e2e1e1);
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const MyBubble = ({
  first,
  message,
  date,
}: {
  first?: boolean;
  message: string;
  date: string;
}) => {
  const BubbleStyle = first ? FirstBubble : Bubble;

  return (
    <Bubbles>
      <BubbleContainer>
        <Time>{date}</Time>
        <BubbleStyle>{message}</BubbleStyle>
      </BubbleContainer>
    </Bubbles>
  );
};

export default MyBubble;
