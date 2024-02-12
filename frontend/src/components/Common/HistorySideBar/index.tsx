'use client';

import styled from 'styled-components';
import { SetStateAction, useState } from 'react';
import List from '@/components/Common/HistorySideBar/List';
import Button from '@/components/Common/HistorySideBar/Button';
import Select from '@/components/Common/HistorySideBar/Select';

const SidebarContainer = styled.div`
  padding: 20px 20px 20px 10px;
  display: flex;
  flex-direction: column;
  width: 244px;
  height: calc(100vh - 48px);
  border-right: 2px solid var(--main-color);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  background-color: var(--white-color);
  gap: 25px;
`;

const Sidebar = () => {
  const [selectedHistory, setSelectedHistory] = useState<string>('question');
  const changeHistory = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedHistory(event.target.value);
  };

  // 임시 히스토리 데이터
  const QHistory = Array.from({ length: 10 }, (_, index) => ({
    main: `내가 질문한 히스토리들!!!!! ${index + 1}`,
    sub: '문제 번호, 문제 이름',
    href: '/',
  }));

  const AHistory = Array.from({ length: 10 }, (_, index) => ({
    main: `내가 답변한 히스토리들!!!!! ${index + 1}`,
    sub: '문제 번호, 문제 이름',
    href: '/',
  }));

  // 노출시킬 데이터 판별
  const historyList = selectedHistory === 'question' ? QHistory : AHistory;

  return (
    <SidebarContainer>
      <Select selectedValue={selectedHistory} onChange={changeHistory} />
      <List historyList={historyList} />
      <Button />
    </SidebarContainer>
  );
};

export default Sidebar;
