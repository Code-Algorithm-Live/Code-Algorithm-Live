'use client';

import UserInfo from '@/components/Help/UserList/UserInfo';
import styles from '@/components/Help/UserList/UserHelp.module.scss';

interface Iuser {
  nickname: string;
  memberExp: number;
  url: string;
}

interface IHelpUser {
  userData: Iuser;
  mainLanguage: string;
}

const UserHelp = ({ userData, mainLanguage }: IHelpUser) => {
  // TODO: 도움 요청 여부 세션이나 주스탠드에 저장

  // TODO: 클릭시 서버와 주스탠드 연결, 클래스 이름 바꾸기
  const handleClick = () => {
    // 클릭
  };
  return (
    <div className={styles.container}>
      <UserInfo userData={userData} mainLanguage={mainLanguage} />
      <button className={styles.help} onClick={handleClick}>
        도움 요청하기
      </button>
    </div>
  );
};

export default UserHelp;
