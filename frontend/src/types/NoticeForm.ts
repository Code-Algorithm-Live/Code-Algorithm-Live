import { Sender, HelpDto, RoomUuid, Receiver } from '@/types/Help';

interface NoticeForm {
  id: number;
  sendDate: string;
  sender: Sender;
  receiver: Receiver | null;
  helpDto: HelpDto;
  roomUuid: RoomUuid;
  success?: boolean;
}

export type { NoticeForm };
