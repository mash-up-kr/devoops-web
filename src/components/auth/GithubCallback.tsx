'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { apiApi } from '@/__generated__/Api/Api.api';
import { getTokenAction, setTokenAction } from '@/actions/token.action';
import RepoLoadingModal from '@/components/common/Modal/RepoLoadingModal/RepoLoadingModal';

function GithubCallback({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) {
  const router = useRouter();
  const checkHasRepositories = async (): Promise<boolean> => {
    try {
      const { data } = (await apiApi.getMyRepositories({})) || {};
      return data?.repositories?.length !== 0;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getTokenAction();
      if (!token) {
        await setTokenAction({ accessToken, refreshToken });
      }
      const hasRepositories = await checkHasRepositories();
      if (hasRepositories) return router.replace(`/`);
      return router.replace(`/repolink`);
    };

    fetchToken();
  }, []);

  return <RepoLoadingModal />;
}

export default GithubCallback;
