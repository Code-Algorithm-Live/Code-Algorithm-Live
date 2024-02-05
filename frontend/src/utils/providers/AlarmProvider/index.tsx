'use client';

import { Client, IMessage } from '@stomp/stompjs';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ConfirmModal from '@/components/Common/Modal/ConfirmModal';
import { loginUserA } from '@/mock';
import { fetchAcceptHelp } from '@/api/match';
import { HelpForm } from '@/utils/providers/AlarmProvider/type';
import { BROKER_URL } from '@/libs/stomp';

const userId = loginUserA.email; // 사용자의 아이디
const subDestination = `/sub/queue/match/${userId}`;

const StompProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [open, setIsOpen] = useState(false);
  const [helpForm, setHelpForm] = useState<HelpForm>(); // TODO: 전역으로 관리
  const acceptRequestMutation = useMutation({ mutationFn: fetchAcceptHelp });

  const client = useRef(
    new Client({
      brokerURL: BROKER_URL,
      onConnect: () => {
        console.log('연결 성공');

        // 도움 요청이 왔는지 상시 확인
        client.current.subscribe(subDestination, response => {
          const message = JSON.parse(
            response.body,
          ) as IMessage as unknown as HelpForm;

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
      },
    }),
  );

  useEffect(() => {
    client.current.activate();
  }, []);

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

    setHelpForm(undefined);
  };

  return (
    <>
      {children}
      {/** TODO: 하단 알림 자세히 보기 클릭시 모달이 팝업  */}
      <ConfirmModal open={open} onClose={handleClose} onConfirm={handleConfirm}>
        <div>
          {helpForm?.sender.name}
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
