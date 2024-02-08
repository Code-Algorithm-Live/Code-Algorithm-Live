'use client';

import { useEffect, useState } from 'react';

import { instance } from '@/api/instance';
import NavBar from '@/components/Help/NavBar';
import Pagination from '@/components/Help/QuestionList/Pagination';
import QuestionBoard from '@/components/Help/QuestionList/QuestionBoard';
import styles from '@/components/Help/QuestionList/index.module.scss';
import { HistoryList } from '@/types/Chat';

const getProblemNumber = () => {
  if (typeof window === 'undefined') return '0';
  return localStorage.getItem('problemNumber');
};

function Form() {
  const [problemHistoryList, setProblemHistoryList] =
    useState<HistoryListData>();
  const [currentPage, setCurrentPage] = useState(1);
  const problemNumber = getProblemNumber() as string;
  const problemId = Number(problemNumber);
  interface HistoryListData {
    data: HistoryList[];
  }
  useEffect(() => {
    instance
      .get<HistoryListData>(`/chat/history/list/${problemId}`)
      .then(({ data }: { data: HistoryListData }) =>
        setProblemHistoryList(data),
      )
      // eslint-disable-next-line no-console
      .catch(Error => console.log(Error));
  }, [problemId]);

  let currentPageData: HistoryList[] = [];
  let totalPage = 0;

  if (!problemHistoryList || !problemHistoryList.data) {
    return (
      <div>
        <strong>
          <NavBar sort={problemNumber} />
        </strong>
        <div className={styles.container}>
          <div className={styles.sort}>질문 히스토리 보기</div>
          <div>질문 히스토리가 없습니다.</div>
        </div>
      </div>
    );
  }

  // 페이지당 문제 개수
  const limit = 2;
  // 현재 페이지
  // 페이지 변경
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  // 현재 페이지 데이터 계산
  const startIndex: number = (currentPage - 1) * limit;
  let endIndex: number = startIndex + limit;
  if (endIndex > problemHistoryList.data.length) {
    endIndex = problemHistoryList.data.length;
  }
  currentPageData = problemHistoryList.data.slice(startIndex, endIndex);
  totalPage = Math.ceil(problemHistoryList.data.length / limit);

  return (
    <div>
      <strong>
        <NavBar sort={problemNumber} />
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
