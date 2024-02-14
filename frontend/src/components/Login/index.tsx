'use client';

import styled from 'styled-components';
import Text from '@/components/Login/Text';
import Coala from '@/components/Login/Coala';
import Button from '@/components/Login/Button';

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const BackgroundImage = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: -1;
  background-image: url('/images/loginBackground/loginBackground.jpg');
  background-size: cover;
  filter: brightness(0.3);
`;

const Mark = styled.div`
  position: absolute;
  color: var(--white-color);
  display: flex;
  width: 1200px;
  padding-top: 220px;
  justify-content: space-between;

  font-size: 100px;
  font-weight: 200;
  text-shadow: 0px 0px 5px var(--white-color);
`;

export default function Login() {
  return (
    <>
      <Container>
        <BackgroundImage />
        <Mark>
          <span>&lt;</span>
          <span>/&gt;</span>
        </Mark>
        <Text />
        <Coala />
        <Button />
      </Container>
    </>
  );
}
