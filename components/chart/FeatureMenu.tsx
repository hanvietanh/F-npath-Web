import React from 'react';
import { Layers, ChevronDown, Sparkles } from 'lucide-react';
import { FEATURE_TIERS } from './chartConstants';

interface FeatureMenuProps {
  activeFeature: string | null;
  setActiveFeature: (feature: string | null) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const FeatureMenu: React.FC<FeatureMenuProps> = ({ 
  activeFeature, 
  setActiveFeature, 
  isOpen, 
  setIsOpen 
}) => {
  const selectedFeatureLabel = FEATURE_TIERS.flatMap(g => g.items).find(i => i.id === activeFeature)?.label;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
           h-8 px-3 flex items-center gap-2 rounded transition-colors ml-2 border
           ${activeFeature ? 'bg-[#2962ff]/10 text-[#2962ff] border-[#2962ff]' : 'text-gray-300 border-transparent hover:bg-[#2a2e39]'}
        `}
      >
         <Layers size={16} />
         <span className="text-xs font-bold max-w-[200px] truncate">
            {selectedFeatureLabel || 'Lớp Tính Năng'}
         </span>
         <ChevronDown size={12} />
      </button>

      {isOpen && (
         <div className="absolute top-full left-0 mt-2 w-[700px] bg-[#1a1f26] border border-[#2c2c2e] rounded-xl shadow-2xl p-4 grid grid-cols-2 gap-x-8 gap-y-6 z-50 animate-in fade-in zoom-in-95 duration-100 max-h-[80vh] overflow-y-auto custom-scrollbar">
             {FEATURE_TIERS.map((tier) => (
                <div key={tier.id} className="space-y-2 col-span-1">
                    <div className={`flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider border-b border-[#2c2c2e] pb-1 ${tier.color}`}>
                        <tier.icon size={14} />
                        {tier.name}
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                        {tier.items.map((item) => (
                            <button 
                               key={item.id}
                               onClick={() => {
                                   setActiveFeature(activeFeature === item.id ? null : item.id);
                                   setIsOpen(false);
                               }}
                               className={`
                                  text-left px-3 py-2 rounded text-xs transition-colors flex items-center justify-between group
                                  ${activeFeature === item.id ? 'bg-[#2962ff] text-white font-bold' : 'text-gray-400 hover:bg-[#2c2c2e] hover:text-white'}
                               `}
                            >
                               {item.label}
                               {activeFeature === item.id && <Sparkles size={12} />}
                            </button>
                        ))}
                    </div>
                </div>
             ))}
             
             {/* Feature Info Footer */}
             <div className="col-span-2 border-t border-[#2c2c2e] pt-3 flex items-center gap-2 text-[10px] text-gray-500">
                <Sparkles size={12} className="text-[#2962ff]" />
                Mỗi tính năng sẽ kích hoạt một lớp dữ liệu giả lập (Mockup Simulation) riêng biệt.
             </div>
         </div>
      )}
    </div>
  );
};
