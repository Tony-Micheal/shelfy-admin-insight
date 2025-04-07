
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
import { SearchIcon, FileText, Upload, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const invoices = [
  { 
    id: 'INV-001', 
    store: 'Metro Supermarket', 
    date: '2023-04-05', 
    amount: '$1,240.50',
    status: 'Accepted',
    uploader: 'John Smith',
    uploadDate: '2023-04-05'
  },
  { 
    id: 'INV-002', 
    store: 'Daily Market', 
    date: '2023-04-04', 
    amount: '$852.25',
    status: 'Pending',
    uploader: 'Maria Garcia',
    uploadDate: '2023-04-04'
  },
  { 
    id: 'INV-003', 
    store: 'Express Store', 
    date: '2023-04-03', 
    amount: '$375.00',
    status: 'Rejected',
    uploader: 'David Johnson',
    uploadDate: '2023-04-03'
  },
  { 
    id: 'INV-004', 
    store: 'Super Grocers', 
    date: '2023-04-02', 
    amount: '$980.75',
    status: 'Accepted',
    uploader: 'Sarah Lee',
    uploadDate: '2023-04-02'
  },
  { 
    id: 'INV-005', 
    store: 'Quick Mart', 
    date: '2023-04-01', 
    amount: '$645.30',
    status: 'Pending',
    uploader: 'Michael Brown',
    uploadDate: '2023-04-01'
  },
];

export default function Invoices() {
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Accepted':
        return (
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
            <CheckCircle size={12} />
            Accepted
          </Badge>
        );
      case 'Rejected':
        return (
          <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
            <XCircle size={12} />
            Rejected
          </Badge>
        );
      case 'Pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
            <Clock size={12} />
            Pending
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Invoices</h1>
          <Button>
            <Upload size={16} className="mr-2" />
            Upload Invoice
          </Button>
        </div>
        
        <Card>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center p-6 border rounded-md bg-gray-50">
                <div className="text-3xl font-bold text-shelfy-orange">428</div>
                <div className="text-sm text-gray-500">Accepted</div>
              </div>
              <div className="flex flex-col items-center p-6 border rounded-md bg-gray-50">
                <div className="text-3xl font-bold text-red-500">84</div>
                <div className="text-sm text-gray-500">Rejected</div>
              </div>
              <div className="flex flex-col items-center p-6 border rounded-md bg-gray-50">
                <div className="text-3xl font-bold text-yellow-500">56</div>
                <div className="text-sm text-gray-500">Pending</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-500">Total invoice amount:</div>
              <div className="text-xl font-bold">$145,280.75</div>
            </div>
          </div>
          
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <div className="relative w-full md:w-96">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search invoices..." className="pl-9" />
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">All Status</Button>
                <Button variant="outline" size="sm">Date Range</Button>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Store</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Upload Date</TableHead>
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
                      <TableCell className="font-medium">{invoice.amount}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>{invoice.uploader}</TableCell>
                      <TableCell>{invoice.uploadDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">View</Button>
                          {invoice.status === 'Pending' && (
                            <>
                              <Button variant="outline" size="sm" className="text-green-600">
                                <CheckCircle size={14} className="mr-1" />
                                Accept
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600">
                                <XCircle size={14} className="mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
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
