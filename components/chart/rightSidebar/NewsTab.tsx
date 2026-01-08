
import React from 'react';
import { Sparkles } from 'lucide-react';
import { AI_NEWS_ITEMS } from '../../mockData';

export const NewsTab = () => {
    return (
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
                                 <span>•</span>
                                 <span>{item.time}</span>
                             </div>
                         </div>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed text-justify line-clamp-3">{item.content}</p>
                </div>
             ))}
         </div>
    );
};
