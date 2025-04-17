
import React from 'react';
import { CardTitle } from '@/components/ui/card';
import { Layers, Download } from 'lucide-react';

type MapHeaderProps = {
  onToggleViewMode: () => void;
  onDownloadData: () => void;
};

const MapHeader = ({ onToggleViewMode, onDownloadData }: MapHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between pb-2">
      <CardTitle>Invoice Distribution by Region</CardTitle>
      <div className="flex space-x-2">
        <button 
          onClick={onToggleViewMode}
          className="p-1 rounded hover:bg-gray-100"
          title="Toggle 2D/3D view"
        >
          <Layers size={18} />
        </button>
        <button 
          onClick={onDownloadData}
          className="p-1 rounded hover:bg-gray-100"
          title="Download map data"
        >
          <Download size={18} />
        </button>
      </div>
    </div>
  );
};

export default MapHeader;
