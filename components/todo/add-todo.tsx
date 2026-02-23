"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Todo, PaginatedResponse } from "@/types";

interface AddTodoProps {
    currentPage: number;
}

export function AddTodo({ currentPage }: AddTodoProps) {
    const [title, setTitle] = useState("");
    const queryClient = useQueryClient();

    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newTodo: Todo = {
            userId: 1,
            id: Date.now(),
            title: title.trim(),
            completed: false,
        };


        queryClient.setQueryData(["todos", currentPage], (oldData: PaginatedResponse<Todo> | undefined) => {
            if (!oldData) return { data: [newTodo], totalCount: 1 };

            return {
                ...oldData,
                data: [newTodo, ...oldData.data],
                totalCount: oldData.totalCount + 1
            };
        });

        setTitle("");
    };

    return (
        <form onSubmit={handleAddTodo} className="flex w-full items-center space-x-2 mb-6">
            <Input
                type="text"
                placeholder="Add a new todo..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!title.trim()}>
                <Plus className="h-5 w-5" />
                <span className="sr-only">Add</span>
            </Button>
        </form>
    );
}
