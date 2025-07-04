'use client';

import { ReactNode } from 'react';

import ModalProvider from '@/providers/ModalContext';

interface ModalRootProps {
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function ModalRoot({ children, defaultOpen }: ModalRootProps) {
  return <ModalProvider defaultOpen={defaultOpen}>{children}</ModalProvider>;
}
