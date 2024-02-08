'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import style from '@/components/Help/Wait/StopWatch.module.scss';
import { clearInterval } from 'stompjs';
import { convertMillisecondsToTime, timerFormatter } from '@/utils/timer';

const getStartTime = () => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('startTime');
};

const StopWatch = () => {
  const [timeLap, setTimeLap] = useState(0);

  const startTime = Number(getStartTime());

  useEffect(() => {
    const timer = setInterval(() => {
      if (startTime) {
        setTimeLap(Date.now() - startTime);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const { hours, minutes, seconds } = convertMillisecondsToTime(timeLap);
  const time = timerFormatter({ hours, minutes, seconds });

  const handleClickCancel = () => {
    if (typeof window === 'undefined') return;

    localStorage.removeItem('startTime');
    localStorage.removeItem('helpRequestTime');
    // TODO: 서버 연결
  };
  return (
    <div className={style.StopWatch}>
      <p className={style.state}>기다리는 중</p>
      <div className={style.time}>
        <span>경과시간 </span>
        <span className="time">{time}</span>
      </div>
      <div className={style.buttons}>
        <button className={style.button}>
          <Link href={'/help/edit'}>수정하기</Link>
        </button>
        <button className={style.button} onClick={handleClickCancel}>
          <Link href={'/'}>취소하기</Link>
        </button>
      </div>
    </div>
  );
};
export default StopWatch;
