import React, { useState } from 'react';
import { 
  Crosshair, Minus, TrendingUp, Type, Pencil, Smile, Ruler, ZoomIn, 
  Magnet, Lock, Trash2, ChevronDown, Settings, Camera, Maximize, 
  PlusCircle, BarChart2, FunctionSquare, Sparkles
} from 'lucide-react';
import { CandleChart } from './CandleChart';
import { AI_NEWS_ITEMS } from './mockData';
import { FeatureMenu } from './chart/FeatureMenu';
import { 
  ToolbarButton, TopBarButton, OrderBookTable, DraggableWidget, 
  MarketQuickTrade, LimitQuickTrade, OrderPlacementPanel, BottomTradingPanel 
} from './TradingWidgets';

interface ChartLayoutProps {
  isTradeMode: boolean;
  onToggleTradeMode: (mode: boolean) => void;
  onOpenAiAssistant: () => void;
  aiNotificationCount: number;
}

export const ChartLayout: React.FC<ChartLayoutProps> = ({ isTradeMode, onToggleTradeMode, onOpenAiAssistant, aiNotificationCount }) => {
  const [showMarketWidget, setShowMarketWidget] = useState(true);
  const [showLimitWidget, setShowLimitWidget] = useState(true);
  const [sidebarTab, setSidebarTab] = useState('Chi tiết');
  
  // Feature Layer State
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [isLayerMenuOpen, setIsLayerMenuOpen] = useState(false);

  return (
    <div className="flex h-full w-full bg-[#13171b]">
      {/* 1. Left Vertical Toolbar */}
      <div className="w-[50px] flex-shrink-0 flex flex-col items-center py-2 gap-1 border-r border-[#1c1c1e] bg-[#13171b] z-10">
        <ToolbarButton icon={Crosshair} active />
        <div className="w-4 h-[1px] bg-[#1c1c1e] my-1" />
        <ToolbarButton icon={Minus} />
        <ToolbarButton icon={TrendingUp} />
        <ToolbarButton icon={FunctionSquare} />
        <ToolbarButton icon={Type} />
        <ToolbarButton icon={Pencil} />
        <ToolbarButton icon={Smile} />
        <ToolbarButton icon={Ruler} />
        <ToolbarButton icon={ZoomIn} />
        <div className="flex-1" />
        <ToolbarButton icon={Magnet} />
        <ToolbarButton icon={Lock} />
        <ToolbarButton icon={Trash2} />
      </div>

      {/* 2. Main Center Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#000000]">
        {/* Top Horizontal Toolbar */}
        <div className="h-[46px] flex items-center px-2 gap-1 border-b border-[#1c1c1e] bg-[#13171b] relative z-40">
           <div className="flex items-center gap-2 cursor-pointer hover:bg-[#2a2e39] px-2 py-1 rounded transition-colors mr-2">
              <span className="font-bold text-white text-sm">PHR</span>
              <PlusCircle size={14} className="text-gray-400" />
           </div>
           
           <div className="w-[1px] h-5 bg-[#1c1c1e] mx-1" />
           <TopBarButton label="D" active />
           <TopBarButton label="W" />
           <TopBarButton label="" icon={ChevronDown} />
           <div className="w-[1px] h-5 bg-[#1c1c1e] mx-1" />
           <TopBarButton icon={BarChart2} active hasDropdown />
           <TopBarButton label="Các chỉ báo" icon={FunctionSquare} />

           {/* FEATURE LAYER DROPDOWN */}
           <FeatureMenu 
              activeFeature={activeFeature} 
              setActiveFeature={setActiveFeature} 
              isOpen={isLayerMenuOpen} 
              setIsOpen={setIsLayerMenuOpen} 
           />
           
           <div className="flex-1" />

           <button 
             onClick={() => onToggleTradeMode(!isTradeMode)}
             className={`
               bg-[#2962ff] hover:bg-[#1e4bd8] text-white text-xs font-bold px-4 py-1.5 rounded flex items-center gap-1 transition-colors mr-3 shadow-lg shadow-blue-900/20
               ${isTradeMode ? 'ring-2 ring-white/20' : ''}
             `}
           >
              Giao dịch
           </button>
           
           <div className="flex items-center gap-1">
             <TopBarButton label="VA_999999" hasDropdown />
             <TopBarButton icon={Settings} />
             <TopBarButton icon={Maximize} />
             <TopBarButton icon={Camera} />
           </div>
        </div>

        {/* Chart Canvas & Overlays */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
             <div className="flex-1 relative">
                 <CandleChart symbol="PHR" activeFeature={activeFeature} />

                 <div className="absolute bottom-10 right-10 z-20">
                    <div className="relative group">
                        <button 
                            onClick={onOpenAiAssistant}
                            className={`
                                flex items-center bg-[#2962ff] hover:bg-[#1e4bd8] text-white rounded-full p-3 
                                shadow-[0_0_20px_rgba(41,98,255,0.3)] transition-all duration-300 backdrop-blur-sm
                                ${aiNotificationCount > 0 ? 'opacity-100' : 'opacity-20 group-hover:opacity-100'}
                            `}
                        >
                            <Sparkles size={20} className="shrink-0" />
                            <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-300 font-bold text-sm whitespace-nowrap ml-0 group-hover:ml-2">
                                Hỏi AI
                            </span>
                        </button>
                        {aiNotificationCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#f23645] text-[10px] font-bold text-white shadow-sm ring-2 ring-[#000000]">
                                {aiNotificationCount}
                            </span>
                        )}
                    </div>
                 </div>
                 
                 {showMarketWidget && (
                    <DraggableWidget initialX={20} initialY={80}>
                        <MarketQuickTrade onClose={() => setShowMarketWidget(false)} />
                    </DraggableWidget>
                 )}

                 {showLimitWidget && (
                    <DraggableWidget initialX={window.innerWidth - 650} initialY={window.innerHeight - 500}>
                        <LimitQuickTrade onClose={() => setShowLimitWidget(false)} />
                    </DraggableWidget>
                 )}
             </div>
             {isTradeMode && <BottomTradingPanel onClose={() => onToggleTradeMode(false)} />}
        </div>
      </div>

      {/* 3. Right Sidebar */}
      <div className="w-[340px] flex-shrink-0 border-l border-[#1c1c1e] bg-[#13171b] flex flex-col transition-all duration-300">
         {isTradeMode && <OrderPlacementPanel />}

         <div className="flex h-10 border-b border-[#1c1c1e] flex-shrink-0">
            {['Chi tiết', 'AI News', 'Theo dõi', 'Chỉ số'].map((tab) => (
                <button 
                    key={tab} 
                    onClick={() => setSidebarTab(tab)}
                    className={`flex-1 text-xs font-semibold uppercase tracking-wide hover:bg-[#1e2329] transition-colors
                    ${sidebarTab === tab ? 'text-[#2962ff] border-b-2 border-[#2962ff] bg-[#1e2329]' : 'text-gray-500'}`}
                >
                    {tab}
                </button>
            ))}
         </div>

         {sidebarTab === 'Chi tiết' ? (
             <>
                 <div className="p-4 border-b border-[#1c1c1e] flex-shrink-0 bg-[#13171b]">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-white">PHR</span>
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#1c1c1e] border border-[#2c2c2e] text-gray-300">HOSE</span>
                        </div>
                        <div className="text-2xl font-bold text-[#00c853]">56.30</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-[10px] text-gray-500">Phuoc Hoa Rubber</div>
                        <div className="text-sm font-bold text-[#00c853]">+1.30 (+2.35%)</div>
                    </div>
                 </div>

                 <div className="flex-1 overflow-y-auto bg-[#13171b]">
                     <OrderBookTable />
                     <div className="h-2 bg-[#000000]" />
                     <div className="p-3 bg-[#13171b]">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-gray-200">Khớp lệnh</span>
                            <BarChart2 size={14} className="text-gray-500" />
                        </div>
                        <table className="w-full text-right">
                            <thead className="text-[10px] text-gray-500 uppercase font-medium">
                                <tr>
                                    <th className="pb-2 text-left">Thời gian</th>
                                    <th className="pb-2">Giá</th>
                                    <th className="pb-2">+/-</th>
                                    <th className="pb-2">Khối lượng</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs font-mono">
                                {[
                                    { time: '14:45:00', price: '56.30', change: '+1.30', vol: '11,300', type: 'buy' },
                                    { time: '14:29:21', price: '56.20', change: '+1.20', vol: '200', type: 'sell' },
                                    { time: '14:28:56', price: '56.20', change: '+1.20', vol: '200', type: 'buy' },
                                    { time: '14:26:34', price: '56.10', change: '+1.10', vol: '500', type: 'buy' },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-[#1c1c1e] transition-colors cursor-pointer group">
                                        <td className="py-1.5 text-left text-gray-400">{row.time}</td>
                                        <td className={`py-1.5 font-medium ${row.type === 'buy' ? 'text-[#00c853]' : 'text-[#f23645]'}`}>{row.price}</td>
                                        <td className={`py-1.5 ${row.type === 'buy' ? 'text-[#00c853]' : 'text-[#f23645]'}`}>{row.change}</td>
                                        <td className={`py-1.5 ${row.type === 'buy' ? 'text-[#00c853]' : 'text-[#f23645]'}`}>{row.vol}</td>
                                        <td className="py-1.5 pl-1 text-[9px] font-bold">{row.type === 'buy' ? 'M' : 'B'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                     </div>
                 </div>
             </>
         ) : sidebarTab === 'AI News' ? (
             <div className="flex-1 overflow-y-auto bg-[#13171b] p-3 space-y-3 custom-scrollbar">
                 {AI_NEWS_ITEMS.map((item) => (
                    <div key={item.id} className="bg-[#1a1f26] border border-[#2c2c2e] rounded-lg p-3 hover:border-gray-600 transition-colors cursor-pointer group">
                        <div className="flex items-start gap-3 mb-2">
                             {item.type === 'ai' ? (
                                 <div className="w-9 h-9 rounded-full bg-[#2962ff] flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/20">
                                     <Sparkles size={18} className="text-white" />
                                 </div>
                             ) : (
                                 <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-[#2c2c2e]">
                                     <img src={item.avatar || 'https://i.pravatar.cc/150'} alt={item.source} className="w-full h-full object-cover" />
                                 </div>
                             )}
                             <div className="flex-1 min-w-0">
                                 <div className="flex justify-between items-start">
                                     <h4 className="text-sm font-bold text-[#2962ff] truncate pr-2 group-hover:underline">{item.title}</h4>
                                 </div>
                                 <div className="flex items-center gap-1.5 text-[10px] text-gray-500 mt-0.5">
                                     <span className="font-medium text-gray-300">{item.source}</span>
                                 </div>
                             </div>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed text-justify line-clamp-3">{item.content}</p>
                    </div>
                 ))}
             </div>
         ) : (
             <div className="flex-1 flex items-center justify-center text-gray-500 text-xs">Coming soon</div>
         )}
      </div>
    </div>
  );
};
