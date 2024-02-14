interface HistoryDto {
  idx: number;
  pre: string;
  next: string;
  time: string;
}

interface MessageDto {
  type: string;
  roomId: string;
  sender: string;
  message: string;
  date: string;
}

interface ChatRoomInfo {
  roomId: string;
  sender: string;
  receiver: string;
  title: string;
  content: string;
  problemId: number;
  date: string;
  close: boolean;
}

export type { HistoryDto, MessageDto, ChatRoomInfo };
