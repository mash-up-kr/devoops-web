import { apiApi } from '@/__generated__/Api/Api.api';
import { githubApi } from '@/apis/github/github.api';
import GithubCallback from '@/components/auth/GithubCallback';

type Props = {
  searchParams: Promise<{
    code?: string;
  }>;
};

async function GithubAuthCallbackPage({ searchParams }: Props) {
  const { code } = await searchParams;

  if (!code) {
    return (
      <div>
        <h1>{'code가 없습니다.'}</h1>
      </div>
    );
  }

  try {
    const response = await githubApi.login({
      code,
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
    });
    const data = await response.json();
    const { data: userData } = await apiApi.issueToken({ data: { githubAccessToken: data.access_token } });
    return (
      <div>
        <GithubCallback accessToken={userData.accessToken ?? ''} refreshToken={userData.refreshToken ?? ''} />
      </div>
    );
  } catch {
    return (
      <div>
        <h1>{'토큰 설정 실패'}</h1>
      </div>
    );
  }
}

export default GithubAuthCallbackPage;
