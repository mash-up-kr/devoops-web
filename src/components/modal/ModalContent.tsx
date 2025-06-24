'use client';

import { useEffect, useState, type ReactNode } from 'react';

import { useModalState } from '@/components/modal/ModalContext';
import ModalPortal from '@/components/modal/Portal';
import '@/styles/globals.css';

interface ModalContentProps {
  children: ReactNode;
}

function ModalContent({ children }: ModalContentProps) {
  const { isOpen } = useModalState();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <ModalPortal>
      <div
        className={`fixed inset-0 flex items-center justify-center transition-opacity duration-200 z-[--z-modal] ${
          isOpen ? 'opacity-100 pointer-events-auto bg-black/40' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className={'relative rounded-xl bg-white p-6 shadow-xl'}>{children}</div>
      </div>
    </ModalPortal>
  );
}

export default ModalContent;
