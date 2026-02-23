"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "@/services/api";
import { TodoItem } from "@/components/todo/todo-item";
import { AddTodo } from "@/components/todo/add-todo";
import { Pagination } from "@/components/todo/pagination";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: todos, isLoading, isError, error, isPlaceholderData } = useQuery({
    queryKey: ["todos", page],
    queryFn: () => fetchTodos(page, limit),
    placeholderData: (previousData) => previousData, // Keeps previous data during fetch
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Smart Todo Assignment
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage your tasks efficiently with TanStack Query.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <AddTodo currentPage={page} />

            <div className="space-y-3 mt-6">
              {isLoading ? (
                // Loading skeletons
                Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-[74px] w-full rounded-lg" />
                ))
              ) : isError ? (
                <div className="text-center py-10 text-red-500 bg-red-50 rounded-lg border border-red-100">
                  <p className="font-medium">Error loading todos</p>
                  <p className="text-sm mt-1 opacity-80">
                    {error instanceof Error ? error.message : "Unknown error occurred"}
                  </p>
                </div>
              ) : !todos || todos.length === 0 ? (
                <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <p>No todos found for this page.</p>
                </div>
              ) : (
                <div className="space-y-3 transition-opacity duration-200" style={{ opacity: isPlaceholderData ? 0.5 : 1 }}>
                  {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} currentPage={page} />
                  ))}
                </div>
              )}
            </div>

            <hr className="my-6 border-gray-100" />

            <Pagination
              currentPage={page}
              onPageChange={setPage}
              isLoading={isLoading}
              isPlaceholderData={isPlaceholderData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
