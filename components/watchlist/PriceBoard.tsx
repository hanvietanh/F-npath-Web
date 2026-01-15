import React from 'react';
import { FilterBar } from './FilterBar';
import { PriceTable } from './PriceTable';
import { WatchlistHeader } from './WatchlistHeader';

interface PriceBoardProps {
    onSymbolClick?: (symbol: string) => void;
}

export const PriceBoard: React.FC<PriceBoardProps> = ({ onSymbolClick }) => {
  return (
    <div className="flex flex-col h-full w-full bg-[#000000] relative">
      
      {/* Top Header & Dashboard */}
      <WatchlistHeader />
      
      {/* Controls */}
      <FilterBar />

      {/* Main Table */}
      <PriceTable onStockClick={onSymbolClick} />
    </div>
  );
};