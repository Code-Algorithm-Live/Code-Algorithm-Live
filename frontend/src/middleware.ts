import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET;

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret, raw: true });
  const { pathname } = req.nextUrl;

  // 로그인 페이지가 아닌데 세션이 없으면 로그인 페이지로
  if (!pathname.startsWith('/login')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
  return undefined;
}

export const config = {
  matcher: ['/login'],
};
