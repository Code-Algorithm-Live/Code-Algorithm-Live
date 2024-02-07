'use client';

import Image from 'next/image';
import { useRef } from 'react';
import styles from '@/components/Home/Waiting/UserImage/UserImage.module.scss';

interface IUser {
  memberExp: number;
  nickname: string;
  url: string;
}

// const ImageContainer = styles(Image)`
// border-radius: 50%;
//   width: 70px;
//   height: 70px;
// `;

const UserImage = ({ userData }: { userData: IUser }) => {
  const userContainerRef = useRef<HTMLDivElement>(null);
  function expToLevel(memberExp: number) {
    const 등급 = Math.floor(memberExp / 15);
    const 레벨 = memberExp % 15;
    return { 등급, 레벨 };
  }
  const updatedUserData = {
    ...userData,
    ...expToLevel(userData.memberExp),
  };
  return (
    <div className={styles.userContainer} ref={userContainerRef}>
      <Image
        className={styles.profileImg}
        src={userData.url}
        alt={`${userData.nickname}.png`}
        width={70}
        height={70}
      />
      <div className={styles.levelContainer}>
        <Image
          src={`/images/userLevel/${updatedUserData.등급 + 1}.png`}
          alt="등급"
          width={50}
          height={50}
        />
      </div>
    </div>
  );
};

export default UserImage;
