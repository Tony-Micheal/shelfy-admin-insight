
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import SegmentsTable from '@/components/segments/SegmentsTable';
import CreateSegmentDialog from '@/components/segments/CreateSegmentDialog';
import SegmentsHook from './../../components/logic/SegmentsHook';

const Segments = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Segments</h1>
          <CreateSegmentDialog />
        </div>
        <SegmentsTable />
      </div>
    </MainLayout>
  );
};

export default Segments;
