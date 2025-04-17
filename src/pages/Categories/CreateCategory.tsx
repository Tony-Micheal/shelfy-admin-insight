
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CreateCategoryHook, { CreateCategoryHookResult } from '@/components/logic/Categories/CreateCategoryHook';
import CategoryFormContainer from './components/CategoryFormContainer';
import ErrorFallback from './components/ErrorFallback';

const CreateCategory = () => {
  const navigate = useNavigate();
  
  try {
    // Use the hook and get all the needed values
    const hookResult: CreateCategoryHookResult = CreateCategoryHook();
    
    // For debugging
    console.log('Form object:', hookResult?.form);

    // Show error fallback if form or result is not available
    if (!hookResult || !hookResult.form) {
      console.error('Form object is undefined');
      return <ErrorFallback navigate={navigate} />;
    }
    
    const { 
      form, 
      imagePreview, 
      loading, 
      allCategories, 
      isEditing,
      handleImageChange, 
      onSubmit 
    } = hookResult;

    return (
      <MainLayout>
        <div className="container mx-auto py-6">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/categories')}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Button>
            <h1 className="text-2xl font-bold">
              {isEditing ? 'Edit Category' : 'Create New Category'}
            </h1>
          </div>

          <CategoryFormContainer
            form={form}
            imagePreview={imagePreview}
            loading={loading}
            allCategories={allCategories}
            isEditing={isEditing}
            handleImageChange={handleImageChange}
            onSubmit={onSubmit}
            navigate={navigate}
          />
        </div>
      </MainLayout>
    );
  } catch (error) {
    console.error('Error in CreateCategory component:', error);
    return <ErrorFallback navigate={navigate} />;
  }
};

export default CreateCategory;
