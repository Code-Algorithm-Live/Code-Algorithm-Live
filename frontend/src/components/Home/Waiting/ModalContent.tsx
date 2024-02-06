import styled from 'styled-components';
import UserImage from '@/components/Home/Waiting/UserImage';

interface ModalContentProps {
  modalData: ModalData | null;
  userData: UserData;
}

interface UserData {
  nickname: string;
  memberExp: number;
  url: string;
}

interface ModalData {
  sender: {
    email: string;
    image: string;
    nickname: string;
    exp: number;
  };
  receiver: {
    email: string;
    image: string;
    nickname: string;
    exp: number;
  };
  helpDto: {
    num: number;
    title: string;
    content: string;
  };
  roomUuid: string;
}

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
  padding: 30px 0px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NameText = styled.span`
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 600;
  color: var(--main-font-color);
`;

const TitleContainer = styled.div`
  margin-bottom: 22px;
  height: 40px;
  width: 400px;
`;

const ContentsContainer = styled.div`
  width: 400px;
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

const ModalContent: React.FC<ModalContentProps> = ({ modalData, userData }) => {
  if (!modalData) {
    return null;
  }

  return (
    <Container>
      <UserContainer>
        <UserImage userData={userData} />
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
            <TitleDiv>{modalData.helpDto.content}</TitleDiv>
          </ContentsContainer>
        </FormContainer>
        <div>문제 번호에 맞는 폼 생성 예정 : {modalData.helpDto.num}</div>
      </MiddleContainer>
    </Container>
  );
};

export default ModalContent;