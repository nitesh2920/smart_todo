import { Todo } from "@/types";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export async function fetchTodos(page: number, limit: number): Promise<Todo[]> {
  const response = await fetch(`${API_BASE_URL}/todos?_page=${page}&_limit=${limit}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  
  return response.json();
}
