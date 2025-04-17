
import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

type MapControlsProps = {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
};

const MapControls = ({ onZoomIn, onZoomOut, onReset }: MapControlsProps) => {
  return (
    <div className="absolute top-2 right-2 bg-white rounded-md shadow-sm z-10 flex flex-col">
      <button
        onClick={onZoomIn}
        className="p-2 hover:bg-gray-100 rounded-t-md"
        title="Zoom in"
      >
        <ZoomIn size={16} />
      </button>
      <button
        onClick={onZoomOut}
        className="p-2 hover:bg-gray-100"
        title="Zoom out"
      >
        <ZoomOut size={16} />
      </button>
      <button
        onClick={onReset}
        className="p-2 hover:bg-gray-100 rounded-b-md"
        title="Reset view"
      >
        <RotateCcw size={16} />
      </button>
    </div>
  );
};

export default MapControls;
