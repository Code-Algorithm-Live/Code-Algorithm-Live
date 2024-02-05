'use client';

import styled from 'styled-components';
import { useState } from 'react';
import WaitingQueue from '@/components/Home/Waiting/WaitingQueue';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $active: boolean;
}

interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
  $active: boolean;
}

const Container = styled.div`
  display: flex;
  height: calc(100vh - 298px);
  flex-direction: column;
  padding: 30px 50px 50px 50px;
`;

const Header = styled.span`
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  position: relative;

  font-family: Pretendard;
  font-size: 16px;
`;

const TabButton = styled.button<ButtonProps>`
  color: ${({ $active }) =>
    $active ? 'var(--point-color)' : 'var(--sub-font-color)'};
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  padding: 10px 30px 15px 0px;
  cursor: pointer;
  border-bottom: ${({ $active }) =>
    $active ? '2px solid var(--point-color)' : '2px solid transparent'};

  &:hover {
    color: var(--point-color);
  }
  z-index: 1;
`;

const TabLine = styled.div<DivProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: ${({ $active }) =>
    $active ? 'var(--editorTypo-color)' : 'transparent'};
`;

const Question = () => {
  const [activeTab, setActiveTab] = useState<string>('tab1');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <Container>
      <Header>도움 요청 대기열</Header>
      <TabContainer>
        <TabButton
          onClick={() => handleTabClick('tab1')}
          $active={activeTab === 'tab1'}
        >
          전체 보기
        </TabButton>
        <TabButton
          onClick={() => handleTabClick('tab2')}
          $active={activeTab === 'tab2'}
        >
          내가 푼 문제
        </TabButton>
        <TabLine $active={activeTab === 'tab1' || activeTab === 'tab2'} />
      </TabContainer>
      <WaitingQueue activeTab={activeTab} />
    </Container>
  );
};

export default Question;
