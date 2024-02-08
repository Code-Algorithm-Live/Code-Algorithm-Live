/* eslint-disable @typescript-eslint/no-floating-promises */
import styled from 'styled-components';
import { format } from 'date-fns';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { NoticeForm } from '@/types/NoticeForm';
import { HelpForm } from '@/types/Help';
import { instance } from '@/api/instance';
import ConfirmModal from '@/components/Common/Modal/ConfirmModal';
import UserImage from '@/components/Home/Waiting/UserImage';
import ModalContent from '@/components/Home/Waiting/ModalContent';

interface NoticeListProps {
  noticeListData: NoticeForm[];
}

const Container = styled.div`
  width: 1370px;
  height: 500px;
  padding-top: 10px;
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

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  height: 80px;
  border-radius: 10px;
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--editorTypo-color);
  }
  cursor: pointer;
  gap: 10px;
`;

const TextContainer = styled.div`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  width: 1000px;
  gap: 3px;
`;

const NameText = styled.span`
  width: 130px;

  font-family: Pretendard;
  font-size: 17px;
  font-weight: 600;
  color: var(--main-font-color);
  text-align: center;
`;

const TitleText = styled.span`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  color: var(--main-font-color);
`;

const NumText = styled.span`
  display: contents;
  font-family: Pretendard;
  font-size: 13px;
  font-weight: 400;
  color: var(--sub-font-color);
`;

const DateContainer = styled.p`
  display: flex;
  flex-direction: column;
  text-align: end;

  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  color: var(--sub-font-color);
`;

const NoticeList: React.FC<NoticeListProps> = ({ noticeListData }) => {
  const { data: session } = useSession();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [modalData, setmodalData] = useState<NoticeForm>();
  const handleConfirm = async () => {
    try {
      if (modalData) {
        const bodyData = {
          sender: {
            email: modalData.sender.email,
            image: modalData.sender.image,
            kakaoname: modalData.sender.kakaoname,
            nickname: modalData.sender.nickname,
            exp: modalData.sender.exp,
            solvedId: modalData.sender.solvedId,
          },
          receiver: {
            email: session?.user.email,
            image: session?.user.image,
            kakaoname: session?.user.kakaoName,
            nickname: session?.user.name,
            exp: session?.user.userExp,
            solvedId: session?.user.SolvedId,
          },
          helpDto: {
            num: modalData.helpDto.num,
            title: modalData.helpDto.title,
            content: modalData.helpDto.content,
          },
          roomUuid: modalData.roomUuid,
          success: true,
        };

        await instance.post<HelpForm>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/help/accept`,
          bodyData,
        );
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Container>
      {noticeListData.map((notice, index) => (
        <ItemContainer
          key={index}
          onClick={() => {
            setIsConfirmModalOpen(true);
            setmodalData(notice);
          }}
        >
          <UserImage
            userData={{
              nickname: notice.sender.nickname,
              memberExp: notice.sender.exp,
              url: notice.sender.image,
            }}
          />
          <NameText>{notice.sender.nickname}</NameText>
          <TextContainer>
            <NumText>문제 번호 {notice.helpDto.num}</NumText>
            <TitleText>{notice.helpDto.title}</TitleText>
          </TextContainer>
          <DateContainer>
            <span>{format(new Date(notice.sendDate), 'yyyy-MM-dd')}</span>
            <span>{format(new Date(notice.sendDate), 'HH:mm:ss')}</span>
          </DateContainer>
        </ItemContainer>
      ))}
      <ConfirmModal
        open={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => {
          handleConfirm();
          setIsConfirmModalOpen(false);
        }}
      >
        <ModalContent modalData={modalData} />
      </ConfirmModal>
    </Container>
  );
};

export default NoticeList;
