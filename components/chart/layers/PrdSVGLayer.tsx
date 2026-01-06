import React, { useState, useMemo } from 'react';
import { CandleData } from '../../../types';
import { PrdModuleId, getSafetyScannerPoints, getGhostPath, getTrappedZone, getExecutionPlan, getSentimentMarkers, getGhostMatchRange, getPeBands } from '../prdConstants';
import { BarChart2 } from 'lucide-react';

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

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    // Reverse engineer index from X. 
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
    
    if (minDiff < 30) { 
        setHoverIndex(closestIndex);
    } else {
        setHoverIndex(null);
    }
  };

  const handleMouseLeave = () => {
      setHoverIndex(null);
  };

  // Module 1: T+ Safety Scanner
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
                 <filter id="glowSelect" x="-50%" y="-50%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
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
                          <line 
                            x1={x} y1={y} 
                            x2={x} y2={getY(data[pt.index].high)} 
                            stroke={color} strokeWidth="1" strokeDasharray="3 3"
                          />
                          <circle cx={x} cy={y} r={isSelected ? 7 : 5} fill={color} stroke="#000" strokeWidth="1.5" filter={pt.result === 'win' || isSelected ? 'url(#glowGreen)' : ''} />
                          <text x={x} y={y - 12} textAnchor="middle" fill={color} fontSize="9" fontWeight="bold">{pt.return}</text>
                      </g>
                  );
              })}
          </g>
      );
  }

  // Module 3: Sentiment 360
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
                  <g 
                    key={m.id} 
                    className="cursor-pointer hover:scale-110 transition-transform"
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect(m.id);
                    }}
                  >
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

  // Module 2: Ghost Projection
  if (activeModule === 'ghost_projection') {
      const path = getGhostPath(data, dimensions, getX, getY);
      const { start, end, similarity } = getGhostMatchRange(data.length);
      const startX = getX(start);
      const width = getX(end) - startX;
      
      return (
          <g className="animate-in fade-in duration-1000">
               <defs>
                   <marker
                        id="arrowhead-orange"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                   >
                       <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
                   </marker>
                   <pattern id="diagonalHatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                        <rect width="2" height="4" transform="translate(0,0)" fill="#06b6d4" fillOpacity="0.2"/>
                   </pattern>
               </defs>

               {/* 1. Historical Match Highlight */}
               <rect 
                  x={startX} 
                  y={0} 
                  width={width} 
                  height={dimensions.height} 
                  fill="url(#diagonalHatch)" 
                  opacity="0.5"
               />
               <rect 
                  x={startX} 
                  y={0} 
                  width={width} 
                  height={dimensions.height} 
                  stroke="#06b6d4"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  fill="none"
                  opacity="0.7"
               />
               <rect x={startX} y={dimensions.height - 30} width={width} height={20} fill="#06b6d4" opacity="0.8" rx="2" />
               <text x={startX + width/2} y={dimensions.height - 16} textAnchor="middle" fill="black" fontSize="9" fontWeight="bold">
                   TƯƠNG ĐỒNG {similarity}
               </text>

               {/* 2. Ghost Path */}
               <path 
                  d={path} 
                  fill="none" 
                  stroke="#f59e0b" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  markerEnd="url(#arrowhead-orange)"
                  className="drop-shadow-lg"
               />
          </g>
      );
  }

  // Module 4: Valuation & Sector (P/E Bands) - REDESIGNED
  if (activeModule === 'valuation_sector') {
      const peBands = useMemo(() => getPeBands(data), [data]);
      
      // Helper to build area polygon
      // Fills area between Top Line and Bottom Line
      const buildBandArea = (topKey: 'pe20'|'pe15', botKey: 'pe15'|'pe10') => {
          let topPts = "";
          let botPts = ""; 
          
          peBands.forEach((b, i) => {
              const x = getX(i);
              const yTop = getY(b[topKey]);
              const yBot = getY(b[botKey]);

              if (i === 0) {
                  topPts += `M ${x} ${yTop}`;
                  botPts = `L ${x} ${yBot}`; 
              } else {
                  topPts += ` L ${x} ${yTop}`;
                  botPts = `L ${x} ${yBot} ` + botPts; 
              }
          });
          return topPts + " " + botPts + " Z";
      };

      const getLinePath = (key: 'pe20'|'pe15'|'pe10') => {
          return peBands.map((b, i) => `${i===0?'M':'L'} ${getX(i)} ${getY(b[key])}`).join(' ');
      };

      const pathGreyBand = buildBandArea('pe20', 'pe15');
      const pathYellowBand = buildBandArea('pe15', 'pe10');
      
      const line20 = getLinePath('pe20');
      const line15 = getLinePath('pe15');
      const line10 = getLinePath('pe10');

      // Determine tooltip data
      const targetIndex = hoverIndex !== null ? hoverIndex : data.length - 1;
      const targetData = peBands[targetIndex];
      const targetCandle = data[targetIndex];
      const tx = getX(targetIndex);
      const ty = getY(targetCandle.close);
      
      // Dynamic Tooltip Content based on Zone
      let tooltipText = "Định giá hợp lý";
      let tooltipColor = "#1e293b"; // Dark blue
      let tooltipIcon = "⚖️";

      if (targetCandle.close <= targetData.pe10 * 1.05) {
          tooltipText = "Vùng định giá rẻ trong lịch sử";
          tooltipColor = "#d97706"; // Gold
          tooltipIcon = "📈";
      } else if (targetCandle.close >= targetData.pe20 * 0.95) {
          tooltipText = "Vùng định giá đắt";
          tooltipColor = "#64748b"; // Grey
          tooltipIcon = "⚠️";
      }

      // Labels Position (Far right of the visible data)
      const lastBand = peBands[peBands.length - 1];
      const lx = getX(data.length - 1) + 10;

      return (
          <g className="animate-in fade-in duration-700" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
               {/* Invisible rect for mouse capture */}
               <rect x={0} y={0} width={dimensions.width} height={dimensions.height} fill="transparent" />

               <defs>
                   {/* Gradients to match the 'Band' look in the image */}
                   <linearGradient id="fillGrey" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.3" />
                       <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.1" />
                   </linearGradient>
                   <linearGradient id="fillYellow" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
                       <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.1" />
                   </linearGradient>
               </defs>

               {/* 1. Render Bands (Areas) */}
               <path d={pathGreyBand} fill="url(#fillGrey)" stroke="none" />
               <path d={pathYellowBand} fill="url(#fillYellow)" stroke="none" />

               {/* 2. Render Lines (Borders) */}
               <path d={line20} fill="none" stroke="#9ca3af" strokeWidth="1.5" />
               <path d={line15} fill="none" stroke="#1e293b" strokeWidth="2" />
               <path d={line10} fill="none" stroke="#d97706" strokeWidth="1.5" />

               {/* 3. Render Right Axis Labels */}
               <g transform={`translate(${lx}, 0)`}>
                    {/* PE 20 */}
                    <circle cx={0} cy={getY(lastBand.pe20)} r="3" fill="#9ca3af" />
                    <text x={8} y={getY(lastBand.pe20) + 4} fill="#9ca3af" fontSize="11" fontWeight="bold">P/E 20</text>
                    <line x1={0} y1={getY(lastBand.pe20)} x2={6} y2={getY(lastBand.pe20)} stroke="#9ca3af" strokeWidth="1" />

                    {/* PE 15 */}
                    <circle cx={0} cy={getY(lastBand.pe15)} r="4" fill="#1e293b" stroke="#000" strokeWidth="1" />
                    <text x={8} y={getY(lastBand.pe15) + 4} fill="#cbd5e1" fontSize="14" fontWeight="bold">P/E 15</text>
                    <line x1={0} y1={getY(lastBand.pe15)} x2={6} y2={getY(lastBand.pe15)} stroke="#1e293b" strokeWidth="2" />

                    {/* PE 10 */}
                    <circle cx={0} cy={getY(lastBand.pe10)} r="3" fill="#d97706" />
                    <text x={8} y={getY(lastBand.pe10) + 4} fill="#d97706" fontSize="11" fontWeight="bold">P/E 10</text>
                    <line x1={0} y1={getY(lastBand.pe10)} x2={6} y2={getY(lastBand.pe10)} stroke="#d97706" strokeWidth="1" />
               </g>

               {/* 4. Interactive Tooltip (Styled like image) */}
               {hoverIndex !== null && (
                   <g transform={`translate(${tx}, ${ty})`}>
                       {/* Line from point down to axis or chart bottom */}
                       <line x1={0} y1={0} x2={0} y2={100} stroke={tooltipColor} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                       
                       {/* Connector Dot */}
                       <circle r="4" fill="white" stroke={tooltipColor} strokeWidth="2" />
                       
                       {/* Tooltip Card */}
                       <g transform="translate(-10, 20)">
                           <rect x="0" y="0" width="150" height="45" rx="8" fill="#fffbe6" stroke="#d97706" strokeWidth="1" filter="drop-shadow(0px 4px 12px rgba(0,0,0,0.3))" />
                           <foreignObject x="0" y="0" width="150" height="45">
                               <div className="w-full h-full flex items-center px-3 gap-2">
                                   <div className="text-xl">{tooltipIcon}</div>
                                   <div className="flex flex-col">
                                       <span className="text-[10px] font-bold text-gray-800 leading-tight">{tooltipText}</span>
                                   </div>
                               </div>
                           </foreignObject>
                       </g>
                   </g>
               )}
          </g>
      );
  }

  // Module 5: Trapped Zones
  if (activeModule === 'trapped_zones') {
      const zone = getTrappedZone(maxPrice, priceRange);
      const yTop = getY(zone.top);
      const yBottom = getY(zone.bottom);
      
      return (
          <g className="animate-in slide-in-from-right duration-500">
               <defs>
                  <pattern id="trappedHatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <rect width="4" height="8" transform="translate(0,0)" fill="#ef4444" fillOpacity="0.15"></rect>
                  </pattern>
                  <linearGradient id="trappedFade" x1="0" y1="0" x2="1" y2="0">
                       <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                       <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
                  </linearGradient>
              </defs>
              {/* Zone Rectangle */}
              <rect 
                  x={getX(data.length - 45)} 
                  y={yTop} 
                  width={dimensions.width} 
                  height={yBottom - yTop} 
                  fill="url(#trappedHatch)" 
                  stroke="url(#trappedFade)" 
                  strokeWidth="2"
              />
              <text x={getX(data.length - 40)} y={yTop - 5} fill="#ef4444" fontSize="11" fontWeight="bold">KHÁNG CỰ: KẸP HÀNG LỚN</text>
          </g>
      );
  }

  // Module 6: Execution Plan
  if (activeModule === 'execution_plan') {
      const plan = getExecutionPlan(lastCandle.close);
      const entryY = getY(plan.entry);
      const tpY = getY(plan.tp);
      const slY = getY(plan.sl);
      const startLineX = getX(data.length - 15);

      return (
          <g className="animate-in fade-in duration-300">
              {/* TP Line */}
              <line x1={startLineX} y1={tpY} x2={dimensions.width} y2={tpY} stroke="#00c853" strokeWidth="2" strokeDasharray="5 3" />
              <rect x={dimensions.width - 60} y={tpY - 10} width="60" height="20" rx="4" fill="#00c853" />
              <text x={dimensions.width - 30} y={tpY + 4} textAnchor="middle" fill="black" fontSize="10" fontWeight="bold">TP +7%</text>
              
              {/* Entry Line */}
              <line x1={startLineX} y1={entryY} x2={dimensions.width} y2={entryY} stroke="#2962ff" strokeWidth="2" strokeDasharray="5 3" />
              <rect x={dimensions.width - 60} y={entryY - 10} width="60" height="20" rx="4" fill="#2962ff" />
              <text x={dimensions.width - 30} y={entryY + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">MUA</text>

              {/* SL Line */}
              <line x1={startLineX} y1={slY} x2={dimensions.width} y2={slY} stroke="#f23645" strokeWidth="2" strokeDasharray="5 3" />
              <rect x={dimensions.width - 60} y={slY - 10} width="60" height="20" rx="4" fill="#f23645" />
              <text x={dimensions.width - 30} y={slY + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">SL -4%</text>
          </g>
      );
  }

  return null;
};