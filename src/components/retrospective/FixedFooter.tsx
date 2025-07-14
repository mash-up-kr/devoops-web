'use client';

import type { UserType } from '@/__generated__/@types';
import { markPRAsDone, submitRetrospectiveAnswers } from '@/apis/pull-requests/retrospective.mutate';
import Button from '@/components/common/Button';
import { getAccessToken } from '@/utils/getAccessToken';

interface FixedFooterProps {
  pullRequestId: string;
  user: UserType;
  answers: { answerId: number; content: string }[];
  lastSubmittedAnswers: { answerId: number; content: string }[];
  setLastSubmittedAnswers: (answers: { answerId: number; content: string }[]) => void;
  updateRetrospectiveAnswer: (answerId: number, content: string, accessToken: string) => Promise<any>;
  onComplete?: () => void;
  onErrorIds: (ids: number[]) => void;
}

export default function FixedFooter({
  pullRequestId,
  user,
  answers,
  lastSubmittedAnswers,
  setLastSubmittedAnswers,
  updateRetrospectiveAnswer,
  onComplete,
  onErrorIds,
}: FixedFooterProps) {
  const handleComplete = async () => {
    const emptyIds = answers.filter((a) => a.content.trim() === '').map((a) => a.answerId);
    if (emptyIds.length > 0) {
      onErrorIds(emptyIds);
      return;
    }

    try {
      const accessToken = getAccessToken(user);
      if (!accessToken) {
        return;
      }
      if (lastSubmittedAnswers.length === 0) {
        // First submit 처리
        await submitRetrospectiveAnswers(accessToken, answers);
        setLastSubmittedAnswers([...answers]);
      } else {
        // Subsequent submit 처리
        const changed = answers.filter((a) => {
          const prev = lastSubmittedAnswers.find((p) => p.answerId === a.answerId);
          return !prev || prev.content !== a.content;
        });
        if (changed.length > 0) {
          await Promise.all(changed.map((ans) => updateRetrospectiveAnswer(ans.answerId, ans.content, accessToken)));
          setLastSubmittedAnswers([...answers]);
        }
      }
      await markPRAsDone(Number(pullRequestId), accessToken);
      // console.log('회고 완료됨!');
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
      <Button variant={'filledPrimary'} size={'medium'} onClick={handleComplete} disabled={answers.length === 0}>
        {'회고완료'}
      </Button>
    </footer>
  );
}
