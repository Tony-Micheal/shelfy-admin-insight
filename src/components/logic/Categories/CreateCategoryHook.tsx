import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginUserAction } from '../../redux/actions/AuthAction';
import { createCategoryAction } from '../../../redux/actions/CategoriesAction';
import { updateCategoryAction, getCategoryDetailsAction, getAllCategoriesAction } from '@/redux/actions/CategoriesAction';


export default function CreateCategoryHook() {
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

  return [title,titleAr,points,cate,image,onChangeTitle,onChangeTitleAr,onChangePoints,onChangeCate,onChangeImage,onSubmit,loading,press]
}
