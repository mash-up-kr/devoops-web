'use client';

import { PropsWithChildren, HTMLProps, MouseEvent } from 'react';

export default function ModalContent({ children, ...props }: PropsWithChildren<HTMLProps<HTMLDivElement>>) {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div onClick={handleClick} {...props}>
      {children}
    </div>
  );
}
