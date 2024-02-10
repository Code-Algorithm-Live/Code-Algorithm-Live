import {
  FetchCreateCodeHistory,
  FetchPostCompilerRequest,
  FetchPostCompilerResponse,
  FetchProblemCrawlRequest,
  FetchProblemCrawlResponse,
} from '@/api/chat/type';
import { instance } from '@/api/instance';

/**
 * 코드를 컴파일 합니다.
 * @param data
 * @property code
 * @property input
 * @returns
 */
const fetchPostCompiler = async (data: FetchPostCompilerRequest) => {
  const res = await instance.post<FetchPostCompilerResponse>(`/compiler`, data);
  return res;
};

const fetchProblemCrawl = async ({ problemId }: FetchProblemCrawlRequest) => {
  const res = await instance.get<FetchProblemCrawlResponse>(
    `/problem/crawl/${problemId}`,
  );
  return res;
};

const fetchCreateCodeHistory = async ({
  roomUuid,
  ...data
}: FetchCreateCodeHistory) => {
  const res = await instance.post(`/history/${roomUuid}`, data);
  return res;
};

export { fetchCreateCodeHistory, fetchPostCompiler, fetchProblemCrawl };
