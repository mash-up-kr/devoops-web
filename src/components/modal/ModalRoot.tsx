'use client';

import React, { useEffect, type ReactNode } from 'react';

import { ModalProvider, useModalDispatch, useModalState } from '@/components/modal/ModalContext';
import ModalPortal from '@/components/modal/ModalPortal';

interface ModalRootProps {
  children: ReactNode;
  defaultOpen?: boolean;
}

function ModalContainer({ children }: { children: React.ReactNode }) {
  const { isOpen } = useModalState();
  const dispatch = useModalDispatch();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch({ type: 'CLOSE' });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  if (!isOpen) return null;

  return <ModalPortal>{children}</ModalPortal>;
}

export default function ModalRoot({ children, defaultOpen }: ModalRootProps) {
  return (
    <ModalProvider>
      {defaultOpen && <ModalContainer>{children}</ModalContainer>}
      {!defaultOpen && children}
    </ModalProvider>
  );
}
