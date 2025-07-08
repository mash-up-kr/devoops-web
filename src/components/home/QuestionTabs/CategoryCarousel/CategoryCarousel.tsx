'use client';

import CategoryCarouselContent from '@/components/home/QuestionTabs/CategoryCarousel/CategoryCarouselContent';
import CategoryCarouselItem from '@/components/home/QuestionTabs/CategoryCarousel/CategoryCarouselItem';
import CategoryCarouselNavigator from '@/components/home/QuestionTabs/CategoryCarousel/CategoryCarouselNavigator';
import { useQuestionTabs } from '@/providers/QuestionTabsContext';

export default function CategoryCarousel() {
  const { categories, activeCategory, setActiveCategory, currentIndex, canGoPrev, canGoNext, goToPrev, goToNext } =
    useQuestionTabs();

  return (
    <div className={'mb-6 flex w-full items-center gap-2'}>
      <CategoryCarouselNavigator direction={'prev'} onClick={goToPrev} disabled={!canGoPrev} />

      <CategoryCarouselContent currentIndex={currentIndex}>
        {categories.map((cat) => (
          <CategoryCarouselItem
            key={cat.id}
            category={cat}
            isActive={cat.id === activeCategory}
            onClick={() => setActiveCategory(cat.id)}
          />
        ))}
      </CategoryCarouselContent>

      <CategoryCarouselNavigator direction={'next'} onClick={goToNext} disabled={!canGoNext} />
    </div>
  );
}
