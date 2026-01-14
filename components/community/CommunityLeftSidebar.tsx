
import React from 'react';
import { Zap, Users, Headphones } from 'lucide-react';
import { SIDEBAR_ITEMS } from './constants';

export const CommunityLeftSidebar: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'zap': return <Zap size={18} fill="white" />;
      case 'users': return <Users size={18} />;
      case 'headphones': return <Headphones size={18} />;
      default: return <Zap size={18} />;
    }
  };

  return (
    <div className="w-[300px] bg-[#13171b] border-r border-[#1c1c1e] flex flex-col h-full overflow-y-auto custom-scrollbar shrink-0">
      
      {/* SECTION: GHIM */}
      <div className="p-3 pb-0">
        <h3 className="px-3 mb-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">GHIM</h3>
        <div className="space-y-1">
          {SIDEBAR_ITEMS.pinned.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1a1f26] cursor-pointer group transition-colors">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0 ${item.avatarColor}`}>
                {getIcon(item.icon)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="text-sm font-bold text-gray-200 truncate group-hover:text-white">{item.title}</h4>
                  <span className="text-[10px] text-gray-500">{item.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500 truncate max-w-[140px]">{item.subtitle}</p>
                  {item.unread > 0 && (
                    <span className="bg-gray-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {item.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-4"></div>

      {/* SECTION: CỘNG ĐỒNG */}
      <div className="p-3 pt-0">
        <h3 className="px-3 mb-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">CỘNG ĐỒNG</h3>
        <div className="space-y-1">
          {SIDEBAR_ITEMS.community.map((item) => (
            <div 
                key={item.id} 
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer group transition-colors ${item.active ? 'bg-[#1a1f26]' : 'hover:bg-[#1a1f26]'}`}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#2c2c2e]">
                <img src={item.avatar} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className={`text-sm font-bold truncate ${item.active ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>{item.title}</h4>
                  <span className="text-[10px] text-gray-500">{item.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className={`text-xs truncate max-w-[140px] ${item.active ? 'text-gray-300' : 'text-gray-500'}`}>
                      {item.subtitle}
                  </p>
                  
                  {item.unread > 0 && (
                    <span className="bg-[#2962ff] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {item.unread}
                    </span>
                  )}
                  {item.hasDot && (
                      <div className="w-2 h-2 rounded-full bg-[#f23645]"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
