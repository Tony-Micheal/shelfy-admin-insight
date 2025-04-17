
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useSelector } from 'react-redux';
import { CategoryFormValues } from '@/components/categories/CategoryForm';
import CategoryForm from '@/components/categories/CategoryForm';
import EditCategoryHook from '@/components/logic/Categories/EditCategoryHook';

const EditCategory = () => {
  const {
    id,
    loading,
    categoryData,
    imagePreview,
    handleImageChange,
    updateCategory
  } = EditCategoryHook();

  const categoriesResponse = useSelector((state: any) => state.CategoriesReducer.allCates);
  const allCategories = categoriesResponse?.data?.alldata || [];

  const onSubmit = async (values: CategoryFormValues) => {
    const success = await updateCategory(values);
    return success;
  };

  if (!categoryData && loading) {
    return (
      <MainLayout>
        <div className="container mx-auto py-6 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <CategoryForm
        onSubmit={onSubmit}
        initialValues={categoryData}
        categories={allCategories}
        imagePreview={imagePreview}
        handleImageChange={handleImageChange}
        isLoading={loading}
        currentCategoryId={id}
        title="Edit Category"
        submitButtonText="Update Category"
      />
    </MainLayout>
  );
};

export default EditCategory;
