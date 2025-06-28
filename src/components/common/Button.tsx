import { cva, type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/utils/cn';

const buttonVariants = cva(
  `
    inline-flex cursor-pointer items-center justify-center rounded-lg
    font-semibold whitespace-nowrap
    disabled:pointer-events-none
  `,
  {
    variants: {
      variant: {
        filledPrimary: [
          `enabled:bg-primary enabled:text-on-primary`,
          `enabled:hover:bg-dark-blue-400 enabled:hover:text-on-primary`,
          `disabled:text-dark-grey-300 disabled:bg-dark-grey-100`,
        ],
        weakPrimary: [
          `enabled:bg-dark-blue-50 enabled:text-dark-blue-500`,
          `enabled:hover:bg-dark-blue-200 enabled:hover:text-dark-blue-500`,
          `disabled:text-dark-grey-300 disabled:bg-dark-grey-100`,
        ],
        outlineGrey: [
          `
            enabled:bg-white-opacity-50 enabled:text-on-surface-low
            enabled:border-dark-grey-200 enabled:border
          `,
          `
            enabled:hover:bg-white-opacity-200 enabled:hover:text-on-surface-low
            enabled:hover:border-dark-grey-200 enabled:hover:border
          `,
          `disabled:text-dark-grey-300 disabled:bg-dark-grey-100`,
        ],
      },
      size: {
        tiny: 'text-body-small gap-2 rounded-[5px] px-2 py-[3px] font-medium',
        small: 'text-body-small gap-1.5 px-2 py-[5px]',
        medium: 'text-body-medium gap-1.5 px-4 py-[9px]',
        large: 'text-body-large gap-1.5 px-5 py-3',
      },
    },
    defaultVariants: {
      variant: 'filledPrimary',
      size: 'large',
    },
  },
);

export default function Button({
  className,
  variant,
  size,
  children,
  disabled,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>>) {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
