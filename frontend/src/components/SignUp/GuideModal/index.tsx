'use client';

import { useEffect, useState, useRef } from 'react';
import { styled } from 'styled-components';
import { IconClose } from '@assets/svgs';
import CoreModal, { CloseButton } from './Modal.styled';

const CheckButton = styled.div`
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

const GuideModal = ({
  open,
  onClose,
  children,
  clickCheckButton,
}: {
  open?: boolean;
  onClose?: () => void;
  children?: JSX.Element;
  clickCheckButton?: () => void;
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
          <CheckButton onClick={clickCheckButton}>확인</CheckButton>
        </CoreModal.Footer>
      </CoreModal.Container>
      <CoreModal.ShadowDrop />
    </>
  );
};

export default GuideModal;
