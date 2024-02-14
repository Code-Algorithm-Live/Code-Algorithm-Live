'use client';

import styled from 'styled-components';
import { useParams } from 'next/navigation';
import Header from '@/components/Common/Header';
import HistorySideBar from '@/components/Common/HistorySideBar';

const SidebarContainer = styled.div`
  display: flex;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MiddleContainer = styled.div`
  display: flex;
  width: 100%;
  height: 550px;
`;

const EditorContainer = styled.div`
  display: flex;
  width: 800px;
`;

const History = () => {
  const params = useParams<{ roomId: string }>();
  console.log(params.roomId);

  return (
    <>
      <Header />
      <SidebarContainer>
        <HistorySideBar />
        <Container>
          <MiddleContainer>
            <EditorContainer>에디터</EditorContainer>
            <p>채팅창</p>
          </MiddleContainer>
          <p>타임라인</p>
        </Container>
      </SidebarContainer>
    </>
  );
};
export default History;
