import styled from 'styled-components';

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

const ModalContent: React.FC<ModalContentProps> = ({ modalData }) => {
  if (!modalData) {
    return null;
  }

  return (
    <Container>
      <UserContainer>
        <UserImage
          userData={{
            nickname: modalData.sender.nickname,
            memberExp: modalData.sender.exp,
            url: modalData.sender.image,
          }}
        />
        <NameText>{modalData.sender.nickname}</NameText>
      </UserContainer>
      <MiddleContainer>
        <FormContainer>
          <TitleContainer>
            <Label>
              <label>제목</label>
            </Label>
            <TitleDiv>{modalData.helpDto.title}</TitleDiv>
          </TitleContainer>
          <ContentsContainer>
            <Label>
              <label>상세 내용</label>
            </Label>
            <TitleDiv
              dangerouslySetInnerHTML={{ __html: modalData.helpDto.content }}
            />
          </ContentsContainer>
        </FormContainer>
        <LinkPreview problemNumber={modalData.helpDto.num} loading={false} />
      </MiddleContainer>
    </Container>
  );
};

export default ModalContent;
