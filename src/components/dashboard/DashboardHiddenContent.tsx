
import React from 'react';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { Users, FileText, ShoppingBag, BarChart3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';

export function DashboardHiddenContent() {
  const pieData = [
    { name: 'OSA', value: 65 },
    { name: 'OOS', value: 35 },
  ];

  const barData = [
    { name: 'Category A', value: 85 },
    { name: 'Category B', value: 72 },
    { name: 'Category C', value: 56 },
    { name: 'Category D', value: 92 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <KpiCard
          title="Total Customers"
          value="284"
          icon={<Users size={20} className="text-gray-400" />}
        />
        
        <KpiCard
          title="Total Invoices"
          value="512"
          icon={<FileText size={20} className="text-gray-400" />}
        />
        
        <KpiCard
          title="Active Stores"
          value="91 stores"
          percentValue={62.76}
          icon={<ShoppingBag size={20} className="text-gray-400" />}
        />
        
        <KpiCard
          title="Strike Rate"
          value="56 visits"
          percentValue={59.57}
          icon={<BarChart3 size={20} className="text-gray-400" />}
        />
        
        <KpiCard
          title="Accepted"
          value="428"
          percentValue={83.59}
        />
        
        <KpiCard
          title="Rejected"
          value="84"
          percentValue={16.41}
        />
        
        <KpiCard
          title="Avg. Visits/Store"
          value="0.62"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Total OSA vs OOS Rating">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        
        <ChartCard title="OSA By Category">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#EE6721">
                  <LabelList dataKey="value" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
      
      <ChartCard title="Compliance">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">OSA Compliant Stores</h4>
              <span className="text-sm font-medium">0.00%</span>
            </div>
            <Progress value={0} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">OSA Compliance Before Execution</h4>
              <span className="text-sm font-medium">30.45%</span>
            </div>
            <Progress value={30.45} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">OSA Compliance After Replenishment</h4>
              <span className="text-sm font-medium">30.55%</span>
            </div>
            <Progress value={30.55} className="h-2" />
          </div>
        </div>
      </ChartCard>
    </div>
  );
}
