'use client';

import { useRouter } from 'next/navigation';

import { apiApi } from '@/__generated__/Api/Api.api';
import { getTokenAction } from '@/actions/token.action';

export const useLoginRedirect = () => {
  const router = useRouter();

  const checkHasRepositories = async (): Promise<boolean> => {
    try {
      const { data } = (await apiApi.getMyRepositories()) || {};
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
    if (!hasToken) return router.push(`/auth/github`);
    const hasRepositories = await checkHasRepositories();
    if (hasRepositories) return router.replace(`/`);

    return router.push('/repolink');
  };

  return { handleLogin };
};
