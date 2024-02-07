// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

type IUser = {
  name: string;
  image: string;
  jwtToken: string;
  kakaoName: string;
  SolvedId: string;
  email: string;
  userExp: number;
};

declare module 'next-auth' {
  interface Session {
    action: string;
    user: IUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    name: string;
    image: string;
    jwtToken: string;
    SolvedId: string;
    kakaoName: string;
    email: string;
    userExp: number;
  }
}
