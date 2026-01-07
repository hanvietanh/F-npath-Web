
import React from 'react';
import { Search, Filter, Settings, ChevronDown } from 'lucide-react';

export const FilterBar: React.FC = () => {
  const tabs = ['Tất cả', 'HOSE', 'HNX', 'UPCOM', 'Phái sinh', 'Chứng quyền', 'ETF'];
  const [activeTab, setActiveTab] = React.useState('Tất cả');

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-[#13171b] border-b border-[#1c1c1e]">
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative group">
           <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
             <Search size={14} className="text-gray-500 group-focus-within:text-[#2962ff] transition-colors" />
           </div>
           <input 
             type="text" 
             placeholder="Nhập mã CK..." 
             className="bg-[#000000] border border-[#2c2c2e] text-gray-200 text-xs rounded pl-8 pr-3 py-1.5 focus:outline-none focus:border-[#2962ff] w-48 transition-colors"
           />
        </div>

        {/* Market Filters */}
        <div className="flex bg-[#000000] rounded p-0.5 border border-[#2c2c2e]">
           {tabs.map(tab => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                 activeTab === tab 
                 ? 'bg-[#2962ff] text-white shadow-sm' 
                 : 'text-gray-400 hover:text-white hover:bg-[#1c1c1e]'
               }`}
             >
               {tab}
             </button>
           ))}
        </div>

        <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors bg-[#000000] border border-[#2c2c2e] px-3 py-1.5 rounded">
            Nhóm cổ phiếu <ChevronDown size={12} />
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
         <button className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-[#2c2c2e]">
             <Filter size={16} />
         </button>
         <button className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-[#2c2c2e]">
             <Settings size={16} />
         </button>
         <button className="bg-[#2962ff] hover:bg-[#1e4bd8] text-white text-xs font-bold px-4 py-1.5 rounded transition-colors">
            Giao dịch
         </button>
      </div>
    </div>
  );
};
