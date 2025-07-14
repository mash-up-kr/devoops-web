import React from 'react';

import { cn } from '@/utils/cn';

interface TopButtonProps {
  icon?: React.ReactNode;
  className?: string;
}

export default function TopButton({ icon, className = '' }: TopButtonProps) {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type={'button'}
      onClick={handleClick}
      className={cn(
        `
          fixed right-[24px] bottom-[12px] z-[1000]
          flex h-10 w-10
          cursor-pointer items-center
          justify-center
          rounded-full
          bg-[rgba(20,21,26,0.7)]
          shadow-lg transition hover:bg-[rgba(20,21,26,0.85)] active:scale-95
        `,
        className,
      )}
    >
      {icon ?? (
        <svg width={'20'} height={'20'} viewBox={'0 0 20 20'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
          <path d={'M10 15V5'} stroke={'white'} strokeWidth={'2'} strokeLinecap={'round'} />
          <path d={'M6 9L10 5L14 9'} stroke={'white'} strokeWidth={'2'} strokeLinecap={'round'} />
        </svg>
      )}
    </button>
  );
}
