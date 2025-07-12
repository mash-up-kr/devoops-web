'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { ReactNode, ButtonHTMLAttributes, MouseEvent } from 'react';

import { useTabsContext } from '@/providers/TabsContext';
import { cn } from '@/utils/cn';

interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof tabsTriggerVariants> {
  value: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

const tabsTriggerVariants = cva('flex cursor-pointer gap-2 font-medium whitespace-nowrap', {
  variants: {
    size: {
      medium: 'text-body-small px-3.5 pt-1 pb-3',
      large: 'text-body-large px-8 pt-1 pb-3.5',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export default function TabsTrigger({
  value,
  children,
  size,
  className = '',
  disabled = false,
  onClick,
  ...props
}: TabsTriggerProps) {
  const { activeTab, setActiveTab, registerTab } = useTabsContext();
  const isActive = activeTab === value;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      setActiveTab(value);
      onClick?.(e);
    }
  };

  return (
    <button
      role={'tab'}
      type={'button'}
      ref={(el) => registerTab(value, el)}
      onClick={handleClick}
      aria-selected={isActive}
      className={cn(
        tabsTriggerVariants({ size }),
        isActive
          ? `
            enabled:text-on-surface-high enabled:inset-shadow-tabs-active
            enabled:font-semibold
          `
          : `
            hover:enabled:text-dark-grey-700
            hover:enabled:inset-shadow-tabs-hover
            enabled:text-shadow-on-surface-lowest
            enabled:inset-shadow-tabs-enabled
          `,
        disabled && `disabled:text-dark-grey-300 disabled:cursor-not-allowed`,
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
