'use client';

import styled, { keyframes } from 'styled-components';
import IconNotice from '@assets/svgs/notice.svg';
import { Client, IMessage } from '@stomp/stompjs';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { fetchAcceptHelp } from '@/api/match';
import useHelpFromStore from '@/store/helpForm';
import { BROKER_URL } from '@/libs/stomp';
import { HelpForm } from '@/types/Help';
import ConfirmModal from '@/components/Common/Modal/ConfirmModal';
import ModalContent from '@/components/Home/Waiting/ModalContent';

const AUTHENTICATED = 'authenticated';

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(200%);
  }
`;

const NotificationContainer = styled.div`
  width: 300px;
  height: 135px;
  position: fixed;
  bottom: 16px;
  right: 16px;
  background-color: var(--white-color);
  padding: 16px;
  border-radius: 10px;
  box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.3);
  animation:
    ${slideUp} 1s ease-in-out,
    ${slideDown} 2s 4s ease-in-out;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  font-size: 20px;
  color: var(--sub-font-color);
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 30px 0px 10px;
  width: 280px;
  height: 100px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  gap: 5px;
`;

const TitleText = styled.span`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
`;

const ContentText = styled.span`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  padding-bottom: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BoldEffect = styled.span`
  font-size: 17px;
  font-weight: 600;
`;

const IconNoticePoint = styled(IconNotice)`
  background-color: var(--point-color);
  border-radius: 50%;
`;

const StompProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [open, setIsOpen] = useState(false);
  const [showPopup, setshowPopup] = useState(false);
  const { helpForm, setHelpForm } = useHelpFromStore();
  const acceptRequestMutation = useMutation({ mutationFn: fetchAcceptHelp });
  const session = useSession(); // 사용자의 아이디

  const client = useRef(
    new Client({
      brokerURL: BROKER_URL,
    }),
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    if (showPopup) {
      timeoutId = setTimeout(() => {
        setshowPopup(false);
      }, 5000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showPopup]);

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

        // 매칭 완료
        if (message.success) {
          const onMatchSuccess = () => {
            setHelpForm(message);
            router.push(`/chat/${message.roomUuid}`);
          };
          onMatchSuccess();
          return;
        }

        setHelpForm(message);
        setshowPopup(true);
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

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCloseButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setshowPopup(false);
  };

  const handleConfirm = () => {
    if (acceptRequestMutation.isPending) return;
    setIsOpen(false);

    if (!helpForm) return;
    const data = helpForm;
    acceptRequestMutation.mutate(data);
  };

  const handleNoticeClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      {children}
      {/** 알림 팝업을 클릭하면 모달 열기 */}
      {showPopup && (
        <NotificationContainer onClick={handleNoticeClick}>
          <CloseButton onClick={handleCloseButtonClick}>&times;</CloseButton>
          <TextContainer>
            <TitleContainer>
              <IconNoticePoint />
              <TitleText>
                <BoldEffect>{helpForm?.sender.nickname}</BoldEffect> 님의 도움
                요청
              </TitleText>
            </TitleContainer>
            <ContentText>
              <BoldEffect>{helpForm?.helpDto.num}번</BoldEffect> 문제
            </ContentText>
            <ContentText>{helpForm?.helpDto.title}</ContentText>
          </TextContainer>
        </NotificationContainer>
      )}

      {/** 모달 open  */}
      <ConfirmModal open={open} onClose={handleClose} onConfirm={handleConfirm}>
        <ModalContent modalData={helpForm} />
      </ConfirmModal>
    </>
  );
};

export default StompProvider;
