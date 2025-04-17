
import React, { useRef } from 'react';
import { Compass } from 'lucide-react';
import RegionBubble from './RegionBubble';
import LocationMarker from './LocationMarker';
import MapControls from './MapControls';

type Coordinates = {
  lat: number;
  lng: number;
};

type RegionData = {
  region: string;
  invoices: number;
  color?: string;
};

type MapCanvasProps = {
  zoom: number;
  viewMode: '2d' | '3d';
  regionData: RegionData[];
  activeRegion: string | null;
  selectedCoordinates: Coordinates | null;
  pointInvoiceCount: number | null;
  loadingPointData: boolean;
  onMapClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onRegionClick: (region: string) => void;
  onCopyCoordinates: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
};

const MapCanvas = ({ 
  zoom,
  viewMode,
  regionData,
  activeRegion,
  selectedCoordinates,
  pointInvoiceCount,
  loadingPointData,
  onMapClick,
  onRegionClick,
  onCopyCoordinates,
  onZoomIn,
  onZoomOut,
  onReset
}: MapCanvasProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Calculate maximum invoices for visualization scaling
  const maxInvoices = Math.max(...regionData.map(r => r.invoices));
  
  // Generate positions for regions
  const getPositionForIndex = (index: number) => {
    const positions = [
      { top: '20%', left: '20%' },
      { bottom: '20%', left: '20%' },
      { top: '20%', right: '20%' },
      { bottom: '20%', right: '20%' },
      { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
    ];
    
    return positions[index % positions.length];
  };

  return (
    <div
      ref={mapRef}
      onClick={onMapClick}
      className={`h-[350px] bg-slate-50 rounded-lg flex items-center justify-center mb-4 relative cursor-crosshair overflow-hidden transition-all duration-300 ${
        viewMode === '3d' ? 'shadow-inner transform perspective-1000' : ''
      }`}
      style={{
        transformStyle: viewMode === '3d' ? 'preserve-3d' : 'flat',
        transform: viewMode === '3d' ? 'rotateX(20deg)' : 'none'
      }}
    >
      {/* Map regions */}
      <div className="absolute inset-0 p-4">
        <div className="h-full w-full relative border border-gray-200 rounded bg-slate-50">
          {/* Regions */}
          {regionData.map((region, index) => (
            <RegionBubble
              key={region.region}
              region={region}
              position={getPositionForIndex(index)}
              isActive={activeRegion === region.region}
              maxInvoices={maxInvoices}
              viewMode={viewMode}
              onClick={onRegionClick}
            />
          ))}
          
          {/* Selected coordinate marker */}
          {selectedCoordinates && (
            <LocationMarker
              coordinates={selectedCoordinates}
              zoom={zoom}
              invoiceCount={pointInvoiceCount}
              isLoading={loadingPointData}
            />
          )}
        </div>
      </div>

      {/* Map controls */}
      <MapControls
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onReset={onReset}
      />

      {/* Compass */}
      <div className="absolute bottom-2 left-2 bg-white p-2 rounded-full shadow-sm z-10">
        <Compass size={20} className="text-gray-600" />
      </div>

      {/* Instructions */}
      <div className="absolute bottom-2 right-2 bg-white p-2 rounded-md shadow-sm text-xs z-10">
        Click anywhere on the map to get coordinates
      </div>
      
      {/* Copy button */}
      {selectedCoordinates && (
        <button
          onClick={onCopyCoordinates}
          className="absolute top-2 left-2 bg-purple-500 text-white px-3 py-1 rounded-md text-xs hover:bg-purple-600 z-10"
        >
          Copy Coordinates
        </button>
      )}
    </div>
  );
};

export default MapCanvas;
