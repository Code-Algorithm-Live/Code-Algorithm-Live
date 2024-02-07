'use client';

import StopWatch from '@/components/Help/Wait/StopWatch';
import Coala from '@/components/Help/Wait/Coala';
import MoveHelp from '@/components/Help/Wait/MoveHelp';
import style from '@/components/Help/Wait/index.module.scss';

export default function Wait() {
  return (
    <div className={style.page}>
      <StopWatch />
      <Coala />
      <p>기다리는 동안..</p>
      <div className={style.moveButton}>
        <MoveHelp text="도움 요청하기"></MoveHelp>
        <MoveHelp text="질문 히스토리 보기"></MoveHelp>
        <MoveHelp text="GPT한테 물어보기"></MoveHelp>
      </div>
    </div>
  );
}
