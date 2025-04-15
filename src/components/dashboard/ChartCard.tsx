
import { ReactNode } from 'react';

type ChartCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
};

export function ChartCard({ title, children, className = '', actions }: ChartCardProps) {
  return (
    <div className={`bg-white rounded-lg p-6 border border-gray-100 shadow-sm ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        {actions}
      </div>
      <div>{children}</div>
    </div>
  );
}
