interface FetchPostCompilerRequest {
  code: string;
  input: string;
}

type FetchPostCompilerResponse = string;

interface FetchProblemCrawlRequest {
  problemId: string;
}
type FetchProblemCrawlResponse = string;

export type {
  FetchPostCompilerRequest,
  FetchPostCompilerResponse,
  FetchProblemCrawlRequest,
  FetchProblemCrawlResponse,
};
