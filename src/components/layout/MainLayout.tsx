
import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Filters } from './Filters';
import { Header } from './Header';
import { Filter } from 'lucide-react';
import { Button } from '../ui/button';

type MainLayoutProps = {
  children: ReactNode;
  showFilters?: boolean;
};

export function MainLayout({ children, showFilters = true }: MainLayoutProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className={`flex-1 flex flex-col ml-[80px] md:ml-[220px]`}>
        <Header />
        <main className="p-6">
          <div className="flex justify-end mb-4">
            {showFilters && (
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={toggleFilters}
              >
                <Filter size={16} />
                <span>Filters</span>
              </Button>
            )}
          </div>
          {children}
        </main>
      </div>
      {showFilters && <Filters isOpen={isFiltersOpen} onClose={() => setIsFiltersOpen(false)} />}
    </div>
  );
}
