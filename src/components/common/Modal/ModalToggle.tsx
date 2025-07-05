'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

import { useModalDispatch } from '@/providers/ModalContext';
import { type ModalActionType } from '@/types/modal';

interface ModalToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  action: ModalActionType;
  children: ReactNode;
}

export default function ModalToggle({ action, children, ...props }: ModalToggleProps) {
  const dispatch = useModalDispatch();

  const handleClick = () => {
    dispatch({ type: action });
  };

  return (
    <button type={'button'} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
