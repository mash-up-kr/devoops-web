'use client';

import { useState, useMemo, useCallback } from 'react';

import { CategoryCarousel, QuestionContent } from '@/components/home/QuestionTabs';
import { QuestionTabsContext } from '@/providers/QuestionTabsContext';
import { findIndexById } from '@/utils/findIndexById';

const categories = [
  {
    id: 1,
    name: '내 질문',
    questions: [
      {
        id: 1,
        title: 'Redis를 사용해 상태 관리를 하기로 결정한 이유는 무엇이었나요?',
        description: 'Redis를 사용해 상태 관리를 하기로 결정한 이유는 무엇이었나요?',
      },
      {
        id: 2,
        title: '어떤 기술 스택을 선택하게 된 배경이 있나요?',
        description: 'Redis를 사용해 상태 관리를 하기로 결정한 이유는 무엇이었나요? 세줄까지 노출',
      },
    ],
  },
  {
    id: 2,
    name: 'Axios 인스턴스 설계',
    questions: [
      {
        id: 3,
        title: 'Axios 인터셉터를 어떻게 활용하고 계신가요?',
        description: 'API 요청 처리 방식에 대해',
      },
      {
        id: 4,
        title: '에러 핸들링은 어떤 방식으로 구현하셨나요?',
        description: '',
      },
    ],
  },
  {
    id: 3,
    name: '안정성 및 보안',
    questions: [
      {
        id: 5,
        title: '보안 관련해서 특별히 신경쓴 부분이 있나요?',
        description: 'JWT 토큰 관리 등',
      },
      {
        id: 6,
        title: 'CORS 이슈는 어떻게 해결하셨나요?',
        description: '',
      },
    ],
  },
  {
    id: 4,
    name: '성능 최적화',
    questions: [
      {
        id: 7,
        title: '성능 최적화를 위해 어떤 방법들을 사용하셨나요?',
        description: '메모이제이션, 코드 스플리팅 등',
      },
    ],
  },
  {
    id: 5,
    name: '테스팅',
    questions: [
      {
        id: 8,
        title: '테스트 코드는 어느 정도 커버하고 계신가요?',
        description: '단위 테스트, 통합 테스트 등',
      },
    ],
  },
];

export default function QuestionTabs() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const currentIndex = findIndexById(categories, activeCategory);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < categories.length - 1;

  const goToPrev = useCallback(() => {
    if (canGoPrev) {
      setActiveCategory(categories[currentIndex - 1].id);
    }
  }, [canGoPrev, currentIndex, setActiveCategory]);

  const goToNext = useCallback(() => {
    if (canGoNext) {
      setActiveCategory(categories[currentIndex + 1].id);
    }
  }, [canGoNext, currentIndex, setActiveCategory]);

  return (
    <QuestionTabsContext.Provider
      value={useMemo(
        () => ({
          categories,
          activeCategory,
          setActiveCategory,
          currentIndex,
          canGoPrev,
          canGoNext,
          goToPrev,
          goToNext,
        }),
        [activeCategory, canGoNext, canGoPrev, currentIndex, goToNext, goToPrev, setActiveCategory],
      )}
    >
      <CategoryCarousel />
      <QuestionContent />
    </QuestionTabsContext.Provider>
  );
}
