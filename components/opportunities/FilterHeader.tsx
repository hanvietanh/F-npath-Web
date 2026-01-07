
import React from 'react';
import { Search, Filter, CheckCircle2 } from 'lucide-react';

export const FilterHeader: React.FC = () => {
  return (
    <div className="h-12 px-4 flex items-center justify-between border-b border-[#1c1c1e] bg-[#0b0e11] shrink-0">
      
      {/* LEFT: Filter Tabs */}
      <div className="flex items-center gap-6 h-full">
         <button className="h-full border-b-2 border-[#2962ff] text-[#2962ff] text-xs font-bold uppercase tracking-wide flex items-center gap-2 px-1">
             <CheckCircle2 size={14} /> Admin chọn lọc
         </button>
         <button className="h-full border-b-2 border-transparent hover:border-[#2c2c2e] text-gray-400 hover:text-white text-xs font-bold uppercase tracking-wide flex items-center relative px-1">
             Mới nhất
             <span className="absolute top-3 -right-1.5 w-1.5 h-1.5 bg-[#f23645] rounded-full"></span>
         </button>
         <button className="h-full border-b-2 border-transparent hover:border-[#2c2c2e] text-gray-400 hover:text-white text-xs font-bold uppercase tracking-wide flex items-center px-1">
             Lãi nhất
         </button>
      </div>

      {/* RIGHT: Search & Tools */}
      <div className="flex items-center gap-3">
         <div className="relative group">
           <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#2962ff]" />
           <input 
              type="text" 
              placeholder="Tìm kiếm..."
              className="bg-[#1c1c1e] border border-[#2c2c2e] rounded pl-8 pr-3 py-1.5 text-xs w-32 focus:w-48 transition-all duration-300 focus:outline-none focus:border-[#2962ff] placeholder-gray-600 text-white"
           />
        </div>
        <div className="h-4 w-[1px] bg-[#2c2c2e]"></div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1c1c1e] hover:bg-[#2c2c2e] border border-[#2c2c2e] rounded text-xs font-medium text-gray-300 transition-colors">
            <Filter size={14} />
            <span>Bộ lọc</span>
        </button>
      </div>
    </div>
  );
};
