
import React, { useState } from 'react';
import { SlidersHorizontal, BarChart2, Sparkles, Filter, X } from 'lucide-react';
import { LiquidityChart } from '../market/LiquidityChart';

const MiniIndexChart = ({ color, data }: { color: string, data: number[] }) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const height = 50;
    const width = 160;
    
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((d - min) / range) * height;
        return `${x},${y}`;
    }).join(' ');
    
    const fillPath = `${points} L ${width},${height} L 0,${height} Z`;

    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="overflow-visible">
            <defs>
                <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={fillPath} fill={`url(#grad-${color})`} stroke="none" />
            <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

const ImpactChart = () => {
    // Data matched from screenshot
    const data = [
      { s: 'VIC', v: 10.05 }, { s: 'VHM', v: 7.13 }, { s: 'VCB', v: 4.27 },
      { s: 'BID', v: 3.24 }, { s: 'GAS', v: 3.14 }, { s: 'CTG', v: 2.14 },
      { s: 'GVR', v: 1.74 }, { s: 'FPT', v: 1.32 }, { s: 'BSR', v: 1.32 },
      { s: 'HPG', v: 1.09 }, { s: 'VCK', v: -0.03 }, { s: 'CTD', v: -0.03 },
      { s: 'NVL', v: -0.07 }, { s: 'KDC', v: -0.11 }, { s: 'KDH', v: -0.12 },
      { s: 'VPX', v: -0.14 }, { s: 'VJC', v: -0.33 }, { s: 'GEE', v: -0.35 },
      { s: 'VPL', v: -0.90 }, { s: 'STB', v: -1.25 }
    ];
  
    const max = 11;
    const min = -2;
    const range = max - min;
    const zeroPercent = (max / range) * 100;

    return (
        <div className="flex-1 flex flex-col relative px-3 pt-8 pb-2 select-none h-full bg-[#0b0e11] rounded">
            {/* Legend */}
            <div className="absolute top-2 right-2 flex gap-3 text-[9px] font-medium z-10">
                <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#00c853]"></div> <span className="text-gray-400">Tác động tăng</span></div>
                <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#f23645]"></div> <span className="text-gray-400">Tác động giảm</span></div>
            </div>

            {/* Grid Lines */}
            <div className="absolute inset-0 top-8 bottom-5 left-8 right-2 pointer-events-none">
                 {[10, 5, 0, -2].map(val => {
                     const top = ((max - val) / range) * 100;
                     return (
                         <div key={val} className="absolute w-full border-t border-[#1c1c1e] border-dashed" style={{ top: `${top}%` }}>
                             <span className="absolute -left-6 -top-1.5 text-[8px] text-gray-600 text-right w-4">{val}</span>
                         </div>
                     );
                 })}
                 <div className="absolute w-full border-t border-gray-600 opacity-30" style={{ top: `${zeroPercent}%` }}></div>
            </div>

            {/* Bars */}
            <div className="flex-1 flex items-end justify-between gap-0.5 relative z-0 mt-2 mb-1 ml-6">
                {data.map((item, i) => {
                    const heightPct = (Math.abs(item.v) / range) * 100;
                    const isPos = item.v >= 0;
                    const bottomPos = isPos ? (Math.abs(min) / range) * 100 : (Math.abs(min) / range) * 100 - heightPct;

                    return (
                        <div key={i} className="flex-1 h-full relative group flex flex-col justify-end">
                            <div className="relative w-full h-full">
                                <div 
                                    className={`absolute w-full rounded-sm transition-all duration-300 group-hover:brightness-125 ${isPos ? 'bg-[#00c853] rounded-b-none' : 'bg-gradient-to-b from-[#f23645] to-[#b91c1c] rounded-t-none'}`}
                                    style={{
                                        height: `${heightPct}%`,
                                        bottom: `${bottomPos}%`
                                    }}
                                ></div>
                                <div className={`absolute w-full text-center text-[7px] font-mono text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity z-20 ${isPos ? '-top-3' : '-bottom-3'}`} style={{ bottom: isPos ? `${bottomPos + heightPct}%` : 'auto', top: !isPos ? `${100 - bottomPos}%` : 'auto' }}>
                                    {item.v}
                                </div>
                            </div>
                            <div className="text-[7px] text-gray-500 font-bold text-center truncate mt-1 group-hover:text-white transition-colors h-3">
                                {item.s}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export const WatchlistHeader = () => {
  const [activeTab, setActiveTab] = useState<'liquidity' | 'impact'>('impact');
  
  const indices = [
    { name: 'VN-INDEX', value: '1,788.40', change: 3.91, changePercent: 0.22, klgd: '857,826,791', gtgd: '25,530.728', up: 95, ref: 52, down: 223, color: '#00c853', status: 'Đóng cửa' },
    { name: 'VN30', value: '2,028.68', change: -1.95, changePercent: -0.10, klgd: '393,884,216', gtgd: '14,995.355', up: 7, ref: 1, down: 22, color: '#f23645', status: 'Đóng cửa' },
    { name: 'HNX-INDEX', value: '246.74', change: -2.03, changePercent: -0.82, klgd: '78,852,425', gtgd: '1,640.717', up: 53, ref: 68, down: 80, color: '#f23645', status: 'Đóng cửa' },
    { name: 'UPCOM', value: '119.94', change: -0.67, changePercent: -0.56, klgd: '21,723,897', gtgd: '268.3', up: 95, ref: 52, down: 223, color: '#f23645', status: 'Đóng cửa' },
  ];

  const chartData = [50, 52, 51, 54, 55, 54, 58, 62, 60, 65, 63, 66, 64, 68, 70, 69, 72, 75, 73, 78];
  const chartDataDown = [78, 75, 76, 72, 70, 71, 68, 65, 66, 62, 60, 58, 55, 52, 53, 50, 48, 45, 46, 42];

  return (
    <div className="flex flex-col bg-[#0b0e11] border-b border-[#1c1c1e] text-xs font-sans shrink-0">
      {/* Top Tabs */}
      <div className="flex items-center px-4 py-2 border-b border-[#1c1c1e] gap-4 bg-[#13171b]">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#2c2c2e] text-white rounded-full text-xs font-bold border border-[#3a3a3c] shadow-sm hover:bg-[#3a3a3c] transition-colors group">
              <SlidersHorizontal size={14} />
              <span>Bảng giá</span>
              <div className="bg-[#1c1c1e] rounded-full p-0.5 ml-1 text-gray-400 group-hover:text-white transition-colors">
                <X size={10} />
              </div>
          </button>
          <button className="flex items-center gap-2 px-2 py-1.5 text-gray-400 hover:text-white transition-colors font-medium">
              <BarChart2 size={16} />
              <span>Cơ hội đầu tư</span>
          </button>
          <button className="flex items-center gap-2 px-2 py-1.5 text-gray-400 hover:text-white transition-colors font-medium">
              <Sparkles size={16} />
              <span>Tín hiệu AI Bot</span>
          </button>
          <button className="flex items-center gap-2 px-2 py-1.5 text-gray-400 hover:text-white transition-colors font-medium">
              <Filter size={16} />
              <span>Lọc cổ phiếu</span>
          </button>
      </div>

      {/* Main Dashboard Area */}
      <div className="flex h-[200px]">
          {/* Left Charts Grid */}
          <div className="w-[65%] p-2 grid grid-cols-4 gap-2">
              {indices.map((idx, i) => (
                  <div key={i} className="bg-[#000000] border border-[#1c1c1e] rounded flex flex-col justify-between relative overflow-hidden group hover:border-[#2c2c2e] transition-colors">
                      <div className="absolute inset-x-0 bottom-8 h-20 opacity-30 pointer-events-none">
                          <MiniIndexChart color={idx.color} data={idx.color === '#00c853' ? chartData : chartDataDown} />
                      </div>
                      
                      <div className="relative z-10 p-3 flex flex-col h-full justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-gray-300 text-[11px]">{idx.name}</span>
                                <span className="text-[9px] text-gray-500 bg-[#1c1c1e] px-1 rounded">{idx.status}</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className={`text-lg font-bold tracking-tight ${idx.color === '#00c853' ? 'text-[#00c853]' : 'text-[#f23645]'}`}>
                                    {idx.value}
                                </span>
                            </div>
                            <div className={`text-[10px] font-medium flex items-center gap-1 ${idx.color === '#00c853' ? 'text-[#00c853]' : 'text-[#f23645]'}`}>
                                {idx.change > 0 ? '▲' : '▼'} {Math.abs(idx.change)} ({Math.abs(idx.changePercent)}%)
                            </div>
                          </div>

                          <div className="border-t border-[#1c1c1e] pt-2 mt-2">
                               <div className="flex justify-between items-center text-[10px] mb-1">
                                   <span className="text-gray-500">KLGD</span>
                                   <span className="text-gray-300 font-mono">{idx.klgd}</span>
                               </div>
                               <div className="flex justify-between items-center text-[10px] mb-2">
                                   <span className="text-gray-500">GTGD</span>
                                   <span className="text-gray-300 font-mono">{idx.gtgd}</span>
                               </div>
                               
                               <div className="flex h-1.5 rounded-full overflow-hidden w-full bg-[#1c1c1e]">
                                   <div style={{ width: `${(idx.up / (idx.up + idx.ref + idx.down)) * 100}%` }} className="bg-[#00c853]"></div>
                                   <div style={{ width: `${(idx.ref / (idx.up + idx.ref + idx.down)) * 100}%` }} className="bg-yellow-500"></div>
                                   <div style={{ width: `${(idx.down / (idx.up + idx.ref + idx.down)) * 100}%` }} className="bg-[#f23645]"></div>
                               </div>
                               <div className="flex justify-between text-[9px] mt-1 font-medium">
                                   <span className="text-[#00c853]">{idx.up}</span>
                                   <span className="text-yellow-500">{idx.ref}</span>
                                   <span className="text-[#f23645]">{idx.down}</span>
                               </div>
                          </div>
                      </div>
                  </div>
              ))}
          </div>

          {/* Right Panel with Tabs - HEIGHT ADJUSTED TO MATCH CARDS */}
          {/* Parent container has padding to match left side's padding, ensuring inner div height equals left cards height */}
          <div className="w-[35%] p-2 flex flex-col border-l border-[#1c1c1e]">
              <div className="flex-1 bg-[#0b0e11] border border-[#1c1c1e] rounded relative flex flex-col overflow-hidden">
                  
                  {/* Tab Switcher in Top Left */}
                  <div className="absolute top-2 left-3 z-30 flex items-center">
                      <button 
                         onClick={() => setActiveTab('liquidity')} 
                         className={`text-[10px] font-bold uppercase transition-colors mr-2 ${activeTab === 'liquidity' ? 'text-[#2962ff]' : 'text-gray-500 hover:text-gray-300'}`}
                      >
                         Thanh khoản
                      </button>
                      <span className="text-gray-600 text-[10px] mr-2">|</span>
                      <button 
                         onClick={() => setActiveTab('impact')} 
                         className={`text-[10px] font-bold uppercase transition-colors ${activeTab === 'impact' ? 'text-[#2962ff]' : 'text-gray-500 hover:text-gray-300'}`}
                      >
                         Tác động Index
                      </button>
                  </div>

                  <div className="flex-1 w-full h-full">
                      {activeTab === 'impact' ? (
                          <ImpactChart />
                      ) : (
                          <LiquidityChart isCompact showTitle={false} className="bg-transparent" />
                      )}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};
