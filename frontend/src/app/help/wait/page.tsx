'use client';

import StopWatch from '@/components/Common/Help/Wait/StopWatch';
import Coala from '@/components/Common/Help/Wait/Coala';
import MoveHelp from '@/components/Common/Help/Wait/MoveHelp';
import style from '@/components/Common/Help/Wait/HelpWaitPage.module.scss';

export default function Wait() {
  return (
    <div className={style.page}>
      <StopWatch />
      <Coala />
      <p>기다리는 동안..</p>
      <div className={style.moveButton}>
        <MoveHelp>도움 요청하기</MoveHelp>
        <MoveHelp>질문 히스토리 보기</MoveHelp>
        <MoveHelp>GPT한테 물어보기</MoveHelp>
      </div>
    </div>
  );
}
