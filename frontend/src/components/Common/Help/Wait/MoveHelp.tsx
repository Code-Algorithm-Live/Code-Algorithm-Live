import Image from 'next/image';
import Link from 'next/link';
import style from './MoveHelp.module.scss';

type MoveProps = {
  children: string;
};
const MoveHelp = ({ children }: MoveProps) => {
  // 문제 번호 받기
  const problemNumber: number = 1533;
  let move: string;
  if (children === '도움 요청하기') {
    move = 'user-list';
  } else if (children === '질문 히스토리 보기') {
    move = 'question-list';
  } else {
    move = 'hint';
  }

  return (
    <Link href={`/help/${move}`}>
      <div className={style.form}>
        <p className={style.number}>{problemNumber}</p>
        <p className={style.sort}>{children}</p>
        <Image
          className={style.moveImage}
          src={`/images/waitPageMove/${children}.png`}
          alt={`${children}`}
          width={118}
          height={118}
        ></Image>
      </div>
    </Link>
  );
};
export default MoveHelp;
