'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

import { useModalDispatch } from '@/providers/ModalContext';
import { type ModalActionType } from '@/types/modal';

interface ModalToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  action: ModalActionType;
  modalId: string;
  children: ReactNode;
}

export default function ModalToggle({ action, modalId, children, ...props }: ModalToggleProps) {
  const dispatch = useModalDispatch();

  const handleClick = () => {
    dispatch({ type: action, modalId });
  };

  return (
    <button type={'button'} onClick={handleClick} className={'cursor-pointer'} {...props}>
      {children}
    </button>
  );
}
