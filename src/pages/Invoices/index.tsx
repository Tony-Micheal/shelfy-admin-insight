
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
import { SearchIcon, FileText, Eye, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import InvoicesCountHook from '../../components/logic/Invoivces/InvoicesCountHook';
import AllInvoicesHook from '../../components/logic/Invoivces/AllInvoicesHook';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

  const [invoiceCount, loading] = InvoicesCountHook();
  const  [allInvoices, totalPages, currentPage, handlePageChange, searchTerm, handleSearch, loading2,invoiceStatus,handleFilter]= AllInvoicesHook();
  
  const getCount = (data, field) => {
    if (!data || !data[field]) return 0;
    return data[field].count || 0;
  };

  const getTotalCount = (data) => {
    if (!data) return 0;
    return getCount(data, 'acceepted_invices') + 
           getCount(data, 'rejected_invices') + 
           getCount(data, 'partially_rejected_invices') + 
           getCount(data, 'pending_invices');
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Invoices</h1>
          <div className="text-sm text-gray-500">
            Total Invoices: <span className="font-bold text-gray-900">{invoiceCount.total_invices}</span>
          </div>
        </div>
        
        <Card>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-col items-center p-6 border rounded-md bg-gray-50" onClick={()=>{handleFilter(1)}}>
                <div className="text-3xl font-bold text-green-600">
                  {getCount(invoiceCount, 'acceepted_invices')}
                </div>
                <div className="text-sm text-gray-500">Accepted</div>
              </div>
              <div className="flex flex-col items-center p-6 border rounded-md bg-gray-50">
                <div className="text-3xl font-bold text-red-600">
                  {getCount(invoiceCount, 'rejected_invices')}
                </div>
                <div className="text-sm text-gray-500">Rejected</div>
              </div>
              <div className="flex flex-col items-center p-6 border rounded-md bg-gray-50">
                <div className="text-3xl font-bold text-orange-600">
                  {getCount(invoiceCount, 'partially_rejected_invices')}
                </div>
                <div className="text-sm text-gray-500">Partially Rejected</div>
              </div>
              <div className="flex flex-col items-center p-6 border rounded-md bg-gray-50">
                <div className="text-3xl font-bold text-yellow-600">
                  {getCount(invoiceCount, 'pending_invices')}
                </div>
                <div className="text-sm text-gray-500">Pending</div>
              </div>
            </div>
          </div>
          
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <div className="relative w-full md:w-96">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search invoices..." 
                  className="pl-9" 
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
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
                  {Array.isArray(allInvoices) && allInvoices.length > 0 ? (
                    allInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <FileText size={16} className="mr-2 text-gray-500" />
                            {invoice.id}
                          </div>
                        </TableCell>
                        <TableCell>{invoice.customer?.name || 'N/A'}</TableCell>
                        <TableCell>{invoice.date || 'N/A'}</TableCell>
                        <TableCell className="font-medium">
                          {typeof invoice.points === 'number' ? invoice.points.toLocaleString() : 'N/A'}
                        </TableCell>
                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="flex items-center gap-2">
                            <Eye size={14} />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        {loading2 ? "Loading invoices..." : "No invoices found"}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            {totalPages > 0 && (
              <div className="mt-4 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
