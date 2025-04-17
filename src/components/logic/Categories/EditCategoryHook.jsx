
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategoryDetailsAction, updateCategoryAction, getAllCategoriesAction } from '../../../redux/actions/CategoriesAction';
import { useToast } from '@/hooks/use-toast';

const EditCategoryHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const { toast } = useToast();
  const { id } = useParams();

  // Fetch category details on component mount
  useEffect(() => {
    const fetchCategoryDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const response = await dispatch(getCategoryDetailsAction(parseInt(id)));
        if (response && response.data.category) {
          const category = response.data.category;
          console.log(category);

          // Prepare the initial form data
          setCategoryData({
            ...category,
            // Convert parent_id to string for the form
            parent_id: category.parent_id ? category.parent_id.toString() : ''
          });
          // Set image preview
          if (category.Image) {
            setImagePreview(category.Image);
          }
        }
      } catch (error) {
        console.error('Error fetching category details:', error);
        toast({
          title: 'Error',
          description: 'Failed to load category details',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategoryDetails();
    
    // Also fetch all categories for the parent dropdown
    dispatch(getAllCategoriesAction(1, 100));
  }, [id, dispatch, toast]);

  // Handle image change
  const handleImageChange = (fileList) => {
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

  // Handle category update
  const updateCategory = async (values) => {
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
        formData.append('Image', values.image[0]);
      }
      
      formData.append('id', id);
      
      await dispatch(updateCategoryAction(formData));
      toast({
        title: 'Success',
        description: 'Category updated successfully',
      });
      
      navigate('/categories');
      return true;
    } catch (error) {
      console.error('Error updating category:', error);
      toast({
        title: 'Error',
        description: 'Failed to update category',
        variant: 'destructive',
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    id,
    loading,
    categoryData,
    imagePreview,
    handleImageChange,
    updateCategory
  };
};

export default EditCategoryHook;
