'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import style from '@/components/Help/Wait/StopWatch.module.scss';
import { clearInterval } from 'stompjs';
import { convertMillisecondsToTime, timerFormatter } from '@/utils/timer';
import { instance } from '@/api/instance';
import { HelpDto, Sender } from '@/types/Help';

const getStartTime = () => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('startTime');
};

const StopWatch = () => {
  const [timeLap, setTimeLap] = useState(0);
  const { data: session } = useSession();

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

    const defaultNumber: number = 0;

    const sender: Sender = {
      email: session?.user?.email ? session?.user?.email : 'null',
      image: session?.user?.image ? session?.user?.image : 'null',
      kakaoname: session?.user?.kakaoName ? session?.user?.kakaoName : 'null',
      solvedId: session?.user?.SolvedId ? session?.user?.SolvedId : 'null',
      nickname: session?.user?.name ? session?.user?.name : 'null',
      exp: session?.user?.userExp ? session?.user?.userExp : defaultNumber,
    };

    const helpDto: HelpDto = {
      title: localStorage.getItem('title') ?? 'null',
      num: Number(localStorage.getItem('problemNumber')),
      content: localStorage.getItem('content') ?? 'null',
    };

    const data = {
      sender,
      helpDto,
    };
    instance
      .delete<Sender>('/help/waitqueue', { data })
      // eslint-disable-next-line no-console
      .catch(Err => console.error(Err));
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
