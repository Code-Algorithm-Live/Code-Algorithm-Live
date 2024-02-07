'use client';

import UserInfo from '@/components/Help/UserList/UserInfo';
import styles from '@/components/Help/UserList/UserHelp.module.scss';
import { HPReceiver } from '@/types/HelpMatching';
import { Receiver, HelpDto, RoomUuid, Sender } from '@/types/Help';
import { instance } from '@/api/instance';
import { generateUUID } from '@/utils/uuid';
import { useSession } from 'next-auth/react';

interface IHelpUser {
  userData: HPReceiver;
  mainLanguage: string;
}

interface IFetchPostHelp {
  sender: Sender;
  receiver: Receiver;
  roomUuid: RoomUuid;
  helpDto: HelpDto;
}

interface IData {
  nickname: string;
  memberExp: number;
  url: string;
}

const UserHelp = ({ userData, mainLanguage }: IHelpUser) => {
  const data: IData = {
    nickname: userData.nickname,
    memberExp: userData.exp,
    url: userData.image,
  };

  // TODO: 도움 요청 여부 저장

  const receiverData: Receiver = {
    nickname: userData.nickname,
    email: userData.email,
    solvedId: userData.solvedId,
    kakaoname: userData.kakaoname,
    image: userData.image,
  };

  const roomUuidData: RoomUuid = generateUUID();

  const senderData: Sender = {
    email: session?.user?.email,
    image: session?.user?.image,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    kakaoname: session?.user?.kakaoName,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    solvedId: session?.user?.SolvedId,
    nickname: session?.user?.name,
  };

  const middleTitle = localStorage.getItem('title');
  const middleContent = localStorage.getItem('content');

  const helpDtoData: HelpDto = {
    title: middleTitle == null ? 'no title' : middleTitle,
    num: Number(localStorage.getItem('num')),
    content: middleContent == null ? 'no content' : middleContent,
  };

  // TODO: 클릭시 서버와 주스탠드 연결, 클래스 이름 바꾸기

  const handleClick = () => {
    const postHelpData: IFetchPostHelp = {
      sender: senderData,
      receiver: receiverData,
      roomUuid: roomUuidData,
      helpDto: helpDtoData,
    };
    instance
      .post<IFetchPostHelp>('/help/send', postHelpData)
      .catch(Err => console.error(Err));
  };
  return (
    <div className={styles.container}>
      <UserInfo userData={data} mainLanguage={mainLanguage} />
      <button className={styles.help} onClick={handleClick}>
        도움 요청하기
      </button>
    </div>
  );
};

export default UserHelp;
