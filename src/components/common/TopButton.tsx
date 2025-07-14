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
      {icon ?? '^'}
    </button>
  );
}
