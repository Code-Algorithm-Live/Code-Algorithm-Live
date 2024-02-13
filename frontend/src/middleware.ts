import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET;

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret, raw: true });
  const { pathname } = req.nextUrl;

  // 로그인 페이지나 회원가입 페이지가 아니면서 세션이 없는 경우
  if (
    !pathname.startsWith('/login') &&
    !pathname.startsWith('/signup') &&
    !session
  ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return undefined;
}

export const config = {
  matcher: [
    '/',
    '/help/:path*',
    '/chat/:path*',
    '/history/:path*',
    '/login/:path*',
    '/notice/:path*',
  ],
};
