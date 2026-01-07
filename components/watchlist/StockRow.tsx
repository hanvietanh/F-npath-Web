
import React from 'react';
import { StockTicker } from '../../types';

interface StockRowProps {
  data: StockTicker;
}

export const StockRow: React.FC<StockRowProps> = ({ data }) => {
  // Helper to determine text color based on price vs reference
  const getColor = (price: number, ref: number, ceiling: number, floor: number) => {
    if (price === 0) return 'text-yellow-500';
    if (price === ceiling) return 'text-[#d946ef]'; // Purple
    if (price === floor) return 'text-[#0ea5e9]';   // Blue
    if (price > ref) return 'text-[#00c853]';       // Green
    if (price < ref) return 'text-[#f23645]';       // Red
    return 'text-yellow-500';                       // Yellow (Ref)
  };

  const closeColor = getColor(data.close, data.ref, data.ceiling, data.floor);
  
  // Helper to format numbers
  const fmt = (num: number) => num === 0 ? '' : num.toLocaleString();
  const fmtPrice = (num: number) => num === 0 ? '' : num.toFixed(2);

  return (
    <tr className="hover:bg-[#1c1c1e] transition-colors cursor-pointer group text-[11px] font-medium border-b border-[#1c1c1e]/30">
      {/* Symbol (Sticky Left) */}
      <td className={`pl-2 py-1.5 font-bold ${closeColor} sticky left-0 bg-[#000000] group-hover:bg-[#1c1c1e] z-10 border-r border-[#1c1c1e]`}>
        {data.symbol}
      </td>

      {/* Basic Prices */}
      <td className="text-right py-1.5 text-[#d946ef]">{fmtPrice(data.ceiling)}</td>
      <td className="text-right py-1.5 text-[#0ea5e9]">{fmtPrice(data.floor)}</td>
      <td className="text-right py-1.5 text-yellow-500 border-r border-[#1c1c1e] pr-2">{fmtPrice(data.ref)}</td>

      {/* Bid Side (Bên mua) */}
      <td className={`text-right py-1.5 ${getColor(data.bid3_price, data.ref, data.ceiling, data.floor)}`}>{fmtPrice(data.bid3_price)}</td>
      <td className={`text-right py-1.5 ${getColor(data.bid3_price, data.ref, data.ceiling, data.floor)}`}>{fmt(data.bid3_vol)}</td>
      
      <td className={`text-right py-1.5 ${getColor(data.bid2_price, data.ref, data.ceiling, data.floor)}`}>{fmtPrice(data.bid2_price)}</td>
      <td className={`text-right py-1.5 ${getColor(data.bid2_price, data.ref, data.ceiling, data.floor)}`}>{fmt(data.bid2_vol)}</td>
      
      <td className={`text-right py-1.5 ${getColor(data.bid1_price, data.ref, data.ceiling, data.floor)}`}>{fmtPrice(data.bid1_price)}</td>
      <td className={`text-right py-1.5 border-r border-[#1c1c1e] pr-2 ${getColor(data.bid1_price, data.ref, data.ceiling, data.floor)}`}>{fmt(data.bid1_vol)}</td>

      {/* Matched (Khớp lệnh) */}
      <td className={`text-right py-1.5 font-bold ${closeColor}`}>{fmtPrice(data.close)}</td>
      <td className={`text-right py-1.5 font-bold ${closeColor}`}>{fmt(data.matched_vol)}</td>
      <td className={`text-right py-1.5 border-r border-[#1c1c1e] pr-2 ${closeColor}`}>{data.change > 0 ? '+' : ''}{data.change.toFixed(2)}</td>

      {/* Ask Side (Bên bán) */}
      <td className={`text-right py-1.5 ${getColor(data.ask1_price, data.ref, data.ceiling, data.floor)}`}>{fmtPrice(data.ask1_price)}</td>
      <td className={`text-right py-1.5 ${getColor(data.ask1_price, data.ref, data.ceiling, data.floor)}`}>{fmt(data.ask1_vol)}</td>

      <td className={`text-right py-1.5 ${getColor(data.ask2_price, data.ref, data.ceiling, data.floor)}`}>{fmtPrice(data.ask2_price)}</td>
      <td className={`text-right py-1.5 ${getColor(data.ask2_price, data.ref, data.ceiling, data.floor)}`}>{fmt(data.ask2_vol)}</td>

      <td className={`text-right py-1.5 ${getColor(data.ask3_price, data.ref, data.ceiling, data.floor)}`}>{fmtPrice(data.ask3_price)}</td>
      <td className={`text-right py-1.5 border-r border-[#1c1c1e] pr-2 ${getColor(data.ask3_price, data.ref, data.ceiling, data.floor)}`}>{fmt(data.ask3_vol)}</td>

      {/* Stats */}
      <td className="text-right py-1.5 text-white">{fmt(data.total_vol)}</td>
      <td className={`text-right py-1.5 ${getColor(data.high, data.ref, data.ceiling, data.floor)}`}>{fmtPrice(data.high)}</td>
      <td className={`text-right py-1.5 ${getColor(data.avg, data.ref, data.ceiling, data.floor)}`}>{fmtPrice(data.avg)}</td>
      <td className={`text-right py-1.5 border-r border-[#1c1c1e] pr-2 ${getColor(data.low, data.ref, data.ceiling, data.floor)}`}>{fmtPrice(data.low)}</td>

      {/* Foreign */}
      <td className="text-right py-1.5 text-white">{fmt(data.foreign_buy)}</td>
      <td className="text-right py-1.5 pr-2 text-white">{fmt(data.foreign_sell)}</td>
    </tr>
  );
};
