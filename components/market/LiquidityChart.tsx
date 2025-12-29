import React from 'react';
import { Zap } from 'lucide-react';

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
        if (points.length === 0) return '';
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
};