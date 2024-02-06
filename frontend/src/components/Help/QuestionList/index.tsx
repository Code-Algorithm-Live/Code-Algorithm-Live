'use client';

import { useState } from 'react';
import NavBar from '@/components/Help/NavBar';
import QuestionBoard from '@/components/Help/QuestionList/QuestionBoard';
// import Pagination from './Pagination';
import Pagination from '@/components/Help/QuestionList/Pagination';
import styles from '@/components/Help/QuestionList/index.module.scss';

function Form() {
  // TODO: 서버와 연결
  // data 구조
  const response = {
    data: [
      {
        nickname: '우아앙1',
        title: '틀렸 1 맞왜?',
        recommend: 7,
        registDate: '2024-01-06',
        id: 'anjswlahfmrpTdj01',
      },
      {
        nickname: '우아앙12',
        title: '틀렸 1 맞왜?',
        recommend: 7,
        registDate: '2024-01-06',
        id: 'anjswlahfmrpTdj01',
      },
      {
        nickname: '우아앙1',
        title: '틀렸 1 맞왜?',
        recommend: 7,
        registDate: '2024-01-06',
        id: 'anjswlahfmrpTdj01',
      },
      {
        nickname: '우아앙1',
        title: '틀렸 1 맞왜?',
        recommend: 7,
        registDate: '2024-01-06',
        id: 'anjswlahfmrpTdj01',
      },
      {
        nickname: '우아앙51',
        title: '틀렸 1 맞왜?',
        recommend: 7,
        registDate: '2024-01-06',
        id: 'anjswlahfmrpTdj01',
      },
      {
        nickname: '우아앙16',
        title: '틀렸 1 맞왜?',
        recommend: 7,
        registDate: '2024-01-06',
        id: 'anjswlahfmrpTdj01',
      },
    ],
  };

  // 페이지당 문제 개수
  const limit = 2;
  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(1);
  // 페이지 변경
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // 현재 페이지 데이터 계산
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const currentPageData = response.data.slice(startIndex, endIndex);

  const totalPage = Math.ceil(response.data.length / limit);
  return (
    <div>
      <strong>
        <NavBar sort={'1553번 문제'} />
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
