/* eslint-disable @typescript-eslint/no-misused-promises */

'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { UserInfo } from '@/types/UserInfo';

const Button = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    const kakaoLogin = async () => {
      if (session) {
        try {
          const { user: userData } = session;
          if (isFetching) {
            return;
          }
          setIsFetching(true);

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/member/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
              },
              body: JSON.stringify(userData),
            },
          );

          // 신규회원 회원가입 페이지로 이동
          if (response.ok) {
            router.push('/signup');
          } else {
            // 기존 회원은 로그인 요청 후 바로 라우팅
            const { name, email } = session.user;
            const loginResponse = await fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ username: name, password: email }),
              },
            );

            if (loginResponse.ok) {
              const token = loginResponse.headers.get('Authorization');
              // 토큰 담아서 회원 정보 요청
              const userDataResponse = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/member/info`,
                {
                  method: 'GET',
                  headers: {
                    Authorization: token as string,
                  },
                },
              );
              const userInfo = (await userDataResponse.json()) as UserInfo;

              await update({
                action: 'logIn',
                user: {
                  name: userInfo.nickname,
                  image: userInfo.imageUrl,
                  jwtToken: token,
                  kakaoName: name,
                  SolvedId: userInfo.solvedId,
                  email,
                  userExp: userInfo.exp,
                },
              });

              router.push('/');
            }
          }
        } catch (error) {
          alert('로그인 실패');
        }
      }
    };

    if (session) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      kakaoLogin();
    }
  }, [session, router]);

  return (
    <>
      <button onClick={() => signIn('kakao')} style={{ zIndex: 1 }}>
        <Image
          src="/images/kakao/kakao_login_button.png"
          width={300}
          height={45}
          alt="kakao login button"
          priority
        />
      </button>
    </>
  );
};

export default Button;
