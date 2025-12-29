import React from 'react';
import { Zap } from 'lucide-react';
import { IMPACT_DATA } from './mockData';

export const TreemapBlock = ({ symbol, percent, color, className }: { symbol: string, percent: string, color: string, className?: string }) => (
  <div 
    className={`relative flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer overflow-hidden p-1 transition-all ${className}`} 
    style={{ backgroundColor: color }}
  >
    <span className="font-bold text-white text-xs md:text-sm drop-shadow-md truncate">{symbol}</span>
    <span className="text-white/90 text-[10px] md:text-xs font-bold">{percent}</span>
  </div>
);

export const LiquidityChart = () => {
    // Time labels based on screenshot
    const timeLabels = ["09:15", "09:26", "09:37", "09:48", "09:59", "10:10", "10:21", "10:32", "10:43", "10:54", "11:05", "11:16", "11:27", "13:07", "13:18", "13:29", "13:40", "13:51", "14:02", "14:13", "14:24", "14:35"];
    
    // Y Axis labels
    const yLabels = [35000, 30000, 25000, 20000, 15000, 10000, 5000, 0];
    
    // We need SVG coordinates.
    // Width 100%, Height 100%. Internal viewBox 0 0 1000 400.
    const width = 1000;
    const height = 400;
    const padding = { top: 40, right: 20, bottom: 30, left: 50 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    // Yesterday Data (Yellow)
    const yesterdayPoints = [];
    let yVal = 1500;
    for(let i=0; i <= 210; i++) { // 210 points
        yVal += (Math.random() * 150 + 50); // Increment
        if (i > 100 && i < 130) yVal += 50; // Lunch break or bump?
        yesterdayPoints.push({ x: (i / 210) * chartW, y: Math.min(yVal, 33000) });
    }
    
    // Today Data (Blue) - Only goes part way
    const todayPoints = [];
    let tVal = 500;
    for(let i=0; i <= 85; i++) { // Stops around 40% of the way
        tVal += (Math.random() * 100 + 20);
        todayPoints.push({ x: (i / 210) * chartW, y: tVal });
    }

    const getY = (val: number) => chartH - (val / 35000) * chartH;

    const makePath = (points: {x: number, y: number}[]) => {
        return points.map((p, i) => `${i===0?'M':'L'} ${padding.left + p.x},${padding.top + getY(p.y)}`).join(' ');
    };
    
    const makeArea = (points: {x: number, y: number}[]) => {
        const line = makePath(points);
        const lastX = padding.left + points[points.length-1].x;
        const bottomY = padding.top + chartH;
        const firstX = padding.left + points[0].x;
        return `${line} L ${lastX},${bottomY} L ${firstX},${bottomY} Z`;
    };

    return (
        <div className="flex-1 w-full h-full bg-[#000000] relative flex flex-col p-4 select-none">
             {/* Header / Legend */}
             <div className="flex items-center justify-between mb-2">
                 <div className="text-xs text-gray-400 font-bold">GTGD (Tỷ)</div>
                 <div className="flex items-center gap-4 text-xs font-bold">
                     <div className="flex items-center gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-[#2962ff]"></div>
                         <span className="text-white">GTGD hôm nay</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-[#ffab00]"></div>
                         <span className="text-white">GTGD Hôm qua</span>
                     </div>
                 </div>
                 <div className="flex bg-[#1c1c1e] rounded text-[10px] font-bold overflow-hidden border border-[#2c2c2e]">
                     {['0D', '5D', '10D', '20D'].map(d => (
                         <button key={d} className={`px-2 py-1 ${d === '0D' ? 'bg-[#2962ff] text-white' : 'text-gray-400 hover:text-white'}`}>{d}</button>
                     ))}
                 </div>
             </div>

             {/* Chart */}
             <div className="flex-1 relative">
                <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2962ff" stopOpacity="0.4"/>
                            <stop offset="100%" stopColor="#2962ff" stopOpacity="0.05"/>
                        </linearGradient>
                    </defs>

                    {/* Grid Lines */}
                    {yLabels.map((val) => {
                        const y = padding.top + getY(val);
                        return (
                            <g key={val}>
                                <line x1={padding.left} y1={y} x2={width} y2={y} stroke="#1c1c1e" strokeWidth="1" strokeDasharray="4 4" />
                                <text x={0} y={y + 4} fill="#6b7280" fontSize="11" textAnchor="start">{val.toLocaleString()}</text>
                            </g>
                        )
                    })}

                    {/* Yesterday Line */}
                    <path d={makePath(yesterdayPoints)} fill="none" stroke="#ffab00" strokeWidth="2" />
                    
                    {/* Today Area & Line */}
                    <path d={makeArea(todayPoints)} fill="url(#blueGradient)" />
                    <path d={makePath(todayPoints)} fill="none" stroke="#2962ff" strokeWidth="2" />

                    {/* X Axis Labels */}
                    {timeLabels.map((t, i) => {
                        const x = padding.left + (i / (timeLabels.length - 1)) * chartW;
                        return (
                             <text key={i} x={x} y={height - 5} fill="#6b7280" fontSize="11" textAnchor="middle">{t}</text>
                        )
                    })}
                </svg>
                
                {/* Overlay Text Logo */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                   <div className="flex items-center gap-2 text-6xl font-bold text-white">
                      <Zap size={60} /> Finpath
                   </div>
                </div>
             </div>
        </div>
    )
}

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

export const ForeignMarketDashboard = () => {
    return (
        <div className="flex-1 flex flex-col min-h-0 bg-[#000000] text-white overflow-hidden">
            {/* Top Section: Overview Stats + Chart */}
            <div className="h-[220px] flex border-b border-[#1c1c1e] shrink-0">
                {/* Left: Stats */}
                <div className="w-[30%] border-r border-[#1c1c1e] p-4 flex flex-col justify-center gap-6">
                    <h3 className="text-base font-bold text-white mb-2">Tổng quan</h3>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Mua</span>
                        <div className="text-right">
                            <div className="font-mono font-bold text-[#00c853]">37,802,230</div>
                            <div className="font-mono text-xs text-[#00c853]">1,659.0 tỷ</div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Bán</span>
                        <div className="text-right">
                            <div className="font-mono font-bold text-[#f23645]">38,603,794</div>
                            <div className="font-mono text-xs text-[#f23645]">1,406.1 tỷ</div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-[#1c1c1e]">
                        <span className="text-gray-400 text-sm">Mua - Bán</span>
                        <div className="text-right">
                            <div className="font-mono font-bold text-[#f23645]">-801,564</div>
                            <div className="font-mono text-xs text-[#00c853]">252.8 tỷ</div>
                        </div>
                    </div>
                </div>

                {/* Right: Net Buy Chart */}
                <div className="flex-1 p-4 flex flex-col relative">
                     <div className="flex justify-between items-center mb-4 z-10">
                        <h3 className="text-sm font-bold text-gray-200">NN mua ròng (tỷ)</h3>
                        <div className="flex bg-[#1c1c1e] rounded p-0.5">
                            <button className="px-2 py-0.5 text-[10px] bg-[#2962ff] text-white rounded shadow-sm">10 phiên</button>
                            <button className="px-2 py-0.5 text-[10px] text-gray-400 hover:text-white">Hôm nay</button>
                        </div>
                     </div>
                     
                     <div className="flex-1 relative flex items-end gap-3 pb-6 border-b border-[#1c1c1e]/50 ml-6">
                        {/* Axis Lines */}
                        <div className="absolute left-0 top-0 bottom-6 w-[1px] bg-[#1c1c1e]"></div>
                        <div className="absolute left-0 right-0 top-[50%] h-[1px] bg-[#1c1c1e]/50 border-dashed"></div>
                        
                        {/* Y-Axis Labels */}
                        <div className="absolute -left-8 top-0 text-[9px] text-gray-500">1,500</div>
                        <div className="absolute -left-8 top-[25%] text-[9px] text-gray-500">1,000</div>
                        <div className="absolute -left-8 top-[50%] text-[9px] text-gray-500">500</div>
                        <div className="absolute -left-8 top-[75%] text-[9px] text-gray-500">0</div>
                        <div className="absolute -left-8 bottom-6 text-[9px] text-gray-500">-500</div>

                        {/* Bars */}
                        {[
                            { d: '12/12', v: -600, c: '#f23645' },
                            { d: '15/12', v: 700, c: '#00c853' },
                            { d: '16/12', v: 10, c: '#00c853' },
                            { d: '17/12', v: 20, c: '#00c853' },
                            { d: '18/12', v: -900, c: '#f23645' },
                            { d: '19/12', v: 550, c: '#00c853' },
                            { d: '22/12', v: 550, c: '#00c853' },
                            { d: '23/12', v: 750, c: '#00c853' },
                            { d: '24/12', v: 1100, c: '#00c853' },
                            { d: '00:00', v: 300, c: '#00c853' },
                        ].map((item, i) => (
                             <div key={i} className="flex-1 flex flex-col justify-end h-full relative group">
                                  <div 
                                    className="w-full rounded-sm opacity-90 group-hover:opacity-100 transition-opacity"
                                    style={{ 
                                        height: `${Math.abs(item.v) / 15}%`, 
                                        backgroundColor: item.c,
                                        marginBottom: item.v > 0 ? '50%' : `calc(50% - ${Math.abs(item.v) / 15}%)`
                                    }}
                                  ></div>
                                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-gray-500 whitespace-nowrap">{item.d}</span>
                             </div>
                        ))}
                     </div>
                </div>
            </div>

            {/* Bottom Section: Treemap */}
            <div className="flex-1 bg-[#13171b] overflow-hidden p-1 relative">
                {/* Simulated Treemap using CSS Grid for exact look matching the screenshot */}
                <div className="w-full h-full grid grid-cols-6 grid-rows-4 gap-0.5">
                    {/* Big Green Blocks */}
                    <div className="col-span-2 row-span-2 bg-[#00c853] p-2 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-lg drop-shadow">VHM</span>
                         <span className="text-xs font-medium">118.63 tỷ</span>
                    </div>
                    <div className="col-span-2 row-span-2 bg-[#00c853] p-2 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-lg drop-shadow">VPB</span>
                         <span className="text-xs font-medium">63.51 tỷ</span>
                    </div>
                    
                    {/* Mixed Column 3 Row 1 */}
                    <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-sm drop-shadow">GAS</span>
                         <span className="text-[10px]">49.98 tỷ</span>
                    </div>
                     {/* Mixed Column 3 Row 2 */}
                    <div className="col-span-1 row-span-1 bg-[#f23645] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-sm drop-shadow">DGC</span>
                         <span className="text-[10px]">-49.19 tỷ</span>
                    </div>

                    {/* Column 4 Row 1 & 2 */}
                    <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-sm drop-shadow">VND</span>
                         <span className="text-[10px]">39.59 tỷ</span>
                    </div>
                     <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-sm drop-shadow">CTG</span>
                         <span className="text-[10px]">16.84 tỷ</span>
                    </div>

                    {/* Row 3 - Big STB */}
                    <div className="col-span-2 row-span-2 bg-[#00c853] p-2 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-lg drop-shadow">STB</span>
                         <span className="text-xs font-medium">117.39 tỷ</span>
                    </div>

                    {/* Row 3 Middle Section */}
                     <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-sm drop-shadow">FPT</span>
                         <span className="text-[10px]">31.32 tỷ</span>
                    </div>
                    <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-xs drop-shadow">TAL</span>
                         <span className="text-[9px]">19.93 tỷ</span>
                    </div>
                    <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-xs drop-shadow">SSI</span>
                         <span className="text-[9px]">18.29 tỷ</span>
                    </div>
                    <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-xs drop-shadow">MSN</span>
                         <span className="text-[9px]">17.4 tỷ</span>
                    </div>

                    {/* Row 4 Bottom Section */}
                    <div className="col-span-1 row-span-1 bg-[#f23645] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-sm drop-shadow">VIX</span>
                         <span className="text-[10px]">-24.91 tỷ</span>
                    </div>
                    <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-xs drop-shadow">GEX</span>
                         <span className="text-[9px]">16.55 tỷ</span>
                    </div>
                    <div className="col-span-1 row-span-1 bg-[#f23645] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-xs drop-shadow">NLG</span>
                         <span className="text-[9px]">-16.45 tỷ</span>
                    </div>
                     <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-xs drop-shadow">KDH</span>
                         <span className="text-[9px]">16.29 tỷ</span>
                    </div>

                </div>
            </div>
        </div>
    );
};
