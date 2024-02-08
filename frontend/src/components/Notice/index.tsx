'use client';

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { instance } from '@/api/instance';
import NoticeList from '@/components/Notice/NoticeList';
import { NoticeForm } from '@/types/NoticeForm';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 48px);
  flex-direction: column;
  padding: 70px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding-bottom: 20px;
`;

const Header = styled.span`
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
`;

const NoticeCount = styled.span`
  padding: 5px 10px;
  border-radius: 8px;
  font-family: Pretendard;
  background-color: var(--important-color);
  color: var(--white-color);
`;

const TabContainer = styled.div`
  display: flex;
  width: 1370px;
  position: relative;

  font-family: Pretendard;
  font-size: 16px;
`;

const TabButton = styled.button`
  color: var(--point-color);
  font-weight: 700;
  padding: 10px 30px 15px 0px;
  cursor: pointer;
  border-bottom: 2px solid var(--point-color);

  &:hover {
    color: var(--point-color);
  }
  z-index: 1;
`;

const TabLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 1370px;
  height: 2px;
  background-color: var(--editorTypo-color);
`;

const Notice = () => {
  const { data: session } = useSession();
  // const [noticeListData, setNoticeListData] = useState<
  //   NoticeForm[] | undefined
  // >();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await instance.get(
  //         `${process.env.NEXT_PUBLIC_BASE_URL}/alarm/help/${session?.user.name}`,
  //       );
  //       if (response.data) {
  //         setNoticeListData(response.data as NoticeForm[]);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   // eslint-disable-next-line @typescript-eslint/no-floating-promises
  //   fetchData();
  // }, []);
  const noticeListData = [
    {
      id: 152,
      sender: {
        email: 'jaejin@naver.com',
        image: '/images/userModal/Help.png',
        kakaoname: 'adsasd',
        nickname: '나는이재진',
        exp: 0,
        solvedId: 'wowhd45',
      },
      receiver: null,
      helpDto: {
        num: 1001,
        title: '도와주세요2222',
        content: '살려주세요333333ㅜㅜㅜㅜ',
      },
      sendDate: '2024-02-06T11:07:41.061076',
      roomUuid: '12309321823890',
      success: false,
    },
    {
      id: 152,
      sender: {
        email: 'jaejin@naver.com',
        image: '/images/userModal/Help.png',
        kakaoname: 'adsasd',
        nickname: '나는이재진',
        exp: 0,
        solvedId: 'wowhd45',
      },
      receiver: null,
      helpDto: {
        num: 1001,
        title: '도와주세요2222',
        content: '살려주세요333333ㅜㅜㅜㅜ',
      },
      sendDate: '2024-02-06T11:07:41.061076',
      roomUuid: '12309321823890',
      success: false,
    },
    {
      id: 152,
      sender: {
        email: 'jaejin@naver.com',
        image: '/images/userModal/Help.png',
        kakaoname: 'adsasd',
        nickname: '나는이재진',
        exp: 0,
        solvedId: 'wowhd45',
      },
      receiver: null,
      helpDto: {
        num: 1001,
        title: '도와주세요2222',
        content: '살려주세요333333ㅜㅜㅜㅜ',
      },
      sendDate: '2024-02-06T11:07:41.061076',
      roomUuid: '12309321823890',
      success: false,
    },
    {
      id: 152,
      sender: {
        email: 'jaejin@naver.com',
        image: '/images/userModal/Help.png',
        kakaoname: 'adsasd',
        nickname: '나는이재진',
        exp: 0,
        solvedId: 'wowhd45',
      },
      receiver: null,
      helpDto: {
        num: 1001,
        title: '도와주세요2222',
        content: '살려주세요333333ㅜㅜㅜㅜ',
      },
      sendDate: '2024-02-06T11:07:41.061076',
      roomUuid: '12309321823890',
      success: false,
    },
    {
      id: 152,
      sender: {
        email: 'jaejin@naver.com',
        image: '/images/userModal/Help.png',
        kakaoname: 'adsasd',
        nickname: '나는이재진',
        exp: 0,
        solvedId: 'wowhd45',
      },
      receiver: null,
      helpDto: {
        num: 1001,
        title: '도와주세요2222',
        content: '살려주세요333333ㅜㅜㅜㅜ',
      },
      sendDate: '2024-02-06T11:07:41.061076',
      roomUuid: '12309321823890',
      success: false,
    },
    {
      id: 152,
      sender: {
        email: 'jaejin@naver.com',
        image: '/images/userModal/Help.png',
        kakaoname: 'adsasd',
        nickname: '나는이재진',
        exp: 0,
        solvedId: 'wowhd45',
      },
      receiver: null,
      helpDto: {
        num: 1001,
        title: '도와주세요2222',
        content: '살려주세요333333ㅜㅜㅜㅜ',
      },
      sendDate: '2024-02-06T11:07:41.061076',
      roomUuid: '12309321823890',
      success: false,
    },
    {
      id: 152,
      sender: {
        email: 'jaejin@naver.com',
        image: '/images/userModal/Help.png',
        kakaoname: 'adsasd',
        nickname: '나는이재진',
        exp: 0,
        solvedId: 'wowhd45',
      },
      receiver: null,
      helpDto: {
        num: 1001,
        title: '도와주세요2222',
        content: '살려주세요333333ㅜㅜㅜㅜ',
      },
      sendDate: '2024-02-06T11:07:41.061076',
      roomUuid: '12309321823890',
      success: false,
    },
    {
      id: 152,
      sender: {
        email: 'jaejin@naver.com',
        image: '/images/userModal/Help.png',
        kakaoname: 'adsasd',
        nickname: '나는이재진',
        exp: 0,
        solvedId: 'wowhd45',
      },
      receiver: null,
      helpDto: {
        num: 1001,
        title: '도와주세요2222',
        content: '살려주세요333333ㅜㅜㅜㅜ',
      },
      sendDate: '2024-02-06T11:07:41.061076',
      roomUuid: '12309321823890',
      success: false,
    },
    {
      id: 152,
      sender: {
        email: 'jaejin@naver.com',
        image: '/images/userModal/Help.png',
        kakaoname: 'adsasd',
        nickname: '나는이재진',
        exp: 0,
        solvedId: 'wowhd45',
      },
      receiver: null,
      helpDto: {
        num: 1001,
        title: '도와주세요2222',
        content: '살려주세요333333ㅜㅜㅜㅜ',
      },
      sendDate: '2024-02-06T11:07:41.061076',
      roomUuid: '12309321823890',
      success: false,
    },
  ];
  return (
    <Container>
      <HeaderContainer>
        <Header>알림</Header>
        <NoticeCount>{noticeListData.length}</NoticeCount>
      </HeaderContainer>
      <TabContainer>
        <TabButton>전체 알림</TabButton>
        <TabLine />
      </TabContainer>
      {noticeListData && <NoticeList noticeListData={noticeListData} />}
    </Container>
  );
};
export default Notice;
