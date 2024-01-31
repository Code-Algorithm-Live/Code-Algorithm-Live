'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '@/components/Common/Person.module.scss';
import PersonModal from '@/components/Common/PersonModal';

const Person = () => {
  // 상태 바뀌면 재렌더링
  // 친구 삭제는 아예 다른 페이지로 보내버리기(모달에서)
  const [isState, setIsState] = useState(false);
  const [isDetailState, setIsDetailState] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  // 서버와 연결해서 데이터 받아오기
  const personData = {
    nickname: '알라코',
    등급: 1,
    레벨: 3,
    도움_준_횟수: 11700,
    도움_받은_횟수: 54,
    url: '/images/coala/smile.png',
  };

  // 친구인지 확인하고 만약 친구라면 자세한 상태값도 알아오기
  // 서버에서 확인
  const response = {
    data: {
      isFriend: true,
      isState: true, // 접속 여부-true
    },
  };

  const bgColor = response.data.isState ? 'connected' : 'unconnected';

  const { isFriend } = response.data;

  if (isState !== response.data.isState) {
    setIsState(response.data.isState);
  }

  if (isFriend && response.data.isState) {
    // 현재 동작 파악
    const nowDetailState = '도움을 찾는 중';
    if (isDetailState !== nowDetailState) {
      setIsDetailState(nowDetailState);
    }
  }

  const handleModal = (state: boolean) => {
    setIsModalOpen(state);
  };

  return (
    <>
      <div className={styles.personContainer}>
        <Image
          onClick={openModal}
          className={styles.profileImg}
          src={personData.url}
          alt={`${personData.nickname}.png`}
          width={30}
          height={30}
        />
        <div className={styles.state} id={styles[bgColor]}></div>
        <div>
          <p className={styles.nickname}>{personData.nickname}</p>
          <p className={styles.detailState}>{isDetailState}</p>
        </div>
      </div>
      {isModalOpen && (
        <PersonModal
          personData={personData}
          isState={isState}
          isFriend={isFriend}
          onModal={handleModal}
        />
      )}
    </>
  );
};
export default Person;
