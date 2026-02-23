"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Todo } from "@/types";

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
            userId: 1, // Default mock user ID
            id: Date.now(), // Local temporary ID
            title: title.trim(),
            completed: false,
        };

        // Optimistically update the cache for the current page
        queryClient.setQueryData(["todos", currentPage], (oldTodos: Todo[] | undefined) => {
            if (!oldTodos) return [newTodo];
            return [newTodo, ...oldTodos]; // Add to beginning of list
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
