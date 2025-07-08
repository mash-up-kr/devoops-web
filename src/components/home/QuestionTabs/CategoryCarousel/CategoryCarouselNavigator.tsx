import { type ButtonHTMLAttributes } from 'react';

import LeftIcon from '@/assets/svg/chevron-left.svg';
import RightIcon from '@/assets/svg/chevron-right.svg';
import Button from '@/components/common/Button';

interface NavigationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction: 'prev' | 'next';
}

const DIRECTION_MAP = {
  prev: {
    icon: LeftIcon,
    ariaLabel: '이전 카테고리',
  },
  next: {
    icon: RightIcon,
    ariaLabel: '다음 카테고리',
  },
} as const;

export default function CategoryCarouselNavigator({ direction, ...props }: NavigationButtonProps) {
  const { icon: DirectionIcon, ariaLabel } = DIRECTION_MAP[direction];

  return (
    <Button
      variant={'outlineGrey'}
      size={'small'}
      aria-label={ariaLabel}
      className={`
        rounded-full border-1 p-2
        ${props.disabled ? 'hidden' : 'block'}
      `}
      {...props}
    >
      <DirectionIcon />
    </Button>
  );
}
