'use client';

import styled from 'styled-components';
import Header from '@/components/Common/Header';
import HistorySideBar from '@/components/Common/HistorySideBar';

const SidebarContainer = styled.div`
  display: flex;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const EditorContainer = styled.div`
  display: flex;
  width: 800px;
`;

const History = () => {
  return (
    <>
      <Header />
      <SidebarContainer>
        <HistorySideBar />
        <Container>
          <EditorContainer>에디터</EditorContainer>
          <p>채팅창</p>
        </Container>
      </SidebarContainer>
    </>
  );
};
export default History;
