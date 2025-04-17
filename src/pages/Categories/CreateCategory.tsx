
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from 'react-redux';
import { createCategoryAction, getCategoryDetailsAction, updateCategoryAction } from '@/redux/actions/CategoriesAction';
import { useToast } from '@/hooks/use-toast';
import { getAllCategoriesAction } from '@/redux/actions/CategoriesAction';
import { useSelector } from 'react-redux';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  name_ar: z.string().min(1, "Title in Arabic is required"),
  points: z.coerce.number().min(0, "Points must be a positive number"),
  parent_id: z.string().optional(),
  image: z.instanceof(FileList).optional(),
});

const CreateCategory = () => {
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
      name_ar: "",
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
              name_ar: response.data.name_ar || "",
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
      formData.append('name_ar', values.name_ar);
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

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Category title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name_ar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title (Arabic)</FormLabel>
                      <FormControl>
                        <Input placeholder="Category title in Arabic" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="points"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Points</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="parent_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parent Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select parent category (optional)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          {allCategories.map((category: any) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <div className="flex flex-col items-center gap-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 w-full max-w-md flex flex-col items-center justify-center">
                        {imagePreview ? (
                          <div className="relative w-full h-48 mb-4">
                            <img 
                              src={imagePreview} 
                              alt="Category preview" 
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-48 bg-gray-100 flex items-center justify-center mb-4 rounded">
                            <ImageIcon className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                        
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            onChange(e.target.files);
                            handleImageChange(e.target.files);
                          }}
                          {...rest}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
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
      </div>
    </MainLayout>
  );
};

export default CreateCategory;
