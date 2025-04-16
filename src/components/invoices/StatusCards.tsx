
import { CheckCircle, XCircle, AlertTriangle, Clock } from 'lucide-react';

interface StatusCardsProps {
  invoiceCount: any;
  invoiceStatus: number | null;
  handleFilter: (id: number | null) => void;
  getCount: (data: any, field: string) => number;
}

export const StatusCards = ({ invoiceCount, invoiceStatus, handleFilter, getCount }: StatusCardsProps) => {
  const statusConfigs = [
    {
      field: 'acceepted_invices',
      label: 'Accepted',
      color: 'green',
      icon: CheckCircle
    },
    {
      field: 'rejected_invices',
      label: 'Rejected',
      color: 'red',
      icon: XCircle
    },
    {
      field: 'partially_rejected_invices',
      label: 'Partially Rejected',
      color: 'orange',
      icon: AlertTriangle
    },
    {
      field: 'pending_invices',
      label: 'Pending',
      color: 'yellow',
      icon: Clock
    }
  ];

  return (
    <div className="flex flex-wrap items-center gap-4">
      {statusConfigs.map(({ field, label, color, icon: Icon }) => {
        const currentStatusId = invoiceCount[field]?.status_id;
        
        return (
          <div 
            key={field}
            className={`flex flex-col items-center p-6 border rounded-md cursor-pointer transition-colors ${
              invoiceStatus === currentStatusId
                ? `bg-${color}-50 border-${color}-200` 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            onClick={() => handleFilter(invoiceStatus === currentStatusId ? null : currentStatusId)}
          >
            <div className={`text-3xl font-bold text-${color}-600`}>
              {getCount(invoiceCount, field)}
            </div>
            <div className="text-sm text-gray-500">{label}</div>
          </div>
        );
      })}
    </div>
  );
};
