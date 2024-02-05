'use client';

import styled from 'styled-components';
import { useSession } from 'next-auth/react';
import ProblemList from '@/components/Home/Recommended/ProblemList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px 50px 50px 50px;
  height: 400px;
`;

const Header = styled.span`
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
`;

const Recommended = () => {
  const { data: session, status } = useSession();

  // 임시 추천 문제 데이터
  const problems = Array.from({ length: 10 }, (_, index) => ({
    summary: `이런 문제 어때요? ${index + 1}`,
    number: 123123,
    title: '상어파이어볼뭐시기',
    href: 'https://www.naver.com/',
  }));

  return (
    <Container>
      {status === 'authenticated' && (
        <>
          <Header>{session?.user?.name}님을 위한 문제 추천</Header>
          <ProblemList problems={problems} />
        </>
      )}
    </Container>
  );
};

export default Recommended;
