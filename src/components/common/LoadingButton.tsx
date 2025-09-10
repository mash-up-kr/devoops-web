import { ReactNode, useTransition, useRef, useState, useLayoutEffect } from 'react';

import Button, { ButtonVariants } from '@/components/common/Button';
import ShinyText from '@/components/common/ShinyText';
import { cn } from '@/utils/cn';

interface LoadingButtonProps extends ButtonVariants {
  action?: () => Promise<void> | void;
  children: ReactNode;
  className?: string;
}

export function LoadingButton({ variant, size, action, children, className = '' }: LoadingButtonProps) {
  const [width, setWidth] = useState<number | undefined>(undefined);
  const textRef = useRef<HTMLParagraphElement>(null);

  const [isPending, startTransition] = useTransition();

  useLayoutEffect(() => {
    if (textRef.current && !width) {
      setWidth(textRef.current.offsetWidth);
    }
  }, [width]);

  const handleAction = () => {
    if (action) {
      startTransition(() => {
        action();
      });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleAction}
      disabled={isPending}
      className={cn('transition-colors hover:duration-200', className)}
    >
      <div ref={textRef} style={{ width: isPending ? `${width}px` : 'auto' }}>
        {isPending ? <ShinyText text={'로딩중...'} disabled={false} speed={2} /> : children}
      </div>
    </Button>
  );
}
