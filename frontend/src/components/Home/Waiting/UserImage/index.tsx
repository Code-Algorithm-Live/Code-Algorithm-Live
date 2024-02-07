'use client';

import Image from 'next/image';
import styled from 'styled-components';

interface IUser {
  memberExp: number;
  nickname: string;
  url: string;
}

const Container = styled.div`
  position: relative;
`;
const ImageContainer = styled(Image)`
  border-radius: 50%;
  padding: 5px;
  width: 80px;
  height: 80px;
`;

const LevelContainer = styled(Image)`
  position: absolute;
  width: 40px;
  height: 40px;
  right: -15px;
  top: -4px;
  rotate: 30deg;
`;

const UserImage = ({ userData }: { userData: IUser }) => {
  function expToLevel(memberExp: number) {
    const 등급 = Math.floor(memberExp / 15);
    const 레벨 = memberExp % 15;
    return { 등급, 레벨 };
  }
  const updatedUserData = {
    ...userData,
    ...expToLevel(userData.memberExp),
  };
  return (
    <Container>
      <ImageContainer
        src={userData.url}
        alt={`${userData.nickname}.png`}
        width={70}
        height={70}
        priority
      />
      <LevelContainer
        src={`/images/userLevel/${updatedUserData.등급 + 1}.png`}
        alt="등급"
        width={50}
        height={50}
        priority
      />
    </Container>
  );
};

export default UserImage;
