import React, { useMemo, useState, useEffect, useRef } from 'react';
import { CandleData } from '../types';
import { 
    MessageCircle, Zap, Shield, Crown, TrendingUp, Skull, 
    Play, Pause, Award, HelpCircle, Briefcase, Eye 
} from 'lucide-react';

interface CandleChartProps {
  symbol: string;
  colorUp?: string;
  colorDown?: string;
  activeFeature?: string | null;
}

// Generate random walk data for demonstration
const generateData = (count: number): CandleData[] => {
  let price = 56.30; 
  const data: CandleData[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const time = new Date(now.getTime() - (count - i) * 60000 * 60).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const move = (Math.random() - 0.48) * 0.5;
    const open = price;
    const close = price + move;
    const high = Math.max(open, close) + Math.random() * 0.2;
    const low = Math.min(open, close) - Math.random() * 0.2;
    const volume = Math.floor(Math.random() * 10000 + 1000);
    
    data.push({ time, open, high, low, close, volume });
    price = close;
  }
  return data;
};

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
    setData(generateData(100));
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

  const padding = { top: 40, bottom: 20, right: 60 };
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

  // --- FEATURE OVERLAY RENDER LOGIC --- //
  
  const renderFeatureOverlays = () => {
      if (!activeFeature) return null;

      // 1. SOCIAL INTELLIGENCE
      if (['rumor_timeline', 'expert_markers', 'credibility_score', 'ai_context'].includes(activeFeature)) {
          return data.map((d, i) => {
             // Mock Data: Only show on every 15th candle or specific indices
             if (i % 25 === 0) {
                 const x = getX(i);
                 const y = getY(d.high) - 25;
                 const isExpert = activeFeature === 'expert_markers';
                 const isRumor = activeFeature === 'rumor_timeline';
                 
                 return (
                     <g key={`marker-${i}`} className="cursor-pointer group animate-in zoom-in duration-300">
                         {isRumor && (
                             <>
                                 <line x1={x} y1={y + 10} x2={x} y2={getY(d.high)} stroke="#a855f7" strokeWidth="1" strokeDasharray="2 2" />
                                 <circle cx={x} cy={y} r="10" fill="#1e1e24" stroke="#a855f7" strokeWidth="1.5" />
                                 <text x={x} y={y+4} textAnchor="middle" fill="#a855f7" fontSize="10" className="pointer-events-none">
                                     ?
                                 </text>
                             </>
                         )}
                         {isExpert && (
                             <>
                                 <circle cx={x} cy={y} r="12" fill="#2962ff" stroke="white" strokeWidth="1" />
                                 <text x={x} y={y+4} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">KOL</text>
                             </>
                         )}
                         
                         {/* Tooltip Simulation */}
                         <foreignObject x={x - 60} y={y - 50} width="120" height="50" className="overflow-visible opacity-0 group-hover:opacity-100 transition-opacity z-50">
                             <div className="bg-gray-900 border border-gray-700 text-xs text-white p-2 rounded shadow-xl whitespace-nowrap">
                                 {isRumor ? 'Tin đồn: Sáp nhập bank' : 'KOL: Long Lãng hô Múc'}
                             </div>
                         </foreignObject>
                     </g>
                 );
             }
             return null;
          });
      }

      // 2. SMART MONEY - DIVERGENCE (Line Chart Overlay)
      if (activeFeature === 'smart_money_divergence') {
          const points = data.map((d, i) => {
              // Create a divergence: Price goes up, Line goes down/flat at the end
              let val = d.close;
              if (i > 80) val = val * 0.98; // Artificial divergence
              return `${getX(i)},${getY(val) + 40}`; // Offset slightly
          }).join(' ');

          return (
              <g className="animate-in fade-in duration-500">
                  <polyline points={points} fill="none" stroke="#f97316" strokeWidth="2" strokeOpacity="0.8" />
                  <text x={getX(90)} y={getY(data[90].close) + 30} fill="#f97316" fontSize="12" fontWeight="bold">Smart Money Flow (Divergence)</text>
              </g>
          );
      }

      // 2. WHALE WHISPERER
      if (activeFeature === 'whale_whisperer') {
          return data.map((d, i) => {
              if (d.volume > 8000) { // High volume candles
                   return (
                       <g key={`whale-${i}`} className="animate-in bounce-in duration-500">
                           <text x={getX(i) - 8} y={getY(d.low) + 20} fontSize="16">🐋</text>
                           <rect x={getX(i) - barWidth/2} y={getY(d.high)} width={barWidth} height={Math.abs(getY(d.open) - getY(d.close))} fill="none" stroke="#fcd34d" strokeWidth="2" />
                       </g>
                   )
              }
              return null;
          });
      }

      // 3. FUNDAMENTAL - PE BANDS
      if (activeFeature === 'pe_bands') {
          const peLevels = [
              { label: 'P/E 10.x', y: getY(minPrice + priceRange * 0.2), color: '#22d3ee' },
              { label: 'P/E 15.x', y: getY(minPrice + priceRange * 0.5), color: '#22d3ee' },
              { label: 'P/E 20.x', y: getY(minPrice + priceRange * 0.8), color: '#f87171' },
          ];
          return peLevels.map((lvl, i) => (
              <g key={`pe-${i}`} className="animate-in slide-in-from-right duration-500">
                  <line x1="0" y1={lvl.y} x2={dimensions.width} y2={lvl.y} stroke={lvl.color} strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />
                  <text x={10} y={lvl.y - 5} fill={lvl.color} fontSize="10" fontWeight="bold">{lvl.label}</text>
              </g>
          ));
      }

      // 3. CONSENSUS CLOUD
      if (activeFeature === 'consensus_cloud') {
          const startX = dimensions.width * 0.6;
          const topY = getY(maxPrice * 0.99);
          const bottomY = getY(minPrice * 1.01);
          return (
              <g className="animate-in fade-in duration-1000">
                  <path d={`M ${startX},${getY(data[60].close)} C ${startX + 100},${topY} ${dimensions.width},${topY} ${dimensions.width},${(topY+bottomY)/2} L ${dimensions.width},${bottomY} C ${dimensions.width - 50},${bottomY} ${startX + 50},${bottomY} ${startX},${getY(data[60].close)}`} fill="#06b6d4" fillOpacity="0.15" />
                  <text x={dimensions.width - 120} y={(topY+bottomY)/2} fill="#06b6d4" fontSize="14" fontWeight="bold">Target: 62.0</text>
              </g>
          );
      }

      // 4. EVENT - EARNINGS REPLAY
      if (activeFeature === 'earnings_replay' || activeFeature === 'event_impact') {
          const eventIdx = 45;
          const x = getX(eventIdx);
          return (
               <g className="animate-in zoom-in duration-500">
                   <line x1={x} y1={0} x2={x} y2={dimensions.height} stroke="#fb923c" strokeWidth="1" strokeDasharray="5 5" />
                   <rect x={x - 40} y={padding.top + 20} width="80" height="24" rx="4" fill="#fb923c" />
                   <text x={x} y={padding.top + 36} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">BCTC Q3</text>
                   
                   {/* Highlight Background Area */}
                   <rect x={x} y={padding.top} width={getX(70) - x} height={effectiveHeight} fill="#fb923c" fillOpacity="0.1" />
                   <text x={x + 10} y={padding.top + 60} fill="#fb923c" fontSize="10">+15% sau tin</text>
               </g>
          );
      }
      
      // 5. EXECUTION - TRAPPED ZONES
      if (activeFeature === 'trapped_zones') {
          const yZone = getY(maxPrice - priceRange * 0.3);
          return (
              <g className="animate-in slide-in-from-right duration-700">
                  <rect x={0} y={yZone} width={dimensions.width} height={40} fill="#71717a" fillOpacity="0.2" />
                  <line x1={0} y1={yZone + 40} x2={dimensions.width} y2={yZone + 40} stroke="#71717a" strokeWidth="1" />
                  <text x={dimensions.width - 150} y={yZone + 25} fill="#a1a1aa" fontSize="11" fontWeight="bold">Vùng Kẹp Hàng (Vol lớn)</text>
              </g>
          );
      }

      return null;
  }

  // --- HTML OVERLAYS (Outside SVG) --- //
  const renderHtmlOverlays = () => {
      if (!activeFeature) return null;

      if (activeFeature === 'bull_bear_debate') {
          return (
              <div className="absolute top-20 right-16 w-64 bg-black/80 backdrop-blur border border-gray-700 rounded-lg p-3 z-30 animate-in slide-in-from-right">
                  <div className="flex justify-between border-b border-gray-700 pb-2 mb-2">
                      <span className="text-xs font-bold text-gray-300">Đấu Trường Quan Điểm</span>
                      <span className="text-[10px] text-gray-500">MXH 24h qua</span>
                  </div>
                  <div className="flex gap-2">
                      <div className="flex-1">
                          <div className="text-[#00c853] text-xs font-bold mb-1">Bò (Bull) 65%</div>
                          <p className="text-[10px] text-gray-400 leading-tight">• Kỳ vọng chia cổ tức</p>
                          <p className="text-[10px] text-gray-400 leading-tight">• Tây mua ròng</p>
                      </div>
                      <div className="w-[1px] bg-gray-700"></div>
                      <div className="flex-1">
                          <div className="text-[#f23645] text-xs font-bold mb-1">Gấu (Bear) 35%</div>
                          <p className="text-[10px] text-gray-400 leading-tight">• Giá cao su giảm</p>
                      </div>
                  </div>
              </div>
          )
      }

      if (activeFeature === 'native_trade' || activeFeature === 'ghost_trade') {
          return (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4 z-40 animate-in zoom-in">
                  <button className="bg-[#00c853] hover:bg-[#00e676] text-white font-bold py-3 px-6 rounded-lg shadow-2xl shadow-green-500/30 flex flex-col items-center border border-white/10">
                      <span className="text-lg">MUA</span>
                      <span className="text-xs opacity-80">56.30</span>
                  </button>
                  <button className="bg-[#f23645] hover:bg-[#ff5252] text-white font-bold py-3 px-6 rounded-lg shadow-2xl shadow-red-500/30 flex flex-col items-center border border-white/10">
                      <span className="text-lg">BÁN</span>
                      <span className="text-xs opacity-80">56.20</span>
                  </button>
                  {activeFeature === 'ghost_trade' && (
                       <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                           Ghost Mode
                       </div>
                  )}
              </div>
          )
      }
      
      if (activeFeature === 'scenario_planner') {
           return (
               <div className="absolute top-[30%] right-[20%] z-30 pointer-events-none">
                    <div className="bg-[#2962ff]/20 border border-[#2962ff] p-2 rounded text-[#2962ff] text-xs font-bold text-center">
                        Mục tiêu: 62.0 <br/>
                        <span className="text-[10px] text-white font-normal">Lãi dự kiến: +12%</span>
                    </div>
                    <div className="w-[1px] h-20 bg-[#2962ff] border-l border-dashed border-[#2962ff] mx-auto"></div>
               </div>
           )
      }

      return null;
  }

  return (
    <div ref={containerRef} className="w-full h-full relative select-none bg-[#0b0e11] overflow-hidden">
      {/* Background Effect for Room VIP Heatmap */}
      {activeFeature === 'room_vip_heatmap' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00c853]/10 to-transparent pointer-events-none z-0" />
      )}

      <svg width="100%" height="100%" className="overflow-visible relative z-10">
        {/* Grid Lines */}
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
          const color = isUp ? colorUp : colorDown;
          
          // Ghost Trade: Make candles purple
          const displayColor = activeFeature === 'ghost_trade' ? '#a855f7' : color;

          return (
            <g key={i} className="hover:opacity-80 transition-opacity">
              <line x1={x + barWidth / 2} y1={yHigh} x2={x + barWidth / 2} y2={yLow} stroke={displayColor} strokeWidth="1" />
              <rect 
                x={x} 
                y={Math.min(yOpen, yClose)} 
                width={barWidth} 
                height={Math.max(1, Math.abs(yOpen - yClose))} 
                fill={displayColor} 
              />
            </g>
          );
        })}
        
        {/* Render Feature SVG Overlays */}
        {renderFeatureOverlays()}

        {/* Current Price Line */}
        {lastCandle && (
           <line x1={0} y1={getY(lastCandle.close)} x2={dimensions.width} y2={getY(lastCandle.close)} stroke={activeFeature === 'ghost_trade' ? '#a855f7' : (lastCandle.close >= lastCandle.open ? colorUp : colorDown)} strokeWidth="1" strokeDasharray="4 4" opacity="0.8" />
        )}
      </svg>
      
      {/* HTML Overlays (Tooltips, Panels) */}
      {renderHtmlOverlays()}

      {/* Current Price Label */}
      {lastCandle && (
        <div 
            className="absolute right-0 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm z-20"
            style={{ 
                top: getY(lastCandle.close) - 10,
                backgroundColor: activeFeature === 'ghost_trade' ? '#a855f7' : (lastCandle.close >= lastCandle.open ? colorUp : colorDown)
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
                     <Zap size={10} /> {activeFeature.replace('_', ' ').toUpperCase()} ACTIVE
                 </span>
             )}
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
         </div>
      </div>
    </div>
  );
};