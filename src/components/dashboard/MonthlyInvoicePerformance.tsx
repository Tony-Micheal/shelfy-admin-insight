
import React from 'react';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import InvoicesPerformanceHook from './../logic/Dashboard/InvoicesPerformanceHook';

type MonthlyInvoicePerformanceProps = {
  data: {
    name: string;
    invoices: number;
  }[];
};

export function MonthlyInvoicePerformance({ data }: MonthlyInvoicePerformanceProps) {
  const [performance, loading]=InvoicesPerformanceHook();
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Invoice Performance by Month</h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="bg-gray-50 border-gray-200">ALL</Button>
          <Button variant="outline" size="sm" className="bg-transparent">1M</Button>
          <Button variant="outline" size="sm" className="bg-transparent">6M</Button>
          <Button variant="outline" size="sm" className="bg-transparent">1Y</Button>
        </div>
      </div>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorInvoices" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#FF6B35" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip labelFormatter={(label) => `Month: ${label}`} />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="invoices" 
              name="Invoices"
              stroke="#FF6B35" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorInvoices)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
