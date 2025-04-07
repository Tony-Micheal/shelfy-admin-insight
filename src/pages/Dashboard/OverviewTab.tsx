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
  LabelList,
  LineChart,
  Line
} from 'recharts';
import { ShoppingBag, FileText, Users, BarChart3, ArrowUp, ArrowDown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

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

const monthlyData = [
  { name: 'Jan', views: 30, clicks: 10 },
  { name: 'Feb', views: 65, clicks: 12 },
  { name: 'Mar', views: 45, clicks: 15 },
  { name: 'Apr', views: 75, clicks: 20 },
  { name: 'May', views: 50, clicks: 18 },
  { name: 'Jun', views: 60, clicks: 23 },
  { name: 'Jul', views: 45, clicks: 15 },
  { name: 'Aug', views: 45, clicks: 20 },
  { name: 'Sep', views: 40, clicks: 25 },
  { name: 'Oct', views: 50, clicks: 30 },
  { name: 'Nov', views: 65, clicks: 25 },
  { name: 'Dec', views: 75, clicks: 30 },
];

const COLORS = ['#EE6721', '#99A4B9'];

export default function OverviewTab() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Server notification */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
        <p>We regret to inform you that our server is currently experiencing technical difficulties.</p>
      </div>

      {/* KPI Cards - First Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
          <div className="flex">
            <div className="bg-orange-50 p-3 rounded-lg">
              <ShoppingBag size={24} className="text-orange-500" />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-gray-500 text-sm">Total Orders</p>
              <h3 className="text-2xl font-bold mt-1">13,647</h3>
              <div className="flex items-center mt-2">
                <span className="text-green-500 flex items-center text-xs"><ArrowUp size={14} className="mr-1" /> 2.3%</span>
                <span className="text-xs text-gray-500 ml-2">Last Week</span>
                <Button variant="ghost" size="sm" className="ml-auto text-xs font-normal">View More</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
          <div className="flex">
            <div className="bg-orange-50 p-3 rounded-lg">
              <Users size={24} className="text-orange-500" />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-gray-500 text-sm">New Leads</p>
              <h3 className="text-2xl font-bold mt-1">9,526</h3>
              <div className="flex items-center mt-2">
                <span className="text-green-500 flex items-center text-xs"><ArrowUp size={14} className="mr-1" /> 8.1%</span>
                <span className="text-xs text-gray-500 ml-2">Last Month</span>
                <Button variant="ghost" size="sm" className="ml-auto text-xs font-normal">View More</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards - Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
          <div className="flex">
            <div className="bg-orange-50 p-3 rounded-lg">
              <FileText size={24} className="text-orange-500" />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-gray-500 text-sm">Deals</p>
              <h3 className="text-2xl font-bold mt-1">976</h3>
              <div className="flex items-center mt-2">
                <span className="text-red-500 flex items-center text-xs"><ArrowDown size={14} className="mr-1" /> 0.3%</span>
                <span className="text-xs text-gray-500 ml-2">Last Month</span>
                <Button variant="ghost" size="sm" className="ml-auto text-xs font-normal">View More</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
          <div className="flex">
            <div className="bg-orange-50 p-3 rounded-lg">
              <BarChart3 size={24} className="text-orange-500" />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-gray-500 text-sm">Booked Revenue</p>
              <h3 className="text-2xl font-bold mt-1">$123.6k</h3>
              <div className="flex items-center mt-2">
                <span className="text-red-500 flex items-center text-xs"><ArrowDown size={14} className="mr-1" /> 10.6%</span>
                <span className="text-xs text-gray-500 ml-2">Last Month</span>
                <Button variant="ghost" size="sm" className="ml-auto text-xs font-normal">View More</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Performance Chart */}
      <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Performance</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="bg-gray-50 border-gray-200">ALL</Button>
            <Button variant="outline" size="sm" className="bg-transparent">1M</Button>
            <Button variant="outline" size="sm" className="bg-transparent">6M</Button>
            <Button variant="outline" size="sm" className="bg-transparent">1Y</Button>
          </div>
        </div>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="views" fill="#FF6B35" radius={[5, 5, 0, 0]} />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="#4CAF50"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Conversions Chart */}
        <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Conversions</h3>
          <div className="relative flex justify-center">
            <div className="w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[{ name: 'Returning Customer', value: 65.2 }, { name: 'New Customer', value: 34.8 }]}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    startAngle={90}
                    endAngle={450}
                    fill="#FF6B35"
                    dataKey="value"
                  >
                    <Cell fill="#FF6B35" />
                    <Cell fill="#EEEEEE" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">65.2%</span>
                <span className="text-xs text-gray-500">Returning Customer</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <p className="text-sm text-gray-500">This Week</p>
              <p className="text-xl font-bold">23.5k</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Week</p>
              <p className="text-xl font-bold">41.05k</p>
            </div>
          </div>
          <div className="mt-6">
            <Button variant="outline" size="sm" className="w-full">View Details</Button>
          </div>
        </div>
        
        {/* Sessions by Country */}
        <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Sessions by Country</h3>
          <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
            <span className="text-gray-400">World Map Visualization</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">This Week</p>
              <p className="text-xl font-bold">23.5k</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Week</p>
              <p className="text-xl font-bold">41.05k</p>
            </div>
          </div>
        </div>
        
        {/* Top Pages */}
        <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm col-span-1 md:col-span-2 lg:col-span-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Top Pages</h3>
            <Button variant="ghost" size="sm" className="text-xs font-normal">View All</Button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500">
                <th className="pb-2">Page Path</th>
                <th className="pb-2">Page Views</th>
                <th className="pb-2">Exit Rate</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr>
                <td className="py-2">larkon/ecommerce.html</td>
                <td className="py-2">465</td>
                <td className="py-2 text-green-500">4.6%</td>
              </tr>
              <tr>
                <td className="py-2">larkon/dashboard.html</td>
                <td className="py-2">426</td>
                <td className="py-2 text-red-500">20.4%</td>
              </tr>
              <tr>
                <td className="py-2">larkon/chat.html</td>
                <td className="py-2">254</td>
                <td className="py-2 text-yellow-500">15.8%</td>
              </tr>
              <tr>
                <td className="py-2">larkon/auth-login.html</td>
                <td className="py-2">3369</td>
                <td className="py-2 text-green-500">5.2%</td>
              </tr>
              <tr>
                <td className="py-2">larkon/email.html</td>
                <td className="py-2">985</td>
                <td className="py-2 text-red-500">64.2%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Original Stats - Hidden but keeping functionality */}
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
    </div>
  );
}
