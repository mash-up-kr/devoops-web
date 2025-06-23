'use client';

import React, { type ReactNode } from 'react';

import { useModalDispatch } from '@/components/modal/ModalContext';

interface ModalToggleProps {
  action: 'open' | 'close';
  children: ReactNode;
}

function ModalToggle({ action, children }: ModalToggleProps) {
  const dispatch = useModalDispatch();

  const handleClick = () => {
    dispatch({ type: action === 'open' ? 'OPEN' : 'CLOSE' });
  };

  return (
    <button type={'button'} onClick={handleClick}>
      {children}
    </button>
  );
}

export default ModalToggle;
