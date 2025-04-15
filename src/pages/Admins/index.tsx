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
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationNext, 
  PaginationPrevious, 
} from '@/components/ui/pagination';
import AllAdminsHook from '@/components/logic/Admins/AllAdminsHook';

const mockAdmins = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890', role: 'Super Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+0987654321', role: 'Admin' },
];

export default function Admins() {
  const [allAdmins, totalPages, currentPage, handlePreviousPage, handleNextPage, loading] = AllAdminsHook();

  return (
    <MainLayout showFilters={false}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admins Management</h1>
        </div>
        
        <Card>
          <div className="p-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">Loading...</TableCell>
                    </TableRow>
                  ) : allAdmins.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">No admins found</TableCell>
                    </TableRow>
                  ) : (
                    allAdmins.map(admin => (
                      <TableRow key={admin.id}>
                        <TableCell className="font-mono text-sm text-gray-500">#{admin.id}</TableCell>
                        <TableCell>{admin.name}</TableCell>
                        <TableCell>{admin.email}</TableCell>
                        <TableCell>{admin.phone}</TableCell>
                        <TableCell>{admin.role}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
