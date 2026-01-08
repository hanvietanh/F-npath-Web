
import React, { useState } from 'react';
import { OrderBookTable } from '../trading/OrderBook';
import { OrderPlacementPanel } from '../trading/OrderPanel';
import { WatchlistTabContent } from './rightSidebar/WatchlistTabContent';
import { StockDetail } from './rightSidebar/StockDetail';
import { NewsTab } from './rightSidebar/NewsTab';

interface RightSidebarProps {
  isTradeMode: boolean;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ isTradeMode }) => {
  const [sidebarTab, setSidebarTab] = useState('Theo dõi');

  // If in Trade Mode, we replace the entire sidebar content with the Order Panel
  if (isTradeMode) {
      return (
        <div className="w-[320px] flex flex-col h-full bg-[#13171b] border-l border-[#1c1c1e] shrink-0 z-30 transition-all duration-300">
            <div className="flex flex-col h-full overflow-hidden">
                <div className="shrink-0">
                     <div className="px-3 py-2 bg-[#1a1f26] border-b border-[#1c1c1e] text-xs font-bold text-white flex justify-between items-center">
                         <span>Sổ Lệnh</span>
                         <span className="text-gray-500 font-normal">PHR</span>
                     </div>
                     <OrderBookTable />
                </div>
                
                <div className="flex-1 bg-[#000000] relative min-h-0 overflow-y-auto">
                    <OrderPlacementPanel />
                </div>
            </div>
        </div>
      );
  }

  // Normal Mode: Show Tabs (Chi tiết, AI News, Theo dõi, Chỉ số)
  return (
    <div className="w-[320px] flex flex-col h-full bg-[#13171b] border-l border-[#1c1c1e] shrink-0 z-30 transition-all duration-300">
        
        {/* Top-Level Tabs */}
        <div className="flex h-10 border-b border-[#1c1c1e] bg-[#13171b] shrink-0">
            {['Chi tiết', 'AI News', 'Theo dõi', 'Chỉ số'].map((tab) => (
                <button 
                    key={tab} 
                    onClick={() => setSidebarTab(tab)}
                    className={`flex-1 text-xs font-bold uppercase tracking-wide hover:bg-[#1e2329] transition-colors relative
                    ${sidebarTab === tab ? 'text-[#2962ff] bg-[#1a1f26]' : 'text-gray-500'}`}
                >
                    {tab}
                    {sidebarTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2962ff]" />}
                </button>
            ))}
        </div>

        {/* Content based on Tab */}
        <div className="flex-1 overflow-hidden flex flex-col">
            {sidebarTab === 'Theo dõi' && (
                <WatchlistTabContent />
            )}

            {sidebarTab === 'Chi tiết' && (
                <StockDetail />
            )}

            {sidebarTab === 'AI News' && (
                 <NewsTab />
            )}

            {sidebarTab === 'Chỉ số' && (
                 <div className="flex-1 flex items-center justify-center text-gray-500 text-xs">Chỉ số content coming soon</div>
            )}
        </div>
    </div>
  );
};
