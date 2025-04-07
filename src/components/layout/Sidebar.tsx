
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
        "shelfy-sidebar-item", 
        isActive && "shelfy-sidebar-item-active"
      )}
    >
      <Icon size={20} />
      <span className="text-sm font-medium hidden md:block">{label}</span>
    </Link>
  );
};

export function Sidebar() {
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
    { icon: Star, label: 'Cleanliness', path: '/cleanliness' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: FileUp, label: 'Import/Export', path: '/import-export' },
  ];

  return (
    <div className="w-[80px] md:w-[220px] h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0">
      <div className="p-4 flex items-center justify-center md:justify-start gap-3 border-b border-gray-100">
        <div className="h-8 w-8 flex items-center justify-center bg-shelfy-orange rounded-md">
          <img 
            src="/lovable-uploads/shelfy-logo.svg" 
            alt="Shelfy Logo" 
            className="h-6 w-6" 
          />
        </div>
        <h1 className="text-xl font-bold hidden md:block">Shelfy Admin</h1>
      </div>
      
      <div className="flex flex-col gap-1 p-3 flex-1 overflow-y-auto">
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
      
      <div className="p-4 border-t border-gray-100 flex items-center">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium">A</span>
        </div>
        <div className="ml-3 hidden md:block">
          <p className="text-sm font-medium">Admin User</p>
          <p className="text-xs text-gray-500">admin@shelfy.com</p>
        </div>
      </div>
    </div>
  );
}
