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

/** 밀리초를 00:00:00 형식으로 포맷팅 */
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

export {
  convertMillisecondsToTime,
  convertMinutesToMilliseconds,
  timerFormatter,
};
