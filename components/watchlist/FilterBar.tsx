
import React from 'react';
import { Search, Filter, Settings, ChevronDown } from 'lucide-react';

export const FilterBar: React.FC = () => {
  const tabs = ['HOSE', 'HNX', 'UPCOM', 'Phái sinh', 'Chứng quyền', 'ETF'];
  const [activeTab, setActiveTab] = React.useState('HOSE');

  return (
    <div className="flex items-center justify-between px-3 py-1.5 bg-[#000000] border-b border-[#1c1c1e]">
      <div className="flex items-center gap-3">
        {/* Search Input */}
        <div className="relative group">
           <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
             <Search size={14} className="text-gray-500 group-focus-within:text-[#2962ff] transition-colors" />
           </div>
           <input 
             type="text" 
             placeholder="Nhập mã CK..." 
             className="bg-[#13171b] border border-[#2c2c2e] text-gray-200 text-xs rounded pl-8 pr-3 py-1 focus:outline-none focus:border-[#2962ff] w-40 transition-colors uppercase placeholder-gray-600"
           />
        </div>

        {/* Market Filters */}
        <div className="flex items-center gap-1">
           {tabs.map(tab => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-3 py-1 text-xs font-bold transition-all relative ${
                 activeTab === tab 
                 ? 'text-[#f59e0b]' // Using amber/orange for active state as usually seen or white
                 : 'text-gray-400 hover:text-white'
               }`}
             >
               {tab}
               {activeTab === tab && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#f59e0b]" />}
             </button>
           ))}
           
           <div className="w-[1px] h-4 bg-[#2c2c2e] mx-1"></div>

           <button className="flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-white transition-colors px-2 py-1">
               Nhóm cổ phiếu <ChevronDown size={12} />
           </button>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
         <button className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-[#2c2c2e]" title="Bộ lọc">
             <Filter size={16} />
         </button>
         <button className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-[#2c2c2e]" title="Cài đặt">
             <Settings size={16} />
         </button>
         <button className="bg-[#2962ff] hover:bg-[#1e4bd8] text-white text-xs font-bold px-4 py-1.5 rounded transition-colors shadow-lg shadow-blue-900/20">
            Giao dịch
         </button>
      </div>
    </div>
  );
};
