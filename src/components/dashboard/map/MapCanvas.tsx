
import React, { useRef, useCallback, useState } from 'react';
import { Compass } from 'lucide-react';
import { GoogleMap, useLoadScript, Marker, Circle } from '@react-google-maps/api';
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
  onMapClick: (e: google.maps.MapMouseEvent) => void;
  onRegionClick: (region: string) => void;
  onCopyCoordinates: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
};

// Default center coordinates for Egypt
const EGYPT_CENTER = { lat: 26.8206, lng: 30.8025 };
const DEFAULT_ZOOM = 6;

// Map container styles
const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem',
};

// Custom map styling
const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  styles: [
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [{ visibility: 'simplified' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#e4f1fa' }]
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }]
    }
  ]
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
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "REPLACE_WITH_YOUR_GOOGLE_MAPS_API_KEY", // You'll need a valid API key here
    // Note: This is a placeholder. In production, use an environment variable or API key management system
  });
  
  const mapRef = useRef<google.maps.Map | null>(null);
  
  // Handler for when the map loads
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);
  
  // Calculate maximum invoices for visualization scaling
  const maxInvoices = Math.max(...regionData.map(r => r.invoices));
  
  // Generate circle options for regions
  const getCircleOptionsForRegion = (region: RegionData, isActive: boolean) => {
    return {
      strokeColor: region.color || '#4F46E5',
      strokeOpacity: isActive ? 0.9 : 0.7,
      strokeWeight: isActive ? 2 : 1,
      fillColor: region.color || '#4F46E5',
      fillOpacity: isActive ? 0.5 : 0.3,
      clickable: true,
      // Scale circle radius based on invoice count
      radius: 20000 + (region.invoices / maxInvoices) * 50000,
    };
  };
  
  // Generate positions for regions around Egypt
  const getPositionForRegion = (region: string) => {
    // Predefined positions for common Egypt regions
    const positions: Record<string, Coordinates> = {
      'Cairo': { lat: 30.0444, lng: 31.2357 },
      'Alexandria': { lat: 31.2001, lng: 29.9187 },
      'Giza': { lat: 30.0131, lng: 31.2089 },
      'Luxor': { lat: 25.6872, lng: 32.6396 },
      'Aswan': { lat: 24.0889, lng: 32.8998 },
      'Hurghada': { lat: 27.2579, lng: 33.8116 },
      'Sharm El Sheikh': { lat: 27.9158, lng: 34.3300 },
      'North': { lat: 31.4165, lng: 31.8133 }, // Delta region
      'South': { lat: 23.4219, lng: 32.8998 }, // Upper Egypt
      'East': { lat: 28.2096, lng: 33.8116 }, // Red Sea area
      'West': { lat: 29.3084, lng: 25.1215 }, // Western Desert
      'Central': { lat: 27.1783, lng: 30.4279 }, // Middle Egypt
    };
    
    // Return predefined position or generate random position near Egypt
    return positions[region] || {
      lat: EGYPT_CENTER.lat + (Math.random() - 0.5) * 4,
      lng: EGYPT_CENTER.lng + (Math.random() - 0.5) * 4
    };
  };

  if (loadError) {
    return (
      <div className="h-[350px] bg-slate-50 rounded-lg flex items-center justify-center">
        <p className="text-red-500">Error loading maps. Please check your API key.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-[350px] bg-slate-50 rounded-lg flex items-center justify-center">
        <p>Loading maps...</p>
      </div>
    );
  }

  return (
    <div className="h-[350px] bg-slate-50 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
      <div className="absolute inset-0 p-4">
        <div className="h-full w-full relative border border-gray-200 rounded bg-slate-50">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={EGYPT_CENTER}
            zoom={DEFAULT_ZOOM * zoom}
            options={mapOptions}
            onClick={onMapClick}
            onLoad={onMapLoad}
          >
            {/* Display region circles */}
            {regionData.map((region) => {
              const position = getPositionForRegion(region.region);
              const isActive = activeRegion === region.region;
              
              return (
                <Circle 
                  key={region.region}
                  center={position}
                  options={getCircleOptionsForRegion(region, isActive)}
                  onClick={() => onRegionClick(region.region)}
                />
              );
            })}
            
            {/* Selected coordinates marker */}
            {selectedCoordinates && (
              <Marker
                position={selectedCoordinates}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor: '#DC2626',
                  fillOpacity: 0.9,
                  strokeColor: '#DC2626',
                  strokeOpacity: 1,
                  strokeWeight: 2,
                  scale: 8
                }}
                animation={google.maps.Animation.DROP}
                title={`Invoices: ${pointInvoiceCount || 'Loading...'}`}
              />
            )}
            
            {/* Map overlay to show loading or invoice count */}
            {selectedCoordinates && (
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-lg z-10 text-sm font-medium">
                {loadingPointData 
                  ? 'Loading data...' 
                  : pointInvoiceCount !== null 
                    ? `${pointInvoiceCount} Invoices at this location` 
                    : 'Click to load data'}
              </div>
            )}
          </GoogleMap>
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
