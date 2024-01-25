'use client';

import '@/styles/reset.css';
import Nav from '@/components/Common/Header';
import { signOut } from 'next-auth/react';

export default function Home() {
  return (
    <>
      <Nav />
      <button onClick={() => signOut('kakao')}>로그아웃</button>
    </>
  );
}
