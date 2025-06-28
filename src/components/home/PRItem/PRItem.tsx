import Link from 'next/link';
import { ReactNode } from 'react';

interface PRItemProps {
  children: ReactNode;
}

export default function PRItem({ children }: PRItemProps) {
  return (
    <Link
      href={'/'}
      className={`
        flex w-full flex-col items-start gap-2 rounded-xl bg-transparent p-4
        hover:bg-dark-grey-25
      `}
    >
      {children}
    </Link>
  );
}
