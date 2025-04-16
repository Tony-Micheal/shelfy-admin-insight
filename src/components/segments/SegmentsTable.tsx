
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SegmentsHook from './../logic/SegmentsHook';

// Temporary mock data - replace with actual data from your API
const mockSegments = [
  {
    id: 1,
    segment: "Premium",
    osaPoints: 100,
    plangramsPoints: 150,
  },
  {
    id: 2,
    segment: "Standard",
    osaPoints: 75,
    plangramsPoints: 100,
  },
];

const SegmentsTable = () => {
  const handleEditPoints = (id: number) => {
    console.log('Edit points for segment:', id);
  };

  const handleEdit = (id: number) => {
    console.log('Edit segment:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete segment:', id);
  };
  const [allSegments, 
    totalPages, 
    currentPage, 
    handlePageChange, 
    handlePreviousPage, 
    handleNextPage, 
    loading
  ]=SegmentsHook();

  return (
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
  );
};

export default SegmentsTable;
