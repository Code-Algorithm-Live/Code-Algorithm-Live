'use client';

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import ProblemList from '@/components/Home/Recommended/ProblemList';

type ApiResponse = {
  curateFromQuestionCnt: {
    id: number;
    title: string;
  }[];
  curateFromRecent: {
    id: number;
    title: string;
  }[];
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 50px 50px 50px;
  height: 320px;
`;

const Header = styled.span`
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 30px;
`;

const Recommended = () => {
  const { data: session, status } = useSession();
  const [problems, setProblems] = useState<
    Array<{
      summary: string;
      number: number;
      title: string;
    }>
  >([]);
  useEffect(() => {
    console.log(session?.user);

    const fetchData = async () => {
      try {
        const solvedId = session?.user?.SolvedId as string;
        const token = session?.user?.jwtToken as string;

        const Response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/problem/curate/${solvedId}`,
          {
            method: 'GET',
            headers: {
              Authorization: token,
            },
          },
        );
        console.log(Response);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const responseData: ApiResponse = await Response.json();
        const combinedProblems: Array<{
          summary: string;
          number: number;
          title: string;
        }> = [];
        const { curateFromQuestionCnt, curateFromRecent } = responseData;
        for (
          let i = 0;
          i < Math.max(curateFromQuestionCnt.length, curateFromRecent.length);
          i++
        ) {
          if (i < curateFromQuestionCnt.length) {
            combinedProblems.push({
              summary: '인기 많은 문제',
              number: curateFromQuestionCnt[i].id,
              title: curateFromQuestionCnt[i].title,
            });
          }

          if (i < curateFromRecent.length) {
            combinedProblems.push({
              summary: '나에게 딱 맞는 문제',
              number: curateFromRecent[i].id,
              title: curateFromRecent[i].title,
            });
          }
        }

        setProblems(combinedProblems);
        console.log(combinedProblems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (status === 'authenticated') {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchData();
    }
  }, [session, status]);

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
