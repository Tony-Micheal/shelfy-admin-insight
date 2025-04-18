
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle, AlertTriangle, Clock, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type InvoiceStatisticsProps = {
  invoiceCount: any;
  getCount: (data: any, field: string) => number;
  getTotalInvoices: () => number;
};

export function InvoiceStatistics({ invoiceCount, getCount, getTotalInvoices }: InvoiceStatisticsProps) {
  const navigate = useNavigate();

  const handleCardClick = (statusId: number | null, statusLabel: string | null) => {
    // Store status in localStorage
    if (statusId !== null && statusLabel) {
      localStorage.setItem('invoiceStatus', statusLabel);
    } else {
      localStorage.removeItem('invoiceStatus');
    }

    // Handle the navigation with status parameter, including 0 as a valid status value
    if (statusId !== null) {
      navigate(`/invoices?status=${statusId}`);
    } else {
      navigate('/invoices');
    }
  };

  // Safely get status ID, handling cases where it might be 0 (which is falsy in JavaScript)
  const getStatusId = (field: string): number | null => {
    // Check if the field exists in invoiceCount
    if (!invoiceCount || !invoiceCount[field]) return null;
    
    // Handle both undefined and explicitly set status_id, including 0
    return invoiceCount[field]?.status_id != null ? invoiceCount[field].status_id : null;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Invoice Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card 
          className="bg-white hover:bg-gray-50 cursor-pointer transition-colors"
          onClick={() => handleCardClick(null, null)}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="bg-orange-50 p-3 rounded-lg mr-3">
                <FileText size={24} className="text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{getTotalInvoices()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className="bg-white hover:bg-green-50 cursor-pointer transition-colors"
          onClick={() => handleCardClick(getStatusId('acceepted_invices'), 'Accepted')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Accepted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="bg-green-50 p-3 rounded-lg mr-3">
                <CheckCircle size={24} className="text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{getCount(invoiceCount, 'acceepted_invices')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className="bg-white hover:bg-red-50 cursor-pointer transition-colors"
          onClick={() => handleCardClick(getStatusId('rejected_invices'), 'Rejected')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="bg-red-50 p-3 rounded-lg mr-3">
                <XCircle size={24} className="text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{getCount(invoiceCount, 'rejected_invices')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className="bg-white hover:bg-orange-50 cursor-pointer transition-colors"
          onClick={() => handleCardClick(getStatusId('partially_rejected_invices'), 'Partially Rejected')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Partially Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="bg-orange-50 p-3 rounded-lg mr-3">
                <AlertTriangle size={24} className="text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{getCount(invoiceCount, 'partially_rejected_invices')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className="bg-white hover:bg-blue-50 cursor-pointer transition-colors"
          onClick={() => handleCardClick(getStatusId('pending_invices'), 'Pending')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="bg-blue-50 p-3 rounded-lg mr-3">
                <Clock size={24} className="text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{getCount(invoiceCount, 'pending_invices')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
