
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Form schema for type reference
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  title_ar: z.string().min(1, "Title in Arabic is required"),
  points: z.coerce.number().min(0, "Points must be a positive number"),
  parent_id: z.string().optional(),
  image: z.instanceof(FileList).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface BasicInfoFieldsProps {
  form: UseFormReturn<FormValues>;
  allCategories: any[];
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({ form, allCategories }) => {
  return (
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
  );
};

export default BasicInfoFields;
