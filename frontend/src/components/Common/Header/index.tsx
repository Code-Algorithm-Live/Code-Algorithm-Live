'use client';

/* eslint-disable @typescript-eslint/no-misused-promises */

import styled from 'styled-components';
import Link from 'next/link';
import IconNotice from '@assets/svgs/notice.svg';
import IconHistory from '@assets/svgs/history.svg';
import { signOut, useSession } from 'next-auth/react';

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  background-color: var(--main-color);
  width: 100%
  min-width: 350px;
  height: 48px;
  position: relative;
`;

const IconContainer = styled.div`
  display: flex;
  margin-left: auto;
`;

const Coala = styled.div`
  width: 70px;
  height: 30px;
  color: var(--white-color);
  font-family: var(--pretendard);
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--main-hover-color);
  }
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
`;

const Item = styled.div`
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--main-hover-color);
  }
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 9px 5px;
  margin-left: auto;
`;

const ProfileImage = styled.div<{ $userImage: string | undefined }>`
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

  const token = session?.user?.jwtToken;
  const RealSignOut = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/member/logout`,
        {
          method: 'POST',
          headers: {
            Authorization: token as string,
          },
        },
      );

      // 서버에서 로그아웃이 성공하면 클라이언트에서도 로그아웃
      if (response.ok) {
        await signOut();
      } else {
        alert('로그아웃 실패');
      }
    } catch (error) {
      alert('로그아웃 실패');
    }
  };
  return (
    <NavContainer>
      <Coala>
        <Link href="/">&lt;코알라/&gt;</Link>
      </Coala>
      <IconContainer>
        <Item>
          <Link href="/notice">
            <IconNotice />
          </Link>
        </Item>
        <Item>
          <Link href="/history">
            <IconHistory />
          </Link>
        </Item>
        <Item>
          <Link href="/profile">
            <ProfileImage $userImage={session?.user?.image} />
          </Link>
        </Item>
        <button onClick={RealSignOut}>로그아웃 버튼</button>
      </IconContainer>
    </NavContainer>
  );
}
