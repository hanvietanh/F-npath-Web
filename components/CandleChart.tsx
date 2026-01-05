import React, { useMemo, useState, useEffect, useRef } from 'react';
import { CandleData } from '../types';
import { Zap } from 'lucide-react';
import { generateCandleData } from './chart/chartConstants';
import { ChartSVGLayers } from './chart/ChartSVGLayers';
import { ChartHTMLLayers } from './chart/ChartHTMLLayers';

interface CandleChartProps {
  symbol: string;
  colorUp?: string;
  colorDown?: string;
  activeFeature?: string | null;
}

export const CandleChart: React.FC<CandleChartProps> = ({ 
  symbol, 
  colorUp = '#089981', 
  colorDown = '#f23645',
  activeFeature
}) => {
  const [data, setData] = useState<CandleData[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setData(generateCandleData(100));
  }, [symbol]);

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

  const padding = { top: 60, bottom: 40, right: 60 };
  const effectiveHeight = dimensions.height - padding.top - padding.bottom;
  const candleWidth = (dimensions.width - padding.right) / data.length;
  const gap = candleWidth * 0.3;
  const barWidth = candleWidth - gap;

  const getY = (price: number) => {
    return padding.top + effectiveHeight - ((price - minPrice) / priceRange) * effectiveHeight;
  };
  
  const getX = (index: number) => {
      return index * candleWidth + gap / 2 + barWidth / 2;
  }

  if (dimensions.width === 0) return <div ref={containerRef} className="w-full h-full" />;

  const lastCandle = data[data.length-1];

  return (
    <div ref={containerRef} className="w-full h-full relative select-none bg-[#0b0e11] overflow-hidden">
      
      {/* 21. Ghost Trade Background override */}
      {activeFeature === 'ghost_trade' && (
          <div className="absolute inset-0 bg-[#2e1065]/20 pointer-events-none z-0 mix-blend-overlay"></div>
      )}

      {/* SVG Layer */}
      <svg width="100%" height="100%" className="overflow-visible relative z-10">
        {/* Grid */}
        {[0, 0.2, 0.4, 0.6, 0.8, 1].map((pct) => {
          const y = padding.top + effectiveHeight * pct;
          const price = maxPrice - (priceRange * pct);
          return (
            <g key={pct}>
              <line x1="0" y1={y} x2={dimensions.width - padding.right} y2={y} stroke="#2a2e39" strokeWidth="1" />
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
          
          let fill = isUp ? colorUp : colorDown;
          if (activeFeature === 'ghost_trade') fill = '#d946ef';

          return (
            <g key={i} className="group">
              <line x1={x + barWidth / 2} y1={yHigh} x2={x + barWidth / 2} y2={yLow} stroke={fill} strokeWidth="1" />
              <rect x={x} y={Math.min(yOpen, yClose)} width={barWidth} height={Math.max(1, Math.abs(yOpen - yClose))} fill={fill} />
              
              {/* 18. AI Context Hover */}
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
        
        {/* SVG FEATURE OVERLAYS */}
        <ChartSVGLayers 
            activeFeature={activeFeature}
            data={data}
            dimensions={dimensions}
            getX={getX}
            getY={getY}
            padding={padding}
            effectiveHeight={effectiveHeight}
            barWidth={barWidth}
            minPrice={minPrice}
            maxPrice={maxPrice}
            priceRange={priceRange}
            lastCandle={lastCandle}
        />

        {/* Current Price Line */}
        {lastCandle && (
           <line x1={0} y1={getY(lastCandle.close)} x2={dimensions.width} y2={getY(lastCandle.close)} stroke={activeFeature === 'ghost_trade' ? '#d946ef' : (lastCandle.close >= lastCandle.open ? colorUp : colorDown)} strokeWidth="1" strokeDasharray="4 4" opacity="0.8" />
        )}
      </svg>
      
      {/* HTML FEATURE OVERLAYS */}
      <ChartHTMLLayers activeFeature={activeFeature} />

      {/* Current Price Label */}
      {lastCandle && (
        <div 
            className="absolute right-0 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm z-20"
            style={{ 
                top: getY(lastCandle.close) - 10,
                backgroundColor: activeFeature === 'ghost_trade' ? '#d946ef' : (lastCandle.close >= lastCandle.open ? colorUp : colorDown)
            }}
        >
            {lastCandle.close.toFixed(2)}
        </div>
      )}

      {/* Standard Info Overlay */}
      <div className="absolute top-3 left-4 flex flex-col pointer-events-none z-20">
         <div className="flex items-center gap-2 mb-1">
             <span className="font-bold text-lg text-white">{symbol}</span>
             <span className="text-xs text-gray-400">1D · HOSE</span>
             {activeFeature && (
                 <span className="flex items-center gap-1 bg-[#2962ff]/20 text-[#2962ff] px-2 py-0.5 rounded text-[10px] font-bold border border-[#2962ff]/50 animate-pulse">
                     <Zap size={10} /> {activeFeature.replace(/_/g, ' ').toUpperCase()} ACTIVE
                 </span>
             )}
         </div>
         <div className="flex gap-3 text-xs font-mono">
            <span className={`font-medium ${lastCandle?.close >= lastCandle?.open ? 'text-[#089981]' : 'text-[#f23645]'}`}>O{lastCandle?.open.toFixed(2)}</span>
            <span className={`font-medium ${lastCandle?.close >= lastCandle?.open ? 'text-[#089981]' : 'text-[#f23645]'}`}>H{lastCandle?.high.toFixed(2)}</span>
            <span className={`font-medium ${lastCandle?.close >= lastCandle?.open ? 'text-[#089981]' : 'text-[#f23645]'}`}>L{lastCandle?.low.toFixed(2)}</span>
            <span className={`font-medium ${lastCandle?.close >= lastCandle?.open ? 'text-[#089981]' : 'text-[#f23645]'}`}>C{lastCandle?.close.toFixed(2)}</span>
         </div>
      </div>
    </div>
  );
};
