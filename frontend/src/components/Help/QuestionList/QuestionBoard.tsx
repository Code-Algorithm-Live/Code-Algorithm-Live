import Link from 'next/link';
import { useEffect } from 'react';
import styles from '@/components/Help/QuestionList/QuestionBoard.module.scss';
import { HistoryList } from '@/types/Chat';
import useHistoryProblemStore from '@/store/historyProblem';

// 데이터 props으로 받아오기
const QuestionBoard = ({ problemData }: { problemData: HistoryList }) => {
  const {
    setZustandHistorySender,
    setZustandHistoryNumber,
    setZustandHistoryTitle,
    setZustandHistoryContent,
  } = useHistoryProblemStore();
  const date = problemData.date.substring(0, 10);

  useEffect(() => {
    setZustandHistoryContent(problemData.content);
    setZustandHistoryNumber(problemData.problemId);
    setZustandHistorySender(problemData.sender);
    setZustandHistoryTitle(problemData.title);
  }, [
    problemData.content,
    problemData.problemId,
    problemData.sender,
    problemData.title,
    setZustandHistoryContent,
    setZustandHistoryNumber,
    setZustandHistorySender,
    setZustandHistoryTitle,
  ]);

  return (
    <Link href={`/help/question-list/question?roomId=${problemData.roomId}`}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.writer}>{problemData.sender}</div>
          <div className={styles.title}>{problemData.title}</div>
        </div>
        <div className={styles.date}>{date}</div>
      </div>
    </Link>
  );
};
export default QuestionBoard;
