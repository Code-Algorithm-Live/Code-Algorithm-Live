import { instance } from '@/api/instance';
import {
  FetchPostCompilerResponse,
  FetchPostCompilerRequest,
  FetchProblemCrawlRequest,
  FetchProblemCrawlResponse,
} from '@/api/chat/type';

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

export { fetchPostCompiler, fetchProblemCrawl };
