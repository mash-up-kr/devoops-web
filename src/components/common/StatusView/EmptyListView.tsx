'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/common/Button';
import StatusView from '@/components/common/StatusView/StatusView';

export default function EmptyListView() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/repolink');
  };

  return (
    <StatusView>
      <div className={'flex flex-col items-center gap-3'}>
        <h1 className={'text-h1 blue-tiny-right inline-block font-medium'}>{'Oops... PR이 없어요'}</h1>
        <div className={'flex flex-col items-center'}>
          <p className={'text-body-large font-medium'}>{'연동한 레포지토리에 PR이 아직 없는 것 같아요'}</p>
          <p className={'text-body-large font-medium'}>{'새로운 레포지토리를 추가해보세요'}</p>
        </div>
      </div>
      <Button variant={'filledPrimary'} size={'large'} onClick={handleClick}>
        {'레포지토리 추가'}
      </Button>
    </StatusView>
  );
}
