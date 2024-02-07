// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

type IUser = {
  name: string;
  image: string;
  jwtToken: string;
  kakaoName: string;
  SolvedId: string;
};

declare module 'next-auth' {
  interface Session {
    action: string;
    user: IUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends ExtendedJWT {
    name: string;
    jwtToken: string;
    image: string;
    SolvedId: string;
    kakaoName: string;
  }
}
