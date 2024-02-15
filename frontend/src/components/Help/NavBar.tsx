import Image from 'next/image';
import { useRouter } from 'next/navigation';
import style from '@/components/Help/NavBar.module.scss';

interface INavBarProps {
  sort: string;
  pushPage: string;
}
function NavBar({ sort, pushPage }: INavBarProps) {
  const router = useRouter();

  const handleClick = () => {
    if (pushPage === 'wait') {
      router.push('/help/wait');
    } else {
      router.push('/help/question-list');
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
