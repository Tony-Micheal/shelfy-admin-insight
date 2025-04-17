
import React from 'react';
import { MapPin } from 'lucide-react';

type Coordinates = {
  lat: number;
  lng: number;
};

type LocationMarkerProps = {
  coordinates: Coordinates;
  zoom: number;
  invoiceCount: number | null;
  isLoading: boolean;
};

const LocationMarker = ({ coordinates, zoom, invoiceCount, isLoading }: LocationMarkerProps) => {
  return (
    <div 
      className="absolute flex flex-col items-center z-20"
      style={{
        top: `${((90 - coordinates.lat * zoom) / 180) * 100}%`,
        left: `${((coordinates.lng * zoom + 180) / 360) * 100}%`,
        transform: 'translate(-50%, -100%)'
      }}
    >
      <MapPin className={`${isLoading ? 'animate-pulse' : ''} text-red-500`} size={24} />
      <div className="bg-white px-2 py-1 rounded shadow-md text-xs mt-1">
        {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
      </div>
      {invoiceCount !== null && (
        <div className="bg-purple-600 text-white px-3 py-1 rounded-full shadow-md text-xs mt-1 font-semibold">
          {invoiceCount} invoices
        </div>
      )}
      {isLoading && (
        <div className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full shadow-md text-xs mt-1">
          Loading...
        </div>
      )}
    </div>
  );
};

export default LocationMarker;
