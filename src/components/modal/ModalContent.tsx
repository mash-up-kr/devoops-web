'use client';

import { PropsWithChildren, useEffect, useState } from 'react';

import ModalPortal from '@/components/modal/Portal';
import { useModalState } from '@/providers/ModalContext';

export default function ModalContent({ children }: PropsWithChildren) {
  const { isOpen } = useModalState();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <ModalPortal>
      <div
        className={`z-modal fixed inset-0 flex items-center justify-center transition-opacity duration-200 ${
          isOpen ? 'pointer-events-auto bg-black/40 opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className={'relative rounded-xl bg-white p-6 text-black shadow-xl'}>{children}</div>
      </div>
    </ModalPortal>
  );
}
