
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, ChevronRight } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface Admin {
  id: number;
  name: string;
  email: string;
  phone: string;
  role?: string;
  roles?: Array<{id: number, name: string}>;
}

interface AdminsTableRowProps {
  admin: Admin;
  isMobile: boolean;
}

export const AdminsTableRow = ({ admin, isMobile }: AdminsTableRowProps) => {
  const roleDisplay = admin.role || 
    (admin.roles && admin.roles.length > 0 
      ? admin.roles.map(r => r.name).join(', ') 
      : 'N/A');

  if (isMobile) {
    return (
      <TableRow key={admin.id}>
        <TableCell className="font-mono text-sm text-gray-500">#{admin.id}</TableCell>
        <TableCell>{admin.name}</TableCell>
        <TableCell className="text-right">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Admin Details</DrawerTitle>
                  <DrawerDescription>View or modify admin information</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="mt-1">{admin.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="mt-1">{admin.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Role</label>
                    <p className="mt-1">{roleDisplay}</p>
                  </div>
                </div>
                <DrawerFooter>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" className="flex-1">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow key={admin.id}>
      <TableCell className="font-mono text-sm text-gray-500">#{admin.id}</TableCell>
      <TableCell>{admin.name}</TableCell>
      <TableCell>{admin.email}</TableCell>
      <TableCell>{admin.phone}</TableCell>
      <TableCell>{roleDisplay}</TableCell>
      <TableCell>
        <div className="flex justify-end space-x-2">
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
