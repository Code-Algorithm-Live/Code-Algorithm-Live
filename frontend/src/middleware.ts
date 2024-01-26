import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

const secret = process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET;

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret, raw: true });
  const { pathname } = req.nextUrl;

  // if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
  //   if (session) {
  //     return NextResponse.redirect(new URL('/', req.url));
  //   }
  // } else if (!session) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }
}

export const config = {
  matcher: ['/login', '/signup', '/'],
};
