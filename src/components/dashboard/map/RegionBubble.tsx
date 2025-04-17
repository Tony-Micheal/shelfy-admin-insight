
import React from 'react';

type RegionData = {
  region: string;
  invoices: number;
  color?: string;
};

type RegionBubbleProps = {
  region: RegionData;
  position: Record<string, string>;
  isActive: boolean;
  maxInvoices: number;
  viewMode: '2d' | '3d';
  onClick: (region: string) => void;
};

const RegionBubble = ({ 
  region, 
  position, 
  isActive, 
  maxInvoices, 
  viewMode,
  onClick 
}: RegionBubbleProps) => {
  const size = 30 + (region.invoices / maxInvoices) * 40;
  
  return (
    <div 
      className={`absolute flex items-center justify-center rounded-full transition-all duration-300 hover:shadow-lg ${
        isActive ? 'ring-2 ring-offset-2 ring-purple-500 z-10' : ''
      }`}
      style={{
        ...position,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: region.color || '#6366F1',
        opacity: isActive ? 1 : 0.8,
        zIndex: isActive ? 10 : 5,
        transform: viewMode === '3d' ? `${position.transform || ''} translateZ(${isActive ? 20 : 0}px)` : position.transform || ''
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(region.region);
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
};

export default RegionBubble;
