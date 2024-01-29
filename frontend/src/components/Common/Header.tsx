import Link from 'next/link';
import IconNotice from '@assets/svgs/notice.svg';
import IconHistory from '@assets/svgs/history.svg';
import IconFreind from '@assets/svgs/freind.svg';
import IconSearch from '@assets/svgs/search.svg';
import './Header.scss';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li className="home">
          <Link href="/">&lt;코알라/&gt;</Link>
        </li>
        <li>
          <Link href="/notice">
            <IconNotice />
          </Link>
        </li>
        <li>
          <Link href="/history">
            <IconHistory />
          </Link>
        </li>
        <li>
          <Link href="/">
            <IconFreind />
          </Link>
        </li>
        <li>
          <Link href="/">
            <IconSearch />
          </Link>
        </li>
        <li>
          <Link href="/">프로필</Link>
        </li>
      </ul>
    </nav>
  );
}
