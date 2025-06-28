import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import { login } from '@/apis/auth/login';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token.accessToken) {
        return { ...session, accessToken: token.accessToken };
      }

      return session;
    },
    async jwt({ token, account }) {
      if (account?.access_token) {
        const response = await login({ body: { githubAccessToken: account.access_token } });

        const newToken = { ...token, accessToken: response.data.accessToken, refreshToken: response.data.refreshToken };

        return newToken;
      }

      return token;
    },
  },
});

export { handler as GET, handler as POST };
