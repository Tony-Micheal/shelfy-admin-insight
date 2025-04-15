
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead,
  TableCell
} from '@/components/ui/table';
import { AdminsTableRow } from './AdminsTableRow';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

interface Admin {
  id: number;
  name: string;
  email: string;
  phone: string;
  role?: string;
  roles?: Array<{id: number, name: string}>;
}

interface AdminsTableProps {
  admins: Admin[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export const AdminsTable = ({ 
  admins, 
  loading, 
  currentPage, 
  totalPages, 
  onPreviousPage, 
  onNextPage 
}: AdminsTableProps) => {
  return (
    <div className="space-y-4">
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
            ) : admins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">No admins found</TableCell>
              </TableRow>
            ) : (
              admins.map(admin => (
                <AdminsTableRow key={admin.id} admin={admin} />
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {!loading && admins.length > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={onPreviousPage} 
                className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            <PaginationItem>
              <span className="px-4">
                Page {currentPage} of {totalPages || 1}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext 
                onClick={onNextPage} 
                className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
