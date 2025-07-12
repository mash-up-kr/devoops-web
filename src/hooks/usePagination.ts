import { useMemo } from 'react';

type UsePaginationProps = {
  totalPage: number;
  currentPage: number;
};

export function usePagination({ totalPage, currentPage }: UsePaginationProps) {
  const pagesToShow = useMemo(() => {
    if (totalPage <= 5) {
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, 'ellipsis' as const];
    }

    if (currentPage >= totalPage - 2) {
      return ['ellipsis' as const, totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage];
    }

    return [
      'ellipsis' as const,
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      'ellipsis' as const,
    ];
  }, [totalPage, currentPage]);

  return { pagesToShow };
}
