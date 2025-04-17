
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Plus, Search } from 'lucide-react';
import CategoriesTable from '@/components/categories/CategoriesTable';
import CategoryDialog from '@/components/categories/CategoryDialog';
import { useDispatch } from 'react-redux';
import { createCategoryAction, getCategoryDetailsAction, updateCategoryAction } from '@/redux/actions/CategoriesAction';
import { useToast } from '@/hooks/use-toast';
import AllCategoriesHook from '@/components/logic/Categories/AllCategoriesHook';

const Categories = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  
  const [
    allCategories,
    totalPages,
    currentPage,
    handlePageChange,
    searchTerm,
    handleSearch,
    loading
  ] = AllCategoriesHook();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<{ id?: number; title: string; points: number }>({
    title: '',
    points: 0,
  });

  const handleCreateClick = () => {
    setIsEditing(false);
    setCurrentCategory({ title: '', points: 0 });
    setIsDialogOpen(true);
  };

  const handleEditClick = async (id: number) => {
    try {
      const response = await dispatch(getCategoryDetailsAction(id) as any);
      if (response && response.data) {
        setCurrentCategory({
          id: response.data.id,
          title: response.data.title,
          points: response.data.points,
        });
        setIsEditing(true);
        setIsDialogOpen(true);
      }
    } catch (error) {
      console.error('Error fetching category details:', error);
      toast({
        title: 'Error',
        description: 'Failed to load category details',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (values: { title: string; points: number }) => {
    try {
      if (isEditing && currentCategory.id) {
        await dispatch(
          updateCategoryAction({
            id: currentCategory.id,
            ...values,
          }) as any
        );
        toast({
          title: 'Success',
          description: 'Category updated successfully',
        });
      } else {
        await dispatch(createCategoryAction(values) as any);
        toast({
          title: 'Success',
          description: 'Category created successfully',
        });
      }
      setIsDialogOpen(false);
      // Refresh the categories list
      handlePageChange(currentPage);
    } catch (error) {
      console.error('Error submitting category:', error);
      toast({
        title: 'Error',
        description: isEditing ? 'Failed to update category' : 'Failed to create category',
        variant: 'destructive',
      });
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <Pagination className="mt-4">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
            </PaginationItem>
          )}

          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            // Show current page, first, last, and pages around current
            if (
              pageNum === 1 ||
              pageNum === totalPages ||
              (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
            ) {
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    isActive={pageNum === currentPage}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            // Show ellipsis for gaps
            if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
              return <PaginationItem key={pageNum}>...</PaginationItem>;
            }
            return null;
          })}

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Categories</h1>
          <Button onClick={handleCreateClick}>
            <Plus className="h-4 w-4 mr-2" />
            Create Category
          </Button>
        </div>

        <div className="mb-6">
          <div className="max-w-sm">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search categories..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <CategoriesTable categories={allCategories} onEdit={handleEditClick} />
            {renderPagination()}
          </>
        )}

        <CategoryDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleSubmit}
          initialData={currentCategory}
          isEditing={isEditing}
        />
      </div>
    </MainLayout>
  );
};

export default Categories;
