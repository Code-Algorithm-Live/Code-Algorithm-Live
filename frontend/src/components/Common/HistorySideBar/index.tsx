'use client';

import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { instance } from '@/api/instance';
import useSidebarStore from '@/store/historySelect';
import useHistorybarStore from '@/store/historyBar';
import { Sender, HelpDto, RoomUuid } from '@/types/Help';
import List from '@/components/Common/HistorySideBar/List';
import Button from '@/components/Common/HistorySideBar/Button';
import Select from '@/components/Common/HistorySideBar/Select';
import Loader from '@/components/Common/Loader';

interface SidebarContainerProps {
  $historyBarControl: boolean;
}

interface HistoryData {
  id: number;
  sender: Sender;
  receiver: string;
  helpDto: HelpDto;
  sendDate: string;
  roomUuid: RoomUuid;
}

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const SidebarContainer = styled.div<SidebarContainerProps>`
  position: relative;
  padding: 20px 20px 20px 10px;
  flex-direction: column;
  display: ${({ $historyBarControl }) =>
    $historyBarControl ? 'flex' : 'none'};
  min-width: 244px;
  height: calc(100vh - 48px);
  border-right: 2px solid var(--main-color);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  background-color: var(--white-color);
  gap: 25px;
  animation: ${({ $historyBarControl }) =>
      $historyBarControl ? slideIn : slideOut}
    0.5s ease-in-out;
`;

const Sidebar = () => {
  const { data: session, status } = useSession();
  const historyBarControl = useHistorybarStore(state => state.HistoryBar);
  const selectedHistory = useSidebarStore(state => state.selectedHistory);
  const setHistory = useSidebarStore(state => state.setHistory);
  const [qHistory, setQHistory] = useState<HistoryData[]>([]);
  const [aHistory, setAHistory] = useState<HistoryData[]>([]);

  const changeHistory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHistory(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let endpoint;
        let setHistoryChange;

        if (selectedHistory === 'question') {
          endpoint = `/chat/history/sender/${session?.user.email}`;
          setHistoryChange = setQHistory;
        } else {
          endpoint = `/chat/history/receiver/${session?.user.email}`;
          setHistoryChange = setAHistory;
        }

        const response = await instance.get<HistoryData[]>(
          `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`,
        );
        if (response.data) {
          setHistoryChange(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData();
  }, [selectedHistory, session?.user.email]);

  // 노출시킬 데이터 판별
  const historyList = selectedHistory === 'question' ? qHistory : aHistory;

  return (
    <SidebarContainer $historyBarControl={historyBarControl}>
      <Select selectedValue={selectedHistory} onChange={changeHistory} />
      {status === 'authenticated' ? (
        <List historyList={historyList} />
      ) : (
        <Loader />
      )}
      <Button />
    </SidebarContainer>
  );
};

export default Sidebar;
