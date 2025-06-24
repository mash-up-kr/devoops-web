'use client';

import type { ReactNode } from 'react';

import { useModalState } from '@/components/modal/ModalContext';
import ModalPortal from '@/components/modal/Portal';
import { Z_INDEX } from '@/constants/zIndex';

interface ModalContentProps {
  children: ReactNode;
}

function ModalContent({ children }: ModalContentProps) {
  const { isOpen } = useModalState();

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div className={'fixed inset-0 flex items-center justify-center bg-black/40'} style={{ zIndex: Z_INDEX.modal }}>
        <div className={'relative rounded-xl bg-white p-6 shadow-xl'}>{children}</div>
      </div>
    </ModalPortal>
  );
}

export default ModalContent;
