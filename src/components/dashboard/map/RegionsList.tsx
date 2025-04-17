
import React from 'react';

type RegionData = {
  region: string;
  invoices: number;
  color?: string;
};

type RegionsListProps = {
  regions: RegionData[];
  activeRegion: string | null;
  maxInvoices: number;
  onRegionClick: (region: string) => void;
};

const RegionsList = ({ regions, activeRegion, maxInvoices, onRegionClick }: RegionsListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-2">
      {regions.map((region, index) => (
        <div 
          key={index} 
          className={`text-center transition-all duration-300 ${
            activeRegion === region.region ? 'scale-105 font-bold' : ''
          }`}
          onClick={() => onRegionClick(region.region)}
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
  );
};

export default RegionsList;
