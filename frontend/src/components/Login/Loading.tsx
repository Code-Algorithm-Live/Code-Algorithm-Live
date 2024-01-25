import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';

interface LoadingProps {
  code?: string;
}

const Loading: React.FC<LoadingProps> = props => {
  const router = useRouter();
  const { code } = props;

  useEffect(() => {
    const kakaoLogin = async () => {
      await axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI}/?code=${code}`,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          // 'Access-Control-Allow-Origin': '*',
        },
      }).then(res => {
        console.log(res);
      });
    };
    kakaoLogin();
  }, [code]);
  return (
    <>
      <p>로그인 중입니다(대충 코알라 로딩)</p>
      <Image
        src="/images/coala/smile.png"
        width={300}
        height={300}
        alt="coala smile image"
      />
    </>
  );
};

export default Loading;
