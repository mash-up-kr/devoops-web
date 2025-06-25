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
        filled_primary: [
          // Enabled
          `enabled:bg-primary enabled:text-on-primary`,
          // Hover
          `enabled:hover:bg-dark-blue-400 enabled:hover:text-on-primary`,
          // Disabled
          `disabled:text-dark-grey-300 disabled:bg-dark-grey-100`,
        ],
        weak_primary: [
          // Enabled
          `enabled:bg-dark-blue-50 enabled:text-dark-blue-500`,
          // Hover
          `enabled:hover:bg-dark-blue-200 enabled:hover:text-dark-blue-500`,
          // Disabled
          `disabled:text-dark-grey-300 disabled:bg-dark-grey-100`,
        ],
        outline_grey: [
          // Enabled
          `
            enabled:bg-white-opacity-50 enabled:text-on-surface-low
            enabled:border-dark-grey-200 enabled:border
          `,
          // Hover
          `
            enabled:hover:bg-white-opacity-200 enabled:hover:text-on-surface-low
            enabled:hover:border-dark-grey-200 enabled:hover:border
          `,
          // Disabled
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
      variant: 'filled_primary',
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
  type = 'button',
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>>) {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} disabled={disabled} type={type} {...props}>
      {children}
    </button>
  );
}
