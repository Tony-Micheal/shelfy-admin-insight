
import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Filters } from './Filters';
import { Header } from './Header';

type MainLayoutProps = {
  children: ReactNode;
  showFilters?: boolean;
};

export function MainLayout({ children, showFilters = true }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className={`flex-1 flex flex-col ${showFilters ? 'ml-[80px] md:ml-[220px] mr-[280px]' : 'ml-[80px] md:ml-[220px]'}`}>
        <Header />
        <main className="p-6">{children}</main>
      </div>
      {showFilters && <Filters />}
    </div>
  );
}
