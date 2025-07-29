import { redirect } from 'next/navigation';

import { GITHUB_API_URL } from '@/apis/github/github.api';

const GITHUB_AUTH_URL = `${GITHUB_API_URL}/login/oauth/authorize`;
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const REDIRECT_URI = process.env.GITHUB_REDIRECT_URI;

export default function GithubAuthPage() {
  const params = new URLSearchParams({
    client_id: CLIENT_ID!,
    redirect_uri: REDIRECT_URI!,
    scope: 'read:user user:email repo',
    state: crypto.randomUUID(),
    prompt: 'select_account',
  });

  redirect(`${GITHUB_AUTH_URL}?${params.toString()}`);
}
