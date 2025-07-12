import { redirect } from 'next/navigation';

const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';

const GithubAuthPage = () => {
  redirect(
    `${GITHUB_AUTH_URL}?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=read:user user:email repo`,
  );
};

export default GithubAuthPage;
