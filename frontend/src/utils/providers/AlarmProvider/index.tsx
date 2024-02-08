'use client';

import { Client, IMessage } from '@stomp/stompjs';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import ConfirmModal from '@/components/Common/Modal/ConfirmModal';
import { fetchAcceptHelp } from '@/api/match';
import { HelpForm } from '@/types/Help';
import { BROKER_URL } from '@/libs/stomp';
import useHelpFromStore from '@/store/helpForm';

const AUTHENTICATED = 'authenticated';

const StompProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [open, setIsOpen] = useState(false);
  const { helpForm, setHelpForm } = useHelpFromStore();
  const acceptRequestMutation = useMutation({ mutationFn: fetchAcceptHelp });
  const session = useSession(); // 사용자의 아이디

  const client = useRef(
    new Client({
      brokerURL: BROKER_URL,
    }),
  );

  useEffect(() => {
    if (session.status !== AUTHENTICATED) return;

    client.current.onConnect = () => {
      const email = session.data?.user.email;
      const subDestination = `/sub/queue/match/${email}`;

      console.log('연결 성공', BROKER_URL, subDestination);

      // 도움 요청이 왔는지 상시 확인
      client.current.subscribe(subDestination, response => {
        console.log('메세지가 왔음');

        const message = JSON.parse(
          response.body,
        ) as IMessage as unknown as HelpForm;

        console.log('message', message);

        // 매칭 완료
        if (message.success) {
          const onMatchSuccess = () => {
            router.push(`/chat?roomId=${message.roomUuid}`);
          };
          onMatchSuccess();
          return;
        }

        setHelpForm(message);
      });
    };

    client.current.activate();
  }, [router, session.status]);

  useEffect(() => {
    const disconnect = () => {
      // FIXME: 채팅방 종료가 되는지 확인
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      client.current.deactivate();
    };
    return () => disconnect();
  }, []);

  useEffect(() => {
    if (helpForm) setIsOpen(true);
  }, [helpForm]);

  const handleClose = () => {
    setIsOpen(false);
    setHelpForm(undefined);
  };

  const handleConfirm = () => {
    if (acceptRequestMutation.isPending) return;
    setIsOpen(false);

    if (!helpForm) return;
    const data = helpForm;
    acceptRequestMutation.mutate(data);
  };

  return (
    <>
      {children}
      {/** TODO: 하단 알림 자세히 보기 클릭시 모달이 팝업  */}
      <ConfirmModal open={open} onClose={handleClose} onConfirm={handleConfirm}>
        <div>
          {helpForm?.sender.nickname}
          <br />
          {helpForm?.roomUuid}
          <br />
          {helpForm?.helpDto.num}
          <br />
          {helpForm?.helpDto.title}
          <br />
          {helpForm?.helpDto.content}
        </div>
      </ConfirmModal>
    </>
  );
};

export default StompProvider;
