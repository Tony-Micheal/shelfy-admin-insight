
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

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

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => {
                console.log(`Going to previous page: ${currentPage - 1}`);
                handlePageChange(currentPage - 1);
              }} 
            />
          </PaginationItem>
        )}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext 
              onClick={() => {
                console.log(`Going to next page: ${currentPage + 1}`);
                handlePageChange(currentPage + 1);
              }} 
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default CategoryPagination;
