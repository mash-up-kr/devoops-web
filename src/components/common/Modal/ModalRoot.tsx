'use client';

import { ReactNode, HTMLProps } from 'react';

import ModalPortal from '@/components/common/Modal/Portal';
import { useModalState, useModalDispatch } from '@/providers/ModalContext';
import { cn } from '@/utils/cn';

interface ModalRootProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export default function ModalRoot({ children, className = '', ...props }: ModalRootProps) {
  const { isOpen } = useModalState();
  const dispatch = useModalDispatch();

  const handleClose = () => dispatch({ type: 'CLOSE' });

  return (
    <ModalPortal>
      <div
        onClick={handleClose}
        className={cn(
          `z-modal fixed inset-0 flex items-center justify-center transition-opacity duration-200 ${
            isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </ModalPortal>
  );
}
