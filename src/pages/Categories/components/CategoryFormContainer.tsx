
import React from 'react';
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import BasicInfoFields from './BasicInfoFields';
import CategoryImageUpload from './CategoryImageUpload';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

// Form schema type for reference
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  title_ar: z.string().min(1, "Title in Arabic is required"),
  points: z.coerce.number().min(0, "Points must be a positive number"),
  parent_id: z.string().optional(),
  image: z.instanceof(FileList).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CategoryFormContainerProps {
  form: UseFormReturn<FormValues>;
  imagePreview: string | null;
  loading: boolean;
  allCategories: any[];
  isEditing: boolean;
  handleImageChange: (files: FileList | null) => void;
  onSubmit: (values: FormValues) => void;
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
