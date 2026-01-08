
import React, { useState, useMemo } from 'react';
import { CandleData } from '../../../types';
import { 
    PrdModuleId, 
    getSafetyScannerPoints, 
    getGhostPath, 
    getTrappedZone, 
    getExecutionPlan, 
    getSentimentMarkers, 
    getGhostMatchRange, 
    getPeBands,
    getConsensusCloud,
    getEventImpactHistory,
    getFundamentalInsights
} from '../prdConstants';

interface PrdSVGLayerProps {
  activeModule: PrdModuleId;
  data: CandleData[];
  dimensions: { width: number; height: number };
  getX: (i: number) => number;
  getY: (p: number) => number;
  lastCandle: CandleData;
  minPrice: number;
  maxPrice: number;
  priceRange: number;
  onSelect: (id: string) => void;
  selectedId: string | null;
}

export const PrdSVGLayer: React.FC<PrdSVGLayerProps> = ({
  activeModule, data, dimensions, getX, getY, lastCandle, maxPrice, priceRange, onSelect, selectedId
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const peBands = useMemo(() => getPeBands(data), [data]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    let closestIndex = -1;
    let minDiff = 1000;

    for(let i=0; i<data.length; i++) {
        const cx = getX(i);
        const diff = Math.abs(cx - x);
        if (diff < minDiff) {
            minDiff = diff;
            closestIndex = i;
        }
    }
    if (minDiff < 50) { 
        setHoverIndex(closestIndex);
    } else {
        setHoverIndex(null);
    }
  };

  const handleMouseLeave = () => {
      setHoverIndex(null);
  };

  // --- Module 1: Safety Scanner ---
  if (activeModule === 'safety_scanner') {
      const points = getSafetyScannerPoints(data);
      return (
          <g>
              <defs>
                 <filter id="glowGreen" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                 </filter>
              </defs>
              {points.map((pt, i) => {
                  const x = getX(pt.index);
                  const y = getY(data[pt.index].high) - 25;
                  const color = pt.result === 'win' ? '#00c853' : '#ef4444';
                  const isSelected = selectedId === pt.id;
                  
                  return (
                      <g 
                        key={i} 
                        className="animate-in zoom-in duration-500 cursor-pointer hover:opacity-80 transition-opacity" 
                        style={{ transformOrigin: `${x}px ${y}px` }}
                        onClick={(e) => {
                             e.stopPropagation();
                             onSelect(pt.id);
                        }}
                      >
                          {isSelected && (
                              <circle cx={x} cy={y} r="12" fill="none" stroke="white" strokeWidth="2" strokeDasharray="2 2" className="animate-spin-slow" />
                          )}
                          <line x1={x} y1={y} x2={x} y2={getY(data[pt.index].high)} stroke={color} strokeWidth="1" strokeDasharray="3 3" />
                          <circle cx={x} cy={y} r={isSelected ? 7 : 5} fill={color} stroke="#000" strokeWidth="1.5" filter={pt.result === 'win' || isSelected ? 'url(#glowGreen)' : ''} />
                          <text x={x} y={y - 12} textAnchor="middle" fill={color} fontSize="9" fontWeight="bold">{pt.return}</text>
                      </g>
                  );
              })}
          </g>
      );
  }

  // --- Module 3: Sentiment 360 ---
  if (activeModule === 'sentiment_360') {
      const markers = getSentimentMarkers(data);
      return (
        <g>
           {markers.map((m) => {
               const x = getX(m.index);
               const y = m.type === 'bull' ? getY(data[m.index].low) + 30 : getY(data[m.index].high) - 30;
               const color = m.type === 'bull' ? '#00c853' : '#f23645';
               const isSelected = selectedId === m.id;

               return (
                  <g key={m.id} className="cursor-pointer hover:scale-110 transition-transform" onClick={(e) => { e.stopPropagation(); onSelect(m.id); }}>
                      {isSelected && <circle cx={x} cy={y} r="14" fill="none" stroke="white" strokeWidth="2" />}
                      <circle cx={x} cy={y} r="10" fill={color} stroke="white" strokeWidth="1.5" />
                      <text x={x} y={y+3} textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">{m.type === 'bull' ? 'TIN' : 'CẢNH'}</text>
                      <line x1={x} y1={y + (m.type === 'bull' ? -10 : 10)} x2={x} y2={m.type === 'bull' ? getY(data[m.index].low) : getY(data[m.index].high)} stroke={color} strokeWidth="1" strokeDasharray="2 2" />
                  </g>
               )
           })}
        </g>
      )
  }

  // --- Module 4: Valuation (P/E Bands Overlay) ---
  if (activeModule === 'valuation_sector') {
      
      const createPath = (key: 'pe20'|'pe15'|'pe10') => {
          return peBands.map((b, i) => {
              const cmd = i === 0 ? 'M' : 'L';
              const x = getX(i);
              return `${cmd} ${x} ${getY(b[key])}`;
          }).join(' ');
      };
      
      const createReversePath = (key: 'pe20'|'pe15'|'pe10') => {
          let d = '';
          for (let i = peBands.length - 1; i >= 0; i--) {
              d += ` L ${getX(i)} ${getY(peBands[i][key])}`;
          }
          return d;
      };

      const line20 = createPath('pe20');
      const line15 = createPath('pe15');
      const line10 = createPath('pe10');
      const reverse15 = createReversePath('pe15');
      const reverse10 = createReversePath('pe10');

      const areaRisk = `M 0 0 L ${dimensions.width} 0 ${createReversePath('pe20')} L 0 ${getY(peBands[0].pe20)} Z`;
      const areaFair = `${line20} ${reverse15} Z`;
      const areaBuy = `${line15} ${reverse10} Z`;
      const areaDeep = `${line10} L ${dimensions.width} ${dimensions.height} L 0 ${dimensions.height} Z`;

      return (
          <g className="animate-in fade-in duration-700">
               <path d={areaRisk} fill="#fecaca" fillOpacity="0.3" stroke="none" /> 
               <path d={areaFair} fill="#fef08a" fillOpacity="0.2" stroke="none" /> 
               <path d={areaBuy} fill="#bbf7d0" fillOpacity="0.2" stroke="none" /> 
               <path d={areaDeep} fill="#86efac" fillOpacity="0.3" stroke="none" /> 

               <path d={line20} fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 4" />
               <path d={line15} fill="none" stroke="#eab308" strokeWidth="2" strokeDasharray="6 4" />
               <path d={line10} fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="6 4" />

               <text x={dimensions.width - 10} y={getY(peBands[peBands.length-1].pe20) - 5} textAnchor="end" fill="#ef4444" fontSize="10" fontWeight="bold">P/E 20x (Risk)</text>
               <text x={dimensions.width - 10} y={getY(peBands[peBands.length-1].pe15) - 5} textAnchor="end" fill="#eab308" fontSize="10" fontWeight="bold">P/E 15x (Fair)</text>
               <text x={dimensions.width - 10} y={getY(peBands[peBands.length-1].pe10) - 5} textAnchor="end" fill="#22c55e" fontSize="10" fontWeight="bold">P/E 10x (Buy)</text>

               {data.length > 85 && (
                   <g transform={`translate(${getX(data.length - 15)}, ${getY(data[data.length - 15].low) + 40})`}>
                       <path d="M 0 0 L 10 -20" stroke="black" strokeWidth="1.5" />
                       <circle cx="10" cy="-20" r="3" fill="black" />
                       <text x="0" y="15" textAnchor="middle" fill="black" fontSize="11" fontWeight="bold" className="drop-shadow-md bg-white/80">
                           Sườn dốc:
                       </text>
                       <text x="0" y="28" textAnchor="middle" fill="black" fontSize="11" className="drop-shadow-md bg-white/80">
                           Giá tụt dưới P/E 10x (Cơ hội mua)
                       </text>
                   </g>
               )}
          </g>
      );
  }

  // --- Module 7: Consensus Cloud (UPDATED: Labels and Fan) ---
  if (activeModule === 'consensus_cloud') {
      const currentPrice = lastCandle.close;
      const { min, avg, max } = getConsensusCloud(currentPrice);
      
      const lastIdx = data.length - 1;
      const startX = getX(lastIdx);
      const startY = getY(currentPrice);
      
      const projectionWidth = 200; 
      const endX = startX + projectionWidth;

      const yMax = getY(max);
      const yAvg = getY(avg);
      const yMin = getY(min);

      return (
          <g className="animate-in fade-in duration-1000">
               <defs>
                   <linearGradient id="fanGradient" x1="0" y1="0" x2="1" y2="0">
                       <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.05" />
                       <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.2" />
                   </linearGradient>
               </defs>

               <path 
                   d={`M ${startX} ${startY} L ${endX} ${yMax} L ${endX} ${yMin} Z`} 
                   fill="url(#fanGradient)" 
                   stroke="none"
               />
               
               <line x1={startX} y1={startY} x2={endX} y2={yMax} stroke="#14b8a6" strokeWidth="1" strokeDasharray="3 3" />
               <line x1={startX} y1={startY} x2={endX} y2={yAvg} stroke="#14b8a6" strokeWidth="1" strokeDasharray="3 3" />
               <line x1={startX} y1={startY} x2={endX} y2={yMin} stroke="#14b8a6" strokeWidth="1" strokeDasharray="3 3" />
               
               <line x1={startX} y1={startY} x2={dimensions.width} y2={startY} stroke="#3b82f6" strokeWidth="2" />
               
               <line x1={endX} y1={yMax} x2={endX} y2={yMin} stroke="#14b8a6" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />

               {/* --- LABELS (Updated visual style) --- */}
               
               {/* Max Label */}
               <g transform={`translate(${endX + 5}, ${yMax})`}>
                   <rect x="0" y="-10" width="110" height="20" rx="2" fill="#14b8a6" />
                   <text x="5" y="4" fill="white" fontSize="10" fontWeight="bold">Max +33.44%</text>
                   <text x="105" y="4" textAnchor="end" fill="white" fontSize="10">{max}</text>
               </g>

               {/* Avg Label */}
               <g transform={`translate(${endX + 5}, ${yAvg})`}>
                   <rect x="0" y="-10" width="110" height="20" rx="2" fill="#0d9488" />
                   <text x="5" y="4" fill="white" fontSize="10" fontWeight="bold">TrBinh +19.38%</text>
                   <text x="105" y="4" textAnchor="end" fill="white" fontSize="10">{avg}</text>
               </g>

               {/* Min Label */}
               <g transform={`translate(${endX + 5}, ${yMin})`}>
                   <rect x="0" y="-10" width="110" height="20" rx="2" fill="#14b8a6" />
                   <text x="5" y="4" fill="white" fontSize="10" fontWeight="bold">Min +9.63%</text>
                   <text x="105" y="4" textAnchor="end" fill="white" fontSize="10">{min}</text>
               </g>

               {/* Current Price Label */}
               <g transform={`translate(${dimensions.width - 65}, ${startY})`}>
                   <rect x="0" y="-10" width="65" height="20" rx="2" fill="#3b82f6" />
                   <text x="5" y="4" fill="white" fontSize="10" fontWeight="bold">Hiện tại</text>
                   <text x="60" y="4" textAnchor="end" fill="white" fontSize="10">{currentPrice.toFixed(2)}</text>
               </g>

               {/* Projection Length arrow/line below the min line if needed, visualized as "DỰ BÁO" in old code. 
                   Screenshot shows a yellow projection arrow elsewhere, so this fan is clean. 
               */}
               
               <circle cx={startX} cy={startY} r="4" fill="#3b82f6" stroke="white" strokeWidth="1" />
          </g>
      );
  }

  // --- Module 8: Event Impact ---
  if (activeModule === 'event_impact') {
      const events = getEventImpactHistory(data);
      return (
          <g>
              {events.map((evt) => {
                   const x = getX(evt.index);
                   const yHigh = getY(data[evt.index].high);
                   const yLow = getY(data[evt.index].low);
                   const color = evt.result === 'win' ? '#00c853' : '#f23645';
                   const isSelected = selectedId === evt.id;

                   return (
                       <g key={evt.id} className="cursor-pointer" onClick={(e) => { e.stopPropagation(); onSelect(evt.id); }}>
                           <rect x={x - 12} y={0} width={24} height={dimensions.height} fill={color} opacity={isSelected ? 0.2 : 0.05} />
                           <g transform={`translate(${x}, ${yHigh - 25})`} className="animate-in fade-in slide-in-from-bottom-2">
                               <rect x="-35" y="-16" width="70" height="16" rx="4" fill={color} />
                               <text x="0" y="-5" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{evt.label}</text>
                               <path d="M -4 0 L 0 5 L 4 0 Z" fill={color} />
                           </g>
                           <g transform={`translate(${x}, ${yLow + 25})`}>
                               <circle r="10" fill="#1c1c1e" stroke={color} strokeWidth="1.5" />
                               <path d="M -4 -2 L 0 4 L 4 -4" stroke={color} strokeWidth="1.5" fill="none" />
                           </g>
                       </g>
                   )
               })}
          </g>
      );
  }

  // --- Module 9: Fundamental Insight ---
  if (activeModule === 'fundamental_insight') {
      const fundamentals = getFundamentalInsights(data);
      return (
          <g>
              {fundamentals.map((fund) => {
                   const x = getX(fund.index);
                   const y = getY(data[fund.index].low) + 30;
                   const isSelected = selectedId === fund.id;
                   
                   return (
                       <g key={fund.id} className="cursor-pointer hover:scale-110 transition-transform" onClick={(e) => { e.stopPropagation(); onSelect(fund.id); }}>
                           {isSelected && <circle cx={x} cy={y} r="16" fill="none" stroke="white" strokeWidth="2" />}
                           <rect x={x-9} y={y-9} width={18} height={18} rx="4" fill={fund.type === 'NEGATIVE' ? '#ec4899' : '#00c853'} />
                           <text x={x} y={y+4} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">E</text>
                           <text x={x} y={y+24} textAnchor="middle" fill={fund.type === 'NEGATIVE' ? '#ec4899' : '#00c853'} fontSize="9" fontWeight="bold">BCTC</text>
                       </g>
                   )
               })}
          </g>
      );
  }

  // --- Module 2: Ghost Projection ---
  if (activeModule === 'ghost_projection') {
      const path = getGhostPath(data, dimensions, getX, getY);
      const { start, end, similarity } = getGhostMatchRange(data.length);
      const startX = getX(start);
      const width = getX(end) - startX;
      
      return (
          <g className="animate-in fade-in duration-1000">
               <defs>
                   <pattern id="diagonalHatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                        <rect width="2" height="4" transform="translate(0,0)" fill="#06b6d4" fillOpacity="0.2"/>
                   </pattern>
               </defs>
               <rect x={startX} y={0} width={width} height={dimensions.height} fill="url(#diagonalHatch)" opacity="0.5" />
               <path d={path} fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
               <text x={startX + width/2} y={dimensions.height - 16} textAnchor="middle" fill="black" fontSize="9" fontWeight="bold">TƯƠNG ĐỒNG {similarity}</text>
          </g>
      );
  }

  // --- Module 5: Trapped Zones ---
  if (activeModule === 'trapped_zones') {
      const zone = getTrappedZone(maxPrice, priceRange);
      return (
          <g className="animate-in slide-in-from-right duration-500">
              <defs>
                  <pattern id="trappedHatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <rect width="4" height="8" transform="translate(0,0)" fill="#ef4444" fillOpacity="0.15"></rect>
                  </pattern>
              </defs>
              <rect x={getX(data.length - 45)} y={getY(zone.top)} width={dimensions.width} height={getY(zone.bottom) - getY(zone.top)} fill="url(#trappedHatch)" stroke="#ef4444" strokeWidth="2" />
          </g>
      );
  }

  // --- Module 6: Execution Plan ---
  if (activeModule === 'execution_plan') {
      const plan = getExecutionPlan(lastCandle.close);
      const startLineX = getX(data.length - 15);
      return (
          <g>
              <line x1={startLineX} y1={getY(plan.tp)} x2={dimensions.width} y2={getY(plan.tp)} stroke="#00c853" strokeWidth="2" strokeDasharray="5 3" />
              <text x={dimensions.width - 30} y={getY(plan.tp) + 4} textAnchor="middle" fill="#00c853" fontSize="10" fontWeight="bold">TP</text>
              <line x1={startLineX} y1={getY(plan.entry)} x2={dimensions.width} y2={getY(plan.entry)} stroke="#2962ff" strokeWidth="2" strokeDasharray="5 3" />
              <line x1={startLineX} y1={getY(plan.sl)} x2={dimensions.width} y2={getY(plan.sl)} stroke="#f23645" strokeWidth="2" strokeDasharray="5 3" />
          </g>
      );
  }

  return null;
};
