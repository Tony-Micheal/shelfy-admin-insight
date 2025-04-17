
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { MapPin, ZoomIn, ZoomOut, RotateCcw, Compass, Layers, Download } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoicesMapAction } from '@/redux/actions/DashboardAction';

type Coordinates = {
  lat: number;
  lng: number;
};

type RegionData = {
  region: string;
  invoices: number;
  color?: string;
};

type MapComponentProps = {
  regionData: RegionData[];
};

const MapComponent = ({ regionData: initialRegionData }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState<Coordinates | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [regionData, setRegionData] = useState<RegionData[]>(initialRegionData);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');
  const { toast } = useToast();
  const dispatch = useDispatch();
  
  // Get the invoices map data from Redux
  const invoicesMapData = useSelector((state: any) => state.DashboardReducer.invoicesMap);
  
  useEffect(() => {
    // If coordinates are selected, fetch region data from API
    if (selectedCoordinates) {
      dispatch(getInvoicesMapAction(selectedCoordinates.lat, selectedCoordinates.lng));
    }
  }, [selectedCoordinates, dispatch]);

  useEffect(() => {
    // Update region data when API data changes
    if (invoicesMapData && invoicesMapData.data) {
      try {
        // Transform API data to match our RegionData type
        const apiRegionData = Array.isArray(invoicesMapData.data) 
          ? invoicesMapData.data.map((item: any) => ({
              region: item.region || 'Unknown',
              invoices: item.invoices || 0,
              color: getRandomColor()
            }))
          : [];
          
        if (apiRegionData.length > 0) {
          setRegionData(apiRegionData);
          toast({
            title: "Map data updated",
            description: "Invoice distribution data has been updated for selected coordinates",
          });
        }
      } catch (error) {
        console.error("Error processing map data:", error);
      }
    }
  }, [invoicesMapData, toast]);

  const getRandomColor = () => {
    const colors = ['#4F46E5', '#06B6D4', '#059669', '#D97706', '#DC2626'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return;
    
    const rect = mapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert x,y position to lat,lng with improved precision
    const width = rect.width;
    const height = rect.height;
    
    // Map x,y to longitude (-180 to 180) and latitude (-90 to 90)
    // Apply zoom factor for more precise positioning
    const lng = ((x / width) * 360 - 180) / zoom;
    const lat = (90 - (y / height) * 180) / zoom;
    
    setSelectedCoordinates({ lat: parseFloat(lat.toFixed(6)), lng: parseFloat(lng.toFixed(6)) });
    
    // Show toast notification
    toast({
      title: "Coordinates selected",
      description: `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`,
    });
  };

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

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.5, 10));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.5, 0.5));
  };

  const handleReset = () => {
    setZoom(1);
    setSelectedCoordinates(null);
    setActiveRegion(null);
    setViewMode('2d');
    setRegionData(initialRegionData);
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === '2d' ? '3d' : '2d');
  };

  const handleRegionClick = (region: string) => {
    setActiveRegion(prev => prev === region ? null : region);
  };

  const downloadMapData = () => {
    const dataStr = JSON.stringify(regionData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'invoice-distribution-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Calculate maximum invoices for visualization scaling
  const maxInvoices = Math.max(...regionData.map(r => r.invoices));

  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Invoice Distribution by Region</CardTitle>
        <div className="flex space-x-2">
          <button 
            onClick={toggleViewMode}
            className="p-1 rounded hover:bg-gray-100"
            title={viewMode === '2d' ? "Switch to 3D view" : "Switch to 2D view"}
          >
            <Layers size={18} />
          </button>
          <button 
            onClick={downloadMapData}
            className="p-1 rounded hover:bg-gray-100"
            title="Download map data"
          >
            <Download size={18} />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div
            ref={mapRef}
            onClick={handleMapClick}
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
                {regionData.map((region, index) => {
                  // Generate positions dynamically based on index
                  const positions = [
                    { top: '20%', left: '20%' },
                    { bottom: '20%', left: '20%' },
                    { top: '20%', right: '20%' },
                    { bottom: '20%', right: '20%' },
                    { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
                  ];
                  
                  const pos = positions[index % positions.length];
                  const size = 30 + (region.invoices / maxInvoices) * 40;
                  
                  const isActive = activeRegion === region.region;
                  
                  return (
                    <div 
                      key={region.region}
                      className={`absolute flex items-center justify-center rounded-full transition-all duration-300 hover:shadow-lg ${
                        isActive ? 'ring-2 ring-offset-2 ring-purple-500 z-10' : ''
                      }`}
                      style={{
                        ...pos,
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundColor: region.color || '#6366F1',
                        opacity: activeRegion ? (isActive ? 1 : 0.5) : 0.8,
                        zIndex: isActive ? 10 : 5,
                        transform: viewMode === '3d' ? `${pos.transform || ''} translateZ(${isActive ? 20 : 0}px)` : pos.transform || ''
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRegionClick(region.region);
                      }}
                    >
                      <div className="text-xs font-semibold text-white">
                        {region.region}
                      </div>
                      {isActive && (
                        <div className="absolute -bottom-8 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                          {region.invoices} invoices
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {/* Selected coordinate marker */}
                {selectedCoordinates && (
                  <div 
                    className="absolute flex flex-col items-center animate-pulse z-20"
                    style={{
                      top: `${((90 - selectedCoordinates.lat * zoom) / 180) * 100}%`,
                      left: `${((selectedCoordinates.lng * zoom + 180) / 360) * 100}%`,
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

            {/* Map controls */}
            <div className="absolute top-2 right-2 bg-white rounded-md shadow-sm z-10 flex flex-col">
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-gray-100 rounded-t-md"
                title="Zoom in"
              >
                <ZoomIn size={16} />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-gray-100"
                title="Zoom out"
              >
                <ZoomOut size={16} />
              </button>
              <button
                onClick={handleReset}
                className="p-2 hover:bg-gray-100 rounded-b-md"
                title="Reset view"
              >
                <RotateCcw size={16} />
              </button>
            </div>

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
                onClick={copyCoordinates}
                className="absolute top-2 left-2 bg-purple-500 text-white px-3 py-1 rounded-md text-xs hover:bg-purple-600 z-10"
              >
                Copy Coordinates
              </button>
            )}
          </div>

          {/* Region data visualization */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-2">
            {regionData.map((region, index) => (
              <div 
                key={index} 
                className={`text-center transition-all duration-300 ${
                  activeRegion === region.region ? 'scale-105 font-bold' : ''
                }`}
                onClick={() => handleRegionClick(region.region)}
              >
                <p className="text-sm font-medium">{region.region}</p>
                <div className="h-2 bg-gray-200 rounded-full mt-1">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${(region.invoices / maxInvoices) * 100}%`,
                      backgroundColor: region.color || '#6366F1'
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">{region.invoices} invoices</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapComponent;
