
import React from 'react';
import { UserPlus, ChevronRight } from 'lucide-react';
import { EXPERTS, TRENDING } from './constants';

export const ExpertSidebar: React.FC = () => {
  return (
    <div className="w-[300px] bg-[#13171b] border-l border-[#1c1c1e] flex flex-col shrink-0">
         
         {/* Section 1: Top Experts */}
         <div className="p-4 border-b border-[#1c1c1e]">
             <h3 className="text-xs font-bold text-white mb-3 uppercase tracking-wider">Top Chuyên gia</h3>
             <div className="space-y-3">
                 {EXPERTS.map((expert) => (
                     <div key={expert.id} className="flex items-center justify-between group cursor-pointer">
                         <div className="flex items-center gap-3">
                             <div className="w-9 h-9 rounded-full border border-[#2c2c2e] overflow-hidden">
                                 <img src={expert.avatar} alt={expert.name} className="w-full h-full object-cover" />
                             </div>
                             <div>
                                 <div className="text-xs font-bold text-gray-200 group-hover:text-[#2962ff] transition-colors">{expert.name}</div>
                                 <div className="text-[10px] text-[#00c853] font-medium">{expert.return} / năm</div>
                             </div>
                         </div>
                         <button className="p-1.5 rounded-full hover:bg-[#2c2c2e] text-[#2962ff] transition-colors">
                             <UserPlus size={16} />
                         </button>
                     </div>
                 ))}
             </div>
             <button className="w-full mt-3 text-[10px] font-medium text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-1">
                 Xem tất cả <ChevronRight size={10} />
             </button>
         </div>

         {/* Section 2: Trending Today */}
         <div className="p-4 flex-1 overflow-y-auto">
             <h3 className="text-xs font-bold text-white mb-3 uppercase tracking-wider">Xu hướng hôm nay</h3>
             <div className="space-y-2">
                 {TRENDING.map((item, i) => (
                     <div key={i} className="flex items-center justify-between p-2.5 bg-[#0b0e11] border border-[#1c1c1e] rounded hover:border-[#2c2c2e] cursor-pointer transition-colors">
                         <span className="font-bold text-xs text-white">{item.symbol}</span>
                         <span className="font-bold text-xs" style={{ color: item.color }}>{item.change}</span>
                     </div>
                 ))}
             </div>
         </div>

      </div>
  );
};
