
import React from 'react';
import { Zap } from 'lucide-react';

interface LiquidityChartProps {
    className?: string;
    isCompact?: boolean;
    showTitle?: boolean;
    showLegend?: boolean;
}

export const LiquidityChart: React.FC<LiquidityChartProps> = ({ 
    className, 
    isCompact = false,
    showTitle = true,
    showLegend = true
}) => {
    // Time labels
    const timeLabels = ["09:15", "10:00", "11:00", "13:00", "14:00", "14:30"];
    
    // SVG Dimensions
    const width = 1000;
    const height = 400;
    const padding = { top: 20, right: 10, bottom: 20, left: 0 }; // Minimized padding
    
    // We want to fill the area mostly
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    // Generate Monotonic Data
    const generatePathData = (steps: number, maxVal: number, seed: number) => {
        const data = [];
        let val = 0;
        for (let i = 0; i <= steps; i++) {
            // Lunch break simulation (approx middle 20% flat)
            const progress = i / steps;
            let increment = Math.random() * maxVal * 0.05;
            
            if (progress > 0.45 && progress < 0.55) increment = 0; // Flat during lunch
            
            val += increment;
            if (val > maxVal) val = maxVal; // Cap
            
            // Add some noise/wobble but keep generally increasing? 
            // Cumulative volume is strictly non-decreasing.
            data.push({ x: (i / steps) * chartW, y: val });
        }
        // Normalize to fit height exactly at max
        const actualMax = data[data.length-1].y;
        return data.map(p => ({ ...p, y: (p.y / actualMax) * (chartH * 0.8) })); // Use 80% height
    };

    const yesterdayPoints = generatePathData(100, 25000, 1);
    const todayPoints = generatePathData(100, 32000, 2);
    
    // Adjust today to end earlier or be higher? Screenshot shows Today (Blue) much higher.
    // Let's manually scale today to be higher
    todayPoints.forEach(p => p.y *= 1.2); 

    const getY = (yVal: number) => height - padding.bottom - yVal;

    const makePath = (points: {x: number, y: number}[]) => {
        return points.map((p, i) => `${i===0?'M':'L'} ${padding.left + p.x},${getY(p.y)}`).join(' ');
    };
    
    const makeArea = (points: {x: number, y: number}[]) => {
        if (points.length === 0) return '';
        const line = makePath(points);
        const lastX = padding.left + points[points.length-1].x;
        const bottomY = height - padding.bottom;
        const firstX = padding.left + points[0].x;
        return `${line} L ${lastX},${bottomY} L ${firstX},${bottomY} Z`;
    };

    return (
        <div className={`flex-1 w-full h-full relative flex flex-col select-none ${className || ''}`}>
             {/* Header Layer (Absolute to overlay on chart if needed, or flex) */}
             {(showTitle || showLegend) && (
                 <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-start pointer-events-none px-2 pt-1">
                     {showTitle && <div className="text-[10px] text-gray-400 font-bold bg-[#0b0e11]/50 px-1 rounded">GTGD (Tỷ)</div>}
                     {!showTitle && <div></div>} {/* Spacer */}
                     
                     {showLegend && (
                         <div className="flex items-center gap-3 text-[9px] font-bold bg-[#0b0e11]/50 px-2 py-1 rounded backdrop-blur-sm border border-[#1c1c1e]/50">
                             <div className="flex items-center gap-1.5">
                                 <div className="w-2 h-2 rounded-full bg-[#2962ff] shadow-[0_0_5px_#2962ff]"></div>
                                 <span className="text-white">Hôm nay</span>
                             </div>
                             <div className="flex items-center gap-1.5">
                                 <div className="w-2 h-2 rounded-full bg-[#ffab00]"></div>
                                 <span className="text-gray-400">Hôm qua</span>
                             </div>
                         </div>
                     )}
                 </div>
             )}

             {/* Chart SVG */}
             <div className="flex-1 w-full h-full min-h-0">
                <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2962ff" stopOpacity="0.5"/>
                            <stop offset="100%" stopColor="#2962ff" stopOpacity="0.0"/>
                        </linearGradient>
                    </defs>

                    {/* Horizontal Grid Lines */}
                    {[0.2, 0.4, 0.6, 0.8].map(p => {
                        const y = height - padding.bottom - (chartH * p);
                        return <line key={p} x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#1c1c1e" strokeWidth="1" strokeDasharray="3 3" />
                    })}

                    {/* Yesterday Line (Orange) */}
                    <path d={makePath(yesterdayPoints)} fill="none" stroke="#ffab00" strokeWidth="2" strokeOpacity="0.8" />
                    
                    {/* Today Area & Line (Blue) */}
                    <path d={makeArea(todayPoints)} fill="url(#blueGradient)" />
                    <path d={makePath(todayPoints)} fill="none" stroke="#2962ff" strokeWidth="2.5" />
                    
                    {/* Current Value Dot */}
                    {todayPoints.length > 0 && (
                        <circle 
                            cx={padding.left + todayPoints[todayPoints.length-1].x} 
                            cy={getY(todayPoints[todayPoints.length-1].y)} 
                            r="4" 
                            fill="#000" 
                            stroke="#2962ff" 
                            strokeWidth="2" 
                        />
                    )}

                    {/* Time Axis */}
                    {timeLabels.map((t, i) => {
                        const x = padding.left + (i / (timeLabels.length - 1)) * chartW;
                        return (
                             <text key={i} x={x} y={height - 5} fill="#525252" fontSize="12" textAnchor="middle" fontWeight="500">{t}</text>
                        )
                    })}
                </svg>
             </div>
        </div>
    )
};
