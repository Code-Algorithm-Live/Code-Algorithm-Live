'use client';

import { useSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import UserInfo from '@/components/Help/UserList/UserInfo';
import styles from '@/components/Help/UserList/UserHelp.module.scss';
import { HPReceiver } from '@/types/HelpMatching';
import { Receiver, HelpDto, RoomUuid, Sender } from '@/types/Help';
import { instance } from '@/api/instance';
import { generateUUID } from '@/utils/uuid';
import { fetchSendHelp } from '@/api/match';
import useProblemNumberStore from '@/store/problemNumber';
import useProblemInfoStore from '@/store/problemInfo';
import useHelpRequestStore from '@/store/helpRequest';

interface IHelpUser {
  userData: HPReceiver;
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

const UserHelp = ({ userData }: IHelpUser) => {
  const { data: session } = useSession();
  const { zustandTitle, zustandContent } = useProblemInfoStore();
  const { zustandProblemNumber } = useProblemNumberStore();
  const {
    zustandHelpRequestTime,
    setZustandHelpRequestTime,
    requestList,
    addRequestList,
  } = useHelpRequestStore();

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
    exp: 0,
  };

  const roomUuidData: RoomUuid = generateUUID();

  const senderData: Sender = {
    email: session?.user?.email ?? ' ',
    image: session?.user?.image ?? ' ',
    kakaoname: session?.user?.kakaoName ?? ' ',
    solvedId: session?.user?.SolvedId ?? ' ',
    nickname: session?.user?.name ?? ' ',
    exp: session?.user?.userExp !== undefined ? session?.user?.userExp : 0,
  };

  const helpDtoData: HelpDto = {
    title: zustandTitle,
    num: Number(zustandProblemNumber),
    content: zustandContent,
  };

  const sendHelpMutation = useMutation({
    mutationFn: fetchSendHelp,
    // eslint-disable-next-line no-console
    onSuccess: result => console.log('data', result.data),
  });
  // TODO:클래스 이름 바꾸기
  const presentHelpRequest = zustandHelpRequestTime;
  const requestingHelp = requestList.includes(userData.nickname);
  const handleClick = () => {
    const updateHelpRequest = presentHelpRequest + 1;
    setZustandHelpRequestTime(updateHelpRequest);

    if (sendHelpMutation.isPending) return;

    sendHelpMutation.mutate({
      sender: senderData,
      receiver: receiverData,
      helpDto: helpDtoData,
      roomUuid: roomUuidData,
    });

    const postHelpData: IFetchPostHelp = {
      sender: senderData,
      receiver: receiverData,
      roomUuid: roomUuidData,
      helpDto: helpDtoData,
    };
    instance
      .post<IFetchPostHelp>('/help/send', postHelpData)
      .then(() => {
        addRequestList(userData.nickname);
      })
      // eslint-disable-next-line no-console
      .catch(Error => console.error(Error));
  };
  return (
    <div className={styles.container}>
      <UserInfo userData={data} />
      {presentHelpRequest >= 5 ? (
        <button className={styles.helped} onClick={handleClick} disabled>
          {sendHelpMutation.isPending && <>요청하는 중...</>}
          {!sendHelpMutation.isPending && <>요청하기</>}
        </button>
      ) : (
        <button
          className={requestingHelp ? styles.helped : styles.help}
          onClick={handleClick}
          disabled={requestingHelp}
        >
          {requestingHelp ? '요청 완료' : '요청하기'}
        </button>
      )}
    </div>
  );
};

export default UserHelp;
