
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon, FileBarChart, AlertCircle, Calendar, Store } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const osareports = [
  { 
    id: 1, 
    store: 'Metro Supermarket', 
    date: '2023-04-05', 
    category: 'Dairy',
    osaRating: 85,
    reason: 'Out of stock at supplier',
    missingProducts: ['Milk 1L', 'Yogurt 250g'],
    action: 'Order placed with alternate supplier',
    status: 'Resolved'
  },
  { 
    id: 2, 
    store: 'Daily Market', 
    date: '2023-04-04', 
    category: 'Beverages',
    osaRating: 62,
    reason: 'Delivery delay',
    missingProducts: ['Cola 2L', 'Orange Juice 1L'],
    action: 'Expedited shipping requested',
    status: 'Pending'
  },
  { 
    id: 3, 
    store: 'Express Store', 
    date: '2023-04-03', 
    category: 'Snacks',
    osaRating: 78,
    reason: 'Shelf space allocation issue',
    missingProducts: ['Potato Chips 150g'],
    action: 'Planogram updated',
    status: 'Resolved'
  },
  { 
    id: 4, 
    store: 'Super Grocers', 
    date: '2023-04-02', 
    category: 'Bakery',
    osaRating: 90,
    reason: 'Product damage in transit',
    missingProducts: ['White Bread 500g'],
    action: 'Replacement order shipped',
    status: 'Resolved'
  },
  { 
    id: 5, 
    store: 'Quick Mart', 
    date: '2023-04-01', 
    category: 'Dairy',
    osaRating: 45,
    reason: 'Inventory system error',
    missingProducts: ['Milk 1L', 'Cheese 200g', 'Butter 250g'],
    action: 'System update scheduled',
    status: 'Pending'
  }
];

export default function OSAReports() {
  const getOSAColor = (rating: number) => {
    if (rating >= 80) return 'bg-green-500';
    if (rating >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Resolved':
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Dairy':
        return 'bg-blue-100 text-blue-800';
      case 'Bakery':
        return 'bg-yellow-100 text-yellow-800';
      case 'Beverages':
        return 'bg-green-100 text-green-800';
      case 'Snacks':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">OSA Reports</h1>
          <Button>
            <FileBarChart size={16} className="mr-2" />
            Generate Report
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold mb-2">68%</div>
              <div className="text-lg font-medium text-gray-500 mb-4">Average OSA Rating</div>
              <Progress value={68} className="h-4 w-full" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold mb-2">32%</div>
              <div className="text-lg font-medium text-gray-500 mb-4">Out of Stock Rate</div>
              <Progress value={32} className="h-4 w-full bg-gray-100">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '32%' }}></div>
              </Progress>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold mb-2">15</div>
              <div className="text-lg font-medium text-gray-500 mb-4">Outstanding Issues</div>
              <div className="flex gap-2">
                <Badge className="bg-yellow-100 text-yellow-800">8 Pending</Badge>
                <Badge className="bg-red-100 text-red-800">7 Critical</Badge>
              </div>
            </div>
          </Card>
        </div>
        
        <Card>
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <div className="relative w-full md:w-96">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search reports..." className="pl-9" />
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">All Categories</Button>
                <Button variant="outline" size="sm">All Statuses</Button>
                <Button variant="outline" size="sm">Export Data</Button>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Store</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>OSA Rating</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Missing Products</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {osareports.map(report => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Store size={16} className="mr-2 text-gray-500" />
                          {report.store}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2 text-gray-500" />
                          {report.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${getCategoryColor(report.category)}`}>
                          {report.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className={`h-2.5 rounded-full ${getOSAColor(report.osaRating)}`} style={{ width: `${report.osaRating}%` }}></div>
                          </div>
                          <span>{report.osaRating}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <AlertCircle size={16} className="mr-2 text-gray-500" />
                          {report.reason}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {report.missingProducts.map((product, idx) => (
                            <div key={idx} className="flex items-center text-sm">
                              <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                              {product}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">View</Button>
                          <Button variant="ghost" size="sm">Update</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
