'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const Button = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isFetching, setIsFetching] = useState();
  useEffect(() => {
    const kakaoLogin = async () => {
      if (session) {
        try {
          const { user: userDate } = session;
          if (isFetching) {
            return;
          }
          setIsFetching(true);
          const response = await axios({
            method: 'POST',
            url: 'http://localhost:8080/member/login',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
            data: userDate,
          });
          if (response.data === true) {
            router.push('/');
          } else {
            router.push('/signup');
          }
        } catch (error) {
          console.error('error', error);
        }
      }
    };

    if (session) {
      kakaoLogin();
    }
  }, [session, router]);
  return (
    <>
      <button onClick={() => signIn('kakao')} style={{ zIndex: 1 }}>
        <Image
          src="/images/kakao/kakao_login_button.png"
          width={300}
          height={300}
          alt="kakao login button"
          priority
        />
      </button>
      <button onClick={() => signOut()} style={{ zIndex: 1 }}>
        로그아웃
      </button>
    </>
  );
};

export default Button;
