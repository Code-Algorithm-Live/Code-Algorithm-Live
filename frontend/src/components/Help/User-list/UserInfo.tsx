import UserImage from '@/components/Common/User/UserImage/UserImage';
import styles from '@/components/Help/User-list/UserInfo.module.scss';

interface Iuser {
  nickname: string;
  등급: number;
  레벨: number;
  도움_준_횟수: number;
  도움_받은_횟수: number;
  url: string;
}

interface IHelpUser {
  userData: Iuser;
  mainLanguage: string;
}

const UserInfo = ({ userData, mainLanguage }: IHelpUser) => {
  return (
    <div className={styles.userInfo}>
      <UserImage userData={userData} />
      <div className={styles.desc}>
        <p className={styles.name}>{userData.nickname}</p>
        <div className={styles.detailDesc}>
          <a>{mainLanguage} | </a>
          <a>{userData.도움_준_횟수}문제를 도와줌</a>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
