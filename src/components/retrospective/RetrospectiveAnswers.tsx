'use client';

import React, { useRef, useEffect } from 'react';

import EditButtonIcon from '@/components/common/icons/EditButtonIcon';
import PenIcon from '@/components/common/icons/PenIcon';
import WarningIcon from '@/components/common/icons/WarningIcon';
import SectionHeader from '@/components/retrospective/SectionHeader';

interface RetrospectiveAnswersProps {
  selectedQuestions: { questionId: number; content: string }[];
  // eslint-disable-next-line react/no-unused-prop-types
  answers: { answerId: number; questionId: number; content: string }[];
  getAnswerContent: (questionId: number) => string;
  handleChange: (questionId: number, newContent: string) => void;
  onDeleteAnswer?: (questionId: number) => void;
  errorIds: number[];
}

export default function RetrospectiveAnswers({
  selectedQuestions,
  getAnswerContent,
  handleChange,
  onDeleteAnswer,
  errorIds,
}: RetrospectiveAnswersProps) {
  const hasAnswers = selectedQuestions.length > 0;

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
        title={`PR 회고${hasAnswers ? ` (${selectedQuestions.length})` : ''}`}
        description={'선택한 질문을 바탕으로 이번 작업을 회고해보세요.'}
        icon={<PenIcon />}
      />

      {!hasAnswers ? (
        <div
          className={
            'border-outline flex items-center justify-start gap-[8px] rounded-[8px] border-[1px] px-[24px] py-[16px]'
          }
        >
          <span>{<WarningIcon />}</span>
          <span>{'아직 질문을 고르지 않았어요.'}</span>
        </div>
      ) : (
        <ul className={'flex flex-col gap-[20px]'}>
          {selectedQuestions.map((question) => {
            const isError = errorIds.includes(question.questionId);
            return (
              <li
                key={question.questionId}
                ref={(el) => {
                  itemRefs.current[question.questionId] = el;
                }}
                className={'bg-dark-grey-50 relative flex flex-col gap-[8px] rounded-[8px] px-[24px] py-[20px]'}
              >
                <div className={'flex items-center justify-between'}>
                  <p className={'text-body-medium font-semibold'}>{question.content}</p>
                  {onDeleteAnswer && (
                    <button
                      type={'button'}
                      className={'text-on-surface-low ml-2 hover:text-red-500'}
                      onClick={() => onDeleteAnswer(question.questionId)}
                    >
                      <span>{<EditButtonIcon />}</span>
                    </button>
                  )}
                </div>
                <textarea
                  value={getAnswerContent(question.questionId)}
                  onChange={(e) => handleChange(question.questionId, e.target.value)}
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
