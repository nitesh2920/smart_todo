import { Todo, PaginatedResponse } from "@/types";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export async function fetchTodos(page: number, limit: number): Promise<PaginatedResponse<Todo>> {
  const response = await fetch(`${API_BASE_URL}/todos?_page=${page}&_limit=${limit}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  
  const totalCount = parseInt(response.headers.get("x-total-count") || "0", 10);
  const data = await response.json();
  
  return { data, totalCount };
}
