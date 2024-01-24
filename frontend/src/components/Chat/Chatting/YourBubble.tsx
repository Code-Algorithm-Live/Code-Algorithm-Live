import { styled } from 'styled-components';

const BubbleContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

const Bubble = styled.div`
  display: flex;
  padding: 10px 8px;

  width: fit-content;

  border-radius: 15px;
  background: var(--main-color, #5471a5);

  color: var(--editorTypo-color, #f5f5f5);
  font-size: 15px;
`;

const FirstBubble = styled(Bubble)`
  border-radius: 15px 15px 15px 0px;
`;

const Time = styled.span`
  color: var(--editorTypo, #e2e1e1);
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const YourBubble = ({ first }: { first?: boolean }) => {
  return (
    <BubbleContainer>
      {first && <FirstBubble>첫 시작 말풍선</FirstBubble>}
      {!first && (
        <Bubble>
          그럼 일단 페어프로그래밍 시작해서 코드 보면서 설명해 주실래요?!
        </Bubble>
      )}
      <Time>13:50</Time>
    </BubbleContainer>
  );
};

export default YourBubble;
