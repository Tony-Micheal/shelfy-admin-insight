
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, ChevronRight, User, Phone, Mail, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
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
      <Card className="p-4">
        <Drawer>
          <DrawerTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{admin.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-3 w-3" />
                  <span>{roleDisplay}</span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle className="text-xl">{admin.name}</DrawerTitle>
                <DrawerDescription>ID: #{admin.id}</DrawerDescription>
              </DrawerHeader>
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p className="mt-1">{admin.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <p className="mt-1">{admin.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Role</p>
                    <p className="mt-1">{roleDisplay}</p>
                  </div>
                </div>
              </div>
              <DrawerFooter>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="lg" className="w-full">
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="lg" className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </Card>
    );
  }

  return (
    <TableRow>
      <TableCell className="font-mono text-sm text-muted-foreground">#{admin.id}</TableCell>
      <TableCell>{admin.name}</TableCell>
      <TableCell>{admin.email}</TableCell>
      <TableCell>{admin.phone}</TableCell>
      <TableCell>{roleDisplay}</TableCell>
      <TableCell>
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
