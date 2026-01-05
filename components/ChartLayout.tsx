import React, { useState } from 'react';
import { 
  Crosshair, Minus, TrendingUp, Type, Pencil, Smile, Ruler, ZoomIn, 
  Magnet, Lock, Trash2, Sparkles
} from 'lucide-react';
import { CandleChart } from './CandleChart';
import { ToolbarButton, DraggableWidget, MarketQuickTrade, LimitQuickTrade, BottomTradingPanel } from './TradingWidgets';
import { ChartHeader } from './chart/ChartHeader';
import { RightSidebar } from './chart/RightSidebar';

interface ChartLayoutProps {
  isTradeMode: boolean;
  onToggleTradeMode: (mode: boolean) => void;
  onOpenAiAssistant: () => void;
  aiNotificationCount: number;
}

export const ChartLayout: React.FC<ChartLayoutProps> = ({ isTradeMode, onToggleTradeMode, onOpenAiAssistant, aiNotificationCount }) => {
  const [showMarketWidget, setShowMarketWidget] = useState(true);
  const [showLimitWidget, setShowLimitWidget] = useState(true);
  
  // Feature Layer State
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [isLayerMenuOpen, setIsLayerMenuOpen] = useState(false);

  // Projection State (Triggered by AI Button)
  const [showProjection, setShowProjection] = useState(false);

  const handleAiClick = () => {
    onOpenAiAssistant();
    setShowProjection(true);
  };

  return (
    <div className="flex h-full w-full bg-[#13171b]">
      {/* 1. Left Vertical Toolbar */}
      <div className="w-[50px] flex-shrink-0 flex flex-col items-center py-2 gap-1 border-r border-[#1c1c1e] bg-[#13171b] z-10">
        <ToolbarButton icon={Crosshair} active />
        <div className="w-4 h-[1px] bg-[#1c1c1e] my-1" />
        <ToolbarButton icon={Minus} />
        <ToolbarButton icon={TrendingUp} />
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
        <ChartHeader 
            isTradeMode={isTradeMode}
            onToggleTradeMode={onToggleTradeMode}
            activeFeature={activeFeature}
            setActiveFeature={setActiveFeature}
            isLayerMenuOpen={isLayerMenuOpen}
            setIsLayerMenuOpen={setIsLayerMenuOpen}
        />

        {/* Chart Canvas & Overlays */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
             <div className="flex-1 relative">
                 <CandleChart 
                    symbol="PHR" 
                    activeFeature={activeFeature} 
                    showProjection={showProjection} 
                 />

                 <div className="absolute bottom-10 right-10 z-20">
                    <div className="relative group">
                        <button 
                            onClick={handleAiClick}
                            className={`
                                flex items-center bg-[#2962ff] hover:bg-[#1e4bd8] text-white rounded-full p-3 
                                shadow-[0_0_20px_rgba(41,98,255,0.3)] transition-all duration-300 backdrop-blur-sm
                                ${aiNotificationCount > 0 ? 'opacity-100' : 'opacity-20 group-hover:opacity-100'}
                            `}
                        >
                            <Sparkles size={20} className="shrink-0" />
                            <span className="max-w-0 overflow-hidden group-hover:max-w-[300px] transition-all duration-300 font-bold text-sm whitespace-nowrap ml-0 group-hover:ml-2">
                                Có nên mua HPG không?
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
      <RightSidebar isTradeMode={isTradeMode} />
    </div>
  );
};