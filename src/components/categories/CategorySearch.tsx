
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface CategorySearchProps {
  searchTerm: string;
  handleSearch: (term: string) => void;
}

const CategorySearch = ({ searchTerm, handleSearch }: CategorySearchProps) => {
  return (
    <div className="mb-6">
      <div className="max-w-sm">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search categories..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default CategorySearch;
