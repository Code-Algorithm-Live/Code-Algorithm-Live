import UserImage from '@/components/Common/User/UserImage/UserImage';
import styles from '@/components/Help/UserList/UserInfo.module.scss';

interface IUser {
  nickname: string;
  memberExp: number;
  url: string;
}

interface IHelpUser {
  userData: IUser;
  mainLanguage: string;
}

const UserInfo = ({ userData, mainLanguage }: IHelpUser) => {
  return (
    <div className={styles.userInfo}>
      <UserImage userData={userData} />
      <div className={styles.desc}>
        <p className={styles.name}>{userData.nickname}</p>
        <div className={styles.detailDesc}>
          <span>{mainLanguage} | </span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
