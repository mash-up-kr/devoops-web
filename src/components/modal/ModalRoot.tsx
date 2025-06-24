'use client';

import React, { type ReactNode } from 'react';

import { ModalProvider, useModalState } from '@/components/modal/ModalContext';
import ModalPortal from '@/components/modal/Portal';

interface ModalRootProps {
  children: ReactNode;
  defaultOpen?: boolean;
}

function ModalContent({ children }: { children: ReactNode }) {
  const { isOpen } = useModalState();

  if (!isOpen) return null;

  return <ModalPortal>{children}</ModalPortal>;
}

export default function ModalRoot({ children, defaultOpen }: ModalRootProps) {
  return <ModalProvider defaultOpen={defaultOpen}>{children}</ModalProvider>;
}

export { ModalContent };
