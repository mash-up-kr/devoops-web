'use client';

import { useModalDispatch } from '@/components/modal/ModalContext';
import type { ModalToggleProps } from '@/types/modal';

function ModalToggle({ action, children }: ModalToggleProps) {
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

export default ModalToggle;
