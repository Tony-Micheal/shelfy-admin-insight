
import { FileText, Eye, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

interface InvoiceTableProps {
  allInvoices: any[];
  loading2: boolean;
}

export const InvoiceTable = ({ allInvoices, loading2 }: InvoiceTableProps) => {
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

  return (
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
  );
};
