import React from 'react';
import { CandleData } from '../../../types';

interface ProjectionLayerProps {
  data: CandleData[];
  dimensions: { width: number; height: number };
  getX: (i: number) => number;
  getY: (p: number) => number;
  padding: { top: number; bottom: number; right: number };
  lastCandle: CandleData;
}

export const ProjectionLayer: React.FC<ProjectionLayerProps> = ({
  data, dimensions, getX, getY, padding, lastCandle
}) => {
  const startIdx = data.length - 1;
  const startX = getX(startIdx);
  const startY = getY(lastCandle.close);
  
  // Calculate independent step for projection to fill the empty space
  // Space available is roughly 50% of width (from startX to width-padding)
  const projectionAreaWidth = dimensions.width - startX - padding.right - 50; 
  const stepX = projectionAreaWidth / 15; // 15 steps projection

  const getProjX = (offset: number) => startX + (offset * stepX);
  
  const areaPath = `
    M ${startX} ${startY}
    L ${getProjX(3)} ${getY(lastCandle.close * 1.01)}
    L ${getProjX(6)} ${getY(lastCandle.close * 1.04)}
    L ${getProjX(10)} ${getY(lastCandle.close * 1.03)}
    L ${getProjX(15)} ${getY(lastCandle.close * 1.08)}
    L ${getProjX(15)} ${getY(lastCandle.close * 1.02)}
    L ${getProjX(10)} ${getY(lastCandle.close * 0.99)}
    L ${getProjX(6)} ${getY(lastCandle.close * 0.98)}
    L ${getProjX(3)} ${getY(lastCandle.close * 0.99)}
    Z
  `;
  
  return (
      <g className="animate-in fade-in duration-1000">
         <defs>
            <linearGradient id="projectionGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#eab308" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#eab308" stopOpacity="0.05" />
            </linearGradient>
         </defs>
         
         {/* Projection Area */}
         <path d={areaPath} fill="url(#projectionGradient)" />
         
         {/* Dashed line for mean path */}
         <path 
            d={`M ${startX} ${startY} Q ${getProjX(7)} ${getY(lastCandle.close * 1.01)} ${getProjX(15)} ${getY(lastCandle.close * 1.05)}`} 
            fill="none" stroke="#eab308" strokeWidth="2" strokeDasharray="4 4" 
         />
         
         {/* Target Circle */}
         <circle cx={getProjX(15)} cy={getY(lastCandle.close * 1.05)} r="4" fill="#eab308" stroke="#000" strokeWidth="1" />
         
         {/* Connecting line to tooltip anchor (approximate) */}
         <line x1={getProjX(8)} y1={getY(lastCandle.close * 1.05) - 40} x2={getProjX(8)} y2={getY(lastCandle.close * 1.03)} stroke="#eab308" strokeWidth="1" />
         <circle cx={getProjX(8)} cy={getY(lastCandle.close * 1.03)} r="2" fill="#eab308" />
      </g>
  );
};