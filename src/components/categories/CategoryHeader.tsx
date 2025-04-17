
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface CategoryHeaderProps {
  onCreateClick: () => void;
}

const CategoryHeader = ({ onCreateClick }: CategoryHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Categories</h1>
      <Button onClick={onCreateClick}>
        <Plus className="h-4 w-4 mr-2" />
        Create Category
      </Button>
    </div>
  );
};

export default CategoryHeader;
