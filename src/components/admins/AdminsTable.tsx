
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
import { Card } from '@/components/ui/card';

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

  if (loading) {
    return (
      <div className="w-full h-48 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (admins.length === 0) {
    return (
      <Card className="p-8 text-center text-muted-foreground">
        No admins found
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {isMobile ? (
        <div className="grid gap-4">
          {admins.map(admin => (
            <AdminsTableRow key={admin.id} admin={admin} isMobile={true} />
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px] lg:w-[80px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map(admin => (
                <AdminsTableRow key={admin.id} admin={admin} isMobile={false} />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
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
    </div>
  );
};
