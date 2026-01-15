import React from 'react';

export const TreemapBlock = ({ symbol, percent, color, className, onClick }: { symbol: string, percent: string, color: string, className?: string, onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className={`relative flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer overflow-hidden p-1 transition-all ${className}`} 
    style={{ backgroundColor: color }}
  >
    <span className="font-bold text-white text-xs md:text-sm drop-shadow-md truncate">{symbol}</span>
    <span className="text-white/90 text-[10px] md:text-xs font-bold">{percent}</span>
  </div>
);