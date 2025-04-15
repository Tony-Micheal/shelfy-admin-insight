
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Shield, Check, X } from "lucide-react";

type Permission = {
  module: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
};

const permissions: Permission[] = [
  {
    module: "Users",
    view: true,
    create: true,
    edit: true,
    delete: false,
  },
  {
    module: "Products",
    view: true,
    create: true,
    edit: true,
    delete: true,
  },
  {
    module: "Orders",
    view: true,
    create: false,
    edit: false,
    delete: false,
  },
];

export const PermissionMatrix = () => {
  const renderPermissionIcon = (hasPermission: boolean) => {
    return hasPermission ? (
      <Check className="h-4 w-4 text-green-500" />
    ) : (
      <X className="h-4 w-4 text-red-500" />
    );
  };

  return (
    <Card className="mt-6">
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Shield size={20} className="mr-2" />
          Permission Matrix
        </h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                <TableHead>View</TableHead>
                <TableHead>Create</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((permission) => (
                <TableRow key={permission.module}>
                  <TableCell className="font-medium">{permission.module}</TableCell>
                  <TableCell>{renderPermissionIcon(permission.view)}</TableCell>
                  <TableCell>{renderPermissionIcon(permission.create)}</TableCell>
                  <TableCell>{renderPermissionIcon(permission.edit)}</TableCell>
                  <TableCell>{renderPermissionIcon(permission.delete)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};
