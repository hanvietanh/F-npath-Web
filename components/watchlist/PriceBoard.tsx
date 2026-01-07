
import React from 'react';
import { FilterBar } from './FilterBar';
import { PriceTable } from './PriceTable';
import { WatchlistHeader } from './WatchlistHeader';

export const PriceBoard: React.FC = () => {
  return (
    <div className="flex flex-col h-full w-full bg-[#000000]">
      {/* Top Header & Dashboard */}
      <WatchlistHeader />
      
      {/* Controls */}
      <FilterBar />

      {/* Main Table */}
      <PriceTable />
    </div>
  );
};
