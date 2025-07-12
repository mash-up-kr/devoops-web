'use client';

import { useRouter } from 'next/navigation';

import Button from '../common/Button';

import { apiApi } from '@/__generated__/Api/Api.api';
import { getTokenAction } from '@/actions/token.action';

function Landing() {
  const router = useRouter();

  const checkHasRepositories = async (): Promise<boolean> => {
    try {
      const { data } = (await apiApi.getMyRepositories({ data: { url: '' } })) || {};
      return data?.repositories?.length !== 0;
    } catch {
      return false;
    }
  };

  const checkHasToken = async (): Promise<boolean> => {
    const token = await getTokenAction();
    return !!token;
  };

  const handleLogin = async () => {
    const hasToken = await checkHasToken();
    console.log('#hasToken', hasToken);
    if (!hasToken) return router.push(`/auth/github`);
    const hasRepositories = await checkHasRepositories();
    if (hasRepositories) return router.replace(`/`);

    return router.push('/repolink');
  };
  return (
    <main className={'flex h-screen flex-col items-center justify-center overflow-hidden'}>
      <Button variant={'filledPrimary'} className={'w-[380px]'} onClick={handleLogin}>
        {'시작하기'}
      </Button>

      <p className={'mt-[39px] text-white'}>{`디자인 작업필요`}</p>
    </main>
  );
}

export default Landing;
