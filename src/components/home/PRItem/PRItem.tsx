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
        text-dark-grey-600 flex w-full flex-col items-start gap-2 rounded-xl
        bg-transparent px-2.5 py-4
        hover:bg-dark-grey-25 hover:text-dark-grey-900
      `}
    >
      {children}
    </Link>
  );
}
