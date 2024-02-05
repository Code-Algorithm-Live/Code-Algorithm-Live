'use client';

import { useState } from 'react';
import Link from 'next/link';
import style from '@/components/Help/Wait/StopWatch.module.scss';

const StopWatch = () => {
  // 시작시간 기록(받기) - 2024-01-27 15:20:31
  // 시작시간 부터 현재 시간 세기(표시)
  // 입력 수정하기
  // 대기 취소하기
  const [timeLap, setTimeLap] = useState(0);

  const start: string = '2024-01-27 15:20:31';
  const startTime: Date = new Date(start);
  // 1초마다 업데이트
  setInterval(() => {
    setTimeLap(Date.now() - startTime.getTime());
  }, 1000);
  const hour = Math.floor(timeLap / 1000 / 60 / 60);
  const minute = Math.floor((timeLap / 1000 / 60) % 60);
  const second = Math.floor((timeLap / 1000) % 60);
  const handleClickCancel = () => {
    // 기록 삭제하기
  };
  return (
    <div className={style.StopWatch}>
      <p className={style.state}>기다리는 중</p>
      <div className={style.time}>
        <a>경과시간: </a>
        {hour > 0 ? `${hour} : ` : ''}
        {`${minute} : `}
        {second}
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