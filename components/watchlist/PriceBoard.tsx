
import React from 'react';
import { FilterBar } from './FilterBar';
import { PriceTable } from './PriceTable';
import { IndicesTickerRow } from '../MarketCommon';

export const PriceBoard: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = React.useState('VNINDEX');

  return (
    <div className="flex flex-col h-full w-full bg-[#000000]">
      {/* Top Ticker Summary */}
      <IndicesTickerRow selected={selectedIndex} onSelect={setSelectedIndex} />
      
      {/* Controls */}
      <FilterBar />

      {/* Main Table */}
      <PriceTable />
    </div>
  );
};
