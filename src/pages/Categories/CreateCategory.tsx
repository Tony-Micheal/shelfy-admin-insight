
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useNavigate } from 'react-router-dom';
import { z } from "zod";
import CreateCategoryHook from '@/components/logic/Categories/CreateCategoryHook';
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

// Form validation schema for type reference
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  title_ar: z.string().min(1, "Title in Arabic is required"),
  points: z.coerce.number().min(0, "Points must be a positive number"),
  parent_id: z.string().optional(),
  image: z.instanceof(FileList).optional(),
});

const CreateCategory = () => {
  const navigate = useNavigate();
  
  // Add console log to debug the hook's return value
  const hookResult = CreateCategoryHook();
  console.log('Hook result:', hookResult);
  
  const { 
    form, 
    imagePreview, 
    loading, 
    allCategories, 
    isEditing,
    handleImageChange, 
    onSubmit 
  } = hookResult;

  // Add additional check to verify form exists before rendering
  if (!form) {
    console.error('Form object is undefined');
    return (
      <MainLayout>
        <div className="container mx-auto py-6">
          <h1 className="text-2xl font-bold text-red-500">Error loading form</h1>
          <p>There was a problem initializing the form. Please try again.</p>
          <Button onClick={() => navigate('/categories')}>Back to Categories</Button>
        </div>
      </MainLayout>
    );
  }

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
                  name="title_ar"
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
