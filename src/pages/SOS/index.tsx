
import { MainLayout } from '@/components/layout/MainLayout';
import { TabNavigation, Tab } from '@/components/dashboard/TabNavigation';
import { Card } from '@/components/ui/card';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';
import { FileBarChart, Grid, AlertCircle, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const sosData = [
  { name: 'Brand A', value: 45 },
  { name: 'Brand B', value: 28 },
  { name: 'Brand C', value: 17 },
  { name: 'Others', value: 10 },
];

const COLORS = ['#EE6721', '#99A4B9', '#5D6B89', '#BAC4D4'];

const errorLogs = [
  { id: 1, store: 'Metro Supermarket', category: 'Beverages', message: 'Failed to calculate SOS, missing shelf images', date: '2023-04-05' },
  { id: 2, store: 'Daily Market', category: 'Dairy', message: 'Incomplete category detection', date: '2023-04-04' },
  { id: 3, store: 'Express Store', category: 'Snacks', message: 'Unable to identify product facings', date: '2023-04-03' },
];

const shelfImages = [
  { id: 1, store: 'Metro Supermarket', category: 'Beverages', beforeUrl: '/placeholder.svg', afterUrl: '/placeholder.svg', date: '2023-04-05' },
  { id: 2, store: 'Daily Market', category: 'Dairy', beforeUrl: '/placeholder.svg', afterUrl: '/placeholder.svg', date: '2023-04-04' },
  { id: 3, store: 'Express Store', category: 'Snacks', beforeUrl: '/placeholder.svg', afterUrl: '/placeholder.svg', date: '2023-04-03' },
];

export default function SOS() {
  // Define the tabs for the dashboard
  const dashboardTabs: Tab[] = [
    { label: 'OVERVIEW', path: '/' },
    { label: 'ASSORTMENT', path: '/assortment' },
    { label: 'SOS', path: '/sos' },
    { label: 'NPD', path: '/npd' },
  ];
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Shelfy Intelligence Dashboard</h1>
          <div>
            <span className="text-sm text-gray-500">Last updated: Today, 2:30 PM</span>
          </div>
        </div>
        
        <TabNavigation tabs={dashboardTabs} />
        
        <div className="py-4 space-y-6 animate-fade-in">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Share of Shelf (SOS)</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Grid size={16} className="mr-2" /> View Full Report
              </Button>
              <Button variant="outline" size="sm">
                <FileBarChart size={16} className="mr-2" /> Export Data
              </Button>
            </div>
          </div>
          
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">SOS by Category: Beverages</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sosData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {sosData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <AlertCircle size={20} className="mr-2 text-red-500" />
                Error Logs
              </h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Store</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Error Message</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {errorLogs.map(log => (
                      <TableRow key={log.id}>
                        <TableCell>{log.store}</TableCell>
                        <TableCell>{log.category}</TableCell>
                        <TableCell className="text-red-500">{log.message}</TableCell>
                        <TableCell>{log.date}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Resolve</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <ImageIcon size={20} className="mr-2" />
                Before/After Shelf Images
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {shelfImages.map(image => (
                  <div key={image.id} className="border rounded-md p-4">
                    <div className="mb-2">
                      <span className="font-medium">{image.store}</span> - {image.category}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Before</p>
                        <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                          <ImageIcon size={32} className="text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">After</p>
                        <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                          <ImageIcon size={32} className="text-gray-400" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Captured on {image.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
