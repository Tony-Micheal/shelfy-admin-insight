
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryPaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const CategoryPagination = ({ currentPage, totalPages, handlePageChange }: CategoryPaginationProps) => {
  console.log('Pagination Props:', { currentPage, totalPages });

  if (totalPages <= 1) {
    console.log('Not rendering pagination: totalPages <= 1');
    return null;
  }

  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (!isPreviousDisabled) {
                console.log(`Going to previous page: ${currentPage - 1}`);
                handlePageChange(currentPage - 1);
              }
            }}
            className={isPreviousDisabled ? "pointer-events-none opacity-50" : ""}
            aria-disabled={isPreviousDisabled}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => {
              if (!isNextDisabled) {
                console.log(`Going to next page: ${currentPage + 1}`);
                handlePageChange(currentPage + 1);
              }
            }}
            className={isNextDisabled ? "pointer-events-none opacity-50" : ""}
            aria-disabled={isNextDisabled}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CategoryPagination;
