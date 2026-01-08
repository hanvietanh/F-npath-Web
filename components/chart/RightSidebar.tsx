
import React from 'react';
import { OrderBookTable } from '../trading/OrderBook';
import { OrderPlacementPanel } from '../trading/OrderPanel';
import { WatchlistTabContent } from './rightSidebar/WatchlistTabContent';
import { NewsTab } from './rightSidebar/NewsTab';
import { ChevronsRight } from 'lucide-react';

interface RightSidebarProps {
  isTradeMode: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onCollapse?: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ isTradeMode, activeTab, onTabChange, onCollapse }) => {
  
  // If in Trade Mode, we replace the entire sidebar content with the Order Panel
  if (isTradeMode) {
      return (
        <div className="w-[320px] flex flex-col h-full bg-[#13171b] border-l border-[#1c1c1e] shrink-0 z-30 transition-all duration-300">
            <div className="flex flex-col h-full overflow-hidden">
                <div className="shrink-0">
                     <div className="px-3 py-2 bg-[#1a1f26] border-b border-[#1c1c1e] text-xs font-bold text-white flex justify-between items-center">
                         <span>Sổ Lệnh</span>
                         <span className="text-gray-500 font-normal">PHR</span>
                         {onCollapse && (
                            <button onClick={onCollapse} className="text-gray-500 hover:text-white" title="Ẩn sidebar">
                                <ChevronsRight size={14} />
                            </button>
                         )}
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

  // Normal Mode: Show Tabs
  return (
    <div className="w-[320px] flex flex-col h-full bg-[#13171b] border-l border-[#1c1c1e] shrink-0 z-30 transition-all duration-300">
        
        {/* Top-Level Tabs with Collapse Button */}
        <div className="flex h-10 border-b border-[#1c1c1e] bg-[#13171b] shrink-0">
            <div className="flex-1 flex min-w-0">
                {['Chi tiết', 'Theo dõi', 'AI News', 'Chỉ số'].map((tab) => (
                    <button 
                        key={tab} 
                        onClick={() => onTabChange(tab)}
                        className={`flex-1 text-xs font-bold uppercase tracking-wide hover:bg-[#1e2329] transition-colors relative truncate
                        ${activeTab === tab ? 'text-[#2962ff] bg-[#1a1f26]' : 'text-gray-500'}`}
                    >
                        {tab}
                        {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2962ff]" />}
                    </button>
                ))}
            </div>
            
            {onCollapse && (
                <button 
                    onClick={onCollapse}
                    className="w-8 flex items-center justify-center border-l border-[#1c1c1e] text-gray-500 hover:text-white hover:bg-[#1e2329] transition-colors"
                    title="Ẩn sidebar"
                >
                    <ChevronsRight size={16} />
                </button>
            )}
        </div>

        {/* Content based on Tab */}
        <div className="flex-1 overflow-hidden flex flex-col">
            {(activeTab === 'Theo dõi' || activeTab === 'Chi tiết') && (
                <WatchlistTabContent />
            )}

            {activeTab === 'AI News' && (
                 <NewsTab />
            )}

            {activeTab === 'Chỉ số' && (
                 <div className="flex-1 flex items-center justify-center text-gray-500 text-xs">Chỉ số content coming soon</div>
            )}
        </div>
    </div>
  );
};
