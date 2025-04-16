
import { CheckCircle, XCircle, AlertTriangle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface StatusCardsProps {
  invoiceCount: any;
  invoiceStatus: number | null;
  handleFilter: (id: number | null) => void;
  getCount: (data: any, field: string) => number;
}

export const StatusCards = ({ invoiceCount, invoiceStatus, handleFilter, getCount }: StatusCardsProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div 
        className={`flex flex-col items-center p-6 border rounded-md cursor-pointer transition-colors ${invoiceStatus === 1 ? 'bg-green-50 border-green-200' : 'bg-gray-50 hover:bg-gray-100'}`}
        onClick={() => handleFilter(invoiceStatus === 1 ? null : 1)}
      >
        <div className="text-3xl font-bold text-green-600">
          {getCount(invoiceCount, 'acceepted_invices')}
        </div>
        <div className="text-sm text-gray-500">Accepted</div>
      </div>
      
      <div 
        className={`flex flex-col items-center p-6 border rounded-md cursor-pointer transition-colors ${invoiceStatus === 2 ? 'bg-red-50 border-red-200' : 'bg-gray-50 hover:bg-gray-100'}`}
        onClick={() => handleFilter(invoiceStatus === 2 ? null : 2)}
      >
        <div className="text-3xl font-bold text-red-600">
          {getCount(invoiceCount, 'rejected_invices')}
        </div>
        <div className="text-sm text-gray-500">Rejected</div>
      </div>
      
      <div 
        className={`flex flex-col items-center p-6 border rounded-md cursor-pointer transition-colors ${invoiceStatus === 3 ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 hover:bg-gray-100'}`}
        onClick={() => handleFilter(invoiceStatus === 3 ? null : 3)}
      >
        <div className="text-3xl font-bold text-orange-600">
          {getCount(invoiceCount, 'partially_rejected_invices')}
        </div>
        <div className="text-sm text-gray-500">Partially Rejected</div>
      </div>
      
      <div 
        className={`flex flex-col items-center p-6 border rounded-md cursor-pointer transition-colors ${invoiceStatus === 4 ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 hover:bg-gray-100'}`}
        onClick={() => handleFilter(invoiceStatus === 4 ? null : 4)}
      >
        <div className="text-3xl font-bold text-yellow-600">
          {getCount(invoiceCount, 'pending_invices')}
        </div>
        <div className="text-sm text-gray-500">Pending</div>
      </div>
    </div>
  );
};
