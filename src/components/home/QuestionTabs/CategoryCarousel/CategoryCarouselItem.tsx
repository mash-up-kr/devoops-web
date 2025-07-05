import { type ButtonHTMLAttributes } from 'react';

import { type Category } from '@/types/questionTabs';

interface CategoryCarouselItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  category: Omit<Category, 'questions'>;
  isActive: boolean;
}

export default function CategoryCarouselItem({ category, isActive, ...props }: CategoryCarouselItemProps) {
  return (
    <button
      type={'button'}
      aria-label={`${category.name} 카테고리 선택`}
      className={`
      flex-shrink-0 rounded-full px-3.5 py-2 text-sm font-medium
      whitespace-nowrap transition-colors select-none
      ${isActive ? 'bg-dark-grey-25 text-dark-blue-700' : 'text-dark-grey-500'}
    `}
      {...props}
    >
      {category.name}
    </button>
  );
}
