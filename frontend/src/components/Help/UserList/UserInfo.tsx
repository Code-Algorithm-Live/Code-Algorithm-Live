// import UserImage from '@/components/Common/User/UserImage/UserImage';
import UserImage from '@/components/Home/Waiting/UserImage';
import styles from '@/components/Help/UserList/UserInfo.module.scss';

interface IUser {
  nickname: string;
  memberExp: number;
  url: string;
}

interface IHelpUser {
  userData: IUser;
}

const UserInfo = ({ userData }: IHelpUser) => {
  return (
    <div className={styles.userInfo}>
      <UserImage userData={userData} />
      <div className={styles.desc}>
        <p className={styles.name}>{userData.nickname}</p>
      </div>
    </div>
  );
};

export default UserInfo;
