'use client';

import React from 'react';

import { useModalDispatch } from './ModalContext';

interface ModalToggleProps {
  action: 'open' | 'close';
  children: React.ReactNode;
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
