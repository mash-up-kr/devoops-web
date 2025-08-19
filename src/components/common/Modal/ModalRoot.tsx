'use client';

import { ReactNode, HTMLProps, useEffect } from 'react';

import ModalPortal from '@/components/common/Modal/Portal';
import { useIsModalOpen, useModalDispatch } from '@/providers/ModalContext';
import { cn } from '@/utils/cn';
import { onKeyDown } from '@/utils/onKeydown';

interface ModalRootProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  modalId: string;
  className?: string;
  defaultOpen?: boolean;
  isOutsideClickClose?: boolean;
}

export default function ModalRoot({
  children,
  modalId,
  className = '',
  defaultOpen = false,
  isOutsideClickClose = true,
  ...props
}: ModalRootProps) {
  const isOpen = useIsModalOpen(modalId);
  const dispatch = useModalDispatch();

  const handleClose = () => dispatch({ type: 'CLOSE', modalId });

  useEffect(() => {
    if (defaultOpen) {
      dispatch({ type: 'OPEN', modalId });
    }
  }, [defaultOpen, dispatch, modalId]);

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
