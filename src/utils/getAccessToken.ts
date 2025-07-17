export function getAccessToken(user: any): string | undefined {
  return user?.accessToken || user?.githubToken?.token;
}
