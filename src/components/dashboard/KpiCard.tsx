
import { ReactNode } from 'react';

type KpiCardProps = {
  title: string;
  value: string | number;
  percentValue?: number;
  icon?: ReactNode;
  className?: string;
};

export function KpiCard({ title, value, percentValue, icon, className = '' }: KpiCardProps) {
  return (
    <div className={`shelfy-kpi-card ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon && <div>{icon}</div>}
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
        
        {percentValue !== undefined && (
          <div className="shelfy-circular-progress">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#F3F4F6"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={percentValue > 50 ? "#EE6721" : "#99A4B9"}
                strokeWidth="10"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * percentValue) / 100}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
              <text
                x="50"
                y="50"
                textAnchor="middle"
                dy=".3em"
                fontSize="20"
                fontWeight="bold"
                fill="#333"
              >
                {percentValue.toFixed(2)}%
              </text>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
