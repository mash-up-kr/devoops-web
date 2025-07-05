'use client';

import { ReactNode, useState, useLayoutEffect, useRef } from 'react';

export default function CategoryCarouselContent({
  currentIndex,
  children,
}: {
  currentIndex: number;
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const buttons = Array.from(container.querySelectorAll('button'));
    if (!buttons.length) return;

    const buttonsWidth = buttons.map((button) => button.offsetWidth + 4);
    const totalWidth = buttonsWidth.reduce((sum, width) => sum + width, 0);
    const visibleWidth = container.parentElement?.clientWidth || 0;

    const totalWidthBeforeActiveButton = buttonsWidth.slice(0, currentIndex).reduce((sum, width) => sum + width, 0);
    const activeButtonWidth = buttonsWidth[currentIndex] || 0;
    const center = (visibleWidth - activeButtonWidth) / 2;

    let moveValue = totalWidthBeforeActiveButton - center;
    const maxValue = totalWidth - visibleWidth;

    if (moveValue < 0) moveValue = 0;
    if (moveValue > maxValue) moveValue = maxValue;

    setTranslateX(-moveValue);
  }, [currentIndex]);

  return (
    <div className={'w-full overflow-hidden transition-transform duration-300 ease-out'}>
      <div
        ref={containerRef}
        className={'flex gap-1 transition-transform duration-300 ease-out'}
        style={{
          transform: `translateX(${translateX}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
