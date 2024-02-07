interface FetchPostCompilerRequest {
  code: string;
  input: string;
}

type FetchPostCompilerResponse = string;

interface FetchProblemCrawlRequest {
  problemId: string;
}
interface FetchProblemCrawlResponse {}

export type {
  FetchPostCompilerRequest,
  FetchPostCompilerResponse,
  FetchProblemCrawlRequest,
  FetchProblemCrawlResponse,
};
