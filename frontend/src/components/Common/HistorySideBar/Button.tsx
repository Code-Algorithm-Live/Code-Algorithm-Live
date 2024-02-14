'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const StyledButton = styled.button`
  border-radius: 10px;
  height: 45px;
  width: 200px;
  margin-bottom: 0px;
  background-color: var(--sub-color);
  position: absolute;
  bottom: 10px;
  left: 20px;

  font-family: Pretendard;
  font-size: 18px;
  font-weight: 400;
  color: var(--white-color);

  transition: background-color 0.3s;

  &:hover {
    background-color: var(--sub-hover-color);
  }
`;

const Button = () => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push('/help');
  };
  return <StyledButton onClick={handleButtonClick}>질문하기</StyledButton>;
};

export default Button;
