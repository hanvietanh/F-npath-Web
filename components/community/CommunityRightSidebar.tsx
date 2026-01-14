
import React from 'react';
import { 
  Search, Bell, MoreVertical, Star, MessageCircle, Info, 
  PieChart, ChevronRight, Award, Image, Users, Share2, LogOut 
} from 'lucide-react';
import { GROUP_INFO } from './constants';

export const CommunityRightSidebar: React.FC = () => {
  return (
    <div className="w-[360px] bg-[#13171b] border-l border-[#1c1c1e] flex flex-col h-full overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1c1c1e]">
        <span className="font-bold text-sm text-white">Thông tin nhóm</span>
        <div className="flex items-center gap-3 text-gray-400">
          <Search size={18} className="hover:text-white cursor-pointer" />
          <Bell size={18} className="hover:text-white cursor-pointer" />
          <MoreVertical size={18} className="hover:text-white cursor-pointer" />
        </div>
      </div>

      <div className="p-4">
        {/* Group Profile */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-xl overflow-hidden mb-3 border border-[#2c2c2e]">
            <img src={GROUP_INFO.avatar} alt={GROUP_INFO.name} className="w-full h-full object-cover" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">{GROUP_INFO.name}</h2>
          <div className="text-xs text-gray-500">
            {GROUP_INFO.type} • {GROUP_INFO.members}
          </div>
        </div>

        {/* Admin Card */}
        <div className="bg-[#1a1f26] rounded-xl p-3 border border-[#2c2c2e] mb-4">
          <div className="flex items-center gap-3 mb-2">
            <img src={GROUP_INFO.admin.avatar} alt="Admin" className="w-10 h-10 rounded-full border border-[#2c2c2e]" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-bold text-sm text-white truncate">{GROUP_INFO.admin.name}</span>
                {GROUP_INFO.admin.isVerified && <div className="bg-blue-500 rounded-full p-[2px]"><div className="w-2 h-2 bg-white rounded-full"></div></div>} {/* Simplified tick */}
              </div>
              <span className="text-xs text-gray-500">{GROUP_INFO.admin.role}</span>
            </div>
          </div>
          <p className="text-[11px] text-gray-400 mb-3 line-clamp-2">
            {GROUP_INFO.admin.desc}
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button className="col-span-1 bg-[#2962ff] hover:bg-[#1e4bd8] text-white text-xs font-bold py-1.5 rounded flex items-center justify-center gap-1 transition-colors">
              <MessageCircle size={14} /> Liên hệ
            </button>
            <button className="col-span-1 bg-[#2c2c2e] hover:bg-[#3a3a3c] text-gray-300 text-xs font-bold py-1.5 rounded flex items-center justify-center gap-1 transition-colors">
              <Info size={14} /> Hồ sơ
            </button>
            <button className="col-span-1 bg-[#2c2c2e] hover:bg-[#3a3a3c] text-gray-300 text-xs font-bold py-1.5 rounded flex items-center justify-center gap-1 transition-colors">
              <Star size={14} /> Đánh giá
            </button>
          </div>
        </div>

        {/* Widgets */}
        <div className="space-y-3 mb-6">
          <button className="w-full bg-[#1a1f26] hover:bg-[#2c2c2e] border border-[#2c2c2e] rounded-xl p-3 flex items-center justify-between group transition-colors">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-[#2c2c2e] flex items-center justify-center text-gray-400">
                 <PieChart size={18} />
               </div>
               <span className="text-sm font-bold text-gray-200">Danh mục đầu tư</span>
             </div>
             <div className="flex items-center gap-2">
               <span className="text-[#00c853] font-bold text-sm">{GROUP_INFO.portfolioReturn}</span>
               <ChevronRight size={16} className="text-gray-500 group-hover:text-white" />
             </div>
          </button>

          <button className="w-full bg-[#1a1f26] hover:bg-[#2c2c2e] border border-[#2c2c2e] rounded-xl p-3 flex items-center justify-between group transition-colors">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-[#2c2c2e] flex items-center justify-center text-gray-400">
                 <Award size={18} />
               </div>
               <div className="flex flex-col items-start">
                 <span className="text-sm font-bold text-gray-200">Gia hạn VIP</span>
               </div>
             </div>
             <div className="flex items-center gap-2 text-right">
               <div className="flex flex-col items-end">
                  <span className="text-[10px] text-gray-500">Hết hạn:</span>
                  <span className="text-xs text-gray-300 font-mono">{GROUP_INFO.vipExpiry}</span>
               </div>
               <ChevronRight size={16} className="text-gray-500 group-hover:text-white" />
             </div>
          </button>
        </div>

        {/* Menu Links */}
        <div className="border-t border-[#2c2c2e] pt-2">
           <button className="w-full py-3 flex items-center justify-between text-gray-300 hover:text-white hover:bg-[#1a1f26] px-2 rounded transition-colors group">
              <div className="flex items-center gap-3">
                 <Image size={18} className="text-gray-500 group-hover:text-white" />
                 <span className="text-sm font-medium">Ảnh, file, link đã gửi</span>
              </div>
              <ChevronRight size={16} className="text-gray-500" />
           </button>
           <button className="w-full py-3 flex items-center justify-between text-gray-300 hover:text-white hover:bg-[#1a1f26] px-2 rounded transition-colors group">
              <div className="flex items-center gap-3">
                 <Users size={18} className="text-gray-500 group-hover:text-white" />
                 <span className="text-sm font-medium">Thành viên <span className="text-gray-500 text-xs ml-1">(245)</span></span>
              </div>
              <ChevronRight size={16} className="text-gray-500" />
           </button>
           <button className="w-full py-3 flex items-center justify-between text-gray-300 hover:text-white hover:bg-[#1a1f26] px-2 rounded transition-colors group">
              <div className="flex items-center gap-3">
                 <Share2 size={18} className="text-gray-500 group-hover:text-white" />
                 <span className="text-sm font-medium">Mời bạn bè tham gia nhóm</span>
              </div>
              <ChevronRight size={16} className="text-gray-500" />
           </button>
        </div>

        {/* Leave Group */}
        <div className="border-t border-[#2c2c2e] mt-4 pt-4">
           <button className="w-full flex items-center gap-3 text-[#f23645] hover:bg-[#f23645]/10 px-2 py-2 rounded transition-colors font-medium text-sm">
              <LogOut size={18} />
              Rời nhóm
           </button>
        </div>

      </div>
    </div>
  );
};
