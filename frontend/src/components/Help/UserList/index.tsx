'use client';

import { useEffect, useState } from 'react';

import { instance } from '@/api/instance';
import NavBar from '@/components/Help/NavBar';
import Refresh from '@/components/Help/UserList/Refresh';
import UserHelp from '@/components/Help/UserList/UserHelp';
import styles from '@/components/Help/UserList/index.module.scss';
import { HPReceiver } from '@/types/HelpMatching';
import useProblemNumberStore from '@/store/problemNumber';

// const getProblemNumber = () => {
//   if (typeof window === 'undefined') return '';
//   return localStorage.getItem('problemNumber');
// };

function Form() {
  const { zustandProblemNumber } = useProblemNumberStore();
  const [userList, setUserList] = useState<HPReceiver[]>();
  const [currentPage, setCurrentPage] = useState(0);
  const mainLanguage = 'java';
  // const problemNumber: number = Number(getProblemNumber());
  const problemNumber: number = Number(zustandProblemNumber);

  useEffect(() => {
    // TODO: 렌더링시 없다 후 있다로 바뀜. 수정 필요.
    instance
      .get<HPReceiver[]>(`/help/solvedlist/${problemNumber}`)
      .then(({ data }: { data: HPReceiver[] }) => setUserList(data))
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
  }, [problemNumber]);

  if (userList) {
    const dataLength = userList.length;
    // //한 번에 보여줄 요청가능한 사람 수
    const limit = 6;
    let totalPage = 0;
    if (dataLength) {
      totalPage = Math.ceil(dataLength / limit) - 1;
    }
    // 새로고침 시 페이지 이동
    const handlePageChange = () => {
      const pageNumber = currentPage + 1;
      if (pageNumber >= totalPage) {
        setCurrentPage(0);
      } else {
        setCurrentPage(pageNumber);
      }
    };

    // 페이지 데이터
    let currentPageData: HPReceiver[] = [];
    const startIndex: number = currentPage * limit;
    let endIndex: number = startIndex + limit;
    if (userList && endIndex > userList.length) {
      endIndex = userList.length;
    }
    if (userList) {
      currentPageData = userList.slice(startIndex, endIndex);
    }
    return (
      <div className={styles.containerBase}>
        <NavBar sort="도움 요청하기" />
        <div className={styles.sort}>
          <span className={styles.people}>최근에 이 문제를 푼 사람</span>
          <Refresh
            totalPage={totalPage}
            page={currentPage}
            setPage={handlePageChange}
          />
        </div>
        <div>
          {userList &&
            currentPageData.map((user, index) => (
              <UserHelp
                key={index}
                userData={user}
                mainLanguage={mainLanguage}
              />
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className={styles.containerBase}>
      <NavBar sort="도움 요청하기" />
      <div className={styles.sort}>
        <span className={styles.people}>최근에 이 문제를 푼 사람</span>
      </div>
      <div>유저가 없습니다.</div>
    </div>
  );
}

export default Form;
