
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
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4 w-full overflow-x-auto">
      <div className="rounded-md border min-w-[320px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] lg:w-[80px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className={isMobile ? "hidden" : ""}>Email</TableHead>
              <TableHead className={isMobile ? "hidden" : ""}>Phone</TableHead>
              <TableHead className={isMobile ? "hidden" : ""}>Role</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin h-6 w-6 border-2 border-shelfy-teal border-t-transparent rounded-full"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : admins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">No admins found</TableCell>
              </TableRow>
            ) : (
              admins.map(admin => (
                <AdminsTableRow key={admin.id} admin={admin} isMobile={isMobile} />
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {!loading && admins.length > 0 && (
        <div className="flex justify-center mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={onPreviousPage} 
                  className={`${currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} whitespace-nowrap`}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext 
                  onClick={onNextPage} 
                  className={`${currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} whitespace-nowrap`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};
