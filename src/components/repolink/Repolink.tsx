'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import Button from '@/components/common/Button';
import RepolinkModal from '@/components/common/Modal/RepolinkModal/RepolinkModal';

function Repolink() {
  const router = useRouter();

  const handleStart = () => {
    router.replace('/');
  };

  return (
    <RepolinkModal defaultOpen isOutsideClickClose={false}>
      <Button className={'mt-[24px] w-full'} onClick={handleStart}>
        {'시작하기'}
      </Button>
    </RepolinkModal>
  );
}

export default Repolink;
