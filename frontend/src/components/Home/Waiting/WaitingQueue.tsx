/* eslint-disable @typescript-eslint/no-floating-promises */
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { HelpForm } from '@/types/Help';
import { instance } from '@/api/instance';
import ConfirmModal from '@/components/Common/Modal/ConfirmModal';
import UserImage from '@/components/Home/Waiting/UserImage';
import ModalContent from '@/components/Home/Waiting/ModalContent';

interface WaitingQueueProps {
  activeTab: string;
}

const Container = styled.div`
  width: 1190px;
  height: 250px;
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
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 840px;
  gap: 3px;
`;

const NameText = styled.span`
  padding: 0px 20px 0px 20px;
  width: 130px;

  font-family: Pretendard;
  font-size: 17px;
  font-weight: 600;
  color: var(--main-font-color);
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

const WaitingQueue: React.FC<WaitingQueueProps> = ({ activeTab }) => {
  const { data: session, status } = useSession();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [modalData, setmodalData] = useState<HelpForm | null>(null);
  const [queueData, setQueueData] = useState<HelpForm[]>([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = session?.user?.jwtToken as string;
        const url =
          activeTab === 'tab1'
            ? '/help/waitqueue'
            : `/help/waitqueue/solvedlist?solvedId=${session?.user?.SolvedId}`;

        const Response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
          {
            method: 'GET',
            headers: {
              Authorization: token,
            },
          },
        );

        const responseData = (await Response.json()) as HelpForm[];
        setQueueData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (status === 'authenticated') {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchData();
    }
  }, [activeTab, session?.user?.jwtToken, session?.user?.SolvedId, status]);

  return (
    <Container>
      {queueData.map((queue, index) => (
        <ItemContainer
          key={index}
          onClick={() => {
            setIsConfirmModalOpen(true);
            setmodalData(queue);
          }}
        >
          <UserImage
            userData={{
              nickname: queue.sender.nickname,
              memberExp: queue.sender.exp,
              url: queue.sender.image,
            }}
          />
          <NameText>{queue.sender.nickname}</NameText>
          <TextContainer>
            <NumText>문제 번호 {queue.helpDto.num}</NumText>
            <TitleText>{queue.helpDto.title}</TitleText>
          </TextContainer>
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

export default WaitingQueue;
