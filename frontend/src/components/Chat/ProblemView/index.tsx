import { useEffect, useRef, useState } from 'react';
import styles from '@/components/Chat/ProblemView/style.module.scss';
import { srcDoc } from './srcDoc';

const ProblemView = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [eleOffset, setEleOffset] = useState<{
    width: number;
    height: number;
  }>();

  useEffect(() => {
    if (!containerRef.current) return;

    setEleOffset({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <iframe
        width={eleOffset?.width}
        height={eleOffset?.height}
        srcDoc={srcDoc}
      />
    </div>
  );
};

export default ProblemView;
