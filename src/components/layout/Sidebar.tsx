
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  ShoppingBag, 
  LayoutGrid, 
  FileSpreadsheet, 
  Package, 
  PieChart,
  Award, 
  Star, 
  Users, 
  Settings, 
  FileUp,
  Car
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  path: string;
  isActive: boolean;
};

const SidebarItem = ({ icon: Icon, label, path, isActive }: SidebarItemProps) => {
  return (
    <Link 
      to={path} 
      className={cn(
        "flex items-center py-2.5 px-3 rounded-md transition-colors",
        "hover:bg-gray-800",
        isActive ? "bg-shelfy-teal text-white" : "text-gray-400",
      )}
    >
      <div className={cn(
        "flex items-center justify-center w-8 h-8 rounded-md",
        isActive ? "bg-[#329E9A]" : "bg-gray-800"
      )}>
        <Icon size={18} className="m-auto" />
      </div>
      <span className="text-sm font-medium ml-3 hidden md:block">{label}</span>
    </Link>
  );
};

export function Sidebar() {
  // Safely get user data from localStorage with null checking
  const getUserFromStorage = () => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  };
  
  const user = getUserFromStorage();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const sidebarItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/' },
    { icon: ShoppingBag, label: 'Stores', path: '/stores' },
    { icon: FileSpreadsheet, label: 'Invoices', path: '/invoices' },
    { icon: Package, label: 'Products', path: '/products' },
    { icon: LayoutGrid, label: 'Assortment', path: '/assortment' },
    { icon: Car, label: 'Activities', path: '/activities' },
    { icon: PieChart, label: 'SOS', path: '/sos' },
    { icon: BarChart3, label: 'OSA Reports', path: '/osa-reports' },
    { icon: Award, label: 'Points & Bonuses', path: '/points-bonuses' },
    // { icon: Star, label: 'Cleanliness', path: '/cleanliness' },
    { icon: Users, label: 'Users', path: '/users' },
    // { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: FileUp, label: 'Import/Export', path: '/import-export' },
  ];

  return (
    <div className="w-[80px] md:w-[220px] h-screen bg-shelfy-dark border-r border-gray-800 flex flex-col fixed left-0 top-0">
      <div className="p-4 flex items-center justify-center border-b border-gray-800">
        <img 
          src="/lovable-uploads/ef390a68-1963-4918-9790-9ff892f14485.png" 
          alt="Shelfy Logo" 
          className="h-8 mx-auto" 
        />
      </div>
      
      <div className="flex flex-col gap-2 p-3 flex-1 overflow-y-auto 
        scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-shelfy-dark
        hover:scrollbar-thumb-gray-700 transition-colors duration-200">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isActive={
              item.path === '/'
                ? currentPath === '/'
                : currentPath.startsWith(item.path)
            }
          />
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-800 flex items-center">
        <div className="w-8 h-8 bg-shelfy-teal rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-white">
            {user ? user.name.charAt(0).toUpperCase() : 'G'}
          </span>
        </div>
        <div className="ml-3 hidden md:block">
          <p className="text-sm font-medium text-white">{user ? user.name : 'Guest User'}</p>
          <p className="text-xs text-gray-400">{user ? user.email : 'guest@example.com'}</p>
        </div>
      </div>
    </div>
  );
}

