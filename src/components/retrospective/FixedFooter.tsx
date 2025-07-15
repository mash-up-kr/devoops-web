'use client';

import type { UserType } from '@/__generated__/@types';
import Button from '@/components/common/Button';
import AutoSaveStatus from '@/components/retrospective/AutoSaveStatus';
import { useMarkPRAsDoneMutation } from '@/hooks/api/retrospective/useMarkPRAsDoneMutation';
import { useUpdateAllAnswersMutation } from '@/hooks/api/retrospective/useUpdateAllAnswersMutation';
import { useUpdateAnswerMutation } from '@/hooks/api/retrospective/useUpdateAnswerMutation';

interface FixedFooterProps {
  pullRequestId: string;
  user: UserType;
  answers: { answerId: number; content: string }[];
  questions: { answerId: number; questionId: number }[];
  lastSubmittedAnswers: { answerId: number; content: string }[];
  setLastSubmittedAnswers: (answers: { answerId: number; content: string }[]) => void;
  onComplete?: () => void;
  onErrorIds: (ids: number[]) => void;
  autoSaveStatus?: 'idle' | 'saving' | 'saved';
}

export default function FixedFooter({
  pullRequestId,
  user,
  answers,
  questions,
  lastSubmittedAnswers,
  setLastSubmittedAnswers,
  onComplete,
  onErrorIds,
  autoSaveStatus = 'idle',
}: FixedFooterProps) {
  const updateAllAnswersMutation = useUpdateAllAnswersMutation();
  const updateAnswerMutation = useUpdateAnswerMutation();
  const markPRAsDoneMutation = useMarkPRAsDoneMutation();

  const handleComplete = async () => {
    const emptyQuestionIds = answers
      .filter((a) => a.content.trim() === '')
      .map((a) => {
        const bq = questions.find((q) => q.answerId === a.answerId);
        return bq?.questionId;
      })
      .filter((id): id is number => id !== undefined);
    if (emptyQuestionIds.length > 0) {
      onErrorIds(emptyQuestionIds);
      return;
    }

    try {
      if (lastSubmittedAnswers.length === 0) {
        // First submit 처리
        await updateAllAnswersMutation.mutateAsync({ user, answers });
        setLastSubmittedAnswers([...answers]);
      } else {
        // Subsequent submit 처리
        const changed = answers.filter((a) => {
          const prev = lastSubmittedAnswers.find((p) => p.answerId === a.answerId);
          return !prev || prev.content !== a.content;
        });
        if (changed.length > 0) {
          await Promise.all(
            changed.map((ans) =>
              updateAnswerMutation.mutateAsync({ user, answerId: ans.answerId, content: ans.content }),
            ),
          );
          setLastSubmittedAnswers([...answers]);
        }
      }
      await markPRAsDoneMutation.mutateAsync({ user, pullRequestId: Number(pullRequestId) });
    } catch (error) {
      console.error('회고 완료 실패', error);
    }
    if (onComplete) onComplete();
  };

  return (
    <footer
      className={
        'fixed bottom-0 left-1/2 flex w-full max-w-[840px] -translate-x-1/2 justify-end bg-[linear-gradient(180deg,_rgba(20,22,26,0)_0%,_#14161A_48.11%)] px-[40px] pt-[80px] pb-[12px]'
      }
    >
      <div className={'flex items-center gap-4'}>
        <AutoSaveStatus status={autoSaveStatus} />
        <Button
          variant={'filledPrimary'}
          size={'medium'}
          onClick={handleComplete}
          disabled={
            answers.length === 0 ||
            updateAllAnswersMutation.isPending ||
            updateAnswerMutation.isPending ||
            markPRAsDoneMutation.isPending
          }
        >
          {'회고완료'}
        </Button>
      </div>
    </footer>
  );
}
