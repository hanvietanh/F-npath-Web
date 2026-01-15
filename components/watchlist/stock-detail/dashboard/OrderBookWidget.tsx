
import React, { useState, useEffect } from 'react';
import { Layers, Activity } from 'lucide-react';
import { orderBookData, initialLiveTape, Trade } from '../stockDetailConstants';

export const OrderBookWidget: React.FC = () => {
  const [liveTape, setLiveTape] = useState<Trade[]>(initialLiveTape);

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
    <aside className="w-[22%] border-r border-gray-800 flex flex-col min-w-[250px] overflow-y-auto custom-scrollbar">
        {/* Sổ lệnh */}
        <div className="p-2 border-b border-gray-800">
            <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-gray-400 flex items-center gap-1"><Layers size={12}/> SỔ LỆNH</h3>
            <span className="text-[10px] text-gray-500">x10</span>
            </div>
            <div className="grid grid-cols-3 text-[10px] text-gray-500 mb-1 px-1">
            <span>Mua</span><span className="text-center">Giá</span><span className="text-right">Bán</span>
            </div>
            <div className="flex flex-col-reverse gap-[1px]">
            {orderBookData.asks.map((item, idx) => (
                <div key={idx} className="relative h-6 flex items-center text-[11px] group hover:bg-[#1e2530] cursor-pointer">
                <div className="absolute right-0 top-0 bottom-0 bg-red-900/20 z-0" style={{ width: `${item.percent}%` }}></div>
                <div className="grid grid-cols-3 w-full relative z-10 px-1 font-mono">
                    <span></span><span className="text-center text-red-400 font-medium">{item.price.toFixed(2)}</span><span className="text-right text-gray-300">{ (item.vol/1000).toFixed(1) }k</span>
                </div>
                </div>
            ))}
            </div>
            <div className="py-1 my-1 bg-[#1e2530] border-y border-gray-700 text-center font-bold text-emerald-400 text-sm">28.50</div>
            <div className="flex flex-col gap-[1px]">
            {orderBookData.bids.map((item, idx) => (
                <div key={idx} className="relative h-6 flex items-center text-[11px] group hover:bg-[#1e2530] cursor-pointer">
                <div className="absolute left-0 top-0 bottom-0 bg-emerald-900/20 z-0" style={{ width: `${item.percent}%` }}></div>
                <div className="grid grid-cols-3 w-full relative z-10 px-1 font-mono">
                    <span className="text-gray-300">{ (item.vol/1000).toFixed(1) }k</span><span className="text-center text-emerald-400 font-medium">{item.price.toFixed(2)}</span><span></span>
                </div>
                </div>
            ))}
            </div>
            {/* Thanh tỷ lệ */}
            <div className="mt-3">
            <div className="flex justify-between text-[10px] mb-1 font-bold">
                <span className="text-emerald-500">T.Mua: 65%</span>
                <span className="text-red-500">35% :T.Bán</span>
            </div>
            <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden flex">
                <div className="h-full bg-emerald-500 w-[65%] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <div className="h-full bg-red-500 w-[35%]"></div>
            </div>
            </div>
        </div>

        {/* Khớp lệnh (Live Tape) */}
        <div className="flex-1 flex flex-col min-h-0 border-b border-gray-800">
            <div className="p-2 bg-[#101317] border-b border-gray-800 sticky top-0">
            <h3 className="font-bold text-gray-400 text-[11px] flex items-center gap-1"><Activity size={12}/> KHỚP LỆNH (LIVE)</h3>
            </div>
            <div className="overflow-y-auto flex-1 p-1">
            <table className="w-full text-[11px] font-mono border-collapse">
                <tbody>
                {liveTape.map((trade, idx) => (
                    <tr key={idx} className={`${trade.big ? 'bg-[#1f2937]' : ''} hover:bg-gray-800 border-b border-gray-800/50`}>
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
    </aside>
  );
};
