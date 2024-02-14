'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { convertMillisecondsToTime } from '@/utils/timer';
import styles from '@/components/Help/UserList/Refresh.module.scss';
import useHelpRequestStore from '@/store/helpRequest';

interface IRefresh {
  totalPage: number;
  page: number;
  setPage: (page: number) => void;
}

const Refresh = ({ totalPage, page, setPage }: IRefresh) => {
  const [remainTime, setRemainTime] = useState(600000);
  const {
    zustandHelpRequestTime,
    zustandRefreshStart,
    setZustandRefreshStart,
  } = useHelpRequestStore();
  const refreshStart = zustandRefreshStart;

  useEffect(() => {
    const timer = setInterval(() => {
      if (refreshStart) {
        setRemainTime(600000 - (Date.now() - refreshStart));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [refreshStart, remainTime]);

  const { minutes, seconds } = convertMillisecondsToTime(remainTime);
  const timer = `${minutes}분${seconds}초`;

  // 클릭 후, 10분 후 유효

  const presentHelpRequest = zustandHelpRequestTime;
  const handleClick = () => {
    if (page + 1 > totalPage) {
      setPage(0);
    } else {
      setPage(page + 1);
    }
    // 타이머 처음 시간
    setZustandRefreshStart(Date.now());
  };

  return (
    <div className={styles.container}>
      <p>요청횟수: {presentHelpRequest}/5</p>
      {presentHelpRequest >= 5 || (remainTime > 0 && remainTime < 600000) ? (
        <button className={styles.timer} disabled>
          {timer}
          <Image
            alt="refresh button"
            width={26}
            height={24}
            src={'/images/wait/refresh.png'}
          ></Image>
        </button>
      ) : (
        <button className={styles.refresh} onClick={handleClick}>
          새로고침
        </button>
      )}
    </div>
  );
};
// })
export default Refresh;
