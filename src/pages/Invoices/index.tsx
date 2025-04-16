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
import { SearchIcon, FileText, Upload, CheckCircle, XCircle, Clock, AlertTriangle, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import InvoicesCountHook from './../../components/logic/Invoivces/InvoicesCountHook';

const invoices = [
  { 
    id: 'INV-001', 
    store: 'Metro Supermarket', 
    date: '2023-04-05', 
    points: 1240,
    status: 'Accepted'
  },
  { 
    id: 'INV-002', 
    store: 'Daily Market', 
    date: '2023-04-04', 
    points: 852,
    status: 'Pending'
  },
  { 
    id: 'INV-003', 
    store: 'Express Store', 
    date: '2023-04-03', 
    points: 375,
    status: 'Rejected'
  },
  { 
    id: 'INV-004', 
    store: 'Super Grocers', 
    date: '2023-04-02', 
    points: 980,
    status: 'Partially Rejected'
  },
  { 
    id: 'INV-005', 
    store: 'Quick Mart', 
    date: '2023-04-01', 
    points: 645,
    status: 'Pending'
  },
];

export default function Invoices() {
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Accepted':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center gap-1">
            <CheckCircle size={12} />
            Accepted
          </Badge>
        );
      case 'Rejected':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200 flex items-center gap-1">
            <XCircle size={12} />
            Rejected
          </Badge>
        );
      case 'Partially Rejected':
        return (
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 flex items-center gap-1">
            <AlertTriangle size={12} />
            Partially Rejected
          </Badge>
        );
      case 'Pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 flex items-center gap-1">
            <Clock size={12} />
            Pending
          </Badge>
        );

      default:
        return <Badge>{status}</Badge>;
    }
  };
  console.log("before");

  const  [invoiceCount,  loading]=InvoicesCountHook();
 
  
  

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Invoices</h1>
        
        </div>
        
        <Card>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-col items-center p-6 border rounded-md bg-gray-50">
                <div className="text-3xl font-bold text-green-600">{invoiceCount&&invoiceCount.acceepted_invices.count}</div>
                <div className="text-sm text-gray-500">Accepted</div>
              </div>
              <div className="flex flex-col items-center p-6 border rounded-md bg-gray-50">
                <div className="text-3xl font-bold text-red-600">{invoiceCount&&invoiceCount.rejected_invices.count}</div>
                <div className="text-sm text-gray-500">Rejected</div>
              </div>
              <div className="flex flex-col items-center p-6 border rounded-md bg-gray-50">
                <div className="text-3xl font-bold text-orange-600">{invoiceCount&&invoiceCount.partially_rejected_invices.count}</div>
                <div className="text-sm text-gray-500">Partially Rejected</div>
              </div>
              <div className="flex flex-col items-center p-6 border rounded-md bg-gray-50">
                <div className="text-3xl font-bold text-yellow-600">{invoiceCount&&invoiceCount.pending_invices.count}</div>
                <div className="text-sm text-gray-500">Pending</div>
              </div>
           
            </div>
            
        
          </div>
          
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <div className="relative w-full md:w-96">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search invoices..." className="pl-9" />
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Store</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map(invoice => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <FileText size={16} className="mr-2 text-gray-500" />
                          {invoice.id}
                        </div>
                      </TableCell>
                      <TableCell>{invoice.store}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell className="font-medium">{invoice.points.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <Eye size={14} />
                          View
                        </Button>
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
