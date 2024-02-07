'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import UserModal from '@/components/Common/User/UserModal/UserModal';
import styles from '@/components/Home/Waiting/UserImage/UserImage.module.scss';

// TODO: response는 서버와 연결해서 데이터 받아오기
const response = {
  data: {
    isFriend: true,
    isActive: true, // 접속 여부-true
  },
};

// // TODO: props로 데이터 받아오기

interface IUser {
  memberExp: number;
  nickname: string;
  url: string;
}

const UserImage = ({ userData }: { userData: IUser }) => {
  const [isActive, setIsActive] = useState(false); // 접속중, 비접속중 isActive
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [position, setPosition] = useState<'right' | 'left'>('left');

  const modalRef = useRef<HTMLDivElement>(null);
  const userContainerRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  /** x버튼으로 모달 닫기  */
  const handleModal = (Active: boolean) => {
    setIsModalOpen(Active);
  };

  const bgColor = response.data.isActive ? 'connected' : 'unconnected';
  const { isFriend } = response.data;

  /** 모달 위치 결정 */
  useEffect(() => {
    if (!userContainerRef.current) return;

    const windowWidth: number = document.body.clientWidth;
    const leftSpace = userContainerRef.current.getBoundingClientRect().left;
    setPosition(windowWidth - leftSpace > 360 ? 'right' : 'left');
  }, []);

  if (isActive !== response.data.isActive) {
    setIsActive(response.data.isActive);
  }
  useEffect(() => {
    /** 모달 외 지역 눌러서 닫기 */
    const handleClickOutSide = (e: MouseEvent) => {
      if (
        isModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutSide);

    return () => {
      document.removeEventListener('click', handleClickOutSide);
    };
  });

  return (
    <div className={styles.userContainer} ref={userContainerRef}>
      <Image
        onClick={openModal}
        className={styles.profileImg}
        src={userData.url}
        alt={`${userData.nickname}.png`}
        width={70}
        height={70}
      />
      <div className={styles[bgColor]}></div>
      {isModalOpen && (
        <>
          <div className={styles.shadow}></div>
          <div className={styles[position]} ref={modalRef}>
            <UserModal
              userData={userData}
              isActive={isActive}
              isFriend={isFriend}
              onModal={handleModal}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserImage;
