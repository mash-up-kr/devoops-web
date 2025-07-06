import { cva } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

interface RepositoryBadgeProps extends HTMLAttributes<HTMLSpanElement | HTMLButtonElement> {
  label: string;
  count?: number;
  as?: 'span' | 'button';
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const RepositoryBadgeVariants = cva(
  `text-body-small border-dark-grey-200 bg-white-opacity-50 flex items-center justify-center rounded-full border-1 font-medium`,
  {
    variants: {
      as: {
        span: `gap-1 px-3 py-1.5`,
        button: [`gap-1.5 px-4 py-[7px]`],
      },
    },
    defaultVariants: {
      as: 'span',
    },
  },
);

export default function RepositoryBadge({
  label,
  count = 0,
  as = 'span',
  disabled = false,
  className = '',
  onClick,
  ...props
}: RepositoryBadgeProps) {
  const Component = as;

  return (
    <Component
      {...(onClick && { onClick })}
      {...(Component === 'button' && { disabled })}
      className={cn(RepositoryBadgeVariants({ as }), className)}
      {...props}
    >
      <span>{label}</span>
      <span
        className={
          'text-dark-blue-700 bg-white-opacity-100 text-body-small flex size-5 items-center justify-center rounded-full font-medium'
        }
      >
        {count}
      </span>
    </Component>
  );
}
