
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Image as ImageIcon } from 'lucide-react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CategoryFormValues } from '@/components/logic/Categories/CreateCategoryHook';

interface CategoryImageUploadProps {
  form: UseFormReturn<CategoryFormValues>;
  imagePreview: string | null;
  handleImageChange: (files: FileList | null) => void;
}

const CategoryImageUpload: React.FC<CategoryImageUploadProps> = ({ 
  form, 
  imagePreview, 
  handleImageChange 
}) => {
  return (
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
  );
};

export default CategoryImageUpload;
