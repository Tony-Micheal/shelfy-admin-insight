
import { ReactNode } from 'react';

type ChartCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function ChartCard({ title, children, className = '' }: ChartCardProps) {
  return (
    <div className={`shelfy-chart-card ${className}`}>
      <h3 className="text-base font-medium text-gray-700 mb-4">{title}</h3>
      <div>{children}</div>
    </div>
  );
}
