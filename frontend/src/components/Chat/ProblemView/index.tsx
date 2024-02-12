import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import { fetchProblemCrawl } from '@/api/chat';
import styles from '@/components/Chat/ProblemView/style.module.scss';
import useHelpFromStore from '@/store/helpForm';

const disableClick = (document: Document) => {
  document.body.addEventListener('click', e => e.preventDefault());
};

const ProblemView = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
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

  useEffect(() => {
    if (!problemSrc) return;

    const iframe = iframeRef.current;
    if (iframe && problemSrc) {
      iframe.srcdoc = problemSrc.data as unknown as string;
      iframe.onload = () => {
        const contentDoc = iframe?.contentDocument;
        if (contentDoc) {
          disableClick(contentDoc);
        }
      };
    }
  }, [problemSrc]);

  return (
    <div
      className={styles.container}
      ref={containerRef}
      style={{ position: 'relative' }}
    >
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
        <div
          style={{
            width: `${eleOffset?.width}px`,
            height: `${eleOffset?.height}px`,
            overflow: 'scroll',
          }}
        >
          <iframe
            ref={iframeRef}
            height={eleOffset?.height}
            style={{ height: '100%', width: '100%' }}
          />
        </div>
      )}
    </div>
  );
};

export default ProblemView;
