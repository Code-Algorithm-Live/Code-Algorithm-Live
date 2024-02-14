'use client';

import styled from 'styled-components';
import Header from '@/components/Common/Header';
import HistorySideBar from '@/components/Common/HistorySideBar';
import Recommended from '@/components/Home/Recommended';
import Waiting from '@/components/Home/Waiting';

const SidebarContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1290px;
`;

const Home = () => {
  return (
    <>
      <Header />
      <SidebarContainer>
        <HistorySideBar />
        <Container>
          <Recommended />
          <Waiting />
        </Container>
      </SidebarContainer>
    </>
  );
};
export default Home;
