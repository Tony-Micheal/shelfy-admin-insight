
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoicesMapAction } from '@/redux/actions/DashboardAction';

import MapHeader from './map/MapHeader';
import MapCanvas from './map/MapCanvas';
import RegionsList from './map/RegionsList';
import { useMapInteractions } from './map/useMapInteractions';

type RegionData = {
  region: string;
  invoices: number;
  color?: string;
};

type MapComponentProps = {
  regionData: RegionData[];
};

// Egypt-specific regions
const EGYPT_REGIONS = [
  { region: 'Cairo', invoices: 245, color: '#4F46E5' },
  { region: 'Alexandria', invoices: 187, color: '#06B6D4' },
  { region: 'Giza', invoices: 156, color: '#059669' },
  { region: 'Luxor', invoices: 203, color: '#D97706' },
  { region: 'Aswan', invoices: 178, color: '#DC2626' },
  { region: 'North', invoices: 120, color: '#8B5CF6' },
  { region: 'South', invoices: 135, color: '#EC4899' },
];

const MapComponent = ({ regionData: initialRegionData }: MapComponentProps) => {
  const dispatch = useDispatch();
  
  // Get the invoices map data from Redux
  const invoicesMapData = useSelector((state: any) => state.DashboardReducer.invoicesMap);
  
  // Custom hook for map interactions - enhanced for Google Maps
  const {
    selectedCoordinates,
    zoom,
    regionData,
    setRegionData,
    activeRegion,
    viewMode,
    pointInvoiceCount,
    setPointInvoiceCount,
    loadingPointData,
    setLoadingPointData,
    handleMapClick,
    copyCoordinates,
    handleZoomIn,
    handleZoomOut,
    handleReset,
    toggleViewMode,
    handleRegionClick,
    downloadMapData
  } = useMapInteractions(EGYPT_REGIONS || initialRegionData);

  // Effect to fetch data when coordinates are selected
  useEffect(() => {
    // If coordinates are selected, fetch region data from API
    if (selectedCoordinates) {
      setLoadingPointData(true);
      dispatch(getInvoicesMapAction(selectedCoordinates.lat, selectedCoordinates.lng));
    }
  }, [selectedCoordinates, dispatch, setLoadingPointData]);

  // Effect to update region data when API data changes
  useEffect(() => {
    // Update region data when API data changes
    if (invoicesMapData && invoicesMapData.data) {
      try {
        setLoadingPointData(false);
        
        // Extract total invoices at this point if available
        if (invoicesMapData.total_invoices !== undefined) {
          setPointInvoiceCount(invoicesMapData.total_invoices);
        }
        
        // Transform API data to match our RegionData type
        const apiRegionData = Array.isArray(invoicesMapData.data) 
          ? invoicesMapData.data.map((item: any) => ({
              region: item.region || 'Unknown',
              invoices: item.invoices || 0,
              color: item.color || getRandomColorForRegion()
            }))
          : [];
          
        if (apiRegionData.length > 0) {
          setRegionData(apiRegionData);
        }
      } catch (error) {
        setLoadingPointData(false);
        console.error("Error processing map data:", error);
      }
    }
  }, [invoicesMapData, setRegionData, setPointInvoiceCount, setLoadingPointData]);

  // Helper function to get a random color for regions
  const getRandomColorForRegion = () => {
    const colors = ['#4F46E5', '#06B6D4', '#059669', '#D97706', '#DC2626'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Calculate maximum invoices for visualization scaling
  const maxInvoices = Math.max(...regionData.map(r => r.invoices));

  return (
    <Card className="bg-white">
      <CardHeader className="pb-2">
        <MapHeader 
          onToggleViewMode={toggleViewMode} 
          onDownloadData={downloadMapData} 
        />
      </CardHeader>
      <CardContent>
        <div className="relative">
          <MapCanvas
            zoom={zoom}
            viewMode={viewMode}
            regionData={regionData}
            activeRegion={activeRegion}
            selectedCoordinates={selectedCoordinates}
            pointInvoiceCount={pointInvoiceCount}
            loadingPointData={loadingPointData}
            onMapClick={handleMapClick}
            onRegionClick={handleRegionClick}
            onCopyCoordinates={copyCoordinates}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onReset={handleReset}
          />

          <RegionsList
            regions={regionData}
            activeRegion={activeRegion}
            maxInvoices={maxInvoices}
            onRegionClick={handleRegionClick}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MapComponent;
