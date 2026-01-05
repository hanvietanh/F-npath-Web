import React from 'react';
import { 
  ChevronDown, Settings, Camera, Maximize, PlusCircle, BarChart2, FunctionSquare 
} from 'lucide-react';
import { TopBarButton } from '../ui/ToolbarButtons';
import { FeatureMenu } from './FeatureMenu';

interface ChartHeaderProps {
  isTradeMode: boolean;
  onToggleTradeMode: (mode: boolean) => void;
  activeFeature: string | null;
  setActiveFeature: (feature: string | null) => void;
  isLayerMenuOpen: boolean;
  setIsLayerMenuOpen: (isOpen: boolean) => void;
}

export const ChartHeader: React.FC<ChartHeaderProps> = ({
  isTradeMode, onToggleTradeMode, activeFeature, setActiveFeature, isLayerMenuOpen, setIsLayerMenuOpen
}) => {
  return (
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
  );
};