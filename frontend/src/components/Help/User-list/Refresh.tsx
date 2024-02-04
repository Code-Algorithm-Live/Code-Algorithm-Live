'use client';

import { useEffect, useState } from 'react';
import useTimer from '@/hooks/useTimer';
import {
  convertMillisecondsToTime,
  convertMinutesToMilliseconds,
} from '@/utils/timer';
import Image from 'next/image';
import styles from '@/components/Help/User-list/Refresh.module.scss';

const END_TIME = 0;
const REMAIN_TIME = convertMinutesToMilliseconds(0);

const Refresh = ({ helpNumber }: number) => {
  const { time, increaseTime, clearTimer } = useTimer({ initMinutes: 0 });
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    // 남은시간이 REMAIN_TIME이하면 연장 가능
    if (helpNumber < 3 || time > REMAIN_TIME) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }

    // 타이머 종료
    if (time === END_TIME) {
      clearTimer();
      setIsDisabled(true);
    }
  }, [clearTimer, time]);

  const { minutes, seconds } = convertMillisecondsToTime(time);
  const timer = `${minutes}분${seconds}초`;

  // 클릭 후, 10분 후 유효

  const handleClick = () => {
    // TODO: 다음 유저리스트 보여주기(원형 큐 느낌으로)
    // TODO: 유저리스트 인덱스 props로 받아와서 다시 보내주기
    // 10분 체크
    // 클릭 시 주스탠드를 이용하여 시작시간 체크 필요
    increaseTime(10);
    setIsDisabled(false);
  };

  const buttonState = isDisabled ? (
    <button className={styles.refresh} onClick={handleClick}>
      새로고침
    </button>
  ) : (
    <button className={styles.timer} disabled={isDisabled}>
      {timer}
      <Image
        alt="refresh button"
        width={26}
        height={24}
        src={'/images/wait/refresh.png'}
      ></Image>
    </button>
  );
  return (
    <div className={styles.container}>
      <p>요청횟수: {helpNumber}/3</p>
      {buttonState}
    </div>
  );
};
export default Refresh;
