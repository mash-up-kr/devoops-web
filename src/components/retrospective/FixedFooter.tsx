'use client';

import type { UserType } from '@/__generated__/@types';
import { markPRAsDone } from '@/apis/retrospective';
import Button from '@/components/common/Button';

interface FixedFooterProps {
  pullRequestId: string;
  user: UserType;
}

export default function FixedFooter({ pullRequestId, user }: FixedFooterProps) {
  const handleComplete = async () => {
    try {
      await markPRAsDone(Number(pullRequestId), user);
      // 이동 처리
      console.log('회고 완료됨!');
    } catch (error) {
      console.error('회고 완료 실패', error);
    }
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
