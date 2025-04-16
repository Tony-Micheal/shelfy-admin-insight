import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import SegmentsHook from '../logic/SegmentsHook';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SegmentsTable = () => {
  const [
    allSegments, 
    totalPages, 
    currentPage, 
    handlePageChange, 
    handlePreviousPage, 
    handleNextPage, 
    loading
  ] = SegmentsHook();

  const handleEdit = (id: number) => {
    console.log('Edit segment:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete segment:', id);
  };

  const handleEditPoints = (id: number) => {
    console.log('Edit points for segment:', id);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Segment</TableHead>
              <TableHead>OSA Points</TableHead>
              <TableHead>Plangrams Points</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allSegments.map((segment) => (
              <TableRow key={segment.id}>
                <TableCell>{segment.id}</TableCell>
                <TableCell>{segment.segment}</TableCell>
                <TableCell>{segment.osa_points}</TableCell>
                <TableCell>{segment.product_images_points}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditPoints(segment.id)}
                    >
                      Edit Points
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(segment.id)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(segment.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SegmentsTable;
