'use client';

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import ProblemList from '@/components/Home/Recommended/ProblemList';
import Loader from '@/components/Common/Loader';

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
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 30px 50px 50px 50px;
  height: 250px;
`;

const Header = styled.span`
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 20px;
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
          i += 1
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
      } catch (error) {
        console.log(error);
      }
    };

    if (status === 'authenticated') {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchData();
    }
  }, [session, status]);

  return (
    <Container>
      {status === 'authenticated' ? (
        <>
          <Header>{session?.user?.name}님을 위한 문제 추천</Header>
          <ProblemList problems={problems} />
        </>
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default Recommended;
