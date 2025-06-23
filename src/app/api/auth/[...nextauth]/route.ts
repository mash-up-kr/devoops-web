import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

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
      if (account) {
        // TODO: 백엔드 로그인 API 전달받으면 실제 token 응답값으로 변경해야함
        const dummyAccessToken = 'dummyAccessToken';
        const newToken = { ...token, accessToken: dummyAccessToken };

        return newToken;
      }

      return token;
    },
  },
});

export { handler as GET, handler as POST };
