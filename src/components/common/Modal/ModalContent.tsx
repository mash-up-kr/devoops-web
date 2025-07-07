'use client';

import { PropsWithChildren, HTMLProps } from 'react';

import { onKeyDown } from '@/utils/onKeydown';
import { stopPropagation } from '@/utils/stopPropagation';

export default function ModalContent({ children, ...props }: PropsWithChildren<HTMLProps<HTMLDivElement>>) {
  return (
    <div role={'button'} tabIndex={0} onClick={stopPropagation} onKeyDown={onKeyDown(stopPropagation)} {...props}>
      {children}
    </div>
  );
}
