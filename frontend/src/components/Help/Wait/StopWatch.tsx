'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { clearInterval } from 'stompjs';
import style from '@/components/Help/Wait/StopWatch.module.scss';
import { convertMillisecondsToTime, timerFormatter } from '@/utils/timer';
import { instance } from '@/api/instance';
import { HelpDto, Sender } from '@/types/Help';
import useProblemInfoStore from '@/store/problemInfo';
import useProblemNumberStore from '@/store/problemNumber';
import useHelpRequestStore from '@/store/helpRequest';
import useStopwatchStore from '@/store/stopWatch';

const StopWatch = () => {
  const { removeHelpRequestTime } = useHelpRequestStore();
  const router = useRouter();
  const { zustandStartTime, removeStartTime } = useStopwatchStore();
  const { data: session } = useSession();
  const startTime = zustandStartTime;
  const [timeLap, setTimeLap] = useState(Date.now() - startTime);
  const { zustandContent, zustandTitle, removeTitle, removeContent } =
    useProblemInfoStore();
  const { zustandProblemNumber, removeNumber } = useProblemNumberStore();

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
    removeContent();
    removeTitle();
    removeNumber();
    removeStartTime();
    removeHelpRequestTime();

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
      title: zustandTitle ?? 'null',
      num: Number(zustandProblemNumber),
      content: zustandContent ?? 'null',
    };

    const data = {
      sender,
      helpDto,
    };
    // TODO: 연결한 서버 체크 못함(등록 500 에러로)
    instance
      .delete<Sender>('/help/waitqueue', { data })
      // eslint-disable-next-line no-console
      .catch(Error => console.error(Error));

    router.push('/');
  };
  return (
    <div className={style.StopWatch}>
      <p className={style.state}>기다리는 중</p>
      {startTime !== 0 && (
        <div className={style.time}>
          <span>경과시간 </span>
          <span className="time">{time}</span>
        </div>
      )}
      <div className={style.buttons}>
        <button
          className={style.button}
          onClick={() => {
            router.push('/help/edit');
          }}
        >
          수정하기
        </button>
        <button className={style.button} onClick={handleClickCancel}>
          취소하기
        </button>
      </div>
    </div>
  );
};
export default StopWatch;
