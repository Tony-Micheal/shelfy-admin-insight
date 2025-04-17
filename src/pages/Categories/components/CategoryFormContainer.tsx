
import React from 'react';
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import BasicInfoFields from './BasicInfoFields';
import CategoryImageUpload from './CategoryImageUpload';
import { UseFormReturn } from 'react-hook-form';
import { CategoryFormValues } from '@/components/logic/Categories/CreateCategoryHook';

interface CategoryFormContainerProps {
  form: UseFormReturn<CategoryFormValues>;
  imagePreview: string | null;
  loading: boolean;
  allCategories: any[];
  isEditing: boolean;
  handleImageChange: (files: FileList | null) => void;
  onSubmit: (values: CategoryFormValues) => void;
  navigate: (path: string) => void;
}

const CategoryFormContainer: React.FC<CategoryFormContainerProps> = ({
  form,
  imagePreview,
  loading,
  allCategories,
  isEditing,
  handleImageChange,
  onSubmit,
  navigate
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <BasicInfoFields 
            form={form} 
            allCategories={allCategories} 
          />
          
          <CategoryImageUpload
            form={form}
            imagePreview={imagePreview}
            handleImageChange={handleImageChange}
          />

          <div className="flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/categories')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Processing...' : isEditing ? 'Update Category' : 'Create Category'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CategoryFormContainer;
