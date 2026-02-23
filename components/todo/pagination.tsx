"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
    currentPage: number;
    onPageChange: (page: number) => void;
    isLoading: boolean;
    isPlaceholderData: boolean;
}

export function Pagination({
    currentPage,
    onPageChange,
    isLoading,
    isPlaceholderData
}: PaginationProps) {
    return (
        <div className="flex items-center justify-between py-6">
            <div className="text-sm text-gray-500 font-medium">
                Page <span className="text-gray-900 mx-1 bg-gray-100 px-2 py-1 rounded-md">{currentPage}</span>
            </div>

            <div className="flex space-x-2">
                <Button
                    variant="default"
                    size="sm"
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1 || isLoading}
                    className="w-[100px]"
                >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Previous
                </Button>

                <Button
                    variant="default"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={isLoading || isPlaceholderData}
                    className="w-[100px]"
                >
                    Next
                    <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
