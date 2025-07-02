'use client';

import { ReactNode } from 'react';

import { useModalDispatch } from '@/components/modal/ModalContext';
import { type ModalActionType } from '@/types/modal';

interface ModalToggleProps {
  action: ModalActionType;
  children: ReactNode;
}

export default function ModalToggle({ action, children }: ModalToggleProps) {
  const dispatch = useModalDispatch();

  const handleClick = () => {
    dispatch({ type: action });
  };

  return (
    <button type={'button'} onClick={handleClick}>
      {children}
    </button>
  );
}
