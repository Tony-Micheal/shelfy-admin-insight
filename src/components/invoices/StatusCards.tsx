
import { CheckCircle, XCircle, AlertTriangle, Clock } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface StatusCardsProps {
  invoiceCount: any;
  invoiceStatus: number | null;
  handleFilter: (id: number | null) => void;
  getCount: (data: any, field: string) => number;
}

export const StatusCards = ({ invoiceCount, invoiceStatus, handleFilter, getCount }: StatusCardsProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleStatusClick = (statusId: number | null) => {
    handleFilter(statusId);
    
    // Store the status in localStorage
    if (statusId === null) {
      localStorage.removeItem('invoiceStatus');
    } else {
      const statusLabel = statusConfigs.find(config => 
        invoiceCount[config.field]?.status_id === statusId
      )?.label || 'Unknown';
      
      localStorage.setItem('invoiceStatus', statusLabel);
    }
    
    // Update URL without reloading the page
    const url = statusId === null ? '/invoices' : `/invoices?status=${statusId}`;
    navigate(url, { replace: true });
  };

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
        // Using explicit null check to handle status_id=0 properly
        const currentStatusId = invoiceCount[field]?.status_id != null ? invoiceCount[field]?.status_id : null;
        
        return (
          <div 
            key={field}
            className={`flex flex-col items-center p-6 border rounded-md cursor-pointer transition-colors ${
              invoiceStatus === currentStatusId
                ? `bg-${color}-50 border-${color}-200` 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            onClick={() => handleStatusClick(invoiceStatus === currentStatusId ? null : currentStatusId)}
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
