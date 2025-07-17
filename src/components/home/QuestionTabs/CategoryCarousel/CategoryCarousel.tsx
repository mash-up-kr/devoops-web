'use client';

import CategoryCarouselContent from '@/components/home/QuestionTabs/CategoryCarousel/CategoryCarouselContent';
import CategoryCarouselItem from '@/components/home/QuestionTabs/CategoryCarousel/CategoryCarouselItem';
import CategoryCarouselNavigator from '@/components/home/QuestionTabs/CategoryCarousel/CategoryCarouselNavigator';

interface CategoryCarouselProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function CategoryCarousel({ categories, activeCategory, setActiveCategory }: CategoryCarouselProps) {
  const currentCategoryIndex = categories.findIndex((category) => category === activeCategory);
  const canGoPrev = currentCategoryIndex > 0;
  const canGoNext = currentCategoryIndex < categories.length - 1;

  const goToPrev = () => {
    if (canGoPrev) {
      setActiveCategory(categories[currentCategoryIndex - 1]);
    }
  };

  const goToNext = () => {
    if (canGoNext) {
      setActiveCategory(categories[currentCategoryIndex + 1]);
    }
  };

  return (
    <div className={'mb-6 flex w-full items-center gap-2'}>
      <CategoryCarouselNavigator direction={'prev'} onClick={goToPrev} disabled={!canGoPrev} />

      <CategoryCarouselContent currentIndex={currentCategoryIndex}>
        {categories.map((category, index) => (
          <CategoryCarouselItem
            key={index}
            category={category}
            isActive={category === activeCategory}
            onClick={() => setActiveCategory(category)}
          />
        ))}
      </CategoryCarouselContent>

      <CategoryCarouselNavigator direction={'next'} onClick={goToNext} disabled={!canGoNext} />
    </div>
  );
}
