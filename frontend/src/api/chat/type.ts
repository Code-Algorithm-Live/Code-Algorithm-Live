import { History } from '@/components/Chat/CodeEditor/type';
import { RoomUuid } from '@/types/Help';

interface FetchPostCompilerRequest {
  code: string;
  input: string;
}

type FetchPostCompilerResponse = string;

interface FetchProblemCrawlRequest {
  problemId: string;
}
type FetchProblemCrawlResponse = string;

interface FetchCreateCodeHistory {
  roomUuid: RoomUuid;
  list: History[];
}

export type {
  FetchCreateCodeHistory,
  FetchPostCompilerRequest,
  FetchPostCompilerResponse,
  FetchProblemCrawlRequest,
  FetchProblemCrawlResponse,
};
