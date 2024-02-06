'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { convertMinutesToMilliseconds } from '@/utils/timer';

/**
 *
 * @param param
 * @property initMinutes: 시작 분
 * @returns
 */
const useTimer = ({ initMinutes }: { initMinutes: number }) => {
  const [time, setTime] = useState(convertMinutesToMilliseconds(initMinutes));
  const timerRef = useRef<NodeJS.Timeout>();

  // 타이머 시작
  const startTimer = () => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setTime(prev => prev - 1000);
    }, 1000);
  };

  /**
   * minutes 만큼 타이머를 연장합니다.
   * @param minutes
   * @returns
   */
  const increaseTime = (minutes: number) => {
    setTime(prev => prev + convertMinutesToMilliseconds(minutes));
    if (time === 0) {
      timerRef.current = undefined;
      startTimer();
    }
  };

  const clearTimer = useCallback(() => {
    clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    startTimer();

    // 타이머 클린 업
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  return { time, clearTimer, increaseTime };
};

export default useTimer;
