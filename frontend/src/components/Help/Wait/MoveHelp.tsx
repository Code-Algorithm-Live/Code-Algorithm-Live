import Image from 'next/image';
import Link from 'next/link';
import style from '@/components/Help/Wait/MoveHelp.module.scss';

type MoveProps = {
  text: string;
  problemNumber: string;
};
const MoveHelp = ({ text, problemNumber }: MoveProps) => {
  // 문제 번호 받기
  let move: string;
  if (text === '도움 요청하기') {
    move = 'user-list';
  } else if (text === '질문 히스토리 보기') {
    move = 'question-list';
  } else {
    move = 'hint';
  }

  return (
    <Link href={`/help/${move}`}>
      <div className={style.form}>
        <p className={style.number}>{problemNumber}번 문제</p>
        <p className={style.sort}>{text}</p>
        <Image
          className={style.moveImage}
          src={`/images/waitPageMove/${text}.png`}
          alt={`${text}`}
          width={118}
          height={118}
        ></Image>
      </div>
    </Link>
  );
};
export default MoveHelp;
