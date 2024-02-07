import { instance } from '@/api/instance';
import { HelpDto, RoomUuid, Sender } from '@/types/Help';

type FetchRegistHelpRequest = {
  sender: Sender;
  helpDto: HelpDto;
  roomUuid: RoomUuid;
};

const fetchRegistHelp = async (data: FetchRegistHelpRequest) => {
  const result = await instance.post<FetchRegistHelpRequest>(
    '/help/waitqueue',
    data,
  );

  return result;
};

export { fetchRegistHelp };
export type { FetchRegistHelpRequest };
