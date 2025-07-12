import { Suspense } from 'react';

import MyPR from '@/components/home/MyPR';
import MyPRSkeleton from '@/components/home/Skeleton/MyPRSkeleton';

export default function Home() {
  return (
    <div className={'mx-auto max-w-[1200px] px-[40px]'}>
      <Suspense fallback={<MyPRSkeleton />}>
        <MyPR />
      </Suspense>
    </div>
  );
}
