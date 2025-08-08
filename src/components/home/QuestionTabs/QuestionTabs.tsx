'use client';

import { useEffect, useState } from 'react';

import { PullRequestReadResponseType } from '@/__generated__/@types';
import { CategoryCarousel, QuestionContent } from '@/components/home/QuestionTabs';

interface QuestionTabsProps {
  contents: PullRequestReadResponseType;
}

export default function QuestionTabs({ contents }: QuestionTabsProps) {
  const { categories } = contents;

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [categories]);

  const activeCategory = categories[activeIndex] ?? '';

  return (
    <>
      <CategoryCarousel categories={categories} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      <QuestionContent pullRequestId={contents.id} questions={contents.questions} activeCategory={activeCategory} />
    </>
  );
}
