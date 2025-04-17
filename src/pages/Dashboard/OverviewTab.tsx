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
import MapComponent from '@/components/dashboard/MapComponent';
import StoresChartHook from './../../components/logic/Dashboard/StoresChartHook';
import StockChartHook from './../../components/logic/Dashboard/StockChartHook';

const storeData = [
  { name: 'Supermarket', value: 125, invoices: 245 },
  { name: 'Convenience', value: 85, invoices: 180 },
  { name: 'Hypermarket', value: 45, invoices: 95 },
];

const stockData = [
  { name: 'In Stock', value: 75 },
  { name: 'Out of Stock', value: 25 },
];

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

const regionData = [
  { region: 'North', invoices: 245 },
  { region: 'South', invoices: 187 },
  { region: 'East', invoices: 156 },
  { region: 'West', invoices: 203 },
  { region: 'Central', invoices: 178 },
];

const STORE_COLORS = ['#9b87f5', '#33C3F0', '#8B5CF6', '#10B981', '#F59E0B'];
const STOCK_COLORS = ['#2196F3', '#F44336'];

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
  const [stores, loadingStores] = StoresChartHook();
  const [stockData, loadingStocks] = StockChartHook();

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
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
        <p>We regret to inform you that our server is currently experiencing technical difficulties.</p>
      </div>

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
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Store & Stock Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Store Type Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                {loadingStores ? (
                  <div className="flex h-full items-center justify-center">
                    <p>Loading store data...</p>
                  </div>
                ) : stores.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stores}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        nameKey="type"
                        label={({ type, percent }) => `${type}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {stores.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={STORE_COLORS[index % STORE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, type, props) => [`${value} stores (${props.payload.percentage}%)`, type]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p>No store data available</p>
                  </div>
                )}
              </div>
              <div className="flex justify-center mt-4">
                <div className="grid grid-cols-3 gap-4">
                  {stores.map((store, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: STORE_COLORS[index % STORE_COLORS.length] }}></div>
                      <span className="text-sm">{store.type}: {store.value} ({store.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Stock Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                {loadingStocks ? (
                  <div className="flex h-full items-center justify-center">
                    <p>Loading stock data...</p>
                  </div>
                ) : (stockData.in_stock > 0 || stockData.out_of_stock > 0) ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'In Stock', value: stockData.in_stock },
                          { name: 'Out of Stock', value: stockData.out_of_stock }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell key="cell-0" fill={STOCK_COLORS[0]} />
                        <Cell key="cell-1" fill={STOCK_COLORS[1]} />
                      </Pie>
                      <Tooltip 
                        formatter={(value, name) => [`${value}%`, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p>No stock data available</p>
                  </div>
                )}
              </div>
              <div className="flex justify-center mt-4">
                <div className="grid grid-cols-2 gap-8">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span>In Stock: {stockData.in_stock}%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span>Out of Stock: {stockData.out_of_stock}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
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
      
      <MapComponent regionData={regionData} />

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
