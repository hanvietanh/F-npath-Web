
import React, { useState } from 'react';
import { FilterBar } from './FilterBar';
import { PriceTable } from './PriceTable';
import { WatchlistHeader } from './WatchlistHeader';
import { StockDetailSuperPopup } from './StockDetailSuperPopup';

export const PriceBoard: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full w-full bg-[#000000] relative">
      
      {/* Super Popup (Overlay) */}
      {selectedSymbol && (
          <StockDetailSuperPopup 
              symbol={selectedSymbol} 
              onClose={() => setSelectedSymbol(null)} 
          />
      )}

      {/* Top Header & Dashboard */}
      <WatchlistHeader />
      
      {/* Controls */}
      <FilterBar />

      {/* Main Table */}
      <PriceTable onStockClick={setSelectedSymbol} />
    </div>
  );
};
