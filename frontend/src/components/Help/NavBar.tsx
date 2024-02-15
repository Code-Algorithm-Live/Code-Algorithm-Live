import Image from 'next/image';
import { useRouter } from 'next/navigation';
import style from '@/components/Help/NavBar.module.scss';

interface INavBarProps {
  sort: string;
}
function NavBar({ sort }: INavBarProps) {
  const router = useRouter();

  const handleClick = () => {
    if (sort === '질문히스토리 보기') {
      router.push('/help/question-list');
    } else {
      router.push('/help/wait');
    }
  };
  return (
    <div className={style.bar}>
      <button onClick={handleClick}>
        <Image
          className={style.image}
          src="/images/waitPageMove/GoBack.png"
          alt="뒤로가기"
          width={28}
          height={26}
        ></Image>
      </button>
      <p className={style.title}>{sort}</p>
      <p>{''}</p>
    </div>
  );
}

export default NavBar;
