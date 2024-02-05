import styled from 'styled-components';
import Link from 'next/link';
import IconNotice from '@assets/svgs/notice.svg';
import IconHistory from '@assets/svgs/history.svg';
import IconFreind from '@assets/svgs/freind.svg';
import IconSearch from '@assets/svgs/search.svg';
import { useSession } from 'next-auth/react';
import './Header.scss';

const ProfileImage = styled.div<{ $userImage: string }>`
  width: 25px;
  height: 25px;
  background-image: url(${({ $userImage }) => $userImage});
  background-position: center;
  background-size: cover;
  border: 2px solid var(--white-color);
  border-radius: 50%;
  cursor: pointer;
  transition: opacity 0.3s ease;
`;

export default function Nav() {
  const { data: session } = useSession();

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
          <Link href="/profile">
            <ProfileImage $userImage={session?.user?.image} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
