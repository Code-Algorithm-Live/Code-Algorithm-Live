'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useTimer from '@/hooks/useTimer';
import {
  convertMillisecondsToTime,
  convertMinutesToMilliseconds,
  timerFormatter,
} from '@/utils/timer';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.24px;
  color: var(--editorTypo, #e2e1e1);

  .timer {
    & > span {
      margin-right: 4px;
    }
    .time {
      width: 45px;
    }
  }
`;

const ExtentionButton = styled.button`
  width: 86px;
  height: 34px;

  background: var(--editorPoint, #6072a3);
  color: var(--editorSub, #343746);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.21px;

  &:disabled {
    opacity: 40%;
  }
`;

const END_TIME = 0;
const REMAIN_TIME = convertMinutesToMilliseconds(9); // 연장하기 버튼이 활성화 되는 시간
const EXTEND_TIME = 30; // 연장 시간

const Timer = () => {
  const { time, increaseTime, clearTimer } = useTimer({ initMinutes: 10 });
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    // 남은시간이 REMAIN_TIME이하면 연장 가능
    if (time <= REMAIN_TIME) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }

    // 타이머 종료
    if (time === END_TIME) {
      clearTimer();
    }
  }, [clearTimer, time]);

  const handleExtandTime = () => {
    // EXTEND_TIME 만큼 남은시간 증가
    increaseTime(EXTEND_TIME);
  };

  const { hours, minutes, seconds } = convertMillisecondsToTime(time);
  const timer = timerFormatter({ hours, minutes, seconds });

  return (
    <Container>
      <div className="timer">
        <span>남은시간</span>
        <span className="time">{timer}</span>
      </div>
      <ExtentionButton disabled={isDisabled} onClick={handleExtandTime}>
        연장하기
      </ExtentionButton>
    </Container>
  );
};
export default Timer;
export { timerFormatter };
