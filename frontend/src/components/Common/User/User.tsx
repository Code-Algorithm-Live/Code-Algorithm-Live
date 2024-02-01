'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import UserModal from '@/components/Common/UserModal/UserModal';
import styles from '@/components/Common/User/User.module.scss';
// TODO: shadow 적용

// 친구인지 확인하고 만약 친구라면 자세한 상태값도 알아오기
// 서버에서 확인
const response = {
  data: {
    isFriend: true,
    isActive: true, // 접속 여부-true
  },
};

// 서버와 연결해서 데이터 받아오기
const userData = {
  nickname: '알라코',
  등급: 1,
  레벨: 3,
  도움_준_횟수: 11700,
  도움_받은_횟수: 54,
  url: '/images/coala/smile.png',
};

const User = () => {
  // 상태 바뀌면 재렌더링
  // 친구 삭제는 아예 다른 페이지로 보내버리기(모달에서)
  const [isActive, setIsActive] = useState(false); // 접속중, 비접속중 isActive
  const [isDetailActive, setIsDetailActive] = useState(''); // 유저 활동 isDetailActive
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [position, setPosition] = useState<'right' | 'left'>('left');

  const modalRef = useRef<HTMLDivElement>(null);
  const userContainerRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  // x버튼으로 모달 닫기
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

  // 친구 && 접속 중
  if (isFriend && response.data.isActive) {
    // 현재 동작 파악
    const nowDetailActive = '도움을 찾는 중';
    if (isDetailActive !== nowDetailActive) {
      setIsDetailActive(nowDetailActive);
    }
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
        width={30}
        height={30}
      />
      <div className={styles[bgColor]}></div>
      <div>
        <p className={styles.nickname}>{userData.nickname}</p>
        <p className={styles.detailActive}>{isDetailActive}</p>
      </div>
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

export default User;
