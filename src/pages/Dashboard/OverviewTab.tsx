
import { useState, useEffect } from 'react';
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
  Line,
  AreaChart,
  Area
} from 'recharts';
import { ShoppingBag, FileText, Users, BarChart3, ArrowUp, ArrowDown, CheckCircle, XCircle, AlertTriangle, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDispatch } from 'react-redux';
import InvoicesCountHook from '@/components/logic/Invoivces/InvoicesCountHook';

// Dummy data for store statistics
const storeData = [
  { name: 'Active Stores', value: 68 },
  { name: 'Inactive Stores', value: 32 },
];

// Dummy data for stock status
const stockData = [
  { name: 'In Stock', value: 75 },
  { name: 'Out of Stock', value: 25 },
];

// Monthly invoice data
const monthlyInvoiceData = [
  { name: 'Jan', invoices: 30 },
  { name: 'Feb', invoices: 65 },
  { name: 'Mar', invoices: 45 },
  { name: 'Apr', invoices: 75 },
  { name: 'May', invoices: 50 },
  { name: 'Jun', invoices: 60 },
  { name: 'Jul', invoices: 45 },
  { name: 'Aug', invoices: 45 },
  { name: 'Sep', invoices: 40 },
  { name: 'Oct', invoices: 50 },
  { name: 'Nov', invoices: 65 },
  { name: 'Dec', invoices: 75 },
];

// Region data for map visualization
const regionData = [
  { region: 'North', invoices: 245 },
  { region: 'South', invoices: 187 },
  { region: 'East', invoices: 156 },
  { region: 'West', invoices: 203 },
  { region: 'Central', invoices: 178 },
];

const STORE_COLORS = ['#4CAF50', '#99A4B9'];
const STOCK_COLORS = ['#2196F3', '#F44336'];

// Define the missing variables for the hidden section
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

export default function OverviewTab() {
  const [invoiceCount, loading] = InvoicesCountHook();
  
  const getCount = (data, field) => {
    if (!data || !data[field]) return 0;
    return data[field].count || 0;
  };
  
  const getTotalInvoices = () => {
    if (!invoiceCount) return 0;
    
    const fields = [
      'acceepted_invices', 
      'rejected_invices', 
      'partially_rejected_invices', 
      'pending_invices'
    ];
    
    return fields.reduce((total, field) => {
      return total + getCount(invoiceCount, field);
    }, 0);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Server notification */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
        <p>We regret to inform you that our server is currently experiencing technical difficulties.</p>
      </div>

      {/* Section 1: Invoice Statistics */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Invoice Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Total Invoices */}
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
          
          {/* Accepted Invoices */}
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
          
          {/* Rejected Invoices */}
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
          
          {/* Partially Rejected Invoices */}
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
          
          {/* Pending Invoices */}
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
      
      {/* Section 2: Circle Charts */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Store & Stock Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Store Statistics */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Store Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={storeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {storeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={STORE_COLORS[index % STORE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value} stores`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center mt-4">
                <div className="grid grid-cols-2 gap-8">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>Active: 68 stores</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                    <span>Inactive: 32 stores</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Stock Status */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Stock Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stockData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {stockData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={STOCK_COLORS[index % STOCK_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value}%`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center mt-4">
                <div className="grid grid-cols-2 gap-8">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span>In Stock: 75%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span>Out of Stock: 25%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Section 3: Performance Chart - Invoice Average by Month */}
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
              data={monthlyInvoiceData}
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
      
      {/* Section 4: Map Chart for Invoice Regions */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Invoice Distribution by Region</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] bg-gray-100 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <span className="text-gray-500 block mb-2">Map Visualization</span>
              <div className="grid grid-cols-3 gap-4 p-4">
                {regionData.map((region, index) => (
                  <div key={index} className="bg-white p-3 rounded-md shadow-sm">
                    <p className="font-semibold">{region.region}</p>
                    <p className="text-orange-500 text-lg">{region.invoices}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4 mt-2">
            {regionData.map((region, index) => (
              <div key={index} className="text-center">
                <p className="text-sm font-medium">{region.region}</p>
                <div className="h-2 bg-gray-200 rounded-full mt-1">
                  <div 
                    className="h-full bg-orange-500 rounded-full" 
                    style={{ width: `${(region.invoices / Math.max(...regionData.map(r => r.invoices))) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
