'use client';

import Link from 'next/link';

import Logo from '@/assets/svg/logo.svg';
import Button from '@/components/common/Button';
import { useLoginRedirect } from '@/hooks/useLoginRedirect';
import { cn } from '@/utils/cn';

interface LandingNavigationProps {
  className?: string;
}

export default function LandingNavigation({ className }: LandingNavigationProps) {
  const { handleLogin } = useLoginRedirect();

  return (
    <nav
      className={cn(
        `
        fixed top-[0px] left-[50%] flex h-[48px] w-full max-w-[1200px]
        -translate-x-1/2 items-center justify-between px-[40px]
      `,
        className,
      )}
    >
      <Link href={'/'} className={'text-h4 font-bold'}>
        <Logo />
      </Link>
      <Button variant={'filledPrimary'} size={'small'} onClick={handleLogin}>
        {'시작하기'}
      </Button>
    </nav>
  );
}
