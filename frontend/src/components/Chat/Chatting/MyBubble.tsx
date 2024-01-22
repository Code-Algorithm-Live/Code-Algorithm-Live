import { styled } from 'styled-components';

const Bubble = styled.div`
  display: flex;
  padding: 10px 8px;

  width: fit-content;

  border-radius: 15px;

  background: #dce7fc;
  color: var(--main-font, #090909);
  font-size: 15px;
`;

const MyFirstBubble = styled(Bubble)`
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

const MyBubble = ({ first }: { first?: boolean }) => {
  return (
    <BubbleContainer>
      <Time>13:50</Time>
      {first && <MyFirstBubble>첫 시작 말풍선</MyFirstBubble>}
      {!first && (
        <Bubble>
          그럼 일단 페어프로그래밍 시작해서 코드 보면서 설명해 주실래요?!
        </Bubble>
      )}
    </BubbleContainer>
  );
};

export default MyBubble;
