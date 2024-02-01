'use client';

import { useEffect, useState, useRef } from 'react';
import { styled } from 'styled-components';
import { IconClose } from '@assets/svgs';
import CoreModal, { CloseButton } from '@/components/Common/Modal/Modal.styled';

const CloseBarButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 166px;
  height: 45px;

  border-radius: 6px;
  border: 1px solid var(--unconnected-color, #d1d1d1);

  background: #fff;

  cursor: pointer;
`;

const ConfirmBarButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 166px;
  height: 45px;

  border-radius: 6px;
  background: var(--sub-color, #69c7e0);

  color: #fff;
  cursor: pointer;
`;

const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  children,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children?: JSX.Element;
}) => {
  const [isOpen, setIsOpen] = useState(open);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleClickOutSide = (e: MouseEvent) => {
    if (
      isOpen &&
      modalRef.current &&
      !modalRef.current.contains(e.target as Node)
    ) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutSide);

    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  });

  if (!isOpen) return <></>;

  return (
    <>
      <CoreModal.Container ref={modalRef}>
        <CoreModal.Header>
          <CloseButton onClick={onClose}>
            <IconClose />
          </CloseButton>
        </CoreModal.Header>
        <CoreModal.Body>{children}</CoreModal.Body>
        <CoreModal.Footer>
          <CloseBarButton onClick={onClose}>닫기</CloseBarButton>
          <ConfirmBarButton
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            수락
          </ConfirmBarButton>
        </CoreModal.Footer>
      </CoreModal.Container>
      <CoreModal.ShadowDrop />
    </>
  );
};

export default ConfirmModal;
