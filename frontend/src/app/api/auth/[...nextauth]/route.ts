import KakaoProvider from 'next-auth/providers/kakao';
// import NaverProvider from 'next-auth/providers/naver';
import NextAuth from 'next-auth';

export const authOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID ?? '',
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET ?? '',
    }),
    // NaverProvider({
    //   clientId: process.env.NAVER_CLIENT_ID || '',
    //   clientSecret: process.env.NAVER_CLIENT_SECRET || '',
    // }),
  ],
  callbacks: {
    jwt({ token, trigger, session }: any) {
      console.log('token, trigger, session', token, trigger, session);

      if (trigger === 'update' && session?.action === 'logIn') {
        token.name = session.name;
        token.jwtToken = session.jwtToken;
        token.image = session.image;
        token.SolvedId = session.SolvedId;
        token.kakaoName = session.kakaoName;
      }
      return token;
    },
    session({ session, token }: any) {
      console.log('session, token', session, token);

      if (token?.name && token?.image && token?.jwtToken) {
        session.user.name = token.name;
        session.user.image = token.image;
        session.user.jwtToken = token.jwtToken;
        session.user.SolvedId = token.SolvedId;
        session.user.kakaoName = token.kakaoName;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
