import Link from 'next/link';
import Image from 'next/image';
import styles from '@/components/Help/QuestionList/QuestionBoard.module.scss';

interface IProblemData {
  nickname: string;
  title: string;
  recommend: number;
  registDate: string;
  id: string;
}

// 데이터 props으로 받아오기
const QuestionBoard = ({ problemData }: { problemData: IProblemData }) => {
  return (
    <Link href={`/help/question-list/${problemData.id}`}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.writer}>{problemData.nickname}</div>
          <div className={styles.title}>{problemData.title}</div>
          <div className={styles.recommend}>
            <Image
              src="/images/help/recommend.png"
              alt="좋아요"
              height={24}
              width={24}
            />
            ({problemData.recommend})
          </div>
        </div>
        <div className={styles.date}>{problemData.registDate}</div>
      </div>
    </Link>
  );
};
export default QuestionBoard;
