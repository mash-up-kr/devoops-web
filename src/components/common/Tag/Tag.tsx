import { cva, type VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

import { cn } from '@/utils/cn';

const dotVariants = cva('inline-block h-1.5 w-1.5 rounded-full', {
  variants: {
    color: {
      violet: 'bg-sub-violet',
      blue: 'bg-sub-blue',
      orange: 'bg-sub-orange',
      olive: 'bg-sub-olive',
      yellow: 'bg-sub-yellow',
      skyblue: 'bg-sub-skyblue',
      gray: 'bg-dark-grey-300',
    },
  },
});

interface TagProps {
  color: VariantProps<typeof dotVariants>['color'];
  children: ReactNode;
}

export default function Tag({ color, children }: TagProps) {
  return (
    <span
      className={`
        border-outline inline-flex items-center gap-1.5 rounded-full border-1
        px-2.5 py-[5px] text-nowrap
      `}
    >
      <span className={cn(dotVariants({ color }))} />
      {children}
    </span>
  );
}
