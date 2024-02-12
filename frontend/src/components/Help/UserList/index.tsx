'use client';

import { useEffect, useState } from 'react';

import { instance } from '@/api/instance';
import NavBar from '@/components/Help/NavBar';
import Refresh from '@/components/Help/UserList/Refresh';
import UserHelp from '@/components/Help/UserList/UserHelp';
import styles from '@/components/Help/UserList/index.module.scss';
import { HPReceiver } from '@/types/HelpMatching';

interface IData {
  data: HPReceiver[];
}

const getProblemNumber = () => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('problemNumber');
};

function Form() {
  const [userList, setUserList] = useState<IData>();
  const mainLanguage = 'java';
  const problemNumber: number = Number(getProblemNumber());
  const helpNumber = 0;

  useEffect(() => {
    instance
      .get<IData>(`/help/solvedlist/${problemNumber}`)
      .then(({ data }: { data: IData }) => setUserList(data))
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
  }, [problemNumber]);

  return (
    <div className={styles.containerBase}>
      <NavBar sort="도움 요청하기" />
      <div className={styles.sort}>
        <span className={styles.people}>최근에 이 문제를 푼 사람</span>
        <Refresh helpNumber={helpNumber} />
      </div>
      <div>
        {userList != null &&
          userList.data &&
          userList.data.map((user, index) => (
            <UserHelp key={index} userData={user} mainLanguage={mainLanguage} />
          ))}
      </div>
    </div>
  );
}

export default Form;
