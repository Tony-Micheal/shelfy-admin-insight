
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import CategoriesTable from '@/components/categories/CategoriesTable';
import CategoryHeader from '@/components/categories/CategoryHeader';
import CategorySearch from '@/components/categories/CategorySearch';
import CategoryPagination from '@/components/categories/CategoryPagination';
import AllCategoriesHook from '@/components/logic/Categories/AllCategoriesHook';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();
  
  const [
    allCates,
    totalPages,
    currentPage,
    handlePageChange,
    searchTerm,
    handleSearch,
    loading
  ] = AllCategoriesHook();

  const handleEditClick = (id: number) => {
    navigate(`/categories/edit/${id}`);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <CategoryHeader />
        <CategorySearch searchTerm={searchTerm} handleSearch={handleSearch} />

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <CategoriesTable categories={allCates} onEdit={handleEditClick} />
            <CategoryPagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              handlePageChange={handlePageChange} 
            />
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Categories;
