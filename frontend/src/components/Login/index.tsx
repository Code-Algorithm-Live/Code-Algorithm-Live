'use client';

import styled from 'styled-components';
import Text from '@/components/Login/Text';
import Coala from '@/components/Login/Coala';
import Button from '@/components/Login/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Login() {
  return (
    <>
      <Container>
        <Text />
        <Coala />
        <Button />
      </Container>
    </>
  );
}
