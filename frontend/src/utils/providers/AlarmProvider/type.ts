import { HelpDto, Receiver, RoomUuid, Sender } from '@/types/Help';

interface HelpForm {
  sender: Sender;
  receiver: Receiver;
  helpDto: HelpDto;
  roomUuid: RoomUuid;
  success: boolean;
}

export type { HelpForm };
