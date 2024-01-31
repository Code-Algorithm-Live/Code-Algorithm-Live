'use client';

import { useState } from 'react';
import BasicModal from '@/components/Common/Modal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
    </>
  );
}
