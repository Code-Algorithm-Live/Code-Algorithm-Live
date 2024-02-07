import { styled } from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';
import JSConfetti from 'js-confetti';
import Link from 'next/link';
import Image from 'next/image';

interface GuideTextProps {
  solvedId: string;
  uuid: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px 50px 0px;
`;

const HeaderContainer = styled.div`
  display: flex;
  padding: 30px 0px;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const Header = styled.span`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.36px;
`;

const BodyContainer = styled.div`
  display: flex;
  padding: 30px 0px;
  flex-direction: column;
  align-items: center;
  gap: 3px;
`;

const Body = styled.span`
  display: block;
  font-size: 20px;
  font-weight: 700;
`;

const FooterContainer = styled.div`
  display: flex;
  padding: 30px 0px;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Footer = styled.span`
  font-size: 14px;
  font-weight: 400;
`;

const LinkButton = styled.button`
  width: 60px;
  height: 25px;
  border-radius: 5px;
  font-size: 12px;
  background-color: var(--main-color);
  color: var(--white-color);
  &:hover {
    background-color: var(--main-hover-color);
  }
`;

const CopyButton = styled.button<{ $isCopied: boolean }>`
  width: ${({ $isCopied }) => ($isCopied ? '50px' : '60px')};
  height: 25px;
  border-radius: 5px;
  font-size: 12px;
  border: ${({ $isCopied }) =>
    $isCopied ? 'none' : 'var(--main-font-color) 1px solid'};
  background-color: ${({ $isCopied }) =>
    $isCopied ? 'var(--main-color)' : 'var(--white-color)'};
  color: ${({ $isCopied }) =>
    $isCopied ? 'var(--white-color)' : 'var(--main-font-color)'};
  &:hover {
    background-color: ${({ $isCopied }) =>
      $isCopied ? 'none' : 'var(--white-hover-color)'};
    color: ${({ $isCopied }) =>
      $isCopied ? 'var(--white-color)' : 'var(--white-color)'};
    border: ${({ $isCopied }) => ($isCopied ? 'none' : 'none')};
  }
`;

const Uuid = styled.span`
  font-size: 22px;
  font-weight: 800;
`;

const GuideText: React.FC<GuideTextProps> = ({ solvedId, uuid }) => {
  const profileLink = `https://solved.ac/profile/${solvedId}`;
  const [isCopied, setIsCopied] = useState(false);
  const [isdisabled, setIsdisabled] = useState(false);
  const jsConfetti = new JSConfetti();
  const handleClick = async () => {
    await jsConfetti.addConfetti({
      confettiColors: [
        '#ff0a54',
        '#ff477e',
        '#ff7096',
        '#ff85a1',
        '#fbb1bd',
        '#f9bec7',
      ],
      confettiRadius: 5,
      confettiNumber: 500,
    });
  };
  const handleCopyClick = () => {
    setIsCopied(true);
    setIsdisabled(true);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleClick();
  };

  return (
    <Container>
      <HeaderContainer>
        <Image
          src="/images/solved/logo.png"
          width={200}
          height={200}
          alt="kakao login button"
          style={{ width: '100%', height: 'auto' }}
          priority
        />
        <Header>연동하기</Header>
      </HeaderContainer>
      <BodyContainer>
        <Body>Solved.ac 사이트에 접속해, </Body>
        <Body>상태 메시지에 다음 문자를 입력한 후</Body>
        <Body>확인 버튼을 눌러주세요.</Body>
      </BodyContainer>
      <FooterContainer>
        <Footer>
          설정 방법 : Solved.ac 사이트 접속 &gt; 로그인 &gt; 프로필 편집
        </Footer>
        <Link href={profileLink} target="_blank" rel="noopener noreferrer">
          <LinkButton>바로가기</LinkButton>
        </Link>
      </FooterContainer>
      <FooterContainer>
        <Uuid>{uuid}</Uuid>
        <CopyToClipboard text={uuid} onCopy={handleCopyClick}>
          <CopyButton
            $isCopied={isCopied}
            onClick={() => {
              setIsCopied(true);
            }}
            disabled={isdisabled}
          >
            {isCopied ? '복사됨!' : '문자 복사'}
          </CopyButton>
        </CopyToClipboard>
      </FooterContainer>
    </Container>
  );
};

export default GuideText;
