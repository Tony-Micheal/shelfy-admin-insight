
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead,
  TableCell
} from '@/components/ui/table';
import { AdminsTableRow } from './AdminsTableRow';

interface Admin {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

interface AdminsTableProps {
  admins: Admin[];
  loading: boolean;
}

export const AdminsTable = ({ admins, loading }: AdminsTableProps) => {
  return (
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
          {!loading ? (
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
  );
};
