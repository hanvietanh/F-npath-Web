import React from 'react';
import { Zap } from 'lucide-react';
import { IMPACT_DATA } from '../mockData';

export const ImpactChart = () => {
  const maxVal = 10;
  const minVal = -4;
  const totalRange = maxVal - minVal; 
  const zeroPosPercent = (Math.abs(minVal) / totalRange) * 100; 

  return (
    <div className="flex-1 w-full h-full bg-[#000000] relative flex flex-col pt-8 pb-4 px-4 select-none">
        {/* Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
           <div className="flex items-center gap-2 text-6xl font-bold text-white">
              <Zap size={60} /> Finpath
           </div>
        </div>

        {/* Y-axis Grid & Labels */}
        <div className="absolute inset-0 pointer-events-none">
            {[10, 8, 6, 4, 2, 0, -2, -4].map(val => {
                const bottomPct = ((val - minVal) / totalRange) * 100;
                return (
                    <div 
                        key={val} 
                        className="absolute w-full border-t border-[#1c1c1e] border-dashed flex items-center"
                        style={{ bottom: `${bottomPct}%`, left: 0, right: 0 }}
                    >
                         <span className="absolute -left-0 -translate-y-1/2 text-[10px] text-gray-500 w-6 text-right pr-1">{val}</span>
                    </div>
                );
            })}
        </div>
        
        {/* Title */}
        <div className="absolute top-2 left-8 text-xs text-gray-400">Điểm</div>
        
        {/* Legend */}
        <div className="absolute top-2 right-4 flex gap-4 text-xs font-medium z-10">
             <div className="flex items-center gap-1.5">
                 <div className="w-2 h-2 rounded-full bg-[#00c853]"></div>
                 <span className="text-gray-300">Tác động tăng</span>
             </div>
             <div className="flex items-center gap-1.5">
                 <div className="w-2 h-2 rounded-full bg-[#f23645]"></div>
                 <span className="text-gray-300">Tác động giảm</span>
             </div>
        </div>

        {/* Chart Bars */}
        <div className="flex-1 flex items-end justify-between ml-8 relative z-10 h-full gap-1">
            {IMPACT_DATA.map((item) => {
                const heightPct = (Math.abs(item.val) / totalRange) * 100;
                return (
                    <div key={item.symbol} className="flex-1 h-full relative group flex flex-col justify-end">
                         {/* Bar */}
                         <div 
                            className={`absolute w-full rounded-t-sm transition-all hover:brightness-110 ${item.val >= 0 ? 'bg-gradient-to-t from-[#00c853]/50 to-[#00c853]' : 'bg-gradient-to-b from-[#f23645]/50 to-[#f23645] rounded-b-sm rounded-t-none'}`}
                            style={{
                                height: `${heightPct}%`,
                                bottom: item.val >= 0 ? `${zeroPosPercent}%` : 'auto',
                                top: item.val < 0 ? `${100 - zeroPosPercent}%` : 'auto'
                            }}
                         >
                            {/* Value Label */}
                            <div className={`
                                absolute w-full text-center text-[9px] text-gray-400 font-mono
                                ${item.val >= 0 ? '-top-4' : '-bottom-4'}
                            `}>
                                {item.val}
                            </div>
                         </div>
                         
                         {/* X-Axis Label */}
                         <div className="absolute bottom-[-18px] w-full text-center text-[9px] text-gray-400 font-bold truncate">
                             {item.symbol}
                         </div>

                         {/* Tooltip */}
                         <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-1/2 left-1/2 -translate-x-1/2 bg-[#1c1c1e] border border-[#2c2c2e] p-2 rounded shadow-xl z-50 pointer-events-none whitespace-nowrap">
                             <div className="font-bold text-white">{item.symbol}</div>
                             <div className={`${item.val >= 0 ? 'text-[#00c853]' : 'text-[#f23645]'}`}>
                                 {item.val > 0 ? '+' : ''}{item.val} điểm
                             </div>
                         </div>
                    </div>
                )
            })}
        </div>
        
        {/* Zero Line Highlight */}
        <div className="absolute w-full border-t border-gray-500 opacity-50" style={{ bottom: `${zeroPosPercent}%`, left: 0 }}></div>
    </div>
  );
};