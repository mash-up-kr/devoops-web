import CategoryCarouselContent from '@/components/home/QuestionTabs/CategoryCarousel/CategoryCarouselContent';
import CategoryCarouselItem from '@/components/home/QuestionTabs/CategoryCarousel/CategoryCarouselItem';
import CategoryCarouselNavigator from '@/components/home/QuestionTabs/CategoryCarousel/CategoryCarouselNavigator';

interface CategoryCarouselProps {
  categories: string[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export default function CategoryCarousel({ categories, activeIndex, setActiveIndex }: CategoryCarouselProps) {
  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < categories.length - 1;

  const goToPrev = () => {
    if (canGoPrev) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const goToNext = () => {
    if (canGoNext) {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <div className={'mb-6 flex w-full items-center gap-2'}>
      <CategoryCarouselNavigator direction={'prev'} onClick={goToPrev} disabled={!canGoPrev} />

      <CategoryCarouselContent currentIndex={activeIndex}>
        {categories.map((category, index) => (
          <CategoryCarouselItem
            key={`${category}-${index}`}
            category={category}
            isActive={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </CategoryCarouselContent>

      <CategoryCarouselNavigator direction={'next'} onClick={goToNext} disabled={!canGoNext} />
    </div>
  );
}
