
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface Admin {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

interface AdminsTableRowProps {
  admin: Admin;
}

export const AdminsTableRow = ({ admin }: AdminsTableRowProps) => {
  return (
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
  );
};
