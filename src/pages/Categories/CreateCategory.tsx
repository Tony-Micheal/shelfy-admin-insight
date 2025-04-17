
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction, getAllCategoriesAction } from '@/redux/actions/CategoriesAction';
import { useToast } from '@/hooks/use-toast';
import { CategoryFormValues } from '@/components/categories/CategoryForm';
import CategoryForm from '@/components/categories/CategoryForm';

const CreateCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch all categories for parent category dropdown
  useEffect(() => {
    dispatch(getAllCategoriesAction(1, 100) as any);
  }, [dispatch]);

  const categoriesResponse = useSelector((state: any) => state.CategoriesReducer.allCates);
  const allCategories = categoriesResponse?.data?.alldata || [];

  const handleImageChange = (fileList: FileList | null) => {
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setImagePreview(e.target.result);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: CategoryFormValues) => {
    setLoading(true);
    try {
      // Create FormData for image upload
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('name_ar', values.name_ar);
      formData.append('points', values.points.toString());
      
      if (values.parent_id && values.parent_id !== 'none') {
        formData.append('parent_id', values.parent_id);
      }
      
      if (values.image && values.image.length > 0) {
        formData.append('image', values.image[0]);
      }
      
      await dispatch(createCategoryAction(formData) as any);
      toast({
        title: 'Success',
        description: 'Category created successfully',
      });
      
      navigate('/categories');
    } catch (error) {
      console.error('Error submitting category:', error);
      toast({
        title: 'Error',
        description: 'Failed to create category',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <CategoryForm
        onSubmit={onSubmit}
        categories={allCategories}
        imagePreview={imagePreview}
        handleImageChange={handleImageChange}
        isLoading={loading}
        title="Create New Category"
        submitButtonText="Create Category"
      />
    </MainLayout>
  );
};

export default CreateCategory;
