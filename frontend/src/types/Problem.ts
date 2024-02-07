interface IData {
  id: number;
  title: string;
  level: number;
  description: string;
  tags: string[];
}
interface IFetchData {
  id: number;
  title: string;
  accepted_user_count: number;
  level: number;
  give_no_rating: boolean;
  average_tries: number;
  description: string;
  tags: string[];
}
export type { IData, IFetchData };
