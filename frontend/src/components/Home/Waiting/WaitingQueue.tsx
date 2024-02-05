import styled from 'styled-components';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface WaitingQueueProps {
  activeTab: string;
}

const ProblemBox = styled.div`
  width: 220px;
  height: 150px;
  border-radius: 10px;
  box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.3);
  padding: 20px;
  position: relative;
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--editorTypo-color);
  }
`;

const MainText = styled.p`
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 800;
  color: var(--main-font-color);

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const TextContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  text-align: right;
`;

const SubText = styled.p`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  color: var(--main-font-color);
  width: 180px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const WaitingQueue: React.FC<WaitingQueueProps> = ({ activeTab }) => {
  const { data: session, status } = useSession();
  const [queueData, setQueueData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = session?.user?.jwtToken as string;
        const url =
          activeTab === 'tab1'
            ? '/help/waitqueue'
            : `/help/waitqueue/solvedlist?solvedId=${session?.user?.SolvedId}`;

        const Response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
          {
            method: 'GET',
            headers: {
              Authorization: token,
            },
          },
        );
        console.log(Response);

        const responseData = await Response.json();
        console.log(responseData);

        // const combinedProblems: Array<{
        //   summary: string;
        //   number: number;
        //   title: string;
        // }> = [];
        // const { curateFromQuestionCnt, curateFromRecent } = responseData;
        // for (
        //   let i = 0;
        //   i < Math.max(curateFromQuestionCnt.length, curateFromRecent.length);
        //   i++
        // ) {
        //   if (i < curateFromQuestionCnt.length) {
        //     combinedProblems.push({
        //       summary: '인기 많은 문제',
        //       number: curateFromQuestionCnt[i].id,
        //       title: curateFromQuestionCnt[i].title,
        //     });
        //   }

        //   if (i < curateFromRecent.length) {
        //     combinedProblems.push({
        //       summary: '나에게 딱 맞는 문제',
        //       number: curateFromRecent[i].id,
        //       title: curateFromRecent[i].title,
        //     });
        //   }
        // }

        setQueueData(queueData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (status === 'authenticated') {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchData();
    }
  }, [session, status, activeTab]);

  return (
    <>
      {/* {problems.map((problem, index) => (
        <Link
          key={index}
          href={`https://www.acmicpc.net/problem/${problem.number}`}
          target="_blank"
        >
          <ProblemBox>
            <MainText>{problem.summary}</MainText>
            <TextContainer>
              <SubText>{problem.number}번</SubText>
              <SubText>{problem.title}</SubText>
            </TextContainer>
          </ProblemBox>
        </Link>
      ))} */}
    </>
  );
};

export default WaitingQueue;
