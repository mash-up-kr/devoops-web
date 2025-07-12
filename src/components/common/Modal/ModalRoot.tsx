'use client';

import { ReactNode, HTMLProps, useEffect } from 'react';

import ModalPortal from '@/components/common/Modal/Portal';
import { useModalState, useModalDispatch } from '@/providers/ModalContext';
import { cn } from '@/utils/cn';
import { onKeyDown } from '@/utils/onKeydown';

interface ModalRootProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
  isOutsideClickClose?: boolean;
}

export default function ModalRoot({
  children,
  className = '',
  defaultOpen = false,
  isOutsideClickClose = true,
  ...props
}: ModalRootProps) {
  const { isOpen } = useModalState();
  const dispatch = useModalDispatch();

  const handleClose = () => dispatch({ type: 'CLOSE' });

  useEffect(() => {
    if (defaultOpen) {
      dispatch({ type: 'OPEN' });
    }
  }, [defaultOpen, dispatch]);

  return (
    <ModalPortal>
      <div
        role={'button'}
        tabIndex={0}
        onClick={isOutsideClickClose ? handleClose : undefined}
        onKeyDown={onKeyDown(handleClose)}
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
