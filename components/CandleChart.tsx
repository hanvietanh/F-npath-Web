import React, { useMemo, useState, useEffect, useRef } from 'react';
import { CandleData } from '../types';
import { Zap } from 'lucide-react';
import { generateCandleData } from './chart/chartConstants';
import { ChartSVGLayers } from './chart/ChartSVGLayers';
import { ChartHTMLLayers } from './chart/ChartHTMLLayers';
import { CoreChart } from './chart/CoreChart';
import { PrdModuleId } from './chart/prdConstants';

interface CandleChartProps {
  symbol: string;
  colorUp?: string;
  colorDown?: string;
  activeFeature?: string | null;
  showProjection?: boolean;
  activePrdModule?: PrdModuleId | null;
  onPrdSelect?: (id: string) => void;
  selectedPrdItem?: string | null;
}

export const CandleChart: React.FC<CandleChartProps> = ({ 
  symbol, 
  colorUp = '#089981', 
  colorDown = '#f23645',
  activeFeature,
  showProjection,
  activePrdModule,
  onPrdSelect,
  selectedPrdItem
}) => {
  const [data, setData] = useState<CandleData[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Pan & Zoom State
  const [viewState, setViewState] = useState({ scale: 1, offsetX: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, offsetX: 0 });

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

  // --- INTERACTION HANDLERS ---
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, offsetX: viewState.offsetX };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    setViewState(prev => ({ ...prev, offsetX: dragStartRef.current.offsetX + dx }));
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
      // Zoom towards cursor logic
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect || dimensions.width === 0) return;

      const scaleFactor = 1.1;
      const direction = e.deltaY < 0 ? 1 : -1;
      const newScale = Math.max(0.5, Math.min(20, viewState.scale * (direction > 0 ? scaleFactor : 1/scaleFactor)));
      
      const mouseX = e.clientX - rect.left;
      
      // We need to calculate where the mouse point maps to in data index terms
      // Formula: x = offsetX + index * candleWidth + padding...
      // Simplified for zoom math: index ~ (mouseX - offsetX) / candleWidth
      
      const paddingRight = activePrdModule ? dimensions.width * 0.25 : 60; // 25% empty space if module active
      const renderWidth = showProjection ? dimensions.width * 0.5 : (dimensions.width - paddingRight);
      const baseCandleWidth = renderWidth / (data.length || 1);
      
      const cursorIndex = (mouseX - viewState.offsetX) / (baseCandleWidth * viewState.scale);
      
      // Calculate new offset to keep cursorIndex at the same screen X position
      // mouseX = newOffset + cursorIndex * baseCandleWidth * newScale
      const newOffset = mouseX - (cursorIndex * baseCandleWidth * newScale);

      setViewState({ scale: newScale, offsetX: newOffset });
  };

  // --- LAYOUT CALCS ---
  // If AI module is active, we reserve 25% of the right side for the floating panel
  const paddingRight = activePrdModule ? dimensions.width * 0.25 : 60;
  const padding = { top: 60, bottom: 40, right: paddingRight };
  const effectiveHeight = dimensions.height - padding.top - padding.bottom;
  
  const renderWidth = showProjection ? dimensions.width * 0.5 : (dimensions.width - padding.right);
  const baseCandleWidth = renderWidth / (data.length || 1);
  
  // Apply Zoom
  const candleWidth = baseCandleWidth * viewState.scale;
  const gap = candleWidth * 0.2;
  const barWidth = candleWidth - gap;

  // Coordinate Transformers
  const getX = (index: number) => viewState.offsetX + index * candleWidth + gap / 2 + barWidth / 2;

  // Dynamic Y-Axis based on Visible Candles
  // This ensures the chart scales vertically to fit the candles currently in view
  const { minPrice, maxPrice, priceRange } = useMemo(() => {
    if (data.length === 0) return { minPrice: 0, maxPrice: 100, priceRange: 100 };
    
    // Find visible indices based on current X position and Width
    const visibleData = data.filter((_, i) => {
        const x = getX(i);
        return x > -candleWidth && x < dimensions.width + candleWidth; // Buffer
    });

    const dataset = visibleData.length > 0 ? visibleData : data; // Fallback to all data if panned to empty space
    
    const min = Math.min(...dataset.map(d => d.low));
    const max = Math.max(...dataset.map(d => d.high));
    const range = max - min;
    // Add 10% vertical padding
    return { 
        minPrice: min - range * 0.1, 
        maxPrice: max + range * 0.1, 
        priceRange: range * 1.2 || 1 
    };
  }, [data, viewState, dimensions.width]);

  const getY = (price: number) => {
    return padding.top + effectiveHeight - ((price - minPrice) / priceRange) * effectiveHeight;
  };

  if (dimensions.width === 0) return <div ref={containerRef} className="w-full h-full" />;

  const lastCandle = data[data.length-1];

  return (
    <div 
        ref={containerRef} 
        className={`w-full h-full relative select-none bg-[#0b0e11] overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-crosshair'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
    >
      
      {activeFeature === 'ghost_trade' && (
          <div className="absolute inset-0 bg-[#2e1065]/20 pointer-events-none z-0 mix-blend-overlay"></div>
      )}

      {/* SVG Layer */}
      <svg width="100%" height="100%" className="overflow-visible relative z-10">
        <CoreChart 
           data={data}
           dimensions={dimensions}
           getX={getX}
           getY={getY}
           padding={padding}
           effectiveHeight={effectiveHeight}
           candleWidth={candleWidth}
           gap={gap}
           barWidth={barWidth}
           minPrice={minPrice}
           maxPrice={maxPrice}
           priceRange={priceRange}
           colorUp={colorUp}
           colorDown={colorDown}
           activeFeature={activeFeature}
        />
        
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
            showProjection={showProjection}
            activePrdModule={activePrdModule}
            onPrdSelect={onPrdSelect || (() => {})}
            selectedPrdItem={selectedPrdItem || null}
        />

        {lastCandle && (
           <line 
             x1={0} 
             y1={getY(lastCandle.close)} 
             x2={dimensions.width} 
             y2={getY(lastCandle.close)} 
             stroke={activeFeature === 'ghost_trade' ? '#d946ef' : (lastCandle.close >= lastCandle.open ? colorUp : colorDown)} 
             strokeWidth="1" 
             strokeDasharray="4 4" 
             opacity="0.8" 
           />
        )}
      </svg>
      
      <ChartHTMLLayers 
          activeFeature={activeFeature} 
          showProjection={showProjection} 
          activePrdModule={activePrdModule}
      />

      {lastCandle && (
        <div 
            className="absolute right-0 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm z-20 transition-all duration-75"
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