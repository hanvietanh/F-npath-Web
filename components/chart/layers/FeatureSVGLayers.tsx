import React from 'react';
import { CandleData } from '../../../types';
import { Cloud, Newspaper } from 'lucide-react';

interface FeatureSVGProps {
  activeFeature: string;
  data: CandleData[];
  dimensions: { width: number; height: number };
  getX: (i: number) => number;
  getY: (p: number) => number;
  padding: { top: number; bottom: number; right: number };
  effectiveHeight: number;
  barWidth: number;
  minPrice: number;
  maxPrice: number;
  priceRange: number;
  lastCandle: CandleData;
}

export const FeatureSVGLayers: React.FC<FeatureSVGProps> = ({
  activeFeature, data, dimensions, getX, getY, padding, effectiveHeight, barWidth, minPrice, maxPrice, priceRange, lastCandle
}) => {

  // --- TIER 1 ---
  if (activeFeature === 'smart_money_divergence') {
    const points = data.map((d, i) => {
        let flowVal = d.close;
        if (i > 70) flowVal = flowVal * (1 - (i-70)*0.001); 
        return `${getX(i)},${getY(flowVal) + 50}`; 
    }).join(' ');
    return (
        <g className="animate-in fade-in duration-500">
            <rect x={getX(70)} y={padding.top} width={getX(99) - getX(70)} height={effectiveHeight} fill="#f97316" fillOpacity="0.1" />
            <polyline points={points} fill="none" stroke="#f97316" strokeWidth="2.5" />
            <text x={getX(90)} y={getY(data[90].close) + 65} fill="#f97316" fontSize="12" fontWeight="bold">Smart Money Accumulation</text>
        </g>
    );
  }

  if (activeFeature === 'vip_room_heatmap') {
    return (
      <>
        {data.map((d, i) => {
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
        })}
      </>
    );
  }

  if (activeFeature === 'rumor_timeline') {
    const t0 = 40; // Rumor
    const tN = 65; // Official
    return (
        <g>
            <path d={`M ${getX(t0)} ${getY(data[t0].high)-30} Q ${(getX(t0)+getX(tN))/2} ${getY(data[t0].high)-60} ${getX(tN)} ${getY(data[tN].high)-30}`} fill="none" stroke="#a855f7" strokeDasharray="4 4" />
            <rect x={(getX(t0)+getX(tN))/2 - 40} y={getY(data[t0].high)-70} width="80" height="20" rx="4" fill="#a855f7" />
            <text x={(getX(t0)+getX(tN))/2} y={getY(data[t0].high)-56} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">+15% (Priced-in)</text>
            
            <g transform={`translate(${getX(t0)-12}, ${dimensions.height - 30})`}><Cloud size={24} className="text-gray-400 fill-gray-600" /></g>
            <line x1={getX(t0)} y1={dimensions.height-30} x2={getX(t0)} y2={getY(data[t0].low)} stroke="gray" strokeDasharray="2 2" />

            <g transform={`translate(${getX(tN)-12}, ${dimensions.height - 30})`}><Newspaper size={24} className="text-white fill-blue-500" /></g>
            <line x1={getX(tN)} y1={dimensions.height-30} x2={getX(tN)} y2={getY(data[tN].low)} stroke="gray" strokeDasharray="2 2" />
        </g>
    )
  }

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

  // --- TIER 2 ---
  if (activeFeature === 'etf_rebalancing') {
    const xFuture = dimensions.width - 80;
    return (
        <g>
            <line x1={xFuture} y1={padding.top} x2={xFuture} y2={dimensions.height} stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />
            <text x={xFuture} y={padding.top - 10} textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">Ngày 15/3</text>
        </g>
    )
  }

  if (activeFeature === 'prop_trading') {
    return (
      <>
        {data.map((d, i) => d.volume > 7000 ? (
           <rect key={i} x={getX(i) - barWidth/2 - 2} y={dimensions.height - 40} width={barWidth + 4} height={10} fill="#fbbf24" />
        ) : null)}
      </>
    );
  }

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

  // --- TIER 3 ---
  if (activeFeature === 'whale_whisperer') {
    return (
      <>
        {data.map((d, i) => (d.volume > 8500 && Math.abs(d.open - d.close) < 0.2) ? (
             <text key={i} x={getX(i)-8} y={getY(d.high)-10} fontSize="16">🐋</text>
        ) : null)}
      </>
    )
  }

  if (activeFeature === 'fractal_context') {
    const points = data.map((d, i) => `${getX(i)},${getY(d.close * 1.02 - (i > 50 ? i*0.05 : 0))}`).join(' ');
    return (
        <polyline points={points} fill="none" stroke="white" strokeOpacity="0.3" strokeDasharray="2 2" strokeWidth="2" />
    )
  }

  if (activeFeature === 'social_buzz') {
    return (
      <>
        {data.map((d, i) => {
            const h = Math.random() * 30;
            const sentiment = Math.random() > 0.5 ? '#00c853' : '#f23645';
            return <rect key={i} x={getX(i) - barWidth/2} y={dimensions.height - h} width={barWidth} height={h} fill={sentiment} opacity="0.8" />
        })}
      </>
    )
  }

  // --- TIER 4 ---
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
  
  if (activeFeature === 'ghost_trade') {
    return (
        <g>
            <circle cx={getX(80)} cy={getY(data[80].close)} r="4" fill="#d946ef" />
            <text x={getX(80)} y={getY(data[80].close)-10} textAnchor="middle" fill="#d946ef" fontSize="10">BUY</text>
        </g>
    )
  }
  
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