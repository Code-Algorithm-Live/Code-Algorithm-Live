import Link from 'next/link';
import styles from '@/components/Help/QuestionList/QuestionBoard.module.scss';
import { HistoryList } from '@/types/Chat';

// 데이터 props으로 받아오기
const QuestionBoard = ({ problemData }: { problemData: HistoryList }) => {
  const date: string = problemData.LocalDateTiem.substring(0, 10);
  return (
    <Link href={`/help/question-list/${problemData.roomId}`}>
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
