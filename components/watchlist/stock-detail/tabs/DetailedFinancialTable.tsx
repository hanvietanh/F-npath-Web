
import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';
import { detailedReportData } from '../stockDetailConstants';

export const DetailedFinancialTable: React.FC = () => {
  // Sync scrolling logic
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const { scrollLeft, scrollWidth, clientWidth } = target;
    
    // Sync left column vertical scroll if needed (not needed here as sticky handles it, but good for dual grids)
    
    // Check scroll buttons
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
  };

  const scrollBy = (offset: number) => {
    if (rightScrollRef.current) {
        rightScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0b0e11] text-xs font-sans relative select-none">
        {/* Navigation / Scroller Indicators (Optional, mostly for mobile but nice on desktop) */}
        {canScrollLeft && (
            <div className="absolute left-[200px] top-1/2 -translate-y-1/2 z-20 bg-black/50 p-2 rounded-full cursor-pointer hover:bg-black" onClick={() => scrollBy(-200)}>
                <ChevronLeft size={20} className="text-white"/>
            </div>
        )}
        {canScrollRight && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-2 rounded-full cursor-pointer hover:bg-black" onClick={() => scrollBy(200)}>
                <ChevronRight size={20} className="text-white"/>
            </div>
        )}

        <div className="flex-1 overflow-hidden flex border-t border-gray-800">
            {/* LEFT COLUMN: Sticky Row Headers */}
            <div className="w-[200px] shrink-0 bg-[#0b0e11] border-r border-gray-800 z-10 flex flex-col shadow-lg">
                {/* Header Spacer */}
                <div className="h-[40px] border-b border-gray-800 bg-[#151a21]"></div>
                
                {/* Rows */}
                <div className="flex-1 overflow-hidden" ref={leftColRef}> {/* Hidden scroll, synced manually if needed or just aligned by flex */}
                    {detailedReportData.groups.map((group, gIdx) => (
                        <div key={gIdx}>
                            <div className="px-4 py-3 font-bold text-blue-400 text-[11px] uppercase tracking-wider bg-[#0b0e11] border-b border-gray-800/50">
                                {group.title}
                            </div>
                            {group.rows.map((row, rIdx) => (
                                <div key={rIdx} className="px-4 py-3 h-[40px] border-b border-gray-800/50 text-gray-300 font-medium whitespace-nowrap overflow-hidden text-ellipsis hover:bg-[#1e2530] transition-colors flex items-center">
                                    {row.name}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT COLUMN: Scrollable Data */}
            <div 
                className="flex-1 overflow-auto custom-scrollbar" 
                ref={rightScrollRef}
                onScroll={handleScroll}
            >
                <div className="min-w-max">
                    {/* Header Row */}
                    <div className="flex border-b border-gray-800 bg-[#151a21] sticky top-0 z-10">
                        {detailedReportData.periods.map((period, idx) => (
                            <div key={idx} className="w-[100px] py-3 text-center text-gray-400 font-bold shrink-0 border-r border-gray-800/50 last:border-0">
                                {period}
                            </div>
                        ))}
                        <div className="w-[40px]"></div> {/* Padding */}
                    </div>

                    {/* Data Rows */}
                    <div>
                        {detailedReportData.groups.map((group, gIdx) => (
                            <div key={gIdx}>
                                {/* Spacer for Group Title Row */}
                                <div className="py-3 bg-[#0b0e11] border-b border-gray-800/50 opacity-50">
                                    &nbsp;
                                </div>
                                {group.rows.map((row, rIdx) => (
                                    <div key={rIdx} className="flex border-b border-gray-800/50 hover:bg-[#1e2530] transition-colors h-[40px] items-center">
                                        {row.values.map((val, vIdx) => {
                                            // Conditional Formatting
                                            let colorClass = 'text-white';
                                            if (row.name.includes('Tăng trưởng') || row.name.includes('LNST')) {
                                                if (val > 20) colorClass = 'text-emerald-400 font-bold';
                                                else if (val < 0) colorClass = 'text-red-400';
                                                else if (val === 0) colorClass = 'text-yellow-500';
                                            }
                                            
                                            // Handle empty/missing data visualization if needed
                                            const displayVal = val === 0 || val === undefined ? '-' : val.toLocaleString();

                                            return (
                                                <div key={vIdx} className={`w-[100px] text-right pr-4 shrink-0 border-r border-gray-800/30 last:border-0 font-mono ${colorClass}`}>
                                                    {displayVal}{row.unit ? row.unit : ''}
                                                </div>
                                            );
                                        })}
                                        <div className="w-[40px]"></div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
