export const GITHUB_API_URL = 'https://github.com';

class GithubApi {
  async login({ code, clientId, clientSecret }: { code: string; clientId: string; clientSecret: string }) {
    return fetch(`${GITHUB_API_URL}/login/oauth/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });
  }
}

export const githubApi = new GithubApi();
