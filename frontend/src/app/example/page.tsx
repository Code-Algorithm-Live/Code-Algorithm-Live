'use client';

import { useState } from 'react';
import BasicModal from '@/components/Common/Modal';
import ConfirmModal from '@/components/Common/Modal/ConfirmModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleConfirm = () => console.log('confirm!!');

  return (
    <>
      <button
        style={{
          padding: '10px 12px',
          border: '1px solid',
        }}
        onClick={openModal}
      >
        모달 열기
      </button>
      <BasicModal open={isModalOpen} onClose={closeModal}>
        <>안녕</>
      </BasicModal>

      <button
        style={{
          padding: '10px 12px',
          border: '1px solid',
        }}
        onClick={() => setIsConfirmModalOpen(true)}
      >
        컨펌 모달 열기
      </button>
      <ConfirmModal
        open={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => {
          handleConfirm();
          setIsConfirmModalOpen(false);
        }}
      >
        <>안녕</>
      </ConfirmModal>
    </>
  );
}
