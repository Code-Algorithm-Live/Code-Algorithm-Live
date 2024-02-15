'use client';

import { useEffect, useState } from 'react';

import { instance } from '@/api/instance';
import NavBar from '@/components/Help/NavBar';
import Pagination from '@/components/Help/QuestionList/Pagination';
import QuestionBoard from '@/components/Help/QuestionList/QuestionBoard';
import styles from '@/components/Help/QuestionList/index.module.scss';
import { HistoryList } from '@/types/Chat';
import useProblemNumberStore from '@/store/problemNumber';

function Form() {
  const [problemHistoryList, setProblemHistoryList] = useState<HistoryList[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const { zustandProblemNumber } = useProblemNumberStore();
  const problemNumber = zustandProblemNumber;
  useEffect(() => {
    instance
      .get<HistoryList[]>(`/chat/history/list/${Number(problemNumber)}`)
      .then(({ data }: { data: HistoryList[] }) => setProblemHistoryList(data))
      // eslint-disable-next-line no-console
      .catch(Error => console.log(Error));
  }, [problemNumber]);

  let currentPageData: HistoryList[] = [];
  let totalPage = 0;

  const numberProps: string = `${problemNumber}번 문제`;

  if (!problemHistoryList) {
    return (
      <div>
        <strong>
          <NavBar sort={numberProps} />
        </strong>
        <div className={styles.container}>
          <div className={styles.sort}>질문 히스토리 보기</div>
          <div className={styles.description}>질문 히스토리가 없습니다.</div>
        </div>
      </div>
    );
  }

  // 페이지당 문제 개수
  const limit = 8;
  // 현재 페이지
  // 페이지 변경
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  // 현재 페이지 데이터 계산
  const startIndex: number = (currentPage - 1) * limit;
  let endIndex: number = startIndex + limit;
  if (endIndex > problemHistoryList.length) {
    endIndex = problemHistoryList.length;
  }
  currentPageData = problemHistoryList.slice(startIndex, endIndex);
  totalPage = Math.ceil(problemHistoryList.length / limit);

  return (
    <div>
      <strong>
        <NavBar sort={numberProps} />
      </strong>
      <div className={styles.container}>
        <div className={styles.sort}>질문 히스토리 보기</div>
        <div className={styles.list}>
          {currentPageData.map((problem, index) => (
            <QuestionBoard key={index} problemData={problem} />
          ))}
        </div>
        <div className={styles.button}>
          <Pagination
            totalPage={totalPage}
            limit={limit}
            page={currentPage}
            setPage={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Form;
