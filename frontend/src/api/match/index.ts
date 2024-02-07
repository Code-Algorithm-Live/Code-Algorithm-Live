import {
  FetchAcceptHelpRequest,
  FetchAcceptHelpResponse,
  FetchSendHelpRequest,
  FetchSendHelpResponse,
} from '@/api/match/type';
import { instance } from '@/api/instance';

/**
 * 멘토에게 도움 요청을 보냅니다.
 * @param data
 * @returns
 */
const fetchSendHelp = async (data: FetchSendHelpRequest) => {
  const res = await instance.post<FetchSendHelpResponse>(`/help/send`, data);
  return res;
};

/**
 * 멘토가 도움 요청을 수락합니다.
 * @param data
 * @returns
 */
const fetchAcceptHelp = async (data: FetchAcceptHelpRequest) => {
  const res = await instance.post<FetchAcceptHelpResponse>(
    `/help/accept`,
    data,
  );
  return res;
};

export { fetchAcceptHelp, fetchSendHelp };
