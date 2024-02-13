import KakaoProvider from 'next-auth/providers/kakao';
import type { NextAuthOptions } from 'next-auth';
import NextAuth, { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID ?? '',
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    jwt({ token, session }: { token: JWT; session?: Session }) {
      const updatedToken: JWT = { ...token };
      if (session?.action === 'logIn') {
        updatedToken.name = session.user.name;
        updatedToken.jwtToken = session.user.jwtToken;
        updatedToken.image = session.user.image;
        updatedToken.SolvedId = session.user.SolvedId;
        updatedToken.kakaoName = session.user.kakaoName;
        updatedToken.email = session.user.email;
        updatedToken.userExp = session.user.userExp;
      }

      return updatedToken;
    },
    session({ token, session }: { token: JWT; session: Session }) {
      const updatedSession: Session = { ...session };
      if (
        token.name &&
        token.image &&
        token.jwtToken &&
        token.SolvedId &&
        token.kakaoName &&
        token.email
      ) {
        updatedSession.user = {
          name: token.name,
          image: token.image,
          jwtToken: token.jwtToken,
          SolvedId: token.SolvedId,
          kakaoName: token.kakaoName,
          email: token.email,
          userExp: token.userExp,
        };
      }
      return updatedSession;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
