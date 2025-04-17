
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle, AlertTriangle, Clock, FileText } from 'lucide-react';

type InvoiceStatisticsProps = {
  invoiceCount: any;
  getCount: (data: any, field: string) => number;
  getTotalInvoices: () => number;
};

export function InvoiceStatistics({ invoiceCount, getCount, getTotalInvoices }: InvoiceStatisticsProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Invoice Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-white">
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
        
        <Card className="bg-white">
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
        
        <Card className="bg-white">
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
        
        <Card className="bg-white">
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
        
        <Card className="bg-white">
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
