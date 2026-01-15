import React, { useState } from 'react';
import { 
  Activity,
  Layers,
  Globe,
  Briefcase,
  PieChart,
  BarChart2
} from 'lucide-react';
import { INDICES } from './mockData';
import { PostCard } from './PostCard';
import { 
  LiquidityChart, 
  ImpactChart, 
  ForeignMarketDashboard,
  MarketTreemap 
} from './MarketWidgets';
import { 
  IndicesTickerRow, 
  MarketOverviewCard, 
  MiniStockRow 
} from './MarketCommon';
import { NEWS_POSTS, INTELLIGENCE_POSTS } from './mockData';
import { ExpertProfile } from './opportunities/constants';

interface MarketDashboardProps {
    onOpenProfile?: (expert: ExpertProfile) => void;
    onStockClick?: (symbol: string) => void;
}

export const MarketDashboard: React.FC<MarketDashboardProps> = ({ onOpenProfile, onStockClick }) => {
  const [activeDashboardTab, setActiveDashboardTab] = useState<'market' | 'top_stocks' | 'industry' | 'derivatives'>('market');
  const [selectedIndex, setSelectedIndex] = useState('VN30');
  const [viewMode, setViewMode] = useState<'heatmap' | 'impact'>('heatmap');
  const [activeRightTab, setActiveRightTab] = useState<'news' | 'intelligence' | 'ai_news'>('intelligence');
  
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const currentIndex = INDICES.find(i => i.id === selectedIndex) || INDICES[0];

  const handleCardClick = (id: string) => {
      setActiveCardId(prev => prev === id ? null : id);
  };

  const currentPosts = activeRightTab === 'intelligence' ? NEWS_POSTS : (activeRightTab === 'news' ? INTELLIGENCE_POSTS : []);

  return (
    <div className="flex h-full w-full bg-[#000000] overflow-hidden font-sans">
      
      {/* --- Left Column: Market Watch (75%) --- */}
      <div className="w-[75%] flex flex-col border-r border-[#1c1c1e] h-full min-w-0">
        
        {/* Dashboard Tabs */}
        <div className="flex h-10 border-b border-[#1c1c1e] bg-[#000000] shrink-0">
             {['THỊ TRƯỜNG', 'CỔ PHIẾU NỔI BẬT', 'NGÀNH', 'PHÁI SINH'].map((tabLabel) => {
                 const tabKey = tabLabel === 'THỊ TRƯỜNG' ? 'market' 
                              : tabLabel === 'CỔ PHIẾU NỔI BẬT' ? 'top_stocks' 
                              : tabLabel === 'NGÀNH' ? 'industry' : 'derivatives';
                 const isActive = activeDashboardTab === tabKey;
                 
                 return (
                     <button 
                        key={tabKey}
                        onClick={() => setActiveDashboardTab(tabKey as any)}
                        className={`
                            px-4 text-xs font-bold uppercase tracking-wide transition-colors relative
                            ${isActive ? 'text-[#2962ff] bg-[#121212]' : 'text-gray-500 hover:text-white hover:bg-[#121212]/50'}
                        `}
                     >
                        {tabLabel}
                        {isActive && <div className="absolute top-0 left-0 w-full h-[2px] bg-[#2962ff]" />}
                     </button>
                 );
             })}
        </div>

        {/* Content Area Based on Tab */}
        {activeDashboardTab === 'market' && (
          <>
            <IndicesTickerRow selected={selectedIndex} onSelect={setSelectedIndex} />

            <div className="h-[110px] p-2 grid grid-cols-4 gap-2 border-b border-[#1c1c1e] bg-[#000000] shrink-0">
              <MarketOverviewCard 
                title="BIẾN ĐỘNG" 
                icon={Activity} 
                active={activeCardId === 'biendong'}
                onClick={() => handleCardClick('biendong')}
              >
                 <div className="flex h-full items-center">
                    <div className="flex flex-col justify-center w-[35%] border-r border-[#1c1c1e]/50 pr-2">
                        <div className="text-[10px] text-gray-400 font-bold mb-0.5">{currentIndex.name}</div>
                        <div className={`text-xl font-bold tracking-tight ${currentIndex.color === '#00c853' ? 'text-[#00c853]' : 'text-[#f23645]'}`}>
                            {currentIndex.val.split('.')[0]}
                        </div>
                        <div className={`text-[10px] font-medium ${currentIndex.color === '#00c853' ? 'text-[#00c853]' : 'text-[#f23645]'}`}>
                            {currentIndex.chg}
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center pl-2 gap-1.5">
                        <div className="flex items-center justify-between text-[10px]">
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-sm bg-[#00c853]"></div>
                                <span className="text-gray-400">Tăng</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-[#00c853]">280</span>
                                <span className="text-[9px] text-gray-500 w-10 text-right">8.2k tỷ</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-sm bg-yellow-500"></div>
                                <span className="text-gray-400">0 đổi</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-yellow-500">45</span>
                                <span className="text-[9px] text-gray-500 w-10 text-right">---</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-sm bg-[#f23645]"></div>
                                <span className="text-gray-400">Giảm</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-[#f23645]">115</span>
                                <span className="text-[9px] text-gray-500 w-10 text-right">6.7k tỷ</span>
                            </div>
                        </div>
                    </div>
                 </div>
              </MarketOverviewCard>
              
              <MarketOverviewCard 
                title="THANH KHOẢN" 
                icon={Layers}
                active={activeCardId === 'thanhkhoan'}
                onClick={() => handleCardClick('thanhkhoan')}
              >
                 <div className="flex flex-col justify-center h-full pb-2">
                    <div className="flex items-baseline gap-2 mb-1">
                       <span className="text-2xl font-bold text-white tracking-tight">15.4K tỷ</span>
                       <span className="text-[10px] px-1.5 py-0.5 bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/30 rounded font-bold">
                          +12%
                       </span>
                    </div>
                    <div className="text-[10px] text-gray-500">So với phiên trước</div>
                 </div>
              </MarketOverviewCard>
    
              <MarketOverviewCard 
                title="NƯỚC NGOÀI" 
                icon={Globe}
                active={activeCardId === 'nuocngoai'}
                onClick={() => handleCardClick('nuocngoai')}
              >
                 <div className="flex h-full items-center">
                    <div className="w-[35%] flex flex-col justify-center border-r border-[#1c1c1e]/50 pr-2">
                        <div className="text-lg font-bold text-[#f23645]">-245 Tỷ</div>
                        <div className="text-[9px] text-gray-500 mt-0.5">Giá trị ròng</div>
                    </div>
                    <div className="flex-1 pl-2 flex flex-col justify-center gap-1">
                        <MiniStockRow symbol="HPG" value={-5.8} maxVal={6} onClick={onStockClick} />
                        <MiniStockRow symbol="TCB" value={3.0} maxVal={6} onClick={onStockClick} />
                        <MiniStockRow symbol="SSI" value={4.0} maxVal={6} onClick={onStockClick} />
                    </div>
                 </div>
              </MarketOverviewCard>

              <MarketOverviewCard 
                title="TỰ DOANH" 
                icon={Briefcase}
                active={activeCardId === 'tudoanh'}
                onClick={() => handleCardClick('tudoanh')}
              >
                 <div className="flex h-full items-center">
                    <div className="w-[35%] flex flex-col justify-center border-r border-[#1c1c1e]/50 pr-2">
                        <div className="text-lg font-bold text-[#00c853]">+54.2 Tỷ</div>
                        <div className="text-[9px] text-gray-500 mt-0.5">Giá trị ròng</div>
                    </div>
                    <div className="flex-1 pl-2 flex flex-col justify-center gap-1">
                         <MiniStockRow symbol="TCB" value={3.1} maxVal={4} onClick={onStockClick} />
                         <MiniStockRow symbol="HPG" value={-1.2} maxVal={4} onClick={onStockClick} />
                         <MiniStockRow symbol="SST" value={0.8} maxVal={4} onClick={onStockClick} />
                    </div>
                 </div>
              </MarketOverviewCard>
            </div>
    
            {activeCardId === 'nuocngoai' ? (
                 <ForeignMarketDashboard />
            ) : activeCardId === 'thanhkhoan' ? (
                 <LiquidityChart />
            ) : (
                <div className="flex-1 min-h-0 bg-[#000000] p-1 overflow-hidden relative flex flex-col">
                   <div className="absolute top-2 left-3 z-20 flex bg-[#13171b]/90 backdrop-blur rounded border border-[#1c1c1e] p-0.5 shadow-sm opacity-20 hover:opacity-100 transition-opacity duration-300">
                       <button 
                           onClick={() => setViewMode('heatmap')}
                           className={`px-3 py-1 rounded text-[10px] font-bold transition-all flex items-center gap-1.5 ${viewMode === 'heatmap' ? 'bg-[#2962ff] text-white shadow' : 'text-gray-400 hover:text-gray-200'}`}
                       >
                           <PieChart size={12} /> Heatmap
                       </button>
                       <button 
                           onClick={() => setViewMode('impact')}
                           className={`px-3 py-1 rounded text-[10px] font-bold transition-all flex items-center gap-1.5 ${viewMode === 'impact' ? 'bg-[#2962ff] text-white shadow' : 'text-gray-400 hover:text-gray-200'}`}
                       >
                           <BarChart2 size={12} /> Tác động
                       </button>
                   </div>

                   {viewMode === 'heatmap' ? (
                       <MarketTreemap onStockClick={onStockClick} />
                   ) : (
                       <ImpactChart />
                   )}
                </div>
            )}
          </>
        )}
        
        {/* Other Tabs Placeholder */}
        {activeDashboardTab === 'top_stocks' && (
             <div className="flex-1 flex items-center justify-center text-gray-500">Top Stocks Content</div>
        )}
        {activeDashboardTab === 'industry' && (
             <div className="flex-1 flex items-center justify-center text-gray-500">Industry Content</div>
        )}
        {activeDashboardTab === 'derivatives' && (
             <div className="flex-1 flex items-center justify-center text-gray-500">Derivatives Content</div>
        )}

      </div>
      
      {/* --- Right Column: Intelligence & News (25%) --- */}
      <div className="w-[25%] flex flex-col min-w-0 bg-[#13171b]">
          <div className="flex h-10 border-b border-[#1c1c1e] shrink-0">
             <button 
                onClick={() => setActiveRightTab('intelligence')}
                className={`flex-1 text-xs font-bold uppercase tracking-wide hover:bg-[#1e2329] transition-colors border-r border-[#1c1c1e] ${activeRightTab === 'intelligence' ? 'text-[#2962ff] bg-[#1e2329]' : 'text-gray-500'}`}
             >
                Tình báo thị trường
             </button>
             <button 
                onClick={() => setActiveRightTab('news')}
                className={`flex-1 text-xs font-bold uppercase tracking-wide hover:bg-[#1e2329] transition-colors ${activeRightTab === 'news' ? 'text-[#2962ff] bg-[#1e2329]' : 'text-gray-500'}`}
             >
                Tin tức & Sự kiện
             </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
               {currentPosts.map((post: any) => (
                   <PostCard key={post.id} post={post} onOpenProfile={onOpenProfile} />
               ))}
               
               {currentPosts.length === 0 && (
                   <div className="text-center text-gray-500 text-xs mt-10">Chưa có tin tức mới</div>
               )}
          </div>
      </div>

    </div>
  );
};