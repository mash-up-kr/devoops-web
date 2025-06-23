'use client';

import React, { type ReactNode } from 'react';

import { ModalProvider, useModalState } from '@/components/modal/ModalContext';
import ModalPortal from '@/components/modal/Portal';

interface ModalRootProps {
  children: ReactNode;
  defaultOpen?: boolean;
}

interface ModalContainerProps {
  children: ReactNode;
  defaultOpen?: boolean;
}

function ModalContainer({ children, defaultOpen }: ModalContainerProps) {
  const { isOpen } = useModalState();

  if (!defaultOpen && !isOpen) return null;

  return <ModalPortal>{children}</ModalPortal>;
}

export default function ModalRoot({ children, defaultOpen }: ModalRootProps) {
  return (
    <ModalProvider>
      <ModalContainer defaultOpen={defaultOpen}>{children}</ModalContainer>
    </ModalProvider>
  );
}
