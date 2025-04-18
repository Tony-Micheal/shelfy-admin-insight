
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SearchIcon, Shield } from 'lucide-react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationNext, 
  PaginationPrevious,
  PaginationLink,
} from '@/components/ui/pagination';
import RolesTable from '@/components/roles/RolesTable';
import AllRolesHook from '@/components/logic/Roles/AllRolesHook';
import { Provider } from 'react-redux';
import store from '@/redux/store';

export default function Roles() {
  const [allRoles, totalPages, currentPage, handlePageChange, searchTerm, handleSearch, loading] = AllRolesHook();

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxDisplayedPages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2));
    let endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);

    if (endPage - startPage + 1 < maxDisplayedPages) {
      startPage = Math.max(1, endPage - maxDisplayedPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <Provider store={store}>
      <MainLayout showFilters={false}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Role Management</h1>
          </div>
          
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Shield size={20} className="mr-2" />
                Roles List
              </h3>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-6">
                <div className="relative w-full md:w-96">
                  <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search by role name..." 
                    className="pl-9" 
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    aria-label="Search roles by name"
                  />
                </div>
              </div>
              
              <RolesTable 
                roles={allRoles} 
                loading={loading}
              />

              {totalPages > 0 && (
                <div className="mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={handlePreviousPage}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      
                      {getPageNumbers().map(page => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            isActive={page === currentPage}
                            onClick={() => handlePageChange(page)}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={handleNextPage}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </Card>
        </div>
      </MainLayout>
    </Provider>
  );
}
