
import React, { Component, useState, useEffect, useRef, ReactNode } from 'react';
import { 
  Menu, Search, Bell, Settings, Newspaper, BrainCircuit,
  MessageSquare, Sparkles, ChevronDown, Users, Zap, LogOut,
  User as UserIcon, AlertTriangle
} from 'lucide-react';

// --- IMPORTANT: Đảm bảo các file này tồn tại và export đúng tên ---
import { ChartLayout } from './components/ChartLayout';
import { ToolsPanel } from './components/ToolsPanel';
import { MarketDashboard } from './components/MarketDashboard';
import { NewsFeed } from './components/NewsFeed';
import { PriceBoard } from './components/watchlist/PriceBoard';
import { InvestmentOpportunities } from './components/InvestmentOpportunities';
import { AiBotSignals } from './components/AiBotSignals'; 
import { CommunityPage } from './components/CommunityPage'; // Import new component
import { PanelMode, TabId, ToolId } from './types';
import { ExpertProfileModal } from './components/opportunities/ExpertProfileModal';
import { ExpertProfile } from './components/opportunities/constants';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Component bắt lỗi: Giúp hiện lỗi ra màn hình thay vì trắng xoá
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white p-4">
          <AlertTriangle size={48} className="text-red-500 mb-4" />
          <h1 className="text-xl font-bold text-red-500">Đã xảy ra lỗi (Application Error)</h1>
          <p className="mt-2 text-gray-400">Hãy chụp ảnh màn hình này để kiểm tra:</p>
          <pre className="mt-4 p-4 bg-gray-900 rounded border border-gray-800 text-red-400 overflow-auto max-w-full text-sm">
            {this.state.error?.toString()}
          </pre>
          <p className="mt-4 text-xs text-gray-500">Gợi ý: Kiểm tra lại các file import component (hoa/thường) hoặc export default.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function MainApp() {
  const [activeTab, setActiveTab] = useState<TabId>('chart');
  const [panelMode, setPanelMode] = useState<PanelMode>('closed');
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aiNotificationCount, setAiNotificationCount] = useState(3);
  
  // Header Dropdown States
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Lifted state for ChartLayout trade mode
  const [tradeMode, setTradeMode] = useState(false);

  // Global Expert Profile State
  const [selectedExpert, setSelectedExpert] = useState<ExpertProfile | null>(null);
  
  const navRef = useRef<HTMLDivElement>(null);

  // Debug log để biết App đã chạy
  useEffect(() => {
    console.log("App mounted successfully on Path:", window.location.pathname);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Layout Logic Helpers
  const handleToolSelect = (tool: ToolId) => {
    setActiveTool(tool);
    if (panelMode === 'closed') {
      setPanelMode('floating');
    }
    setIsMenuOpen(false);
    if (tool === 'ask-ai') {
        setAiNotificationCount(0);
    }
  };

  const handleGeminiClick = () => {
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
            setActiveTab('chart'); 
            break;
        case 'watchlist':
            setActiveTab('watchlist');
            break;
        case 'opportunities':
            setActiveTab('opportunities');
            break;
        case 'aibot':
            // Changed from opening tool to opening main tab
            setActiveTab('ai_bot_signals');
            break;
        case 'filter':
            setActiveTab('watchlist');
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

  // --- Header Component ---
  const Header = () => (
    <header className="h-[56px] bg-[#000000] border-b border-[#1c1c1e] flex items-center justify-between px-4 z-50 shrink-0">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#2962ff] rounded-full flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(41,98,255,0.4)]">
            <Zap size={18} fill="white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white hidden md:block">
            Finpath
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center h-[56px]" ref={navRef}>
          
          {/* 1. Thị trường */}
          <button
            onClick={() => { setActiveTab('market'); setOpenDropdown(null); }}
            className={`
              h-full px-4 flex items-center text-[13px] font-bold transition-all relative
              ${activeTab === 'market' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
            `}
          >
            Thị trường
            {activeTab === 'market' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-[#2962ff] rounded-t-full shadow-[0_0_10px_#2962ff]" />}
          </button>

          {/* 2. Giao dịch (Dropdown) */}
          <div className="relative h-full">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'trade' ? null : 'trade')}
              className={`
                h-full px-4 flex items-center gap-1 text-[13px] font-bold transition-all relative
                ${openDropdown === 'trade' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
              `}
            >
              Giao dịch
              <ChevronDown size={14} className={`transition-transform duration-200 ${openDropdown === 'trade' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'trade' && (
               <div className="absolute top-full left-0 mt-1 w-48 bg-[#1c1c1e] border border-[#2c2c2e] rounded-lg shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <button onClick={() => handleNavAction('trade_base')} className="w-full text-left px-4 py-2.5 text-xs font-medium text-gray-300 hover:bg-[#2c2c2e] hover:text-white transition-colors">Giao dịch cơ sở</button>
                  <button onClick={() => handleNavAction('trade_derivative')} className="w-full text-left px-4 py-2.5 text-xs font-medium text-gray-300 hover:bg-[#2c2c2e] hover:text-white transition-colors">Giao dịch phái sinh</button>
                  <button onClick={() => handleNavAction('trade_demo')} className="w-full text-left px-4 py-2.5 text-xs font-medium text-gray-300 hover:bg-[#2c2c2e] hover:text-white transition-colors">Giao dịch thử</button>
                  <button onClick={() => handleNavAction('trade_notes')} className="w-full text-left px-4 py-2.5 text-xs font-medium text-gray-300 hover:bg-[#2c2c2e] hover:text-white transition-colors">Danh mục ghi chép</button>
               </div>
            )}
          </div>

          {/* 3. Bảng giá & ý tưởng (Dropdown) */}
           <div className="relative h-full">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'watchlist' ? null : 'watchlist')}
              className={`
                h-full px-4 flex items-center gap-1 text-[13px] font-bold transition-all relative
                ${openDropdown === 'watchlist' || activeTab === 'watchlist' || activeTab === 'opportunities' || activeTab === 'ai_bot_signals' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
              `}
            >
              Bảng giá & ý tưởng
              <ChevronDown size={14} className={`transition-transform duration-200 ${openDropdown === 'watchlist' ? 'rotate-180' : ''}`} />
              {(activeTab === 'watchlist' || activeTab === 'opportunities' || activeTab === 'ai_bot_signals') && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-[#2962ff] rounded-t-full shadow-[0_0_10px_#2962ff]" />}
            </button>
            {openDropdown === 'watchlist' && (
               <div className="absolute top-full left-0 mt-1 w-48 bg-[#1c1c1e] border border-[#2c2c2e] rounded-lg shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                   <button onClick={() => handleNavAction('watchlist')} className="w-full text-left px-4 py-2.5 text-xs font-medium text-gray-300 hover:bg-[#2c2c2e] hover:text-white transition-colors">Bảng giá</button>
                   <button onClick={() => handleNavAction('opportunities')} className="w-full text-left px-4 py-2.5 text-xs font-medium text-gray-300 hover:bg-[#2c2c2e] hover:text-white transition-colors">Cơ hội đầu tư</button>
                   <button onClick={() => handleNavAction('aibot')} className="w-full text-left px-4 py-2.5 text-xs font-medium text-gray-300 hover:bg-[#2c2c2e] hover:text-white transition-colors">AI Bot</button>
                   <button onClick={() => handleNavAction('filter')} className="w-full text-left px-4 py-2.5 text-xs font-medium text-gray-300 hover:bg-[#2c2c2e] hover:text-white transition-colors">Lọc cổ phiếu</button>
               </div>
            )}
          </div>

          {/* 4. Cộng đồng (Dropdown) */}
          <div className="relative h-full">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'community' ? null : 'community')}
              className={`
                h-full px-4 flex items-center gap-1 text-[13px] font-bold transition-all relative
                ${openDropdown === 'community' || activeTab === 'community' || activeTab === 'news_feed' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
              `}
            >
              Cộng đồng
              <ChevronDown size={14} className={`transition-transform duration-200 ${openDropdown === 'community' ? 'rotate-180' : ''}`} />
              {(activeTab === 'community' || activeTab === 'news_feed') && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-[#2962ff] rounded-t-full shadow-[0_0_10px_#2962ff]" />}
            </button>
            {openDropdown === 'community' && (
               <div className="absolute top-full left-0 mt-1 w-48 bg-[#1c1c1e] border border-[#2c2c2e] rounded-lg shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <button onClick={() => handleNavAction('community')} className="w-full text-left px-4 py-2.5 text-xs font-medium text-gray-300 hover:bg-[#2c2c2e] hover:text-white transition-colors">Cộng đồng</button>
                  <button onClick={() => handleNavAction('news')} className={`w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-[#2c2c2e] hover:text-white transition-colors ${activeTab === 'news_feed' ? 'text-[#2962ff]' : 'text-gray-300'}`}>Bảng tin</button>
               </div>
            )}
          </div>

          {/* 5. Biểu đồ */}
          <button
            onClick={() => { setActiveTab('chart'); setOpenDropdown(null); }}
            className={`
              h-full px-4 flex items-center text-[13px] font-bold transition-all relative
              ${activeTab === 'chart' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
            `}
          >
            Biểu đồ
            {activeTab === 'chart' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-[#2962ff] rounded-t-full shadow-[0_0_10px_#2962ff]" />}
          </button>

        </nav>
      </div>

      <div className="flex items-center gap-3">
        {/* Gemini Quick Access Button */}
        <button 
          onClick={handleGeminiClick}
          className={`
            hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all
            ${activeTool === 'ask-ai' 
              ? 'bg-[#2962ff] border-[#2962ff] text-white shadow-lg shadow-blue-900/40' 
              : 'bg-[#1c1c1e] border-[#333] text-gray-300 hover:border-[#2962ff] hover:text-white'}
          `}
        >
          <Sparkles size={14} className={activeTool === 'ask-ai' ? 'animate-pulse' : 'text-[#2962ff]'} />
          <span className="text-xs font-semibold">Ask Gemini</span>
        </button>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-[#1c1c1e] rounded-full px-4 py-1.5 w-64 focus-within:ring-1 focus-within:ring-[#2962ff] transition-all group border border-transparent focus-within:border-[#2962ff]/50">
          <Search size={16} className="text-gray-500 mr-2 group-focus-within:text-white transition-colors" />
          <input 
            type="text" 
            placeholder="Tìm kiếm mã (e.g., VCB)" 
            className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-gray-600 font-medium"
          />
        </div>

        <button className="text-gray-400 hover:text-white transition-colors relative bg-[#1c1c1e] p-2 rounded-full hover:bg-[#2c2c2e]">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#f23645] border-2 border-[#000000] rounded-full"></span>
        </button>
        
        {/* Tools Menu */}
        <div className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 rounded-full transition-colors relative ${isMenuOpen || activeTool ? 'bg-[#2962ff] text-white' : 'bg-[#1c1c1e] text-gray-400 hover:text-white hover:bg-[#2c2c2e]'}`}
          >
            <Menu size={20} />
            {/* Notification Dot */}
            <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-[#f23645] text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full border-2 border-[#000000] z-10 shadow-sm animate-in zoom-in">
              3
            </span>
          </button>

          {/* Dropdown */}
          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
              <div className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                AI Intelligence
              </div>
              <button onClick={() => handleToolSelect('intelligence')} className="w-full text-left px-4 py-3 text-sm text-gray-200 hover:bg-[#2c2c2e] flex items-center justify-between transition-colors">
                <div className="flex items-center gap-3"><BrainCircuit size={18} /> Tình báo thị trường</div>
                <span className="bg-[#f23645] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">1</span>
              </button>
              <button onClick={() => handleToolSelect('news')} className="w-full text-left px-4 py-3 text-sm text-gray-200 hover:bg-[#2c2c2e] flex items-center justify-between transition-colors">
                <div className="flex items-center gap-3"><Newspaper size={18} /> AI News Digest</div>
                <span className="bg-[#f23645] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">2</span>
              </button>
              <div className="my-1 border-t border-[#2c2c2e]"></div>
              <div className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Assistant
              </div>
              <button onClick={() => handleToolSelect('chat')} className="w-full text-left px-4 py-3 text-sm text-gray-200 hover:bg-[#2c2c2e] flex items-center gap-3 transition-colors">
                <MessageSquare size={18} /> Chat cộng đồng
              </button>
              <button onClick={() => handleToolSelect('ask-ai')} className="w-full text-left px-4 py-3 text-sm text-gray-200 hover:bg-[#2c2c2e] flex items-center gap-3 transition-colors">
                <Sparkles size={18} className="text-[#2962ff]" /> Hỏi AI
              </button>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <button className="w-9 h-9 rounded-full overflow-hidden border border-[#2c2c2e] hover:border-[#2962ff] transition-all relative group ml-1">
            <img 
                src="https://i.pravatar.cc/150?u=finance_pro_user_2024" 
                alt="User Profile" 
                className="w-full h-full object-cover" 
            />
            {/* Online Status Dot */}
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#00c853] border-2 border-[#0b0e11] rounded-full"></div>
            
            {/* Hover Menu / Tooltip */}
             <div className="absolute top-full right-0 mt-2 w-48 bg-[#1c1c1e] border border-[#2c2c2e] rounded-lg shadow-xl py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-50">
                <div className="px-4 py-3 border-b border-[#2c2c2e]">
                    <div className="text-sm font-bold text-white">Finpath Pro User</div>
                    <div className="text-xs text-gray-500">Pro Plan • Exp: 12/2025</div>
                </div>
                <div className="py-1">
                    <button className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-[#2c2c2e] hover:text-white flex items-center gap-2">
                        <UserIcon size={14} /> Trang cá nhân
                    </button>
                    <button className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-[#2c2c2e] hover:text-white flex items-center gap-2">
                        <Settings size={14} /> Cài đặt
                    </button>
                </div>
                <div className="border-t border-[#2c2c2e] py-1">
                    <button className="w-full text-left px-4 py-2 text-xs text-[#f23645] hover:bg-[#2c2c2e] flex items-center gap-2">
                        <LogOut size={14} /> Đăng xuất
                    </button>
                </div>
            </div>
        </button>
      </div>
    </header>
  );

  return (
    <div className="h-screen max-h-screen flex flex-col bg-[#000000] text-white overflow-hidden font-sans">
      <Header />

      {/* Global Expert Profile Modal */}
      {selectedExpert && (
          <ExpertProfileModal 
              expert={selectedExpert} 
              onClose={() => setSelectedExpert(null)} 
          />
      )}

      <div className="flex-1 flex relative overflow-hidden h-full">
        {/* MAIN STAGE */}
        <main 
          className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out relative z-0 h-full"
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
              {activeTab === 'watchlist' && <PriceBoard />}
              {activeTab === 'market' && <MarketDashboard onOpenProfile={setSelectedExpert} />}
              {activeTab === 'news_feed' && <NewsFeed onOpenProfile={setSelectedExpert} />}
              {activeTab === 'opportunities' && <InvestmentOpportunities onOpenProfile={setSelectedExpert} />}
              {activeTab === 'ai_bot_signals' && <AiBotSignals />}
              {activeTab === 'community' && <CommunityPage />}
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

// Wrapper export default để bắt lỗi toàn bộ App
export default function App() {
  return (
    <ErrorBoundary>
      <MainApp />
    </ErrorBoundary>
  );
}
