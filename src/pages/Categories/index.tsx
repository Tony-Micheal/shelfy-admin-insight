
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import CategoriesTable from '@/components/categories/CategoriesTable';
import CategoryDialog from '@/components/categories/CategoryDialog';
import CategoryHeader from '@/components/categories/CategoryHeader';
import CategorySearch from '@/components/categories/CategorySearch';
import CategoryPagination from '@/components/categories/CategoryPagination';
import { useDispatch } from 'react-redux';
import { createCategoryAction, getCategoryDetailsAction, updateCategoryAction } from '@/redux/actions/CategoriesAction';
import { useToast } from '@/hooks/use-toast';
import AllCategoriesHook from '@/components/logic/Categories/AllCategoriesHook';

const Categories = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  
  const [
    allCates,
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

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <CategoryHeader onCreateClick={handleCreateClick} />
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
