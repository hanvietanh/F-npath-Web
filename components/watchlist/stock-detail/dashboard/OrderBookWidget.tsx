
import React, { useState, useEffect } from 'react';
import { Layers, Activity, BarChart2 } from 'lucide-react';
import { orderBookData, initialLiveTape, Trade } from '../stockDetailConstants';

export const OrderBookWidget: React.FC = () => {
  const [liveTape, setLiveTape] = useState<Trade[]>(initialLiveTape);

  // Mock data for Price Levels (Distribution)
  const priceLevels = [
    { price: 28.60, buy: 12500, sell: 8000, unknown: 1000, total: 21500, pct: 2.72 },
    { price: 28.55, buy: 35000, sell: 22000, unknown: 5000, total: 62000, pct: 7.87 },
    { price: 28.50, buy: 180000, sell: 60000, unknown: 10000, total: 250000, pct: 31.65 }, // Current/Ref
    { price: 28.45, buy: 40000, sell: 55000, unknown: 2000, total: 97000, pct: 12.28 },
    { price: 28.40, buy: 15000, sell: 25000, unknown: 1000, total: 41000, pct: 5.19 },
    { price: 28.35, buy: 5000, sell: 12000, unknown: 500, total: 17500, pct: 2.21 },
    { price: 28.30, buy: 2000, sell: 8000, unknown: 0, total: 10000, pct: 1.26 },
    { price: 28.25, buy: 1000, sell: 15000, unknown: 0, total: 16000, pct: 2.02 },
    { price: 28.20, buy: 500, sell: 45000, unknown: 0, total: 45500, pct: 5.76 },
  ];
  const maxVol = Math.max(...priceLevels.map(p => p.total));

  useEffect(() => {
    const interval = setInterval(() => {
      const newTrade: Trade = {
        time: new Date().toLocaleTimeString('vi-VN', { hour12: false }).slice(0, 8),
        price: (28.50 + (Math.random() - 0.5) * 0.1).toFixed(2),
        vol: Math.floor(Math.random() * 60000) + 100,
        side: Math.random() > 0.5 ? 'M' : 'B',
        big: false
      };
      newTrade.big = newTrade.vol > 50000;
      setLiveTape(prev => [newTrade, ...prev].slice(0, 15));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="w-[22%] border-r border-gray-800 flex flex-col min-w-[250px] overflow-hidden">
        {/* TOP: Sổ lệnh */}
        <div className="p-2 border-b border-gray-800 shrink-0">
            <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-gray-400 flex items-center gap-1"><Layers size={12}/> SỔ LỆNH</h3>
            <span className="text-[10px] text-gray-500">x10</span>
            </div>
            <div className="grid grid-cols-3 text-[10px] text-gray-500 mb-1 px-1">
            <span>Mua</span><span className="text-center">Giá</span><span className="text-right">Bán</span>
            </div>
            <div className="flex flex-col-reverse gap-[1px]">
            {orderBookData.asks.map((item, idx) => (
                <div key={idx} className="relative h-5 flex items-center text-[11px] group hover:bg-[#1e2530] cursor-pointer">
                <div className="absolute right-0 top-0 bottom-0 bg-red-900/20 z-0" style={{ width: `${item.percent}%` }}></div>
                <div className="grid grid-cols-3 w-full relative z-10 px-1 font-mono">
                    <span></span><span className="text-center text-red-400 font-medium">{item.price.toFixed(2)}</span><span className="text-right text-gray-300">{ (item.vol/1000).toFixed(1) }k</span>
                </div>
                </div>
            ))}
            </div>
            <div className="py-0.5 my-1 bg-[#1e2530] border-y border-gray-700 text-center font-bold text-emerald-400 text-sm">28.50</div>
            <div className="flex flex-col gap-[1px]">
            {orderBookData.bids.map((item, idx) => (
                <div key={idx} className="relative h-5 flex items-center text-[11px] group hover:bg-[#1e2530] cursor-pointer">
                <div className="absolute left-0 top-0 bottom-0 bg-emerald-900/20 z-0" style={{ width: `${item.percent}%` }}></div>
                <div className="grid grid-cols-3 w-full relative z-10 px-1 font-mono">
                    <span className="text-gray-300">{ (item.vol/1000).toFixed(1) }k</span><span className="text-center text-emerald-400 font-medium">{item.price.toFixed(2)}</span><span></span>
                </div>
                </div>
            ))}
            </div>
            {/* Thanh tỷ lệ */}
            <div className="mt-2">
            <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden flex">
                <div className="h-full bg-emerald-500 w-[65%] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <div className="h-full bg-red-500 w-[35%]"></div>
            </div>
            </div>
        </div>

        {/* MIDDLE: Khớp lệnh (Live Tape) - Reduced Height */}
        <div className="h-[25%] flex flex-col border-b border-gray-800 min-h-[150px]">
            <div className="p-2 bg-[#101317] border-b border-gray-800 sticky top-0 flex justify-between items-center">
                <h3 className="font-bold text-gray-400 text-[11px] flex items-center gap-1"><Activity size={12}/> KHỚP LỆNH</h3>
            </div>
            <div className="overflow-y-auto flex-1 p-1 custom-scrollbar">
            <table className="w-full text-[11px] font-mono border-collapse">
                <tbody>
                {liveTape.map((trade, idx) => (
                    <tr key={idx} className={`${trade.big ? 'bg-[#1f2937]' : ''} hover:bg-gray-800 border-b border-gray-800/50 last:border-0`}>
                    <td className="p-1 text-gray-500">{trade.time}</td>
                    <td className={`p-1 font-bold text-right ${Number(trade.price) >= 28.50 ? 'text-emerald-400' : 'text-red-400'}`}>{trade.price}</td>
                    <td className="p-1 text-right text-white">
                        {trade.big && <span className="mr-1 text-xs">🦈</span>}
                        {trade.vol.toLocaleString()}
                        <span className={`ml-1 text-[9px] ${trade.side === 'M' ? 'text-emerald-500' : 'text-red-500'}`}>{trade.side}</span>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>

        {/* BOTTOM: Price Level Chart (Biểu đồ mức giá) */}
        <div className="flex-1 flex flex-col min-h-0 bg-[#0b0e11]">
            {/* Header & Legend */}
            <div className="px-2 py-2 border-b border-gray-800 shrink-0">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1"><BarChart2 size={12}/> MỨC GIÁ</span>
                </div>
                <div className="flex items-center gap-3 text-[9px] font-medium text-gray-500">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-[1px] bg-[#00c853]"></div> Mua</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-[1px] bg-[#f23645]"></div> Bán</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-[1px] bg-gray-600"></div> K.XĐ</div>
                </div>
            </div>
            
            {/* Table Header */}
            <div className="grid grid-cols-12 px-2 py-1 text-[9px] text-gray-500 font-bold border-b border-gray-800 bg-[#101317] shrink-0">
                <div className="col-span-2">Giá</div>
                <div className="col-span-6"></div>
                <div className="col-span-4 text-right">Tổng KL / %</div>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
                {priceLevels.map((level, i) => (
                    <div key={i} className="grid grid-cols-12 items-center text-[10px] py-1 hover:bg-[#1c1c1e] mb-0.5 group">
                        {/* Price */}
                        <div className={`col-span-2 font-bold font-mono ${level.price === 28.50 ? 'text-yellow-500' : level.price > 28.50 ? 'text-[#00c853]' : 'text-[#f23645]'}`}>
                            {level.price.toFixed(2)}
                        </div>
                        
                        {/* Bars */}
                        <div className="col-span-6 h-3 bg-gray-800/20 rounded-sm relative flex items-center">
                            {/* Stacked Bars representing volume */}
                            <div className="h-full bg-[#00c853]" style={{ width: `${(level.buy / maxVol) * 100}%` }}></div>
                            <div className="h-full bg-[#f23645]" style={{ width: `${(level.sell / maxVol) * 100}%` }}></div>
                            <div className="h-full bg-gray-600" style={{ width: `${(level.unknown / maxVol) * 100}%` }}></div>
                        </div>

                        {/* Volume & % */}
                        <div className="col-span-4 text-right flex justify-end gap-1 items-baseline">
                            <span className="text-gray-300 font-mono">{(level.total/1000).toFixed(1)}k</span>
                            <span className="text-gray-500 text-[9px] w-8 text-right">{level.pct}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </aside>
  );
};
