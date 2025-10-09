'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  useMarkPRAsDoneMutation,
  useUpdateAllAnswersMutation,
  useUpdateAnswerMutation,
} from '@/apis/pull-requests/pullRequests.mutate';
import Button from '@/components/common/Button';
import AutoSaveStatus from '@/components/retrospective/AutoSaveStatus';

interface FixedFooterProps {
  pullRequestId: string;
  answers: { answerId: number; content: string }[];
  questions: { answerId: number; questionId: number }[];
  lastSubmittedAnswers: { answerId: number; content: string }[];
  setLastSubmittedAnswers: (answers: { answerId: number; content: string }[]) => void;
  onComplete?: () => void;
  onErrorIds: (ids: number[]) => void;
  autoSaveStatus?: 'idle' | 'saving' | 'saved';
  isCompleted?: boolean;
}

export default function FixedFooter({
  pullRequestId,
  answers,
  questions,
  lastSubmittedAnswers,
  setLastSubmittedAnswers,
  onComplete,
  onErrorIds,
  autoSaveStatus = 'idle',
  isCompleted = false,
}: FixedFooterProps) {
  const updateAllAnswersMutation = useUpdateAllAnswersMutation();
  const updateAnswerMutation = useUpdateAnswerMutation();
  const markPRAsDoneMutation = useMarkPRAsDoneMutation();
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isTempSaving, setIsTempSaving] = useState(false);
  const router = useRouter();

  const hasChanges = () => {
    // 답변 개수가 다르면 변경사항이 있음 (삭제된 경우)
    if (answers.length !== lastSubmittedAnswers.length) {
      return true;
    }

    // 답변 내용이 다르면 변경사항이 있음
    return answers.some((a) => {
      const prev = lastSubmittedAnswers.find((p) => p.answerId === a.answerId);
      return !prev || prev.content !== a.content;
    });
  };

  // 공통 저장 로직 함수
  const saveAnswers = async () => {
    if (lastSubmittedAnswers.length === 0) {
      // 첫 저장
      await updateAllAnswersMutation.mutateAsync({ data: { answers } });
      setLastSubmittedAnswers([...answers]);
    } else {
      // 변경된 답변만 저장
      const changed = answers.filter((a) => {
        const prev = lastSubmittedAnswers.find((p) => p.answerId === a.answerId);
        return !prev || prev.content !== a.content;
      });
      if (changed.length > 0) {
        await Promise.all(
          changed.map((ans) =>
            updateAnswerMutation.mutateAsync({
              answerId: ans.answerId,
              data: { content: ans.content },
            }),
          ),
        );
        setLastSubmittedAnswers([...answers]);
      }
    }
  };

  // 저장 처리 함수
  const handleComplete = async () => {
    if (isRefreshing) return;

    // 변경사항이 없는 경우
    if (isCompleted && !hasChanges()) {
      return;
    }

    // answerId가 없는 값이 있는 경우
    const invalidAnswers = answers.filter((a) => typeof a.answerId !== 'number' || Number.isNaN(a.answerId));
    if (invalidAnswers.length > 0) {
      return;
    }
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
      await saveAnswers();

      // 완료되지 않은 상태에서만 markPRAsDone 호출
      if (!isCompleted) {
        await markPRAsDoneMutation.mutateAsync({ pullRequestId: Number(pullRequestId) });
      }

      setIsRefreshing(true);
      await queryClient.refetchQueries({ queryKey: ['pullRequestDetail', Number(pullRequestId)] });
      setIsRefreshing(false);
      if (onComplete) onComplete();

      router.push('/', { scroll: true });
    } catch {
      setIsRefreshing(false);
    }
  };

  // 임시 저장 처리 함수
  const handleTempSave = async () => {
    if (isRefreshing || isTempSaving) return;

    if (hasChanges()) {
      setIsTempSaving(true);
      try {
        await saveAnswers();
        router.push('/', { scroll: true });
      } catch {
        // toast 필요 부분
      } finally {
        setIsTempSaving(false);
      }
    } else {
      router.push('/', { scroll: true });
    }
  };

  return (
    <footer
      className={
        'fixed bottom-0 left-1/2 flex w-full max-w-[840px] -translate-x-1/2 justify-end bg-[linear-gradient(180deg,_rgba(20,22,26,0)_0%,_#14161A_48.11%)] px-[40px] pt-[80px] pb-[12px]'
      }
    >
      <div className={'flex items-center gap-4'}>
        <AutoSaveStatus status={autoSaveStatus} />
        {!isCompleted ? (
          <>
            <Button
              variant={'outlineGrey'}
              size={'medium'}
              onClick={handleTempSave}
              disabled={isTempSaving || isRefreshing}
            >
              {isTempSaving ? '저장 중...' : '임시 저장'}
            </Button>
            <Button
              variant={'filledPrimary'}
              size={'medium'}
              onClick={handleComplete}
              disabled={
                answers.length === 0 ||
                updateAllAnswersMutation.isPending ||
                updateAnswerMutation.isPending ||
                markPRAsDoneMutation.isPending ||
                isRefreshing ||
                isTempSaving
              }
            >
              {isRefreshing ? '새로고침 중...' : '회고 완료'}
            </Button>
          </>
        ) : (
          <Button
            variant={'filledPrimary'}
            size={'medium'}
            onClick={handleComplete}
            disabled={
              answers.length === 0 ||
              updateAllAnswersMutation.isPending ||
              updateAnswerMutation.isPending ||
              isRefreshing ||
              isTempSaving
            }
          >
            {isRefreshing ? '새로고침 중...' : '저장'}
          </Button>
        )}
      </div>
    </footer>
  );
}
