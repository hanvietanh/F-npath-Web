import React, { useState, useRef } from 'react';
import { 
  Users,
} from 'lucide-react';

import { ChartLayout } from './components/ChartLayout';
import { ToolsPanel } from './components/ToolsPanel';
import { MarketDashboard } from './components/MarketDashboard';
import { NewsFeed } from './components/NewsFeed';
import { Header } from './components/Header';
import { PanelMode, TabId, ToolId, StockData } from './types';

// --- Mock Data for Watchlist ---
const watchlistData: StockData[] = [
  { symbol: 'VN30', price: 1254.30, change: 12.5, changePercent: 1.01, volume: 15400200 },
  { symbol: 'ACB', price: 25.45, change: 0.15, changePercent: 0.59, volume: 4500000 },
  { symbol: 'FPT', price: 98.20, change: 1.20, changePercent: 1.24, volume: 1200300 },
  { symbol: 'HPG', price: 28.90, change: -0.20, changePercent: -0.69, volume: 22100500 },
  { symbol: 'MBB', price: 18.60, change: 0.05, changePercent: 0.27, volume: 8900100 },
  { symbol: 'MWG', price: 45.10, change: -0.50, changePercent: -1.10, volume: 3400200 },
  { symbol: 'STB', price: 31.20, change: 0.40, changePercent: 1.30, volume: 15600800 },
  { symbol: 'TCB', price: 34.50, change: 0.00, changePercent: 0.00, volume: 5600400 },
  { symbol: 'VCB', price: 88.10, change: -0.90, changePercent: -1.01, volume: 980200 },
  { symbol: 'VHM', price: 42.80, change: 0.30, changePercent: 0.71, volume: 4500100 },
  { symbol: 'VIC', price: 44.50, change: 0.10, changePercent: 0.23, volume: 2300500 },
  { symbol: 'VNM', price: 67.20, change: -0.30, changePercent: -0.44, volume: 1800600 },
  { symbol: 'VPB', price: 19.40, change: 0.15, changePercent: 0.78, volume: 11200900 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('chart');
  const [panelMode, setPanelMode] = useState<PanelMode>('closed');
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aiNotificationCount, setAiNotificationCount] = useState(3);
  
  // Header Dropdown States
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Lifted state for ChartLayout trade mode to control it from Header
  const [tradeMode, setTradeMode] = useState(false);
  
  // Layout Logic Helpers
  const handleToolSelect = (tool: ToolId) => {
    setActiveTool(tool);
    // If closed, open as floating by default. If already pinned, stay pinned.
    if (panelMode === 'closed') {
      setPanelMode('floating');
    }
    setIsMenuOpen(false);
    if (tool === 'ask-ai') {
        setAiNotificationCount(0);
    }
  };

  const handleGeminiClick = () => {
    // Specifically for the header button: Always open 'ask-ai' and always PIN it
    // so it doesn't cover content (per user request).
    setActiveTool('ask-ai');
    setPanelMode('pinned');
    setAiNotificationCount(0);
  };

  const togglePin = () => {
    setPanelMode(prev => prev === 'floating' ? 'pinned' : 'floating');
  };

  const closePanel = () => {
    setPanelMode('closed');
    setActiveTool(null);
  };

  const handleNavAction = (action: string) => {
    setOpenDropdown(null);
    switch (action) {
        case 'trade_base':
        case 'trade_derivative':
            setTradeMode(true);
            setActiveTab('chart');
            break;
        case 'trade_demo':
        case 'trade_notes':
            setActiveTab('chart'); // Placeholder
            break;
        case 'watchlist':
            setActiveTab('watchlist');
            break;
        case 'opportunities':
            setActiveTab('market');
            break;
        case 'aibot':
            setActiveTool('ask-ai');
            setPanelMode('floating');
            setAiNotificationCount(0);
            break;
        case 'filter':
            setActiveTab('watchlist'); // Placeholder
            break;
        case 'community':
            setActiveTab('community');
            break;
        case 'news':
            setActiveTab('news_feed');
            break;
        default:
            break;
    }
  };

  const WatchlistTab = () => (
    <div className="w-full h-full overflow-auto bg-[#000000]">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-500 bg-[#000000] sticky top-0 uppercase font-medium border-b border-[#1c1c1e]">
          <tr>
            <th className="px-4 py-3">Symbol</th>
            <th className="px-4 py-3 text-right">Price</th>
            <th className="px-4 py-3 text-right">Change</th>
            <th className="px-4 py-3 text-right">% Change</th>
            <th className="px-4 py-3 text-right">Volume</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1c1c1e]">
          {watchlistData.map((stock) => (
            <tr key={stock.symbol} className="hover:bg-[#1c1c1e] transition-colors group cursor-pointer">
              <td className="px-4 py-3 font-bold text-white group-hover:text-[#2962ff]">{stock.symbol}</td>
              <td className="px-4 py-3 text-right text-gray-200 font-mono">{stock.price.toFixed(2)}</td>
              <td className={`px-4 py-3 text-right font-medium font-mono ${stock.change >= 0 ? 'text-[#00c853]' : 'text-[#f23645]'}`}>
                {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}
              </td>
              <td className={`px-4 py-3 text-right font-medium ${stock.changePercent >= 0 ? 'bg-[#00c853]/10 text-[#00c853]' : 'bg-[#f23645]/10 text-[#f23645]'}`}>
                 <span className="px-2 py-1 rounded">{stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%</span>
              </td>
              <td className="px-4 py-3 text-right text-gray-400 font-mono">{stock.volume.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-[#000000] text-white overflow-hidden font-sans">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeTool={activeTool}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        handleNavAction={handleNavAction}
        handleToolSelect={handleToolSelect}
        handleGeminiClick={handleGeminiClick}
      />

      <div className="flex-1 flex relative overflow-hidden">
        {/* MAIN STAGE */}
        <main 
          className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out relative z-0"
          style={{ marginRight: panelMode === 'pinned' ? '400px' : '0px' }}
        >
           {/* Tab Content Render */}
           <div className="flex-1 overflow-hidden relative bg-[#000000]">
              {activeTab === 'chart' && (
                <ChartLayout 
                  isTradeMode={tradeMode} 
                  onToggleTradeMode={setTradeMode} 
                  onOpenAiAssistant={handleGeminiClick}
                  aiNotificationCount={aiNotificationCount}
                />
              )}
              {activeTab === 'watchlist' && <WatchlistTab />}
              {activeTab === 'market' && <MarketDashboard />}
              {activeTab === 'news_feed' && <NewsFeed />}
              {activeTab === 'community' && (
                <div className="flex items-center justify-center h-full text-gray-500 flex-col gap-4">
                  <Users size={48} className="opacity-50" />
                  <p>Community features are under development.</p>
                </div>
              )}
           </div>
        </main>

        {/* RIGHT PANEL */}
        <div 
          className={`
            fixed top-[56px] bottom-0 right-0 w-[400px] bg-[#13171b] border-l border-[#2a2e39] shadow-2xl z-20 transition-transform duration-300 ease-in-out
            ${panelMode === 'closed' ? 'translate-x-full' : 'translate-x-0'}
          `}
        >
          {activeTool && (
            <ToolsPanel 
              activeTool={activeTool} 
              mode={panelMode} 
              onTogglePin={togglePin}
              onClose={closePanel}
            />
          )}
        </div>
      </div>
    </div>
  );
}