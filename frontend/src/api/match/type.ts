import { HelpDto, Receiver, RoomUuid, Sender } from '@/types/Help';

interface FetchSendHelpRequest {
  sender: Sender;
  receiver: Receiver;
  helpDto: HelpDto;
  roomUuid: RoomUuid;
}
interface FetchSendHelpResponse {
  data: string;
}

interface FetchAcceptHelpRequest {
  sender: Sender;
  receiver: Receiver;
  helpDto: HelpDto;
  roomUuid: RoomUuid;
}

interface FetchAcceptHelpResponse {
  data: string;
}

export type {
  FetchAcceptHelpRequest,
  FetchAcceptHelpResponse,
  FetchSendHelpRequest,
  FetchSendHelpResponse,
};
