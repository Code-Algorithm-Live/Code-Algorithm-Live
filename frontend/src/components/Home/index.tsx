'use client';

import styled from 'styled-components';
import Header from '@/components/Common/Header';
import HistoryBar from '@/components/Common/HistoryBar';
import Recommended from '@/components/Home/Recommended';
import Waiting from '@/components/Home/Waiting';

const SidebarContainer = styled.div`
  display: flex;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Home = () => {
  return (
    <>
      <Header />
      <SidebarContainer>
        <HistoryBar />
        <Container>
          <Recommended />
          <Waiting />
        </Container>
      </SidebarContainer>
    </>
  );
};
export default Home;
