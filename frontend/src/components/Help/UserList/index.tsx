'use client';

import UserHelp from '@/components/Help/UserList/UserHelp';
import NavBar from '@/components/Help/NavBar';
import styles from '@/components/Help/UserList/index.module.scss';
import Refresh from '@/components/Help/UserList/Refresh';

function Form() {
  // TODO: 서버와 연결 > 친구와 유저리스트 데이타 받아오기
  // TODO: 경험치로 등급, 레벨 환산 필요
  // 유저 도움 준 횟수와 도움 받은 횟수 db에 저장 안 함

  // FIXME: 유저별로 가져오기, db에 있는지 확인 필요
  const mainLanguage = 'java';

  const userData = {
    data: [
      {
        nickname: '알라코1',
        memberExp: 15,
        url: '/images/coala/smile.png',
      },
      {
        nickname: '알라코2',
        memberExp: 30,
        url: '/images/coala/smile.png',
      },
    ],
  };

  const FriendData = {
    data: [
      {
        nickname: '알라코3',
        memberExp: 30,
        url: '/images/coala/smile.png',
      },
      {
        nickname: '알라코4',
        memberExp: 100,
        url: '/images/coala/smile.png',
      },
    ],
  };

  const helpNumber = 0;

  return (
    <div className={styles.containerBase}>
      <NavBar sort="도움 요청하기" />
      <div className={styles.sort}>
        <span className={styles.people}>최근에 이 문제를 푼 사람</span>
        <Refresh helpNumber={helpNumber} />
      </div>
      <div>
        {userData.data.map((user, index) => (
          <UserHelp key={index} userData={user} mainLanguage={mainLanguage} />
        ))}
      </div>
      <div className={styles.sort}>
        <span className={styles.people}>내 친구</span>
      </div>
      <div>
        {FriendData.data.map((user, index) => (
          <UserHelp key={index} userData={user} mainLanguage={mainLanguage} />
        ))}
      </div>
    </div>
  );
}

export default Form;
