'use client';

import { signOut, useSession } from 'next-auth/react';

export default function Profile() {
  const { data: session } = useSession();
  const token = session?.user?.jwtToken;
  const RealSignOut = async () => {
    try {
      await fetch('http://localhost:8080/logout', {
        method: 'POST',
        headers: {
          Authorization: token as string,
        },
      });

      // 서버에서 로그아웃이 성공하면 클라이언트에서도 로그아웃
      signOut('kakao');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return <button onClick={RealSignOut}>로그아웃 버튼</button>;
}
