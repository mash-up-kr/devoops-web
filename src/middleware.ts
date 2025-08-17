import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { TOKEN_KEY } from './constants/cookies';

const PUBLIC_PATHS = ['/favicon.ico', '/_next', '/api'];
const PROTECTED_MATCHERS = ['/', '/repolink', '/retrospective/:pullRequestId'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1) 정적 파일이나 API 루트 등은 건너뛰기
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // 3) 보호된 경로에 접근했을 때
  const isProtected = PROTECTED_MATCHERS.some((pattern) => {
    return pathname === pattern || pathname.startsWith(pattern);
  });

  if (process.env.NEXT_PUBLIC_MOCK_API === 'enabled' && isProtected) {
    const token = req.cookies.get(TOKEN_KEY)?.value;

    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/landing';
      url.searchParams.set('error', 'unauthorized');
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // 미들웨어를 적용할 경로
  matcher: ['/', '/repolink', '/retrospective/:pullRequestId'],
};
