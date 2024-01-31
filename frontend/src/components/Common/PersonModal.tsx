import Image from 'next/image';
import styles from '@/components/Common/PersonModal.module.scss';
import { useState } from 'react';

interface IPerson {
  nickname: string;
  등급: number;
  레벨: number;
  도움_준_횟수: number;
  도움_받은_횟수: number;
  url: string;
}

interface PersonProps {
  personData: IPerson;
  isState: boolean;
  isFriend: boolean;
  onModal(state: boolean): void;
}

// 현재 데이터
// const personData = {
//   nickname: '알라코',
//   등급: 1,
//   레벨: 3,
//   도움_준_횟수: 11700,
//   도움_받은_횟수: 54,
//   url: '/images/coala/smile.png',
// };

const PersonModal = ({
  personData,
  isState,
  isFriend,
  onModal,
}: PersonProps) => {
  // 친구 추가 or 삭제 시 보내야 하는 정보 체크 X
  // 상태 파악 nowState 실시간으로 갱신해야 하나?
  // TODO: 모달 외 부분 누르면 닫기

  // const [isModalOpen, setIsModalOpen] = useState(isModalOpen);

  const bgColor = isState ? 'connected' : 'unconnected';

  const userGrade: string = (() => {
    switch (personData.등급) {
      case 1:
        return '빨간';
      case 2:
        return '주황';
      case 3:
        return '노란';
      case 4:
        return '초록';
      case 5:
        return '파란';
      case 6:
        return '남색';
      case 7:
        return '보라';
      default:
        return '빨간';
    }
  })();

  const doHelpNum = personData.도움_준_횟수.toLocaleString('en-US');
  const getHelpNum = personData.도움_받은_횟수.toLocaleString('en-US');

  const handleClickAdd = () => {
    // TODO: 친구추가 요청 보내기
  };

  const handleClickHelp = () => {
    // TODO: 도움요청보내기
  };

  const handleClickDelete = () => {
    // TODO: 친구 삭제
    // TODO: 재렌더링 시키기(친구창)
  };
  const handleClickClose = () => {
    const state = false;
    onModal(state);
  };

  return (
    <div className={styles.modal}>
      <Image
        className={styles.closeButton}
        onClick={handleClickClose}
        src={'/images/closeButton.png'}
        alt="닫기"
        width={12.5}
        height={12.5}
      ></Image>
      <div className={styles.ImgContainer}>
        <Image
          className={styles.profileImg}
          src={personData.url}
          alt="친구 이름"
          style={{
            // 비율 변화
            width: '167px',
            height: '167px',
          }}
          width={167}
          height={167}
        />
        <div className={styles.state} id={styles[bgColor]}></div>
      </div>
      <p className={styles.nickname}>{personData.nickname}</p>
      <div className={styles.levelContainer}>
        <Image
          src={`/images/userLevel/${personData.등급}.png`}
          alt="등급"
          width={39}
          height={37}
        ></Image>
        <p className={styles.word} id={styles[userGrade]}>
          {userGrade}마법사 LV.{personData.레벨}
        </p>
      </div>
      <div className={styles.help}>
        <div className={styles.aboutHelp}>
          <Image
            src="/images/personModal/doHelp.png"
            alt="도움을 준 횟수"
            width={24}
            height={24}
          ></Image>
          <div className={styles.sortHelpCon}>
            <p className={styles.sortHelp} id={styles.sortHelpDo}>
              도움 준 횟수
            </p>
            <p className={styles.sortHelpNum}>{doHelpNum}회</p>
          </div>
        </div>
        <div className={styles.aboutHelp}>
          <Image
            src="/images/personModal/getHelp.png"
            alt="도움을 받은 횟수"
            width={24}
            height={24}
          ></Image>
          <div className={styles.sortHelpCon}>
            <p className={styles.sortHelp} id={styles.sortHelpGet}>
              도움받은 횟수
            </p>
            <p className={styles.sortHelpNum}>{getHelpNum}회</p>
          </div>
        </div>
      </div>
      <div className={styles.Buttons}>
        {!isFriend && (
          <button onClick={handleClickAdd} className={styles.personButton}>
            <Image
              className={styles.buttonImg}
              src="/images/personModal/addFriend.png"
              alt="친구 추가"
              width={24}
              height={24}
            ></Image>
            <p>친구 추가</p>
          </button>
        )}
        {isFriend && (
          <button onClick={handleClickDelete} className={styles.personButton}>
            <Image
              className={styles.buttonImg}
              src="/images/personModal/deleteFriend.png"
              alt="친구삭제"
              width={24}
              height={24}
            ></Image>
            <p>친구 삭제</p>
          </button>
        )}
        <button
          onClick={handleClickHelp}
          className={styles.personButton}
          id={styles.buttonHelp}
        >
          <Image
            className={styles.buttonImg}
            src="/images/personModal/Help.png"
            alt="도움 요청"
            width={24}
            height={24}
          ></Image>
          <p>도움 요청</p>
        </button>
      </div>
    </div>
  );
};
export default PersonModal;
