interface Sender {
  email: string;
  image: string;
  name: string;
}

interface Receiver {
  email: string;
  image: string;
  name: string;
}

interface HelpDto {
  num: number; // 문제번호
  title: string;
  content: string;
}

type RoomUuid = string;

export type { HelpDto, Receiver, RoomUuid, Sender };
