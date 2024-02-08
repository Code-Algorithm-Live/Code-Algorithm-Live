import { HelpDto, Receiver, RoomUuid, Sender } from '@/types/Help';

interface ModalDataForm {
  sender: Sender;
  receiver: Receiver | null;
  helpDto: HelpDto;
  roomUuid: RoomUuid;
  success?: boolean;
  id?: number;
  sendDate?: string;
}

interface ModalContentProps {
  modalData?: ModalDataForm;
}

export type { ModalContentProps };
