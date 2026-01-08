
import React, { useState } from 'react';
import { 
  Crosshair, Minus, TrendingUp, Type, Pencil, Smile, Ruler, ZoomIn, 
  Magnet, Lock, Trash2
} from 'lucide-react';
import { CandleChart } from './CandleChart';
import { ToolbarButton, DraggableWidget, MarketQuickTrade, LimitQuickTrade, BottomTradingPanel } from './TradingWidgets';
import { ChartHeader } from './chart/ChartHeader';
import { RightSidebar } from './chart/RightSidebar';
import { AiFloatingButton } from './chart/AiFloatingButton';
import { PrdModuleId } from './chart/prdConstants';
import { PrdPanel } from './chart/PrdPanel';
import { StockDetail } from './chart/rightSidebar/StockDetail';

interface ChartLayoutProps {
  isTradeMode: boolean;
  onToggleTradeMode: (mode: boolean) => void;
  onOpenAiAssistant: () => void;
  aiNotificationCount: number;
}

export const ChartLayout: React.FC<ChartLayoutProps> = ({ isTradeMode, onToggleTradeMode, onOpenAiAssistant, aiNotificationCount }) => {
  const [showMarketWidget, setShowMarketWidget] = useState(true);
  const [showLimitWidget, setShowLimitWidget] = useState(true);
  
  // Feature Layer State (Old system)
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [isLayerMenuOpen, setIsLayerMenuOpen] = useState(false);

  // New PRD Module State
  const [activePrdModule, setActivePrdModule] = useState<PrdModuleId | null>(null);
  const [selectedPrdItem, setSelectedPrdItem] = useState<string | null>(null);
  const [isPrdMenuOpen, setIsPrdMenuOpen] = useState(false);

  // Sidebar Tab State
  const [sidebarTab, setSidebarTab] = useState('Theo dõi');
  
  // Stock Detail Panel Visibility - Decoupled from sidebarTab
  const [isStockDetailOpen, setIsStockDetailOpen] = useState(false);

  // Maximize State for Stock Detail Panel
  const [isDetailMaximized, setIsDetailMaximized] = useState(false);
  
  // Visibility State for Right Sidebar (Manual Toggle)
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // Projection State (Triggered by AI Button)
  const [showProjection, setShowProjection] = useState(false);

  const handleAiClick = () => {
    onOpenAiAssistant();
    // Enable the projection layer
    setShowProjection(true);
    // Automatically activate the Consensus Cloud module to show "Intelligence" on chart
    setActivePrdModule('consensus_cloud');
  };

  const handlePrdModuleChange = (id: PrdModuleId | null) => {
      setActivePrdModule(id);
      setSelectedPrdItem(null); // Reset selection when changing module
  };
  
  // Handle Right Sidebar Tab Change
  const handleSidebarTabChange = (tab: string) => {
      setSidebarTab(tab);
      // If user specifically clicks "Chi tiết", open the panel
      if (tab === 'Chi tiết') {
          setIsStockDetailOpen(true);
      }
      // Note: We do NOT close the panel if switching AWAY from "Chi tiết"
      // This allows the panel to stay open while viewing other sidebar tabs.
  };
  
  const handleCloseStockDetail = () => {
      setIsStockDetailOpen(false);
      setIsDetailMaximized(false); // Reset maximize state when closing
      // If we are closing the panel and the active tab is "Chi tiết", switch back to "Theo dõi"
      // to avoid having the "Chi tiết" tab selected with no content showing.
      if (sidebarTab === 'Chi tiết') {
          setSidebarTab('Theo dõi');
      }
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

      {/* 2. Main Center Area (Chart) */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#000000]">
        <ChartHeader 
            isTradeMode={isTradeMode}
            onToggleTradeMode={onToggleTradeMode}
            activeFeature={activeFeature}
            setActiveFeature={setActiveFeature}
            isLayerMenuOpen={isLayerMenuOpen}
            setIsLayerMenuOpen={setIsLayerMenuOpen}
            
            // Pass PRD props
            activePrdModule={activePrdModule}
            setActivePrdModule={handlePrdModuleChange}
            isPrdMenuOpen={isPrdMenuOpen}
            setIsPrdMenuOpen={setIsPrdMenuOpen}

            // Sidebar Control
            isSidebarVisible={isSidebarVisible}
            onToggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)}
        />

        {/* Chart Canvas & Overlays Container */}
        <div className="flex-1 flex relative overflow-hidden" onClick={() => setSelectedPrdItem(null)}>
             
             {/* Chart Area */}
             <div className="flex-1 h-full relative min-w-0">
                 <div className="absolute inset-0">
                     <CandleChart 
                        symbol="PHR" 
                        activeFeature={activeFeature} 
                        showProjection={showProjection}
                        activePrdModule={activePrdModule}
                        onPrdSelect={setSelectedPrdItem}
                        selectedPrdItem={selectedPrdItem}
                     />
                 </div>

                 {/* PRD AI Analysis Panel - Now self-positioning and draggable */}
                 {activePrdModule && (
                     <PrdPanel 
                        activeModule={activePrdModule} 
                        selectedId={selectedPrdItem}
                        onClose={() => setActivePrdModule(null)} 
                        onBack={() => setSelectedPrdItem(null)}
                     />
                 )}

                 {!activePrdModule && (
                    <div className="absolute bottom-10 right-10 z-20">
                        <AiFloatingButton 
                            onClick={handleAiClick} 
                            notificationCount={aiNotificationCount} 
                        />
                    </div>
                 )}
                 
                 {showMarketWidget && !activePrdModule && (
                    <DraggableWidget initialX={20} initialY={80}>
                        <MarketQuickTrade onClose={() => setShowMarketWidget(false)} />
                    </DraggableWidget>
                 )}

                 {showLimitWidget && !activePrdModule && (
                    <DraggableWidget initialX={window.innerWidth - 650 - (isStockDetailOpen ? 360 : 320)} initialY={window.innerHeight - 500}>
                        <LimitQuickTrade onClose={() => setShowLimitWidget(false)} />
                    </DraggableWidget>
                 )}
             </div>
             
             {isTradeMode && (
                 <div className="absolute bottom-0 left-0 right-0 z-40">
                    <BottomTradingPanel onClose={() => onToggleTradeMode(false)} />
                 </div>
             )}
        </div>
      </div>

      {/* FLOATING STOCK DETAIL PANEL - Full Height Sibling */}
      {/* Condition updated: Checks isStockDetailOpen state instead of sidebarTab */}
      {isStockDetailOpen && !isTradeMode && (
          <div className="w-[360px] border-l border-r border-[#1c1c1e] bg-[#13171b] z-20 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
              <StockDetail 
                onClose={handleCloseStockDetail} 
                isMaximized={isDetailMaximized}
                onToggleMaximize={() => setIsDetailMaximized(!isDetailMaximized)}
              />
          </div>
      )}

      {/* 3. Right Sidebar - Hidden if Detail is Maximized OR Manually Collapsed */}
      {!isDetailMaximized && isSidebarVisible && (
        <RightSidebar 
            isTradeMode={isTradeMode} 
            activeTab={sidebarTab}
            onTabChange={handleSidebarTabChange}
            onCollapse={() => setIsSidebarVisible(false)}
        />
      )}
    </div>
  );
};
