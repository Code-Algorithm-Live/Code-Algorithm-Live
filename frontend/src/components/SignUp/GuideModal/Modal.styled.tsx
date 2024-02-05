import styled from 'styled-components';

const ShadowDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.58);
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  height: 40px;
  padding: 0 22px;
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;

  background: transparent;
  border: none;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  padding: 10px 8px;
  min-width: 500px;
  min-height: 200px;
  border-radius: 25px;

  background: #fff;
`;

const Body = styled.div`
  flex-grow: 1;

  width: 100%;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;

  padding: 0 34px;
  height: 50px;
`;

const CoreModal = {
  Container,
  Header,
  Body,
  Footer,
  ShadowDrop,
};

export default CoreModal;

export { CloseButton };
