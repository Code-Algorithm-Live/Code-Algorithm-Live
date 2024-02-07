interface Sender {
  email: string;
  image: string;
  nickname: string;
  solvedId: string;
  kakaoname: string;
}

interface Receiver {
  email: string;
  image: string;
  nickname: string;
  kakaoname: string;
  solvedId: string;
}

interface HelpDto {
  num: number; // 문제번호
  title: string;
  content: string;
}

type RoomUuid = string;

export type { HelpDto, Receiver, RoomUuid, Sender };
