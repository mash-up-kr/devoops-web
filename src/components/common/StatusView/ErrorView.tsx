'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/common/Button';
import StatusView from '@/components/common/StatusView/StatusView';

export default function ErrorView({ error }: { error: Error & { digest?: string } }) {
  const router = useRouter();

  const handleClick = () => {
    router.push('/landing');
  };

  return (
    <StatusView>
      <div className={'flex flex-col items-center gap-3'}>
        <h1 className={'text-h1 blue-tiny-right inline-block font-medium'}>{'Oops... 오류가 발생했어요'}</h1>
        <div className={'flex flex-col items-center gap-1'}>
          <p className={'text-body-large font-medium'}>{'문제가 발생했어요. 잠시 후 다시 시도해 주세요.'}</p>
          {error.message && (
            <p className={'text-caption text-dark-grey-400 font-regular'}>{`에러 메세지: ${error.message}`}</p>
          )}
        </div>
      </div>
      <Button variant={'filledPrimary'} size={'large'} onClick={handleClick}>
        {'홈으로 돌아가기'}
      </Button>
    </StatusView>
  );
}
