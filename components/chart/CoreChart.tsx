import React from 'react';
import { CandleData } from '../../types';

interface CoreChartProps {
  data: CandleData[];
  dimensions: { width: number; height: number };
  getX: (i: number) => number;
  getY: (p: number) => number;
  padding: { top: number; bottom: number; right: number };
  effectiveHeight: number;
  candleWidth: number;
  gap: number;
  barWidth: number;
  minPrice: number;
  maxPrice: number;
  priceRange: number;
  colorUp: string;
  colorDown: string;
  activeFeature: string | null;
}

export const CoreChart: React.FC<CoreChartProps> = ({
  data, dimensions, getX, getY, padding, effectiveHeight, candleWidth, gap, barWidth, maxPrice, priceRange, colorUp, colorDown, activeFeature
}) => {
  return (
    <>
        {/* Grid */}
        {[0, 0.2, 0.4, 0.6, 0.8, 1].map((pct) => {
          const y = padding.top + effectiveHeight * pct;
          const price = maxPrice - (priceRange * pct);
          return (
            <g key={pct}>
              <line x1="0" y1={y} x2={dimensions.width} y2={y} stroke="#2a2e39" strokeWidth="1" />
              <text x={dimensions.width - 45} y={y + 4} fill="#848e9c" fontSize="11" fontFamily="Arial">
                {price.toFixed(2)}
              </text>
            </g>
          );
        })}

        {/* Vertical Grid Lines (Time) - Optional but good for context when panning */}
        {data.map((d, i) => {
            if (i % 5 === 0) { // Render grid line every 5th candle
                const x = getX(i);
                if (x > 0 && x < dimensions.width) {
                    return (
                        <line key={i} x1={x} y1={padding.top} x2={x} y2={dimensions.height - padding.bottom} stroke="#2a2e39" strokeWidth="0.5" strokeDasharray="2 2" />
                    )
                }
            }
            return null;
        })}

        {/* Candles Group */}
        <g className="transition-opacity duration-200">
          {data.map((d, i) => {
            const x = getX(i);
            
            // Optimization: Don't render if out of view
            if (x < -candleWidth || x > dimensions.width + candleWidth) return null;

            const yOpen = getY(d.open);
            const yClose = getY(d.close);
            const yHigh = getY(d.high);
            const yLow = getY(d.low);
            const isUp = d.close >= d.open;
            
            let fill = isUp ? colorUp : colorDown;
            if (activeFeature === 'ghost_trade') fill = '#d946ef';

            return (
              <g key={i} className="group">
                <line x1={x} y1={yHigh} x2={x} y2={yLow} stroke={fill} strokeWidth="1" />
                <rect x={x - barWidth/2} y={Math.min(yOpen, yClose)} width={barWidth} height={Math.max(1, Math.abs(yOpen - yClose))} fill={fill} />
                
                {/* AI Context Hover */}
                {activeFeature === 'ai_context' && (
                    <foreignObject x={x - 60} y={yHigh - 60} width="120" height="60" className="overflow-visible opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                        <div className="bg-blue-900/90 text-white text-[10px] p-2 rounded border border-blue-500 shadow-xl">
                            Biến động: {(Math.random()*3).toFixed(1)}% <br/>
                            <span className="italic text-gray-300">"Áp lực chốt lời T+2.5"</span>
                        </div>
                    </foreignObject>
                )}
              </g>
            );
          })}
        </g>
    </>
  );
};