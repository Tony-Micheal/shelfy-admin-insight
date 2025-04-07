
import { KpiCard } from '@/components/dashboard/KpiCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  LabelList
} from 'recharts';
import { ShoppingBag, FileText, Users, BarChart3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Dummy data for charts
const pieData = [
  { name: 'OSA Rating', value: 68 },
  { name: 'OOS Rating', value: 32 },
];

const barData = [
  { name: 'Dairy', value: 45 },
  { name: 'Beverages', value: 41 },
  { name: 'Bakery', value: 38 },
  { name: 'Snacks', value: 37 },
  { name: 'Produce', value: 28 },
];

const COLORS = ['#EE6721', '#99A4B9'];

export default function OverviewTab() {
  return (
    <div className="space-y-6 animate-fade-in">
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
