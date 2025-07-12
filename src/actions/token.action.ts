'use server';

import { cookies } from 'next/headers';

const TOKEN_KEY = '@token';

export type TokenType = {
  accessToken: string;
  refreshToken: string;
};

export async function getTokenAction(): Promise<TokenType | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_KEY)?.value;
  if (!token) return null;
  const parsedToken = parseToken(token ?? '');
  return parsedToken;
}

export async function setTokenAction({ accessToken, refreshToken }: TokenType) {
  if (!accessToken || !refreshToken) {
    throw new Error('accessToken or refreshToken is not defined');
  }

  const cookieStore = await cookies();
  cookieStore.set(TOKEN_KEY, stringifyToken({ accessToken, refreshToken }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
}

const stringifyToken = ({ accessToken, refreshToken }: TokenType) => {
  return JSON.stringify({ accessToken, refreshToken });
};

const parseToken = (token: string): TokenType => {
  const parsedToken = JSON.parse(token);
  return {
    accessToken: parsedToken.accessToken,
    refreshToken: parsedToken.refreshToken,
  };
};
