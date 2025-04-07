
import { ReactNode } from 'react';

type ChartCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function ChartCard({ title, children, className = '' }: ChartCardProps) {
  return (
    <div className={`bg-white rounded-lg p-6 border border-gray-100 shadow-sm ${className}`}>
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div>{children}</div>
    </div>
  );
}
