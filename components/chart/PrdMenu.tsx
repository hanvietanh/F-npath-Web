import React from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';
import { PRD_MODULES, PrdModuleId } from './prdConstants';

interface PrdMenuProps {
  activeModule: PrdModuleId | null;
  setActiveModule: (id: PrdModuleId | null) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const PrdMenu: React.FC<PrdMenuProps> = ({ 
  activeModule, 
  setActiveModule, 
  isOpen, 
  setIsOpen 
}) => {
  const activeItem = PRD_MODULES.find(m => m.id === activeModule);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
           h-8 px-3 flex items-center gap-2 rounded transition-all ml-2 border
           ${activeModule 
             ? 'bg-gradient-to-r from-purple-900/40 to-blue-900/40 text-blue-200 border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.2)]' 
             : 'bg-[#1c1c1e] text-gray-300 border-[#2c2c2e] hover:bg-[#2a2e39]'}
        `}
      >
         <Sparkles size={14} className={activeModule ? 'text-blue-400' : 'text-yellow-500'} />
         <span className="text-xs font-bold whitespace-nowrap">
            {activeItem ? activeItem.label : 'AI Trading Intelligence'}
         </span>
         <ChevronDown size={12} />
      </button>

      {isOpen && (
         <div className="absolute top-full left-0 mt-2 w-[320px] bg-[#1a1f26] border border-[#2c2c2e] rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
             <div className="bg-[#121212] px-4 py-2 border-b border-[#2c2c2e]">
                 <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Chọn Module Phân Tích</span>
             </div>
             
             <div className="p-2 space-y-1">
                 {PRD_MODULES.map((module) => (
                    <button 
                        key={module.id}
                        onClick={() => {
                            setActiveModule(activeModule === module.id ? null : module.id as PrdModuleId);
                            setIsOpen(false);
                        }}
                        className={`
                           w-full text-left px-3 py-2.5 rounded-lg text-xs transition-all flex items-center gap-3 group border border-transparent
                           ${activeModule === module.id 
                             ? 'bg-[#2962ff]/10 text-white border-[#2962ff]/30' 
                             : 'text-gray-400 hover:bg-[#2c2c2e] hover:text-gray-200'}
                        `}
                    >
                       <div 
                          className={`p-1.5 rounded-md ${activeModule === module.id ? 'bg-[#2962ff] text-white' : 'bg-[#2a2e39] text-gray-500 group-hover:text-gray-300'}`}
                        >
                           <module.icon size={16} />
                       </div>
                       <div className="flex-1">
                           <div className="font-bold">{module.label}</div>
                       </div>
                    </button>
                 ))}
             </div>
         </div>
      )}
    </div>
  );
};