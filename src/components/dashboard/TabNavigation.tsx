
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export type Tab = {
  label: string;
  path: string;
};

type TabNavigationProps = {
  tabs: Tab[];
};

export function TabNavigation({ tabs }: TabNavigationProps) {
  const location = useLocation();
  
  return (
    <div className="border-b border-gray-200">
      <nav className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={cn(
              "shelfy-tab",
              location.pathname === tab.path && "shelfy-tab-active"
            )}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
