'use client';

import { v4 as uuidv4 } from 'uuid';
import { styled } from 'styled-components';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/SignUp/Header';
import ProfileImage from '@/components/SignUp/ProfileImage';
import Nickname from '@/components/SignUp/Nickname';
import SolvedId from '@/components/SignUp/SolvedId';
import CheckButton from '@/components/SignUp/CheckButton';
import GuideModal from '@/components/SignUp/GuideModal';
import GuideText from '@/components/SignUp/GuideModal/GuideText';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  gap: 30px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const SignUp = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [userImage, setUserImage] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [isUnique, setIsUnique] = useState<boolean>(true);
  const [isInputId, setIsInputId] = useState<boolean>(false);
  const [shouldEnableButton, setShouldEnableButton] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);
  const [uuid, setUuid] = useState<string>('');
  const solvedIdRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  // userImage 상태 업데이트 함수
  const handleUserImageChange = (newUserImage: string) => {
    setUserImage(newUserImage);
  };

  // 닉네임의 중복 여부 확인
  const handleSuccessFetchData = (unique: boolean) => {
    setIsUnique(unique);
  };

  // solved ID가 공백이 아닌 값이 입력됐는지 확인
  const handleCheckInput = () => {
    if (solvedIdRef.current?.value && solvedIdRef.current?.value.trim()) {
      setIsInputId(true);
    } else {
      setIsInputId(false);
    }
  };

  // 확인 버튼 클릭 이벤트
  const clickModal = () => {
    const newUuid = uuidv4().substring(0, 7);
    setShowModal(!showModal);
    setUuid(newUuid);
  };

  const fetchProfile = async (id: string): Promise<string> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/member/auth/${id}`,
        {
          method: 'GET',
        },
      );
      const returnData = await response.text();
      return returnData;
    } catch (error) {
      return '';
    }
  };
  const sendProfileDataToBackend = async (
    email: string,
    image: string,
    kakaoname: string,
    nickname: string,
    solvedId: string,
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/member/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            image,
            kakaoname,
            nickname,
            solvedId,
          }),
        },
      );

      if (response.ok && session) {
        //  회원가입이 완료된 경우 로그인 요청
        const { name, email }: { name: string; email: string } = session.user;
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
          const userInfo = await userDataResponse.json();

          await update({
            action: 'logIn',
            name: userInfo.nickname,
            image: userInfo.imageUrl,
            jwtToken: token,
            kakaoName: name,
            SolvedId: userInfo.solvedId,
          });

          await router.push('/');
        }
      } else {
        alert('로그인 실패');
      }
    } catch (error) {
      alert('로그인 실패');
      console.error('Error:', error);
    }
  };

  // 모달 내에서 최종 확인 이벤트
  const clickCheckButton = async () => {
    if (nicknameRef.current?.value && solvedIdRef.current?.value) {
      const profileMessage = await fetchProfile(solvedIdRef?.current?.value);

      if (profileMessage === uuid) {
        // 회원가입(DB에 데이터 저장) 후, 홈으로 이동

        await sendProfileDataToBackend(
          userEmail,
          userImage,
          userName,
          nicknameRef.current.value,
          solvedIdRef.current.value,
        );
      }
    }
  };

  useEffect(() => {
    if (session) {
      setUserImage(session?.user?.image || '');
      setUserName(session?.user?.name || '');
      setUserEmail(session?.user?.email || '');
    }
  }, []);

  // isInputId 또는 isUnique 값이 변경될 때마다 버튼 활성화 여부 체크
  useEffect(() => {
    if (!isUnique && isInputId) {
      setShouldEnableButton(true);
    } else {
      setShouldEnableButton(false);
    }
  }, [isUnique, isInputId]);

  return (
    <>
      <Container>
        <Header />
        <ProfileImage
          userImage={userImage}
          onUserImageChange={handleUserImageChange}
        />
        <InputBox>
          <Nickname
            userName={userName}
            inputRef={nicknameRef}
            onSuceessFetchData={handleSuccessFetchData}
          />
          <SolvedId
            inputRef={solvedIdRef}
            handleCheckInput={handleCheckInput}
          />
          <CheckButton
            isDisabled={!shouldEnableButton}
            clickModal={clickModal}
          />
        </InputBox>
      </Container>
      <GuideModal
        open={showModal}
        onClose={clickModal}
        clickCheckButton={clickCheckButton}
      >
        <GuideText
          solvedId={solvedIdRef.current?.value as string}
          uuid={uuid}
        />
      </GuideModal>
    </>
  );
};

export default SignUp;
