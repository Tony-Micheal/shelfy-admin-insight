
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryHeaderProps {
  onCreateClick?: () => void;
}

const CategoryHeader = ({ onCreateClick }: CategoryHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Categories</h1>
      <Link to="/categories/create">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Category
        </Button>
      </Link>
    </div>
  );
};

export default CategoryHeader;
