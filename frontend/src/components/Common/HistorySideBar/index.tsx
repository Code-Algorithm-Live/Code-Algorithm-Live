'use client';

import styled from 'styled-components';
import { SetStateAction, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { instance } from '@/api/instance';
import List from '@/components/Common/HistorySideBar/List';
import Button from '@/components/Common/HistorySideBar/Button';
import Select from '@/components/Common/HistorySideBar/Select';

interface HistoryData {
  roomId: string;
  sender: null;
  title: string;
  problemId: number;
  date: string;
}

const SidebarContainer = styled.div`
  padding: 20px 20px 20px 10px;
  display: flex;
  flex-direction: column;
  min-width: 244px;
  height: calc(100vh - 48px);
  border-right: 2px solid var(--main-color);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  background-color: var(--white-color);
  gap: 25px;
`;

const Sidebar = () => {
  const { data: session } = useSession();
  const [selectedHistory, setSelectedHistory] = useState<string>('question');
  const [qHistory, setQHistory] = useState<HistoryData[]>([]);
  const [aHistory, setAHistory] = useState<HistoryData[]>([]);

  const changeHistory = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedHistory(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let endpoint;
        let setHistory;

        if (selectedHistory === 'question') {
          endpoint = `/chat/history/sender/${session?.user.email}`;
          setHistory = setQHistory;
        } else {
          endpoint = `/chat/history/receiver/${session?.user.email}`;
          setHistory = setAHistory;
        }

        const response = await instance.get<HistoryData[]>(
          `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`,
        );
        if (response.data) {
          setHistory(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData();
  }, [selectedHistory]);

  // 노출시킬 데이터 판별
  const historyList = selectedHistory === 'question' ? qHistory : aHistory;

  return (
    <SidebarContainer>
      <Select selectedValue={selectedHistory} onChange={changeHistory} />
      <List historyList={historyList} />
      <Button />
    </SidebarContainer>
  );
};

export default Sidebar;
