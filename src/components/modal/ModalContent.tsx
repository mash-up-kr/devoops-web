'use client';

import React from 'react';

import { useModalState } from '@/components/modal/ModalContext';
import ModalPortal from '@/components/modal/ModalPortal';

interface ModalContentProps {
  children: React.ReactNode;
}

function ModalContent({ children }: ModalContentProps) {
  const { isOpen } = useModalState();

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div className={'fixed inset-0 z-[9995] flex items-center justify-center bg-black/40'}>
        <div className={'relative rounded-xl bg-white p-6 shadow-xl'}>{children}</div>
      </div>
    </ModalPortal>
  );
}

export default ModalContent;
