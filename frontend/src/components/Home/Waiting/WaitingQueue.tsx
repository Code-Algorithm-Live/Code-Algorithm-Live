import styled from 'styled-components';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import ConfirmModal from '@/components/Common/Modal/ConfirmModal';
import UserImage from '@/components/Home/Waiting/UserImage';
import ModalContent from '@/components/Home/Waiting/ModalContent';

interface WaitingQueueProps {
  activeTab: string;
}

interface QueueItem {
  sender: {
    email: string;
    image: string;
    nickname: string;
    exp: number;
    kakaoname: string;
    solvedId: string;
  };
  receiver: {
    email: string;
    image: string;
    nickname: string;
    exp: number;
    kakaoname: string;
    solvedId: string;
  };
  helpDto: {
    num: number;
    title: string;
    content: string;
  };
  roomUuid: string;
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
    background: var(--main-color);
    border-radius: 10px;
    background-clip: padding-box;
    border: 3px solid transparent;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
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

const CompletedContainer = styled.div`
  display: flex;
  align-items: centerl;
  gap: 10px;
`;

const Completed = styled.span`
  width: 80px;
  height: 23px;
  border-radius: 5px;
  background-color: var(--point-color);

  font-family: Pretendard;
  font-size: 14px;
  font-weight: 300;
  color: var(--white-color);

  text-align: center;
  line-height: 23px;
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
  const [modalData, setmodalData] = useState<QueueItem | null>(null);

  const handleConfirm = () => console.log('confirm!!');

  // 임시 데이터
  // const queueData = [
  //   {
  //     sender: {
  //       email: 'sender',
  //       image: 'test',
  //       nickname: '박진아',
  //       exp: 15,
  //     },
  //     receiver: {
  //       email: 'receiver',
  //       image: 'test',
  //       nickname: '처우열',
  //       exp: 15,
  //     },
  //     helpDto: {
  //       num: 1001,
  //       title: '도와주세요2222',
  //       content: '살려주세요333333ㅜㅜㅜㅜ',
  //     },
  //     roomUuid: '4ec4f19c-2c4d-496a-bc0c-7dd8c5ac5956',
  //   },
  //   {
  //     sender: {
  //       email: 'sender',
  //       image: 'test',
  //       nickname: '거고고',
  //       exp: 15,
  //     },
  //     receiver: {
  //       email: 'receiver',
  //       image: 'test',
  //       nickname: '기기기',
  //       exp: 15,
  //     },
  //     helpDto: {
  //       num: 1001,
  //       title: '도와주세요2222',
  //       content: '살려주세요333333ㅜㅜㅜㅜ',
  //     },
  //     roomUuid: '4ec4f19c-2c4d-496a-bc0c-7dd8c5ac5956',
  //   },
  //   {
  //     sender: {
  //       email: 'sender',
  //       image: 'test',
  //       nickname: 'ㅁㄴㅇㄴㅁㅇ',
  //       exp: 15,
  //     },
  //     receiver: {
  //       email: 'receiver',
  //       image: 'test',
  //       nickname: 'ㅇㅁㄴㅇㄴ',
  //       exp: 15,
  //     },
  //     helpDto: {
  //       num: 1001,
  //       title: '도와주세요2222',
  //       content: '살려주세요333333ㅜㅜㅜㅜ',
  //     },
  //     roomUuid: '4ec4f19c-2c4d-496a-bc0c-7dd8c5ac5956',
  //   },
  //   {
  //     sender: {
  //       email: 'sender',
  //       image: 'test',
  //       nickname: '하하',
  //       exp: 15,
  //     },
  //     receiver: {
  //       email: 'receiver',
  //       image: 'test',
  //       nickname: 'ㅁㅁ',
  //       exp: 15,
  //     },
  //     helpDto: {
  //       num: 1001,
  //       title: '도와주세요2222',
  //       content: '살려주세요333333ㅜㅜㅜㅜ',
  //     },
  //     roomUuid: '4ec4f19c-2c4d-496a-bc0c-7dd8c5ac5956',
  //   },
  // ];
  // const userData = {
  //   nickname: '알라코1',
  //   memberExp: 15,
  //   url: '/images/coala/smile.png',
  // };

  const [queueData, setQueueData] = useState<QueueItem[]>([]);

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

        const responseData: unknown = await Response.json();
        console.log(responseData);

        setQueueData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (status === 'authenticated') {
      fetchData();
    }
  }, [activeTab]);

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
            <CompletedContainer>
              <NumText>문제 번호 {queue.helpDto.num}</NumText>
              {activeTab !== 'tab1' && <Completed>내가 푼 문제</Completed>}
            </CompletedContainer>
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
