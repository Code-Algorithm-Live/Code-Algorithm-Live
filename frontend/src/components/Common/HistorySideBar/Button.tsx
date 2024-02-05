import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const StyledButton = styled.button`
  border-radius: 10px;
  height: 45px;
  margin-bottom: 0px;
  background-color: var(--sub-color);

  font-family: Pretendard;
  font-size: 18px;
  font-weight: 400;
  color: var(--white-color);
`;

const Button = () => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push('/help');
  };
  return <StyledButton onClick={handleButtonClick}>질문하기</StyledButton>;
};

export default Button;
