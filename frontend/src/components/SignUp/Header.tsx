import { styled } from 'styled-components';

const Message = styled.div`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.36px;
`;

const Header = () => {
  return <Message>회원가입</Message>;
};

export default Header;
