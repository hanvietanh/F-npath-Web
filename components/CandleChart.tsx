import React, { useMemo, useState, useEffect, useRef } from 'react';
import { CandleData } from '../types';
import { 
    MessageCircle, Zap, Shield, Crown, TrendingUp, Skull, 
    Play, Pause, Award, HelpCircle, Briefcase, Eye, 
    Megaphone, Cloud, Newspaper, Users, BarChart3, 
    ArrowRight, Globe, TrendingDown
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

  // ==================================================================================
  // RENDER LOGIC PER TIER
  // ==================================================================================

  const renderOverlays = () => {
    if (!activeFeature) return null;

    // --- TIER 1: ALPHA GENERATORS ---

    // 1. Smart Money Divergence
    if (activeFeature === 'smart_money_divergence') {
        const points = data.map((d, i) => {
            // Divergence: Price Up, Flow Down
            let flowVal = d.close;
            if (i > 70) flowVal = flowVal * (1 - (i-70)*0.001); // Flow drops
            return `${getX(i)},${getY(flowVal) + 50}`; 
        }).join(' ');

        return (
            <g className="animate-in fade-in duration-500">
                {/* Zone Highlight */}
                <rect x={getX(70)} y={padding.top} width={getX(99) - getX(70)} height={effectiveHeight} fill="#f97316" fillOpacity="0.1" />
                
                {/* Line */}
                <polyline points={points} fill="none" stroke="#f97316" strokeWidth="2.5" />
                
                {/* Labels */}
                <text x={getX(90)} y={getY(data[90].close) + 65} fill="#f97316" fontSize="12" fontWeight="bold">Smart Money Accumulation</text>
            </g>
        );
    }

    // 2. VIP Room Heatmap (SVG Part - Avatars)
    if (activeFeature === 'vip_room_heatmap') {
        return data.map((d, i) => {
             if (i === 60 || i === 85) {
                 return (
                     <g key={i} className="animate-bounce">
                         <circle cx={getX(i)} cy={getY(d.high) - 20} r="14" fill="#1e1e24" stroke="#00c853" strokeWidth="2" />
                         <image href="https://i.pravatar.cc/150?u=a" x={getX(i)-14} y={getY(d.high)-34} height="28" width="28" clipPath="circle(14px)" />
                         <text x={getX(i)} y={getY(d.high) - 40} textAnchor="middle" fill="#00c853" fontSize="10" fontWeight="bold">MÚC</text>
                     </g>
                 )
             }
             return null;
        });
    }

    // 4. Rumor Timeline
    if (activeFeature === 'rumor_timeline') {
        const t0 = 40; // Rumor
        const tN = 65; // Official
        return (
            <g>
                {/* Connector Line */}
                <path d={`M ${getX(t0)} ${getY(data[t0].high)-30} Q ${(getX(t0)+getX(tN))/2} ${getY(data[t0].high)-60} ${getX(tN)} ${getY(data[tN].high)-30}`} fill="none" stroke="#a855f7" strokeDasharray="4 4" />
                <rect x={(getX(t0)+getX(tN))/2 - 40} y={getY(data[t0].high)-70} width="80" height="20" rx="4" fill="#a855f7" />
                <text x={(getX(t0)+getX(tN))/2} y={getY(data[t0].high)-56} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">+15% (Priced-in)</text>

                {/* Rumor Point */}
                <g transform={`translate(${getX(t0)-12}, ${dimensions.height - 30})`}>
                    <Cloud size={24} className="text-gray-400 fill-gray-600" />
                </g>
                <line x1={getX(t0)} y1={dimensions.height-30} x2={getX(t0)} y2={getY(data[t0].low)} stroke="gray" strokeDasharray="2 2" />

                {/* News Point */}
                <g transform={`translate(${getX(tN)-12}, ${dimensions.height - 30})`}>
                    <Newspaper size={24} className="text-white fill-blue-500" />
                </g>
                <line x1={getX(tN)} y1={dimensions.height-30} x2={getX(tN)} y2={getY(data[tN].low)} stroke="gray" strokeDasharray="2 2" />
            </g>
        )
    }

    // 5. Trapped Volume Zones
    if (activeFeature === 'trapped_volume') {
        const yZone = getY(maxPrice - priceRange * 0.25);
        return (
             <g className="animate-in slide-in-from-right duration-700">
                  <rect x={getX(20)} y={yZone} width={dimensions.width} height={30} fill="#71717a" fillOpacity="0.3" />
                  <line x1={getX(20)} y1={yZone + 30} x2={dimensions.width} y2={yZone + 30} stroke="#ef4444" strokeWidth="2" />
                  <text x={dimensions.width - 200} y={yZone + 20} fill="#e4e4e7" fontSize="11" fontWeight="bold">KHÁNG CỰ MẠNH: 15tr cổ chờ về bờ</text>
              </g>
        )
    }

    // --- TIER 2: EFFICIENCY BOOSTERS ---

    // 7. ETF Rebalancing
    if (activeFeature === 'etf_rebalancing') {
        const xFuture = dimensions.width - 80;
        return (
            <g>
                <line x1={xFuture} y1={padding.top} x2={xFuture} y2={dimensions.height} stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />
                <text x={xFuture} y={padding.top - 10} textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">Ngày 15/3</text>
            </g>
        )
    }

    // 8. Prop Trading Footprint
    if (activeFeature === 'prop_trading') {
        return data.map((d, i) => {
            // Highlight high volume bars
            if (d.volume > 7000) {
                 return (
                     <rect 
                        key={i}
                        x={getX(i) - barWidth/2 - 2} 
                        y={dimensions.height - 40} 
                        width={barWidth + 4} 
                        height={10} 
                        fill="#fbbf24" // Gold
                     />
                 )
            }
            return null;
        });
    }

    // 10. Consensus Cloud
    if (activeFeature === 'consensus_cloud') {
        const startX = dimensions.width * 0.5;
        const avgY = getY(lastCandle.close * 1.05);
        const topY = getY(lastCandle.close * 1.15);
        const botY = getY(lastCandle.close * 0.95);

        return (
            <g className="animate-in fade-in duration-1000">
                  <path d={`M ${startX},${getY(data[50].close)} C ${startX + 100},${topY} ${dimensions.width},${topY} ${dimensions.width},${avgY} L ${dimensions.width},${botY} C ${dimensions.width - 50},${botY} ${startX + 50},${botY} ${startX},${getY(data[50].close)}`} fill="#06b6d4" fillOpacity="0.2" />
                  <text x={dimensions.width - 100} y={topY + 20} fill="#22d3ee" fontSize="12" fontWeight="bold">Max: 65.0</text>
                  <text x={dimensions.width - 100} y={avgY} fill="#fff" fontSize="12" fontWeight="bold">Avg: 60.0</text>
                  <text x={dimensions.width - 100} y={botY - 10} fill="#f43f5e" fontSize="12" fontWeight="bold">Min: 54.0</text>
            </g>
        )
    }

    // --- TIER 3: CONTEXT ---

    // 12. Whale Whisperer
    if (activeFeature === 'whale_whisperer') {
        return data.map((d, i) => {
            if (d.volume > 8500 && Math.abs(d.open - d.close) < 0.2) {
                 return (
                     <text key={i} x={getX(i)-8} y={getY(d.high)-10} fontSize="16">🐋</text>
                 )
            }
            return null;
        })
    }

    // 15. Fractal Context
    if (activeFeature === 'fractal_context') {
        const points = data.map((d, i) => `${getX(i)},${getY(d.close * 1.02 - (i > 50 ? i*0.05 : 0))}`).join(' ');
        return (
            <polyline points={points} fill="none" stroke="white" strokeOpacity="0.3" strokeDasharray="2 2" strokeWidth="2" />
        )
    }

    // 17. Social Buzz (Sub-chart)
    if (activeFeature === 'social_buzz') {
        return data.map((d, i) => {
            const h = Math.random() * 30;
            const sentiment = Math.random() > 0.5 ? '#00c853' : '#f23645';
            return (
                <rect key={i} x={getX(i) - barWidth/2} y={dimensions.height - h} width={barWidth} height={h} fill={sentiment} opacity="0.8" />
            )
        })
    }

    // --- TIER 4: SUPPORT ---

    // 19. Event Impact
    if (activeFeature === 'event_impact') {
        const idx = 30;
        return (
            <g>
                <line x1={getX(idx)} y1={0} x2={getX(idx)} y2={dimensions.height} stroke="#fbbf24" strokeDasharray="4 4" />
                <circle cx={getX(idx)} cy={getY(data[idx].high)-20} r="10" fill="#fbbf24" />
                <text x={getX(idx)} y={getY(data[idx].high)-17} textAnchor="middle" fontSize="10" fontWeight="bold">$</text>
                <text x={getX(idx)+15} y={getY(data[idx].high)-17} fontSize="10" fill="#fbbf24">Cổ tức 15%</text>
            </g>
        )
    }
    
    // 21. Ghost Trade
    if (activeFeature === 'ghost_trade') {
        return (
            <g>
                <circle cx={getX(80)} cy={getY(data[80].close)} r="4" fill="#d946ef" />
                <text x={getX(80)} y={getY(data[80].close)-10} textAnchor="middle" fill="#d946ef" fontSize="10">BUY</text>
            </g>
        )
    }
    
    // 14. Visual Fundamentals (PE Bands)
    if (activeFeature === 'visual_fundamentals') {
        return (
            <g>
                 <line x1={0} y1={getY(minPrice*1.05)} x2={dimensions.width} y2={getY(minPrice*1.05)} stroke="#3b82f6" strokeDasharray="5 5" opacity="0.5"/>
                 <text x={10} y={getY(minPrice*1.05)-5} fill="#3b82f6" fontSize="10">P/E 10.x</text>

                 <line x1={0} y1={getY(maxPrice*0.95)} x2={dimensions.width} y2={getY(maxPrice*0.95)} stroke="#ef4444" strokeDasharray="5 5" opacity="0.5"/>
                 <text x={10} y={getY(maxPrice*0.95)-5} fill="#ef4444" fontSize="10">P/E 20.x</text>
            </g>
        )
    }

    return null;
  };

  // ==================================================================================
  // HTML OVERLAY LOGIC (Absolute Positioned Divs)
  // ==================================================================================

  const renderHtmlOverlays = () => {
      if (!activeFeature) return null;

      // 2. VIP Heatmap Background
      if (activeFeature === 'vip_room_heatmap') {
          return (
              <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-transparent via-[#00c853]/10 to-[#00c853]/30" />
          )
      }

      // 3. Foreign Room Arbitrage
      if (activeFeature === 'foreign_room_arbitrage') {
          return (
              <div className="absolute top-16 right-4 w-48 bg-[#000]/80 border border-[#2c2c2e] rounded-lg p-3 z-30 shadow-[0_0_15px_rgba(0,255,0,0.2)] animate-pulse">
                  <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-400">Room Ngoại</span>
                      <span className="text-[10px] text-[#00c853] font-bold border border-[#00c853] px-1 rounded animate-pulse">HỞ ROOM</span>
                  </div>
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden mb-2">
                      <div className="h-full bg-[#00c853] w-[95%]"></div>
                  </div>
                  <div className="text-right text-xs text-white font-mono mb-2">95.4% <span className="text-gray-500">-></span> 100%</div>
                  <button className="w-full bg-[#00c853] text-black font-bold text-xs py-1 rounded hover:bg-[#00e676]">MUA NGAY (MP)</button>
              </div>
          )
      }

      // 6. Native Trade
      if (activeFeature === 'native_trade') {
          return (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center">
                   <div className="flex gap-2 mb-2">
                       <button className="bg-[#00c853] text-white px-6 py-3 rounded font-bold shadow-lg hover:scale-105 transition-transform">MUA</button>
                       <button className="bg-[#f23645] text-white px-6 py-3 rounded font-bold shadow-lg hover:scale-105 transition-transform">BÁN</button>
                   </div>
                   <div className="bg-black/80 text-white px-3 py-1 rounded border border-dashed border-gray-500 text-xs">
                       P&L: <span className="text-[#00c853] font-bold">+2,500,000</span> (Tạm tính)
                   </div>
                   {/* Breakeven Line Simulator */}
                   <div className="absolute w-[800px] h-[1px] bg-yellow-500 border-dashed top-1/2 -z-10 opacity-50"></div>
                   <span className="absolute right-[-400px] top-1/2 -translate-y-1/2 text-yellow-500 text-[10px] bg-black px-1">Giá vốn</span>
              </div>
          )
      }

      // 7. ETF Popup
      if (activeFeature === 'etf_rebalancing') {
          return (
              <div className="absolute top-20 right-24 bg-blue-900/90 text-white p-2 rounded text-xs border border-blue-500 z-30 max-w-[150px]">
                  <strong>Quỹ Diamond</strong>
                  <br/>
                  Dự kiến MUA: 3tr CP
                  <br/>
                  <span className="text-gray-300 text-[10px]">Review: 15/3</span>
              </div>
          )
      }

      // 9. Earnings Replay
      if (activeFeature === 'earnings_replay') {
          return (
              <div className="absolute bottom-10 left-10 bg-[#1c1c1e] border border-[#2c2c2e] p-3 rounded shadow-lg z-30 w-64">
                  <div className="text-xs font-bold text-gray-300 mb-2 border-b border-gray-700 pb-1">Lịch sử BCTC (4 kỳ gần nhất)</div>
                  <div className="space-y-2">
                      <div className="flex justify-between text-xs"><span className="text-gray-500">Q3/24</span> <span className="text-[#00c853] font-bold">+15% (Sau tin)</span></div>
                      <div className="flex justify-between text-xs"><span className="text-gray-500">Q2/24</span> <span className="text-[#f23645] font-bold">-5% (Sau tin)</span></div>
                      <div className="flex justify-between text-xs"><span className="text-gray-500">Q1/24</span> <span className="text-[#00c853] font-bold">+8% (Sau tin)</span></div>
                  </div>
                  <div className="mt-2 text-[10px] text-orange-400 italic">Xu hướng: Tăng 3/4 lần</div>
              </div>
          )
      }

      // 11. Bull Bear Debate
      if (activeFeature === 'bull_bear_debate') {
          return (
            <div className="absolute top-16 right-4 w-64 bg-black/90 border border-gray-700 rounded-lg p-0 overflow-hidden z-30">
                <div className="flex text-xs font-bold text-center">
                    <div className="flex-1 bg-[#00c853]/20 text-[#00c853] py-2 border-b-2 border-[#00c853]">BULL (65%)</div>
                    <div className="flex-1 bg-[#f23645]/20 text-[#f23645] py-2 border-b border-gray-700">BEAR (35%)</div>
                </div>
                <div className="p-3 grid grid-cols-2 gap-2 text-[10px]">
                    <div className="text-gray-300">• Kỳ vọng cổ tức<br/>• Tây mua ròng</div>
                    <div className="text-gray-400 border-l border-gray-700 pl-2">• Giá cao su giảm<br/>• Cản 60 cứng</div>
                </div>
            </div>
          )
      }

      // 13. Sector Rotation
      if (activeFeature === 'sector_rotation') {
          return (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#1c1c1e]/80 backdrop-blur px-4 py-1 rounded-full border border-[#2962ff]/50 text-xs text-white z-20 whitespace-nowrap overflow-hidden w-[300px]">
                  <div className="animate-marquee inline-block">
                      Dòng tiền rút khỏi <span className="text-[#f23645]">BĐS</span> {'->'} Sang <span className="text-[#00c853]">Thép</span>. HPG RS: 98 (Mạnh hơn ngành).
                  </div>
              </div>
          )
      }

      // 14. Visual Fundamentals (Growth Badges)
      if (activeFeature === 'visual_fundamentals') {
          // Render HTML badges over chart
          return (
              <div className="absolute top-[40%] left-[30%] bg-[#00c853] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-lg transform -translate-y-1/2 z-20">
                  🚀 +20% YoY
              </div>
          )
      }

      // 20. Scenario Planner
      if (activeFeature === 'scenario_planner') {
          return (
              <div className="absolute top-[30%] right-[20%] w-[1px] h-[300px] bg-[#2962ff] border-r border-dashed border-[#2962ff] z-30 group cursor-ew-resize">
                   <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-full bg-[#2962ff] text-white text-xs px-2 py-1 rounded mb-1 whitespace-nowrap">
                       Mục tiêu: 62.0 (+12%)
                   </div>
                   <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-full bg-black text-xs px-2 py-1 rounded border border-gray-700 whitespace-nowrap">
                       PE fwd: 15.x
                   </div>
              </div>
          )
      }
      
      // 22. AI Insight (Question Marks)
      if (activeFeature === 'ai_fundamental_insight') {
           return (
               <div className="absolute top-4 left-4 z-50">
                   {/* This would normally be near stats, simulating overlay on top-left info block */}
                   <div className="absolute top-8 left-20 cursor-pointer text-gray-400 hover:text-white">
                       <HelpCircle size={14} />
                       {/* Tooltip */}
                       <div className="absolute left-6 top-0 w-48 bg-black border border-gray-600 p-2 text-[10px] text-gray-300 rounded hidden hover:block">
                           P/E (Price to Earnings): Hệ số giá trên thu nhập. P/E thấp hơn trung bình ngành thường là rẻ.
                       </div>
                   </div>
               </div>
           )
      }
      
      // 16. Rumor Credibility Score (Simulated Popup for TIER 3)
      if (activeFeature === 'rumor_credibility') {
          return (
              <div className="absolute top-1/4 left-1/3 z-50 animate-in zoom-in">
                   <div className="bg-[#1c1c1e] border border-gray-700 rounded-lg p-3 w-64 shadow-2xl">
                       <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-white">Tin đồn: Game phát hành thêm</span>
                            <Shield size={14} className="text-[#00c853] fill-[#00c853]/20" />
                       </div>
                       <div className="flex items-center gap-2 mb-2">
                           <img src="https://i.pravatar.cc/150?u=source" className="w-6 h-6 rounded-full" />
                           <div className="text-[10px]">
                               <div className="text-white font-bold">Nguồn: FireAnt User</div>
                               <div className="text-gray-500">Độ tin cậy: <span className="text-[#00c853] font-bold">Cao (85%)</span></div>
                           </div>
                       </div>
                       <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                           <div className="bg-[#00c853] h-full w-[85%]"></div>
                       </div>
                   </div>
              </div>
          )
      }

      return null;
  }


  // ==================================================================================
  // MAIN RENDER
  // ==================================================================================
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
          // Ghost Trade Color Override
          if (activeFeature === 'ghost_trade') fill = '#d946ef';

          return (
            <g key={i} className="group">
              <line x1={x + barWidth / 2} y1={yHigh} x2={x + barWidth / 2} y2={yLow} stroke={fill} strokeWidth="1" />
              <rect 
                x={x} 
                y={Math.min(yOpen, yClose)} 
                width={barWidth} 
                height={Math.max(1, Math.abs(yOpen - yClose))} 
                fill={fill} 
              />
              
              {/* 18. AI Context Hover */}
              {activeFeature === 'ai_context' && (
                  <foreignObject x={x - 60} y={yHigh - 60} width="120" height="60" className="overflow-visible opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                       <div className="bg-blue-900/90 text-white text-[10px] p-2 rounded border border-blue-500 shadow-xl">
                           Biến động: {(Math.random()*3).toFixed(1)}%
                           <br/>
                           <span className="italic text-gray-300">"Áp lực chốt lời T+2.5"</span>
                       </div>
                  </foreignObject>
              )}
            </g>
          );
        })}
        
        {renderOverlays()}

        {/* Current Price Line */}
        {lastCandle && (
           <line x1={0} y1={getY(lastCandle.close)} x2={dimensions.width} y2={getY(lastCandle.close)} stroke={activeFeature === 'ghost_trade' ? '#d946ef' : (lastCandle.close >= lastCandle.open ? colorUp : colorDown)} strokeWidth="1" strokeDasharray="4 4" opacity="0.8" />
        )}
      </svg>
      
      {/* HTML Layer */}
      {renderHtmlOverlays()}

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