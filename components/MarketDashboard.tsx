import React, { useState, useMemo } from 'react';
import { 
  Activity,
  Layers,
  Globe,
  Briefcase,
  Search,
  Filter,
  PieChart,
  BarChart2,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { StockData } from '../types';
import { 
  INDICES, 
  WORLD_INDICES, 
  MOCK_HEATMAP, 
  TOP_MOVERS_MOCK, 
  TOP_VOLUME_MOCK, 
  TOP_FOREIGN_MOCK, 
  NEWS_POSTS, 
  INTELLIGENCE_POSTS 
} from './mockData';
import { PostCard } from './PostCard';
import { 
  LiquidityChart, 
  ImpactChart, 
  ForeignMarketDashboard, 
  TreemapBlock 
} from './MarketWidgets';

// --- Indices Ticker Row Component ---
const IndicesTickerRow: React.FC<{ selected: string; onSelect: (id: string) => void }> = ({ selected, onSelect }) => {
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

const MarketOverviewCard: React.FC<{ 
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

const MiniStockRow = ({ symbol, value, maxVal }: { symbol: string, value: number, maxVal: number }) => {
    const isPos = value >= 0;
    const widthPct = Math.min((Math.abs(value) / maxVal) * 100, 100);
    
    return (
        <div className="flex items-center justify-between text-[10px] h-5">
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

export const MarketDashboard = () => {
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
      
      {/* --- Left Column: Market Watch (65%) --- */}
      <div className="w-[65%] flex flex-col border-r border-[#1c1c1e] h-full min-w-0">
        
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
                        <MiniStockRow symbol="HPG" value={-5.8} maxVal={6} />
                        <MiniStockRow symbol="TCB" value={3.0} maxVal={6} />
                        <MiniStockRow symbol="SSI" value={4.0} maxVal={6} />
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
                         <MiniStockRow symbol="TCB" value={3.1} maxVal={4} />
                         <MiniStockRow symbol="HPG" value={-1.2} maxVal={4} />
                         <MiniStockRow symbol="SST" value={0.8} maxVal={4} />
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
                       <>
                           {/* Treemap View */}
                           <div className="flex-1 p-1 flex flex-col gap-1 min-h-0 bg-[#000000] overflow-hidden">
                              {/* Row 1 */}
                              <div className="flex-1 flex gap-1 min-h-0">
                                 {/* HPG Block */}
                                 <div className="w-[22%] flex flex-col">
                                    <TreemapBlock symbol="HPG" percent="+2.48%" color="#00c853" className="flex-1" />
                                 </div>

                                 {/* Real Estate (Bất động sản) */}
                                 <div className="w-[43%] flex flex-col bg-[#1c1c1e] relative">
                                    <div className="absolute top-0 left-0 bg-black/40 text-[9px] text-white px-1 z-10 font-bold">Bất động sản</div>
                                    <div className="flex-1 grid grid-cols-4 grid-rows-4 gap-0.5 mt-0.5">
                                         <TreemapBlock symbol="CII" percent="+0.44%" color="#00c853" className="col-span-1 row-span-1" />
                                         <TreemapBlock symbol="DXG" percent="0%" color="#fbc02d" className="col-span-1 row-span-1" />
                                         <TreemapBlock symbol="VIC" percent="-1.9%" color="#f23645" className="col-span-1 row-span-1" />
                                         <div className="col-span-1 row-span-1 grid grid-cols-2 gap-0.5">
                                            <TreemapBlock symbol="PDR" percent="-0.7%" color="#f23645" />
                                            <TreemapBlock symbol="DIG" percent="-1.6%" color="#f23645" />
                                         </div>

                                         <TreemapBlock symbol="VRE" percent="-0.78%" color="#f23645" className="col-span-2 row-span-1" />
                                         <TreemapBlock symbol="NVL" percent="-0.38%" color="#f23645" className="col-span-1 row-span-1" />
                                         <div className="col-span-1 row-span-1 grid grid-cols-2 gap-0.5">
                                            <TreemapBlock symbol="NKG" percent="+2.3%" color="#00c853" />
                                            <TreemapBlock symbol="TCH" percent="-0.8%" color="#f23645" />
                                         </div>

                                         <TreemapBlock symbol="VHM" percent="-3.76%" color="#f23645" className="col-span-2 row-span-2" />
                                         <div className="col-span-2 row-span-2 grid grid-cols-3 grid-rows-3 gap-0.5">
                                             <TreemapBlock symbol="KHG" percent="-1.4%" color="#f23645" className="col-span-2" />
                                             <TreemapBlock symbol="VCG" percent="-1.2%" color="#f23645" />
                                             <TreemapBlock symbol="HQC" percent="-1.9%" color="#f23645" className="col-span-2" />
                                             <TreemapBlock symbol="IJC" percent="-0.9%" color="#f23645" />
                                             <TreemapBlock symbol="HDC" percent="-2.9%" color="#f23645" />
                                             <TreemapBlock symbol="NLG" percent="-2.9%" color="#f23645" />
                                             <TreemapBlock symbol="SCR" percent="+0.1%" color="#00c853" />
                                         </div>
                                    </div>
                                 </div>

                                 {/* Securities (Chứng khoán) */}
                                 <div className="w-[35%] flex flex-col bg-[#1c1c1e] relative">
                                    <div className="absolute top-0 left-0 bg-black/40 text-[9px] text-white px-1 z-10 font-bold">Chứng khoán</div>
                                    <div className="flex-1 grid grid-cols-3 grid-rows-3 gap-0.5 mt-0.5">
                                        <TreemapBlock symbol="VIX" percent="-0.87%" color="#f23645" className="col-span-2 row-span-2" />
                                        <TreemapBlock symbol="SSI" percent="+0.82%" color="#00c853" className="col-span-1 row-span-2" />
                                        <TreemapBlock symbol="VND" percent="0%" color="#fbc02d" className="col-span-2 row-span-1" />
                                        <div className="col-span-1 row-span-1 grid grid-rows-2 gap-0.5">
                                           <TreemapBlock symbol="HCM" percent="0%" color="#fbc02d" />
                                           <TreemapBlock symbol="FTS" percent="+1.2%" color="#00c853" />
                                        </div>
                                        <div className="col-span-3 row-span-1 grid grid-cols-2 gap-0.5 h-8 mt-auto absolute bottom-0 w-full hidden"></div>
                                        {/* Fill gaps visually */}
                                        <div className="absolute bottom-0 w-full h-[25%] flex gap-0.5">
                                             <TreemapBlock symbol="VCI" percent="+3.49%" color="#00c853" className="w-[70%]" />
                                             <div className="flex-1 bg-[#00c853] flex items-center justify-center text-[8px] font-bold text-white">FTS</div>
                                        </div>
                                    </div>
                                 </div>
                              </div>

                              {/* Row 2 */}
                              <div className="flex-1 flex gap-1 min-h-0">
                                 {/* Banks (Ngân hàng) */}
                                 <div className="w-[65%] flex flex-col bg-[#1c1c1e] relative">
                                    <div className="absolute top-0 left-0 bg-black/40 text-[9px] text-white px-1 z-10 font-bold">Ngân hàng</div>
                                    <div className="flex-1 grid grid-cols-5 grid-rows-4 gap-0.5 mt-0.5">
                                        {/* SHB Big Block */}
                                        <TreemapBlock symbol="SHB" percent="-0.91%" color="#f23645" className="col-span-2 row-span-4" />
                                        
                                        {/* VPB/MBB Middle Col */}
                                        <div className="col-span-2 row-span-4 grid grid-rows-4 gap-0.5">
                                            <TreemapBlock symbol="VPB" percent="-2.09%" color="#f23645" className="row-span-2" />
                                            <TreemapBlock symbol="MBB" percent="+0.27%" color="#00c853" className="row-span-2" />
                                        </div>
                                        
                                        {/* Last Column */}
                                        <div className="col-span-1 row-span-4 grid grid-rows-4 gap-0.5">
                                            <TreemapBlock symbol="TCB" percent="0%" color="#fbc02d" />
                                            <TreemapBlock symbol="ACB" percent="+0.59%" color="#00c853" />
                                            <TreemapBlock symbol="STB" percent="+1.3%" color="#00c853" />
                                            <TreemapBlock symbol="VIB" percent="+0.48%" color="#00c853" />
                                        </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                       </>
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
      
      {/* --- Right Column: Intelligence & News (35%) --- */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#13171b]">
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
                   <PostCard key={post.id} post={post} />
               ))}
               
               {currentPosts.length === 0 && (
                   <div className="text-center text-gray-500 text-xs mt-10">Chưa có tin tức mới</div>
               )}
          </div>
      </div>

    </div>
  );
};