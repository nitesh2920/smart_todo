export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
}
