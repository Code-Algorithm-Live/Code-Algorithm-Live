'use client';

import UserHelp from '@/components/Help/User-list/UserHelp';
import NavBar from '@/components/Help/NavBar';
import styles from '@/components/Help/User-list/index.module.scss';
import Refresh from './Refresh';

function Form() {
  // TODO: 서버와 연결 > 친구와 유저리스트 데이타 받아오기

  // FIXME: 유저별로 가져오기, db에 있는지 확인 필요
  const mainLanguage = 'java';

  const userData = {
    data: [
      {
        nickname: '알라코1',
        등급: 1,
        레벨: 3,
        도움_준_횟수: 11700,
        도움_받은_횟수: 54,
        url: '/images/coala/smile.png',
      },
      {
        nickname: '알라코2',
        등급: 1,
        레벨: 3,
        도움_준_횟수: 11700,
        도움_받은_횟수: 54,
        url: '/images/coala/smile.png',
      },
    ],
  };

  const FriendData = {
    data: [
      {
        nickname: '알라코3',
        등급: 1,
        레벨: 3,
        도움_준_횟수: 11700,
        도움_받은_횟수: 54,
        url: '/images/coala/smile.png',
      },
      {
        nickname: '알라코4',
        등급: 1,
        레벨: 3,
        도움_준_횟수: 11700,
        도움_받은_횟수: 54,
        url: '/images/coala/smile.png',
      },
    ],
  };

  return (
    <div className={styles.containerBase}>
      <NavBar sort="도움 요청하기" />
      <div className={styles.sort}>
        <a className={styles.people}>최근에 이 문제를 푼 사람</a>
        <Refresh helpNumber={0} />
      </div>
      <div>
        {userData.data.map((user, index) => (
          <UserHelp key={index} userData={user} mainLanguage={mainLanguage} />
        ))}
      </div>
      <div className={styles.sort}>
        <a className={styles.people}>내 친구</a>
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
