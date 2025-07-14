'use client';

import type { UserType } from '@/__generated__/@types';
import { markPRAsDone, submitRetrospectiveAnswers } from '@/apis/pull-requests/retrospective.mutate';
import Button from '@/components/common/Button';
import { getAccessToken } from '@/utils/getAccessToken';

interface FixedFooterProps {
  pullRequestId: string;
  user: UserType;
  answers: { answerId: number; content: string }[];
  onComplete?: () => void;
}

export default function FixedFooter({ pullRequestId, user, answers, onComplete }: FixedFooterProps) {
  const handleComplete = async () => {
    try {
      const hasEmpty = answers.some((a) => a.content.trim() === '');
      if (hasEmpty) {
        alert('모든 질문에 답변을 작성해주세요!');
        return;
      }

      const accessToken = getAccessToken(user);
      if (!accessToken) {
        alert('로그인 정보가 없거나 토큰이 만료되었습니다.');
        return;
      }
      await submitRetrospectiveAnswers(accessToken, answers);
      await markPRAsDone(Number(pullRequestId), accessToken);

      console.log('회고 완료됨!');
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
      <Button variant={'filledPrimary'} size={'medium'} onClick={handleComplete}>
        {'회고완료'}
      </Button>
    </footer>
  );
}
