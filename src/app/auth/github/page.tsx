import { redirect } from 'next/navigation';

import { GITHUB_API_URL } from '@/apis/github/github.api';

const GITHUB_AUTH_URL = `${GITHUB_API_URL}/login/oauth/authorize`;

const GithubAuthPage = () => {
  redirect(
    `${GITHUB_AUTH_URL}?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=read:user user:email repo`,
  );
};

export default GithubAuthPage;
