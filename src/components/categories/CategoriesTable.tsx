
import React from 'react';
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";

type Category = {
  id: number;
  title: string;
  points: number;
  created_at: string;
};

interface CategoriesTableProps {
  categories: Category[];
  onEdit: (id: number) => void;
}

const CategoriesTable = ({ categories, onEdit }: CategoriesTableProps) => {
  return (
    <div className="relative overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                No categories found
              </TableCell>
            </TableRow>
          ) : (
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.id}</TableCell>
                <TableCell>{category.title}</TableCell>
                <TableCell>{category.points}</TableCell>
                <TableCell>{formatDate(category.created_at)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(category.id)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoriesTable;
