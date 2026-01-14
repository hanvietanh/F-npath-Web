
import React, { useState, useEffect } from 'react';
import { StockTicker } from '../../types';
import { StockRow } from './StockRow';
import { generateMockTickers } from './watchlistConstants';

interface PriceTableProps {
    onStockClick?: (symbol: string) => void;
}

export const PriceTable: React.FC<PriceTableProps> = ({ onStockClick }) => {
  const [data, setData] = useState<StockTicker[]>([]);

  useEffect(() => {
    setData(generateMockTickers());
  }, []);

  return (
    <div className="flex-1 overflow-auto bg-[#000000] custom-scrollbar">
      <table className="w-full border-collapse min-w-[1200px]">
        <thead className="bg-[#13171b] text-[10px] text-gray-400 font-semibold uppercase sticky top-0 z-20 shadow-sm">
          {/* Header Row 1: Groups */}
          <tr>
            <th rowSpan={2} className="p-2 border border-[#2c2c2e] sticky left-0 bg-[#13171b] z-30 w-16 text-center text-white">Mã CK</th>
            <th colSpan={3} className="p-1 border border-[#2c2c2e] text-center">Giá</th>
            <th colSpan={6} className="p-1 border border-[#2c2c2e] text-center bg-[#0b0e11]">Bên Mua</th>
            <th colSpan={3} className="p-1 border border-[#2c2c2e] text-center bg-[#1a1f26]">Khớp Lệnh</th>
            <th colSpan={6} className="p-1 border border-[#2c2c2e] text-center bg-[#0b0e11]">Bên Bán</th>
            <th colSpan={4} className="p-1 border border-[#2c2c2e] text-center">Giá</th>
            <th colSpan={2} className="p-1 border border-[#2c2c2e] text-center">Nước Ngoài</th>
          </tr>
          
          {/* Header Row 2: Columns */}
          <tr>
            {/* Prices */}
            <th className="py-1 px-1 border border-[#2c2c2e] text-center text-[#d946ef] w-12">Trần</th>
            <th className="py-1 px-1 border border-[#2c2c2e] text-center text-[#0ea5e9] w-12">Sàn</th>
            <th className="py-1 px-1 border border-[#2c2c2e] text-center text-yellow-500 w-12">TC</th>

            {/* Bid Side */}
            <th className="py-1 px-1 border border-[#2c2c2e] text-center w-12 bg-[#0b0e11]">Giá 3</th>
            <th className="py-1 px-1 border border-[#2c2c2e] text-center w-14 bg-[#0b0e11]">KL 3</th>
            <th className="py-1 px-1 border border-[#2c2c2e] text-center w-12 bg-[#0b0e11]">Giá 2</th>
            <th className="py-1 px-1 border border-[#2c2c2e] text-center w-14 bg-[#0b0e11]">KL 2</th>
            <th className="py-1 px-1 border border-[#2c2c2e] text-center w-12 bg-[#0b0e11]">Giá 1</th>
            <th className="py-1 px-1 border border-[#2c2c2e] text-center w-14 bg-[#0b0e11]">KL 1</th>

            {/* Matched */}
            <th className="py-1 px-1 border border-[#2c2c2e] text-center w-12 bg-[#1a1f26] text-white">Giá</th>
            <th className="py-1 px-1 border border-[#2c2c2e] text-center w-14 bg-[#1a1f26] text-white">KL</th>
            <th className="py-1 px-1 border border-[#2c2c2e] text-center w-12 bg-[#1a1f26] text-white">+/-</th>

             {/* Ask Side */}
            <th className="py-1 px-1 border border-[#2c2c2e] text-center w-12 bg-[#0b0e11]">Giá 1</th>
            <th className="py-1 px-1 border border-[#2c2c2e] text-center w-14 bg-[#0b0e11]">KL 1</th>
            <th className="py-1 px-1 border border-[#2c2c2e] text-center w-12 bg-[#0b0e11]">Giá 2</th>
            <th className="py-1 px-1 border border-[#2c2c2e] text-center w-14 bg-[#0b0e11]">KL 2</th>
            <th className="py-1 px-1 border border-[#2c2c2e] text-center w-12 bg-[#0b0e11]">Giá 3</th>
            <th className="py-1 px-1 border border-[#2c2c2e] text-center w-14 bg-[#0b0e11]">KL 3</th>

            {/* Stats */}
            <th className="py-1 px-1 border border-[#2c2c2e] text-center w-16">Tổng KL</th>
            <th className="py-1 px-1 border border-[#2c2c2e] text-center w-12">Cao</th>
            <th className="py-1 px-1 border border-[#2c2c2e] text-center w-12">TB</th>
            <th className="py-1 px-1 border border-[#2c2c2e] text-center w-12">Thấp</th>

            {/* Foreign */}
            <th className="py-1 px-1 border border-[#2c2c2e] text-center w-14">Mua</th>
            <th className="py-1 px-1 border border-[#2c2c2e] text-center w-14">Bán</th>
          </tr>
        </thead>
        <tbody className="font-mono text-gray-200">
          {data.map((ticker) => (
            <StockRow key={ticker.symbol} data={ticker} onClick={onStockClick} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
