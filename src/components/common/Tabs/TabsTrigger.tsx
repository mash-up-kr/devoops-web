'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { HTMLAttributes, ReactNode } from 'react';

import { useTabsContext } from '@/providers/TabsContext';
import { cn } from '@/utils/cn';

interface TabsTriggerProps extends VariantProps<typeof tabsTriggerVariants> {
  value: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

const tabsTriggerVariants = cva('flex cursor-pointer gap-2 font-medium', {
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

const TABS_TRIGGER_ACTIVE_STYLES: HTMLAttributes<HTMLButtonElement>['className'] =
  'enabled:text-on-surface-high enabled:inset-shadow-tabs-active enabled:font-semibold';
const TABS_TRIGGER_HOVER_STYLES: HTMLAttributes<HTMLButtonElement>['className'] =
  'hover:enabled:text-dark-grey-700 hover:enabled:inset-shadow-tabs-hover';
const TABS_TRIGGER_ENABLED_STYLES: HTMLAttributes<HTMLButtonElement>['className'] =
  'enabled:text-shadow-on-surface-lowest enabled:inset-shadow-tabs-enabled';
const TABS_TRIGGER_DISABLED_STYLES: HTMLAttributes<HTMLButtonElement>['className'] =
  'disabled:text-dark-grey-300 disabled:cursor-not-allowed';

export function TabsTrigger({ value, children, size, className = '', disabled = false }: TabsTriggerProps) {
  const { activeTab, setActiveTab, registerTab } = useTabsContext();
  const isActive = activeTab === value;

  const handleClick = () => {
    if (!disabled) {
      setActiveTab(value);
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
            ${TABS_TRIGGER_ACTIVE_STYLES}
          `
          : `
            ${TABS_TRIGGER_ENABLED_STYLES}
            ${TABS_TRIGGER_HOVER_STYLES}
          `,
        disabled && TABS_TRIGGER_DISABLED_STYLES,
        className,
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
