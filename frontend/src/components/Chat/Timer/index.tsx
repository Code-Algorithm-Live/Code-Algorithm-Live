'use client';

import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

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

/** 분에서 밀리초로 변환 */
const convertMinutesToMilliseconds = (minutes: number) => minutes * 60 * 1000;

/** 밀리초를 시, 분, 초로 변환 */
const convertMillisecondsToTime = (milliseconds: number) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  return {
    hours: hours % 24, // 24시간 형식으로 표시
    minutes: minutes % 60,
    seconds: seconds % 60,
  };
};

/** 타이머 00:00:00 형식으로 포맷팅 */
const timerFormatter = ({
  hours,
  minutes,
  seconds,
}: {
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  const formatTimeUnit = (unit: number) => {
    if (unit > 9) return `${unit}`;
    return unit === 0 ? `00` : `0${unit}`;
  };

  let timer = hours === 0 ? '' : `${formatTimeUnit(hours)}:`;
  timer += `${formatTimeUnit(minutes)}:${formatTimeUnit(seconds)}`;

  return timer;
};

const END_TIME = 0;
const REMAIN_TIME = convertMinutesToMilliseconds(10); // 연장하기 버튼이 활성화 되는 시간
const EXTAND_TIME = convertMinutesToMilliseconds(10); // 연장 시간

const Timer = () => {
  const [timestamp, setTimestamp] = useState(convertMinutesToMilliseconds(3));
  const timerRef = useRef<NodeJS.Timeout>();
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    // 타이머 시작
    timerRef.current = setInterval(() => {
      setTimestamp(prev => prev - 1000);
    }, 1000);

    // 타이머 클린 업
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  // 타이머 종료
  if (timestamp === END_TIME) {
    clearInterval(timerRef.current);
  }

  useEffect(() => {
    // 남은시간이 REMAIN_TIME이하면 연장 가능
    if (timestamp <= REMAIN_TIME) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [timestamp]);

  const handleExtandTime = () => {
    // EXTAND_TIME 만큼 남은시간 증가
    setTimestamp(prev => prev + EXTAND_TIME);
  };

  const { hours, minutes, seconds } = convertMillisecondsToTime(timestamp);
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
