import { PullRequestReadResponseType } from '@/__generated__/@types';
import { CategoryCarousel, QuestionContent } from '@/components/home/QuestionTabs';

interface QuestionTabsProps {
  contents: PullRequestReadResponseType;
  activeCategoryIndex: number;
  activeCategoryIndexesAction: (index: number) => void;
}

export default function QuestionTabs({
  contents,
  activeCategoryIndex,
  activeCategoryIndexesAction,
}: QuestionTabsProps) {
  const { categories } = contents;

  const activeCategory = categories[activeCategoryIndex] ?? '';

  return (
    <>
      <CategoryCarousel
        categories={categories}
        activeIndex={activeCategoryIndex}
        setActiveIndex={activeCategoryIndexesAction}
      />
      <QuestionContent pullRequestId={contents.id} questions={contents.questions} activeCategory={activeCategory} />
    </>
  );
}
