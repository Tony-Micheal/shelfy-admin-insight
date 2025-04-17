
import React from 'react';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import InvoicesPerformanceHook from './../logic/Dashboard/InvoicesPerformanceHook';
import { ChartCard } from './ChartCard';
import { Skeleton } from '@/components/ui/skeleton';

type MonthlyInvoicePerformanceProps = {
  data?: {
    name: string;
    invoices: number;
  }[];
};

export function MonthlyInvoicePerformance({ data }: MonthlyInvoicePerformanceProps) {
  const [performance, loading] = InvoicesPerformanceHook();

  // Use the API data instead of the mock data
  const chartData = performance.length > 0 ? performance : data || [];

  const renderChart = () => {
    if (loading) {
      return (
        <div className="space-y-3 w-full h-[320px] flex items-center justify-center">
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
      );
    }

    if (chartData.length === 0) {
      return (
        <div className="h-[320px] flex items-center justify-center">
          <p className="text-gray-500">No invoice performance data available.</p>
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorInvoices" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#FF6B35" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip 
            labelFormatter={(label) => `Month: ${label}`}
            formatter={(value, name) => {
              if (name === 'percentage') {
                return [`${value}%`, 'Avg %'];
              }
              return [value, name];
            }}
          />
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
          <Area 
            type="monotone" 
            dataKey="customers" 
            name="Customers"
            stroke="#3b82f6" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorCustomers)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

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
        {renderChart()}
      </div>
    </div>
  );
}
