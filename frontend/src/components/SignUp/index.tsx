'use client';

import { styled } from 'styled-components';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Header from '@/components/SignUp/Header';
import ProfileImage from '@/components/SignUp/ProfileImage';
import Nickname from '@/components/SignUp/Nickname';
import SolvedId from '@/components/SignUp/SolvedId';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  gap: 30px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SignUp = () => {
  const { data } = useSession();
  const [userImage, setUserImage] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    if (data) {
      setUserImage(data?.user?.image || '');
      setUserName(data?.user?.name || '');
    }
  }, [data]);

  return (
    <>
      <Container>
        <Header />
        <ProfileImage userImage={userImage} />
        <InputBox>
          <Nickname userName={userName} />
          <SolvedId />
        </InputBox>
      </Container>
    </>
  );
};

export default SignUp;
