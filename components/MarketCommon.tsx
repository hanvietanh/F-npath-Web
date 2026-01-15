import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { INDICES, WORLD_INDICES } from './mockData';

export const IndicesTickerRow: React.FC<{ selected: string; onSelect: (id: string) => void }> = ({ selected, onSelect }) => {
  const [showWorld, setShowWorld] = useState(false);
  const displayedIndices = showWorld ? WORLD_INDICES : INDICES;

  return (
    <div className="flex items-center w-full h-[40px] border-b border-[#1c1c1e] bg-[#000000] text-xs shrink-0 select-none relative group">
        <div className="flex-1 flex overflow-hidden">
            {displayedIndices.map((idx) => {
               const isActive = selected === idx.id;
               return (
                   <button 
                      key={idx.id} 
                      onClick={() => onSelect(idx.id)}
                      className={`
                          flex-1 h-full flex items-center justify-between px-3 border-r border-[#1c1c1e] last:border-r-0 relative transition-colors group
                          ${isActive ? 'bg-[#121212]' : 'hover:bg-[#121212]'}
                      `}
                   >
                       {isActive && <div className="absolute top-0 left-0 w-full h-[2px] bg-[#2962ff]" />}
                       
                       <div className="flex flex-col items-start gap-0.5 min-w-[50px]">
                           <span className={`font-bold text-[11px] ${isActive ? 'text-white' : 'text-gray-400'}`}>{idx.name}</span>
                           <span className="text-[9px] text-gray-500 font-mono tracking-tight">{idx.vol}</span>
                       </div>

                       <div className="flex-1 mx-2 h-6 opacity-60 group-hover:opacity-100 transition-opacity">
                          <svg width="100%" height="100%" viewBox="0 0 60 25" preserveAspectRatio="none">
                               <defs>
                                  <linearGradient id={`grad-${idx.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" stopColor={idx.color} stopOpacity="0.2" />
                                      <stop offset="100%" stopColor={idx.color} stopOpacity="0" />
                                  </linearGradient>
                               </defs>
                               <path d={idx.path} fill="none" stroke={idx.color} strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
                               <path d={`${idx.path} L60,25 L0,25 Z`} fill={`url(#grad-${idx.id})`} stroke="none" />
                          </svg>
                       </div>

                       <div className="flex flex-col items-end gap-0.5 min-w-[60px]">
                           <div className="flex items-center gap-1">
                              <span className={`font-mono font-bold text-[11px] ${idx.color === '#00c853' ? 'text-[#00c853]' : 'text-[#f23645]'}`}>{idx.val}</span>
                              <span className={`font-mono text-[10px] ${idx.color === '#00c853' ? 'text-[#00c853]' : 'text-[#f23645]'}`}>{idx.chg}</span>
                           </div>
                           <span className="text-[9px] text-gray-500 font-mono tracking-tight">{idx.valTx}</span>
                       </div>
                   </button>
               );
            })}
        </div>
        
        <button 
             onClick={() => setShowWorld(!showWorld)}
             className="absolute right-0 top-0 bottom-0 w-6 bg-[#1c1c1e]/90 hover:bg-[#2962ff] text-gray-400 hover:text-white border-l border-[#2c2c2e] flex items-center justify-center transition-all z-20 shadow-[-5px_0_10px_rgba(0,0,0,0.5)]"
             title={showWorld ? "Quay lại chỉ số VN" : "Xem chỉ số Thế giới"}
        >
              {showWorld ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
    </div>
  );
};

export const MarketOverviewCard: React.FC<{ 
    title: string; 
    children: React.ReactNode; 
    icon: any; 
    active?: boolean; 
    onClick?: () => void;
}> = ({ title, children, icon: Icon, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`
        bg-[#13171b] border rounded p-2 flex flex-col h-full relative overflow-hidden group cursor-pointer transition-all duration-200
        ${active ? 'border-[#2962ff] shadow-[0_0_10px_rgba(41,98,255,0.2)] bg-[#1a1f26]' : 'border-[#2a2e39] hover:border-gray-500'}
    `}
  >
    <div className="flex items-center gap-2 mb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
      <Icon size={12} className={active ? 'text-white' : 'text-[#2962ff]'} />
      <span className={active ? 'text-white' : ''}>{title}</span>
    </div>
    <div className="flex-1 flex flex-col justify-center">
      {children}
    </div>
    
    {active && (
        <div className="absolute top-0 right-0 w-2 h-2 bg-[#2962ff] rounded-bl"></div>
    )}
  </div>
);

export const MiniStockRow = ({ symbol, value, maxVal, onClick }: { symbol: string, value: number, maxVal: number, onClick?: (s: string) => void }) => {
    const isPos = value >= 0;
    const widthPct = Math.min((Math.abs(value) / maxVal) * 100, 100);
    
    return (
        <div className="flex items-center justify-between text-[10px] h-5 cursor-pointer hover:bg-[#2c2c2e] rounded px-1 transition-colors" onClick={() => onClick && onClick(symbol)}>
             <span className="text-gray-300 font-bold w-8">{symbol}</span>
             
             <div className="flex-1 mx-2 h-1.5 bg-[#2a2e39] rounded-full overflow-hidden flex items-center">
                 <div 
                    className={`h-full rounded-full ${isPos ? 'bg-[#00c853]' : 'bg-[#f23645]'}`} 
                    style={{ width: `${widthPct}%` }}
                 />
             </div>

             <span className={`${isPos ? 'text-[#00c853]' : 'text-[#f23645]'} font-medium text-right w-12`}>
                 {value > 0 ? '+' : ''}{value} tỷ
             </span>
        </div>
    );
};