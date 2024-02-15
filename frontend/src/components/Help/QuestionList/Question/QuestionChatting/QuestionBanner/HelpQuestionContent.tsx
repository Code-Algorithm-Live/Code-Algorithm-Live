import styled from 'styled-components';
import useHistoryProblemStore from '@/store/historyProblem';
import LinkPreview from '@/components/Help/Wait/LinkPreview';
import UserImage from '@/components/Home/Waiting/UserImage';
import { ModalContentProps } from '@/components/Home/Waiting/type';

const Container = styled.div`
  width: 800px;
  height: 400px;
  padding: 0px 30px;
`;

const MiddleContainer = styled.div`
  display: flex;
`;

const FormContainer = styled.div`
  width: 400px;
  height: 300px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  padding-bottom: 20px;
`;

const NameText = styled.span`
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 600;
  color: var(--main-font-color);
`;

const TitleContainer = styled.div`
  margin-bottom: 30px;
  height: 40px;
  width: 350px;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ContentsContainer = styled.div`
  width: 350px;
  height: 200px;
`;

const Label = styled.span`
  font-family: Pretendard;
  font-size: 14px;
  height: 24px;
  color: var(--textInput-sort-color);
`;

const TitleDiv = styled.div`
  background-color: var(--textInput-background-color);
  font-family: Pretendard;
  font-size: 16px;
  border-radius: 4px;
  padding: 12px;
  height: 100%;
`;

const HelpQuestionContent: React.FC<ModalContentProps> = () => {
  const {
    zustandHistorySender,
    zustandHistoryNumber,
    zustandHistoryContent,
    zustandHistoryTitle,
  } = useHistoryProblemStore();
  return (
    <Container>
      <UserContainer>
        <UserImage
          userData={{
            nickname: zustandHistorySender,
            memberExp: 0,
            url: 'http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg',
          }}
        />
        <NameText>{zustandHistorySender}</NameText>
      </UserContainer>
      <MiddleContainer>
        <FormContainer>
          <TitleContainer>
            <Label>
              <label>제목</label>
            </Label>
            <TitleDiv>{zustandHistoryTitle}</TitleDiv>
          </TitleContainer>
          <ContentsContainer>
            <Label>
              <label>상세 내용</label>
            </Label>
            <TitleDiv
              dangerouslySetInnerHTML={{ __html: zustandHistoryContent }}
            />
          </ContentsContainer>
        </FormContainer>
        <LinkPreview problemNumber={zustandHistoryNumber} loading={false} />
      </MiddleContainer>
    </Container>
  );
};

export default HelpQuestionContent;
