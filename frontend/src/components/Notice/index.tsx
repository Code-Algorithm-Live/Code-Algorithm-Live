/* eslint-disable @typescript-eslint/no-misused-promises */

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
  align-items: center;

  font-family: Pretendard;
  font-size: 16px;
`;

const TabButton = styled.button`
  color: var(--point-color);
  font-weight: 700;
  padding: 0px 20px 10px 0px;
  border-bottom: 2px solid var(--point-color);
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

const DeleteButton = styled.button`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 60px;
  height: 30px;
  color: var(--white-color);
  background-color: var(--main-color);
  &:hover {
    background-color: var(--main-hover-color);
  }
  transition: background-color 0.3s ease;
`;

const Notice = () => {
  const { data: session } = useSession();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [noticeListData, setNoticeListData] = useState<NoticeForm[]>([]);

  const handleSelect = (id: number) => {
    setSelectedIds(prevSelectedIds => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter(selectedId => selectedId !== id);
      }
      return [...prevSelectedIds, id];
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/alarm/help/${session?.user.name}`,
        );
        if (response.data) {
          setNoticeListData(response.data as NoticeForm[]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData();
  }, []);

  const deleteNotice = async () => {
    try {
      const deletePromises = selectedIds.map(async id => {
        await instance.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/alarm/help/${id}`,
        );
      });

      await Promise.all(deletePromises);

      const updatedData = await instance.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/alarm/help/${session?.user.name}`,
      );
      if (updatedData.data) {
        setNoticeListData(updatedData.data as NoticeForm[]);
      }

      setSelectedIds([]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Container>
      <HeaderContainer>
        <Header>알림</Header>
        <NoticeCount>{noticeListData.length}</NoticeCount>
      </HeaderContainer>
      <TabContainer>
        <TabButton>전체 알림</TabButton>
        <TabLine />
        <DeleteButton onClick={deleteNotice}>삭제</DeleteButton>
      </TabContainer>
      {noticeListData && (
        <NoticeList
          noticeListData={noticeListData}
          onSelect={handleSelect}
          selectedIds={selectedIds}
        />
      )}
    </Container>
  );
};
export default Notice;
