import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

type Coordinates = {
  lat: number;
  lng: number;
};

type RegionData = {
  region: string;
  invoices: number;
  color?: string;
};

export function useMapInteractions(initialRegionData: RegionData[]) {
  const [selectedCoordinates, setSelectedCoordinates] = useState<Coordinates | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [regionData, setRegionData] = useState<RegionData[]>(initialRegionData);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');
  const [pointInvoiceCount, setPointInvoiceCount] = useState<number | null>(null);
  const [loadingPointData, setLoadingPointData] = useState<boolean>(false);
  const { toast } = useToast();

  const getRandomColor = () => {
    const colors = ['#4F46E5', '#06B6D4', '#059669', '#D97706', '#DC2626'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    
    setSelectedCoordinates({ lat, lng });
    setPointInvoiceCount(null); // Reset while loading new data
    
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
    setZoom(prev => Math.min(prev * 1.2, 2)); // Adjusted zoom factor for Google Maps
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.5)); // Adjusted zoom factor for Google Maps
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
    // Note: Google Maps has its own 3D mode, but we're keeping the state for UI consistency
  };

  const handleRegionClick = (region: string) => {
    setActiveRegion(prev => prev === region ? null : region);
  };

  const downloadMapData = () => {
    const dataStr = JSON.stringify(regionData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'egypt-invoice-distribution-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return {
    selectedCoordinates,
    setSelectedCoordinates,
    zoom,
    regionData,
    setRegionData,
    activeRegion,
    viewMode,
    pointInvoiceCount,
    setPointInvoiceCount,
    loadingPointData,
    setLoadingPointData,
    getRandomColor,
    handleMapClick,
    copyCoordinates,
    handleZoomIn,
    handleZoomOut,
    handleReset,
    toggleViewMode,
    handleRegionClick,
    downloadMapData
  };
}
