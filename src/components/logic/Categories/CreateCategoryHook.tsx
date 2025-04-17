
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction, getCategoryDetailsAction, updateCategoryAction, getAllCategoriesAction } from '@/redux/actions/CategoriesAction';
import { useToast } from '@/hooks/use-toast';

// Form validation schema
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  title_ar: z.string().min(1, "Title in Arabic is required"),
  points: z.coerce.number().min(0, "Points must be a positive number"),
  parent_id: z.string().optional(),
  image: z.instanceof(FileList).optional(),
});

const CreateCategoryHook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      title_ar: "",
      points: 0,
      parent_id: "",
    },
  });

  // Fetch all categories for parent category dropdown
  useEffect(() => {
    dispatch(getAllCategoriesAction(1, 100) as any); // Get all categories for dropdown
  }, [dispatch]);

  const categoriesResponse = useSelector((state: any) => state.CategoriesReducer.allCates);
  const allCategories = categoriesResponse?.data?.alldata || [];

  // If editing, fetch category details
  useEffect(() => {
    if (isEditing && id) {
      const fetchCategoryDetails = async () => {
        setLoading(true);
        try {
          const response = await dispatch(getCategoryDetailsAction(parseInt(id)) as any);
          if (response && response.data) {
            form.reset({
              title: response.data.title || "",
              title_ar: response.data.title_ar || "",
              points: response.data.points || 0,
              parent_id: response.data.parent_id ? String(response.data.parent_id) : "",
            });
            
            if (response.data.image) {
              setImagePreview(response.data.image);
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
    }
  }, [isEditing, id, dispatch, form, toast]);

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      // Create FormData for image upload
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('name_ar', values.title_ar);
      formData.append('points', values.points.toString());
      
      if (values.parent_id && values.parent_id !== "none") {
        formData.append('parent_id', values.parent_id);
      }
      
      if (values.image && values.image.length > 0) {
        formData.append('image', values.image[0]);
      }
      
      if (isEditing && id) {
        formData.append('id', id);
        await dispatch(updateCategoryAction(formData) as any);
        toast({
          title: 'Success',
          description: 'Category updated successfully',
        });
      } else {
        await dispatch(createCategoryAction(formData) as any);
        toast({
          title: 'Success',
          description: 'Category created successfully',
        });
      }
      
      navigate('/categories');
    } catch (error) {
      console.error('Error submitting category:', error);
      toast({
        title: 'Error',
        description: isEditing ? 'Failed to update category' : 'Failed to create category',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    imagePreview,
    loading,
    allCategories,
    isEditing,
    handleImageChange,
    onSubmit
  };
};

export default CreateCategoryHook;
