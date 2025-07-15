'use client';

import React, { useRef, useEffect } from 'react';

import PenIcon from '@/components/common/icons/PenIcon';
import SectionHeader from '@/components/retrospective/SectionHeader';

interface Question {
  questionId: number;
  content: string;
  answer: string | null;
}

interface WrittenAnswer {
  answerId: number;
  content: string;
}

interface RetrospectiveAnswersProps {
  answers: Question[];
  writtenAnswers: WrittenAnswer[];
  setWrittenAnswers: React.Dispatch<React.SetStateAction<WrittenAnswer[]>>;
  onDeleteAnswer?: (questionId: number) => void;
  errorIds: number[];
}

export default function RetrospectiveAnswers({
  answers,
  writtenAnswers,
  setWrittenAnswers,
  onDeleteAnswer,
  errorIds,
}: RetrospectiveAnswersProps) {
  const hasAnswers = answers.length > 0;

  const getAnswerContent = (questionId: number) => {
    return writtenAnswers.find((a) => a.answerId === questionId)?.content ?? '';
  };

  const handleChange = (questionId: number, newContent: string) => {
    setWrittenAnswers((prev) => {
      const exists = prev.some((a) => a.answerId === questionId);
      if (exists) {
        return prev.map((a) => (a.answerId === questionId ? { ...a, content: newContent } : a));
      }
      return [...prev, { answerId: questionId, content: newContent }];
    });
  };

  const itemRefs = useRef<{ [key: number]: HTMLLIElement | null }>({});

  useEffect(() => {
    if (errorIds.length > 0) {
      const firstErrorId = errorIds[0];
      const el = itemRefs.current[firstErrorId];
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [errorIds]);

  return (
    <section className={'flex flex-col gap-[20px]'}>
      <SectionHeader
        title={`PR 회고${hasAnswers ? ` (${answers.length})` : ''}`}
        description={'선택한 질문을 바탕으로 이번 작업을 회고해보세요.'}
        icon={<PenIcon />}
      />

      {!hasAnswers ? (
        <div
          className={
            'border-outline flex items-center justify-start gap-[8px] rounded-[8px] border-[1px] px-[24px] py-[16px]'
          }
        >
          <span>{'경고 아이콘'}</span>
          <span>{'아직 질문을 고르지 않았어요.'}</span>
        </div>
      ) : (
        <ul className={'flex flex-col gap-[20px]'}>
          {answers.map((answer) => {
            const isError = errorIds.includes(answer.questionId);
            return (
              <li
                key={answer.questionId}
                ref={(el) => {
                  itemRefs.current[answer.questionId] = el;
                }}
                className={'bg-dark-grey-50 relative flex flex-col gap-[8px] rounded-[8px] px-[24px] py-[20px]'}
              >
                <div className={'flex items-center justify-between'}>
                  <p className={'text-body-medium font-semibold'}>{answer.content}</p>
                  {onDeleteAnswer && (
                    <button
                      type={'button'}
                      className={'text-on-surface-low ml-2 hover:text-red-500'}
                      onClick={() => onDeleteAnswer(answer.questionId)}
                    >
                      <span>{'휴지통 아이콘'}</span>
                    </button>
                  )}
                </div>
                <textarea
                  value={getAnswerContent(answer.questionId)}
                  onChange={(e) => handleChange(answer.questionId, e.target.value)}
                  placeholder={'어떻게 문제를 해결했는지 어떤 고민을 했었는지 생각하며 기록해보세요.'}
                  className={`text-body-small border-dark-grey-100 resize-none rounded-md border bg-transparent px-4 py-2 text-white focus:ring-primary focus:ring-1 focus:outline-none ${isError ? 'border-red-500' : ''}`}
                  rows={4}
                />
                {isError && (
                  <span className={'mt-1 text-xs text-red-500'}>{'회고를 완료하려면 답변을 작성해 주세요.'}</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
