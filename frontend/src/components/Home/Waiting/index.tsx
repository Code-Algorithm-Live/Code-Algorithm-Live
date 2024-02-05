'use client';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: calc(100vh - 448px);
  background-color: gray;
`;

const Question = () => {
  return (
    <Container>
      <p>대기열 전용 공간</p>
    </Container>
  );
};

export default Question;
