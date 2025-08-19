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

  const handleComplete = async () => {
    if (isRefreshing) return;

    // 변경사항이 없으면 fetch 보내지 않음
    if (isCompleted && !hasChanges()) {
      return;
    }

    // answerId가 없는 값이 있으면 요청을 보내지 않음
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
      if (lastSubmittedAnswers.length === 0) {
        // First submit 처리
        await updateAllAnswersMutation.mutateAsync({ data: { answers } });
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
              updateAnswerMutation.mutateAsync({
                answerId: ans.answerId,
                data: { content: ans.content },
              }),
            ),
          );
          setLastSubmittedAnswers([...answers]);
        }
      }

      // 완료되지 않은 상태에서만 markPRAsDone 호출
      if (!isCompleted) {
        await markPRAsDoneMutation.mutateAsync({ pullRequestId: Number(pullRequestId) });
      }

      setIsRefreshing(true);
      // refetch 서버 데이터
      await queryClient.refetchQueries({ queryKey: ['pullRequestDetail', Number(pullRequestId)] });
      setIsRefreshing(false);
      if (onComplete) onComplete();
    } catch (error) {
      console.error('회고 완료 실패', error);
      setIsRefreshing(false);
    }
  };

  const handleGoHome = () => {
    // 추후 toast 와 자동저장 구현되면 적용 예정
    // // 저장 중이면 경고
    // if (autoSaveStatus === 'saving') {
    //   const proceedWhileSaving = window.confirm(
    //     '저장 중입니다. 홈으로 이동하시겠어요? 진행 중인 저장이 완료되지 않을 수 있습니다.',
    //   );
    //   if (!proceedWhileSaving) return;
    // }
    // // 변경사항이 있으면 경고
    // if (hasChanges()) {
    //   const proceed = window.confirm('작성 중인 회고가 저장되지 않았습니다. 홈으로 이동하시겠어요?');
    //   if (!proceed) return;
    // }

    router.push('/', { scroll: true });
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
            markPRAsDoneMutation.isPending ||
            isRefreshing
          }
        >
          {isRefreshing ? '새로고침 중...' : '회고완료'}
        </Button>
        <Button variant={'filledPrimary'} size={'medium'} onClick={handleGoHome}>
          {'홈으로'}
        </Button>
      </div>
    </footer>
  );
}
