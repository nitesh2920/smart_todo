"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Check, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { Todo, PaginatedResponse } from "@/types";

interface TodoItemProps {
    todo: Todo;
    currentPage: number;
}

export function TodoItem({ todo, currentPage }: TodoItemProps) {
    const queryClient = useQueryClient();

    const toggleCompleted = () => {
        queryClient.setQueryData(["todos", currentPage], (oldData: { data: Todo[], totalCount: number } | undefined) => {
            if (!oldData) return undefined;

            return {
                ...oldData,
                data: oldData.data.map((t) =>
                    t.id === todo.id ? { ...t, completed: !t.completed } : t
                )
            };
        });
    };

    return (
        <div
            className={cn(
                "flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-100 shadow-sm transition-all hover:shadow-md cursor-pointer",
                todo.completed ? "opacity-75" : "opacity-100"
            )}
            onClick={toggleCompleted}
        >
            <button
                className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-md border text-white transition-colors",
                    todo.completed
                        ? "border-green-500 bg-green-500"
                        : "border-gray-300 bg-transparent hover:border-gray-400 text-transparent"
                )}
                aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
            >
                {todo.completed ? (
                    <Check className="h-4 w-4" />
                ) : (
                    <Check className="h-4 w-4 opacity-0" />
                )}
            </button>

            <span
                className={cn(
                    "flex-1 text-sm md:text-base font-medium transition-colors",
                    todo.completed ? "text-gray-500 line-through" : "text-gray-900"
                )}
            >
                {todo.title}
            </span>

            {/* Optional: Show badges for ID or user ID */}
            <div className="hidden sm:flex text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                ID: {todo.id}
            </div>
        </div>
    );
}
