import React, { useMemo, useState, useEffect, useRef } from 'react';
import { CandleData } from '../types';

interface CandleChartProps {
  symbol: string;
  colorUp?: string;
  colorDown?: string;
}

// Generate random walk data for demonstration
const generateData = (count: number): CandleData[] => {
  let price = 56.30; // Match the screenshot price roughly
  const data: CandleData[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const time = new Date(now.getTime() - (count - i) * 60000 * 60).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const move = (Math.random() - 0.48) * 0.5;
    const open = price;
    const close = price + move;
    const high = Math.max(open, close) + Math.random() * 0.2;
    const low = Math.min(open, close) - Math.random() * 0.2;
    const volume = Math.floor(Math.random() * 10000);
    
    data.push({ time, open, high, low, close, volume });
    price = close;
  }
  return data;
};

export const CandleChart: React.FC<CandleChartProps> = ({ 
  symbol, 
  colorUp = '#089981', // TradingView Green
  colorDown = '#f23645' // TradingView Red
}) => {
  const [data, setData] = useState<CandleData[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setData(generateData(100));
  }, [symbol]);

  // Resize observer to handle the smooth layout transition
  useEffect(() => {
    if (!containerRef.current) return;
    
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const { minPrice, maxPrice, priceRange } = useMemo(() => {
    if (data.length === 0) return { minPrice: 0, maxPrice: 100, priceRange: 100 };
    const min = Math.min(...data.map(d => d.low));
    const max = Math.max(...data.map(d => d.high));
    return { minPrice: min, maxPrice: max, priceRange: max - min };
  }, [data]);

  // Viewport calculations
  const padding = { top: 40, bottom: 20, right: 60 };
  const effectiveHeight = dimensions.height - padding.top - padding.bottom;
  const candleWidth = (dimensions.width - padding.right) / data.length;
  const gap = candleWidth * 0.3;
  const barWidth = candleWidth - gap;

  const getY = (price: number) => {
    return padding.top + effectiveHeight - ((price - minPrice) / priceRange) * effectiveHeight;
  };

  if (dimensions.width === 0) return <div ref={containerRef} className="w-full h-full" />;

  const lastCandle = data[data.length-1];

  return (
    <div ref={containerRef} className="w-full h-full relative select-none bg-[#0b0e11]">
      <svg width="100%" height="100%" className="overflow-visible">
        {/* Grid Lines */}
        {[0, 0.2, 0.4, 0.6, 0.8, 1].map((pct) => {
          const y = padding.top + effectiveHeight * pct;
          const price = maxPrice - (priceRange * pct);
          return (
            <g key={pct}>
              <line 
                x1="0" 
                y1={y} 
                x2={dimensions.width - padding.right} 
                y2={y} 
                stroke="#2a2e39" 
                strokeWidth="1" 
              />
              <text x={dimensions.width - 50} y={y + 4} fill="#848e9c" fontSize="11" fontFamily="Arial">
                {price.toFixed(2)}
              </text>
            </g>
          );
        })}

        {/* Candles */}
        {data.map((d, i) => {
          const x = i * candleWidth + gap / 2;
          const yOpen = getY(d.open);
          const yClose = getY(d.close);
          const yHigh = getY(d.high);
          const yLow = getY(d.low);
          const isUp = d.close >= d.open;
          const color = isUp ? colorUp : colorDown;

          return (
            <g key={i} className="hover:opacity-80 transition-opacity">
              <line x1={x + barWidth / 2} y1={yHigh} x2={x + barWidth / 2} y2={yLow} stroke={color} strokeWidth="1" />
              <rect 
                x={x} 
                y={Math.min(yOpen, yClose)} 
                width={barWidth} 
                height={Math.max(1, Math.abs(yOpen - yClose))} 
                fill={color} 
              />
            </g>
          );
        })}

        {/* Current Price Line */}
        {lastCandle && (
           <line x1={0} y1={getY(lastCandle.close)} x2={dimensions.width} y2={getY(lastCandle.close)} stroke={lastCandle.close >= lastCandle.open ? colorUp : colorDown} strokeWidth="1" strokeDasharray="4 4" opacity="0.8" />
        )}
      </svg>
      
      {/* Current Price Label on Axis */}
      {lastCandle && (
        <div 
            className="absolute right-0 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm"
            style={{ 
                top: getY(lastCandle.close) - 10,
                backgroundColor: lastCandle.close >= lastCandle.open ? colorUp : colorDown
            }}
        >
            {lastCandle.close.toFixed(2)}
        </div>
      )}

      {/* Top Left Info Overlay (Matching Screenshot) */}
      <div className="absolute top-3 left-4 flex flex-col pointer-events-none">
         <div className="flex items-center gap-2 mb-1">
             <span className="font-bold text-lg text-white">{symbol}</span>
             <span className="text-xs text-gray-400">1D · HOSE</span>
             <span className="flex items-center justify-center w-4 h-4 bg-gray-800 rounded-full text-[10px] text-gray-400">▼</span>
         </div>
         <div className="flex gap-3 text-xs font-mono">
            <span className={`font-medium ${lastCandle?.close >= lastCandle?.open ? 'text-[#089981]' : 'text-[#f23645]'}`}>
               O{lastCandle?.open.toFixed(2)}
            </span>
            <span className={`font-medium ${lastCandle?.close >= lastCandle?.open ? 'text-[#089981]' : 'text-[#f23645]'}`}>
               H{lastCandle?.high.toFixed(2)}
            </span>
            <span className={`font-medium ${lastCandle?.close >= lastCandle?.open ? 'text-[#089981]' : 'text-[#f23645]'}`}>
               L{lastCandle?.low.toFixed(2)}
            </span>
            <span className={`font-medium ${lastCandle?.close >= lastCandle?.open ? 'text-[#089981]' : 'text-[#f23645]'}`}>
               C{lastCandle?.close.toFixed(2)}
            </span>
            <span className={`font-medium ${lastCandle?.close >= lastCandle?.open ? 'text-[#089981]' : 'text-[#f23645]'}`}>
               {lastCandle ? (lastCandle.close - lastCandle.open).toFixed(2) : ''} ({lastCandle ? ((lastCandle.close - lastCandle.open)/lastCandle.open * 100).toFixed(2) : ''}%)
            </span>
         </div>
      </div>
    </div>
  );
};