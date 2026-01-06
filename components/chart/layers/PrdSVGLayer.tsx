import React from 'react';
import { CandleData } from '../../../types';
import { PrdModuleId, getSafetyScannerPoints, getGhostPath, getTrappedZone, getExecutionPlan, getSentimentMarkers } from '../prdConstants';

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

  // Module 3: Sentiment 360 - Interactive Markers
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
      return (
          <g className="animate-in fade-in duration-1000">
               <defs>
                   <linearGradient id="ghostGrad" x1="0" y1="0" x2="1" y2="0">
                       <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                       <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
                   </linearGradient>
               </defs>
               
               {/* Highlight Past Pattern */}
               <rect 
                  x={getX(10)} y={0} 
                  width={getX(35) - getX(10)} height={dimensions.height} 
                  fill="#facc15" fillOpacity="0.05" 
               />
               <text x={getX(10)+5} y={30} fill="#facc15" fontSize="10" opacity="0.8">Pattern Match</text>

               {/* Ghost Path */}
               <path d={path} fill="none" stroke="url(#ghostGrad)" strokeWidth="2.5" strokeDasharray="4 3" strokeLinecap="round" />
               <circle cx={getX(data.length-1)} cy={getY(lastCandle.close)} r="3" fill="#06b6d4" />
          </g>
      );
  }

  // Module 4: Valuation & Sector
  if (activeModule === 'valuation_sector') {
      const avgPE = getY(lastCandle.close * 1.02);
      const minPE = getY(lastCandle.close * 0.92);
      const maxPE = getY(lastCandle.close * 1.12);

      return (
          <g className="animate-in fade-in duration-700">
               {/* PE Bands */}
               <path d={`M 0 ${avgPE} L ${dimensions.width} ${avgPE}`} stroke="#10b981" strokeWidth="1" strokeDasharray="5 5" opacity="0.7" />
               <text x={10} y={avgPE - 5} fill="#10b981" fontSize="10">Avg P/E (5Y)</text>

               <path d={`M 0 ${minPE} L ${dimensions.width} ${minPE}`} stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
               <text x={10} y={minPE - 5} fill="#10b981" fontSize="10" opacity="0.6">Min P/E</text>

               <path d={`M 0 ${maxPE} L ${dimensions.width} ${maxPE}`} stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
               <text x={10} y={maxPE - 5} fill="#10b981" fontSize="10" opacity="0.6">Max P/E</text>

               {/* Right Side Cloud */}
               <defs>
                   <radialGradient id="valueCloud" cx="0.8" cy="0.5" r="0.5">
                       <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                       <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                   </radialGradient>
               </defs>
               <rect x={dimensions.width * 0.6} y={maxPE} width={dimensions.width * 0.4} height={minPE - maxPE} fill="url(#valueCloud)" />
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