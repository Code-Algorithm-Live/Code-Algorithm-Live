import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import { fetchProblemCrawl } from '@/api/chat';
import styles from '@/components/Chat/ProblemView/style.module.scss';
import useHelpFromStore from '@/store/helpForm';

const ProblemView = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [eleOffset, setEleOffset] = useState<{
    width: number;
    height: number;
  }>();
  const { helpForm } = useHelpFromStore();
  const { data: problemSrc, isLoading } = useQuery({
    queryKey: [helpForm],
    queryFn: () =>
      fetchProblemCrawl({ problemId: helpForm!.helpDto.num.toString() }),
  });

  useEffect(() => {
    if (!containerRef.current) return;

    setEleOffset({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });
  }, []);

  // if (isLoading) return <>로딩중입니다.</>;
  return (
    <div className={styles.container} ref={containerRef}>
      {isLoading && (
        <div
          style={{
            width: `${eleOffset?.width}px`,
            height: `${eleOffset?.height}px`,
          }}
        >
          로딩중입니다.
        </div>
      )}
      {!isLoading && (
        <iframe
          width={eleOffset?.width}
          height={eleOffset?.height}
          srcDoc={problemSrc?.data}
        />
      )}
    </div>
  );
};

export default ProblemView;
