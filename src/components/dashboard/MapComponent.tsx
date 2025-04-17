
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { MapPin } from 'lucide-react';

type Coordinates = {
  lat: number;
  lng: number;
};

type MapComponentProps = {
  regionData: { region: string; invoices: number }[];
};

const MapComponent = ({ regionData }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState<Coordinates | null>(null);
  const { toast } = useToast();

  const copyCoordinates = () => {
    if (selectedCoordinates) {
      const coordsString = `${selectedCoordinates.lat}, ${selectedCoordinates.lng}`;
      navigator.clipboard.writeText(coordsString)
        .then(() => {
          toast({
            title: "Coordinates copied",
            description: `${coordsString} copied to clipboard`,
          });
        })
        .catch(err => {
          toast({
            title: "Failed to copy",
            description: "Could not copy coordinates to clipboard",
            variant: "destructive",
          });
          console.error('Failed to copy coordinates:', err);
        });
    }
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return;
    
    const rect = mapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert x,y position to lat,lng (simple conversion for demo)
    // In a real implementation, you would use proper map projection formulas
    const width = rect.width;
    const height = rect.height;
    
    // Map x,y to longitude (-180 to 180) and latitude (-90 to 90)
    const lng = (x / width) * 360 - 180;
    const lat = 90 - (y / height) * 180;
    
    setSelectedCoordinates({ lat: parseFloat(lat.toFixed(6)), lng: parseFloat(lng.toFixed(6)) });
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Invoice Distribution by Region</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          ref={mapRef}
          onClick={handleMapClick}
          className="h-[350px] bg-gray-100 rounded-lg flex items-center justify-center mb-4 relative cursor-crosshair"
        >
          {/* Simple map with regions */}
          <div className="absolute inset-0 p-4">
            <div className="h-full w-full relative border border-gray-200 rounded bg-slate-50">
              {/* Map regions */}
              <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200">
                <span className="text-xs font-semibold">North</span>
              </div>
              <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200">
                <span className="text-xs font-semibold">South</span>
              </div>
              <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center hover:bg-orange-200">
                <span className="text-xs font-semibold">East</span>
              </div>
              <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200">
                <span className="text-xs font-semibold">West</span>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center hover:bg-yellow-200">
                <span className="text-xs font-semibold">Central</span>
              </div>
              
              {/* Selected coordinate marker */}
              {selectedCoordinates && (
                <div 
                  className="absolute flex flex-col items-center animate-pulse"
                  style={{
                    top: `${((90 - selectedCoordinates.lat) / 180) * 100}%`,
                    left: `${((selectedCoordinates.lng + 180) / 360) * 100}%`,
                    transform: 'translate(-50%, -100%)'
                  }}
                >
                  <MapPin className="text-red-500" size={24} />
                  <div className="bg-white px-2 py-1 rounded shadow-md text-xs mt-1">
                    {selectedCoordinates.lat.toFixed(6)}, {selectedCoordinates.lng.toFixed(6)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="absolute bottom-2 right-2 bg-white p-2 rounded-md shadow-sm text-xs z-10">
            Click anywhere on the map to get coordinates
          </div>
          
          {/* Copy button */}
          {selectedCoordinates && (
            <button
              onClick={copyCoordinates}
              className="absolute top-2 right-2 bg-purple-500 text-white px-3 py-1 rounded-md text-xs hover:bg-purple-600 z-10"
            >
              Copy Coordinates
            </button>
          )}
        </div>

        <div className="grid grid-cols-5 gap-4 mt-2">
          {regionData.map((region, index) => (
            <div key={index} className="text-center">
              <p className="text-sm font-medium">{region.region}</p>
              <div className="h-2 bg-gray-200 rounded-full mt-1">
                <div 
                  className="h-full bg-orange-500 rounded-full" 
                  style={{ width: `${(region.invoices / Math.max(...regionData.map(r => r.invoices))) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MapComponent;
