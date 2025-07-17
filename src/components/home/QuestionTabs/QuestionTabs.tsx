'use client';

import { useState } from 'react';

import { PullRequestReadResponseType } from '@/__generated__/@types';
import { CategoryCarousel, QuestionContent } from '@/components/home/QuestionTabs';

interface QuestionTabsProps {
  contents: PullRequestReadResponseType;
}

export default function QuestionTabs({ contents }: QuestionTabsProps) {
  const { categories } = contents;

  const [activeCategory, setActiveCategory] = useState(categories[0] || '');

  return (
    <>
      <CategoryCarousel categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <QuestionContent pullRequestId={contents.id} questions={contents.questions} activeCategory={activeCategory} />
    </>
  );
}
