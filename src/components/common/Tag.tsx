import { cva, type VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

import { cn } from '@/utils/cn';

const tagVariants = cva('border-dark-grey-200 inline-flex items-center gap-1.5 rounded-full border-1 text-nowrap', {
  variants: {
    padding: {
      small: 'px-2.5 py-[5px]',
      medium: 'px-3 py-[8px]',
    },
  },
  defaultVariants: {
    padding: 'small',
  },
});

const textVariants = cva('text-dark-grey-800', {
  variants: {
    size: {
      small: 'text-caption font-medium',
      medium: 'text-body-medium font-medium',
    },
  },
  defaultVariants: {
    size: 'small',
  },
});

const dotVariants = cva('inline-block h-1.5 w-1.5 rounded-full', {
  variants: {
    dotColor: {
      violet: 'bg-sub-violet',
      blue: 'bg-sub-blue',
      orange: 'bg-sub-orange',
      olive: 'bg-sub-olive',
      yellow: 'bg-sub-yellow',
      skyblue: 'bg-sub-skyblue',
      gray: 'bg-dark-grey-300',
      red: 'bg-sub-red',
      primary: 'bg-primary',
    },
  },
});

interface TagProps {
  dotColor: VariantProps<typeof dotVariants>['dotColor'];
  children: ReactNode;
  size?: VariantProps<typeof textVariants>['size'];
  padding?: VariantProps<typeof tagVariants>['padding'];
}

export default function Tag({ dotColor, children, size, padding }: TagProps) {
  return (
    <span className={cn(tagVariants({ padding }))}>
      <span className={cn(dotVariants({ dotColor }))} />
      <p className={cn(textVariants({ size }))}>{children}</p>
    </span>
  );
}
