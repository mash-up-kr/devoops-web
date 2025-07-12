import { ComponentProps } from 'react';

import LeftIcon from '@/assets/svg/chevron-left.svg';
import RightIcon from '@/assets/svg/chevron-right.svg';
import Button from '@/components/common/Button';
import { cn } from '@/utils/cn';

function Pagination({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      role={'navigation'}
      aria-label={'pagination'}
      data-slot={'pagination'}
      className={cn('flex w-full justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: ComponentProps<'ul'>) {
  return (
    <ul data-slot={'pagination-content'} className={cn('flex flex-row items-center gap-2.5', className)} {...props} />
  );
}

function PaginationItem({ ...props }: ComponentProps<'li'>) {
  return <li data-slot={'pagination-item'} {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ComponentProps<typeof Button>, 'size'> &
  ComponentProps<'a'>;

function PaginationLink({ children, className, isActive, ...props }: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot={'pagination-link'}
      data-active={isActive}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}

function PaginationPrevious({ className, ...props }: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label={'Go to previous page'} className={cn('cursor-pointer gap-1 p-2', className)} {...props}>
      <LeftIcon />
    </PaginationLink>
  );
}

function PaginationNext({ className, ...props }: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label={'Go to next page'} className={cn('cursor-pointer gap-1 p-2', className)} {...props}>
      <RightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot={'pagination-ellipsis'}
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <span>{'...'}</span>
      <span className={'sr-only'}>{'More pages'}</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
