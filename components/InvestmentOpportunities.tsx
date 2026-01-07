
import React from 'react';
import { FilterHeader } from './opportunities/FilterHeader';
import { SignalCard } from './opportunities/SignalCard';
import { ExpertSidebar } from './opportunities/ExpertSidebar';
import { SIGNALS } from './opportunities/constants';

export const InvestmentOpportunities: React.FC = () => {
  return (
    <div className="flex h-full w-full bg-[#000000] text-white overflow-hidden font-sans">
      
      {/* LEFT COLUMN - MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-[#1c1c1e]">
        
        <FilterHeader />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#000000] custom-scrollbar">
            
            {/* Signals Grid: 4 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {SIGNALS.map((signal) => (
                    <SignalCard key={signal.id} signal={signal} />
                ))}
            </div>

            <div className="h-10"></div> {/* Spacer */}
        </div>
      </div>

      {/* RIGHT COLUMN - SIDEBAR */}
      <ExpertSidebar />
      
    </div>
  );
};
