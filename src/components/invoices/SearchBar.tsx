
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  searchTerm: string;
  handleSearch: (term: string) => void;
}

export const SearchBar = ({ searchTerm, handleSearch }: SearchBarProps) => {
  return (
    <div className="relative w-full md:w-96">
      <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <Input 
        placeholder="Search invoices..." 
        className="pl-9" 
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};
