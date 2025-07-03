'use client';

import toast from 'react-hot-toast';

import { markPRAsDone } from '@/apis/retrospective';
import Button from '@/components/common/Button';

interface FixedFooterProps {
  pullRequestId: string;
}

export default function FixedFooter({ pullRequestId }: FixedFooterProps) {
  const handleComplete = async () => {
    try {
      await markPRAsDone(pullRequestId);
      toast.success('회고 완료!');
    } catch (error) {
      toast.error('회고 완료 실패');
      console.error(error);
    }
  };

  return (
    <footer
      className={
        'fixed bottom-0 left-[50%] flex w-full max-w-[840px] -translate-x-1/2 justify-end bg-[linear-gradient(180deg,_rgba(20,22,26,0)_0%,_#14161A_48.11%)] px-[40px] pt-[80px] pb-[12px] bg-[background:'
      }
    >
      <Button variant={'filledPrimary'} size={'medium'} onClick={handleComplete}>
        {'회고완료'}
      </Button>
    </footer>
  );
}
