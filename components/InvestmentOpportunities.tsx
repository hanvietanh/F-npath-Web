
import React, { useState } from 'react';
import { FilterHeader } from './opportunities/FilterHeader';
import { SignalCard } from './opportunities/SignalCard';
import { ExpertSidebar } from './opportunities/ExpertSidebar';
import { SignalDetailModal } from './opportunities/SignalDetailModal';
import { SIGNALS, SignalData } from './opportunities/constants';

export const InvestmentOpportunities: React.FC = () => {
  const [selectedSignal, setSelectedSignal] = useState<SignalData | null>(null);

  return (
    <div className="flex h-full w-full bg-[#000000] text-white overflow-hidden font-sans relative">
      
      {/* Modal Overlay */}
      {selectedSignal && (
          <SignalDetailModal 
              signal={selectedSignal} 
              onClose={() => setSelectedSignal(null)} 
          />
      )}

      {/* LEFT COLUMN - MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-[#1c1c1e]">
        
        <FilterHeader />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#000000] custom-scrollbar">
            
            {/* Signals Grid: 4 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {SIGNALS.map((signal) => (
                    <SignalCard 
                        key={signal.id} 
                        signal={signal} 
                        onDetail={() => setSelectedSignal(signal)}
                    />
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
