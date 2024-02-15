'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import StopWatch from '@/components/Help/Wait/StopWatch';
import Coala from '@/components/Help/Wait/Coala';
import MoveHelp from '@/components/Help/Wait/MoveHelp';
import style from '@/components/Help/Wait/index.module.scss';
import useProblemNumberStore from '@/store/problemNumber';

export default function Wait() {
  const { zustandProblemNumber } = useProblemNumberStore();
  const router = useRouter();
  const problemNumber = zustandProblemNumber;
  useEffect(() => {
    if (!problemNumber) {
      router.push('/help');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemNumber]);

  return (
    <div className={style.page}>
      <StopWatch />
      <Coala />
      <p className={style.text}>기다리는 동안..</p>
      <div className={style.moveButton}>
        <MoveHelp problemNumber={problemNumber} text="도움 요청하기"></MoveHelp>
        <MoveHelp
          problemNumber={problemNumber}
          text="질문 히스토리 보기"
        ></MoveHelp>
      </div>
    </div>
  );
}
