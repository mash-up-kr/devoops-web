import { PullRequestReadResponseType } from '@/__generated__/@types';
import { CategoryCarousel, QuestionContent } from '@/components/home/QuestionTabs';

interface QuestionTabsProps {
  contents: PullRequestReadResponseType;
  activeCategoryIndex: number;
  setActiveCategoryIndex: (index: number) => void;
}

export default function QuestionTabs({ contents, activeCategoryIndex, setActiveCategoryIndex }: QuestionTabsProps) {
  const { categories } = contents;

  const activeCategory = categories[activeCategoryIndex] ?? '';

  return (
    <>
      <CategoryCarousel
        categories={categories}
        activeIndex={activeCategoryIndex}
        setActiveIndex={setActiveCategoryIndex}
      />
      <QuestionContent pullRequestId={contents.id} questions={contents.questions} activeCategory={activeCategory} />
    </>
  );
}
