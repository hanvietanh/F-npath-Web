
import React, { useState } from 'react';
import { StockDetailHeader } from './stock-detail/StockDetailHeader';
import { CopilotWidget } from './stock-detail/CopilotWidget';
import { DashboardTab } from './stock-detail/tabs/DashboardTab';
import { FinancialTab } from './stock-detail/tabs/FinancialTab';
import { NewsTab } from './stock-detail/tabs/NewsTab';
import { ShareholdersTab } from './stock-detail/tabs/ShareholdersTab';

interface StockDetailSuperPopupProps {
  symbol: string;
  onClose: () => void;
}

const StockDetailSuperPopupComponent: React.FC<StockDetailSuperPopupProps> = ({ 
  symbol,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  
  // Copilot State
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [copilotType, setCopilotType] = useState<string | null>(null);
  const [copilotQuery, setCopilotQuery] = useState('');

  const handleAskCopilot = (type: string | null, query = "") => {
    setCopilotType(type);
    setCopilotQuery(query);
    setCopilotOpen(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 font-sans text-xs">
      
      {/* POPUP CONTAINER - Changed width to 90vw */}
      <div className="relative w-[90vw] h-[90vh] bg-[#0b0e11] text-gray-300 rounded-xl shadow-2xl border border-gray-800 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* --- HEADER --- */}
        <StockDetailHeader 
            symbol={symbol} 
            onClose={onClose} 
            onAskCopilot={() => handleAskCopilot(null, `Tổng quan mã ${symbol || "HPG"} hôm nay thế nào?`)} 
        />

        {/* --- TAB NAVIGATION --- */}
        <nav className="bg-[#151a21] border-b border-gray-800 px-4 flex gap-1 shrink-0">
          {['DASHBOARD', 'TÀI CHÍNH', 'TIN TỨC', 'CỘ ĐÔNG & CỔ TỨC', 'BIỂU ĐỒ KỸ THUẬT'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-[11px] font-bold border-b-2 transition ${
                activeTab === tab 
                  ? 'border-blue-500 text-blue-400 bg-[#1e2530]' 
                  : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-[#1e2530]'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 overflow-hidden relative flex">
          
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative transition-all duration-300">
              {activeTab === 'DASHBOARD' && (
                <DashboardTab symbol={symbol} onAskCopilot={handleAskCopilot} />
              )}

              {activeTab === 'TÀI CHÍNH' && (
                <FinancialTab symbol={symbol} onAskCopilot={handleAskCopilot} />
              )}

              {activeTab === 'TIN TỨC' && (
                <NewsTab onAskCopilot={handleAskCopilot} />
              )}

              {activeTab === 'CỘ ĐÔNG & CỔ TỨC' && (
                <ShareholdersTab symbol={symbol} onAskCopilot={handleAskCopilot} />
              )}
          </div>

          {/* --- COPILOT WIDGET (SIDEBAR) --- */}
          <CopilotWidget 
            isOpen={copilotOpen} 
            onClose={() => setCopilotOpen(false)} 
            contextQuery={copilotQuery} 
            type={copilotType}
          />

        </main>

        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: #0b0e11; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #374151; border-radius: 2px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4b5563; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </div>
  );
};

export const StockDetailSuperPopup = StockDetailSuperPopupComponent;
export default StockDetailSuperPopupComponent;
