interface Sender {
  email: string;
  image: string;
  kakaoname: string;
  nickname: string;
  exp: number;
  solvedId: string;
}

interface Receiver {
  email: string;
  image: string;
  kakaoname: string;
  nickname: string;
  exp: number;
  solvedId: string;
}

interface HelpDto {
  num: number; // 문제번호
  title: string;
  content: string;
}

type RoomUuid = string;

interface HelpForm {
  sender: Sender;
  receiver: Receiver;
  helpDto: HelpDto;
  roomUuid: RoomUuid;
}

export type { HelpDto, Receiver, RoomUuid, Sender, HelpForm };
