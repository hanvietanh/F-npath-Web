
import React from 'react';
import { BadgeCheck, Star, MessageCircle, ChevronRight } from 'lucide-react';
import { FEATURED_EXPERTS, RECOMMENDED_EXPERTS, TOP_PL_EXPERTS, ExpertCardData, ExpertProfile } from './constants';

interface ExpertSidebarProps {
    onExpertClick?: (expert: ExpertProfile) => void;
}

const ExpertCard: React.FC<{ expert: ExpertCardData; onClick?: (expert: ExpertProfile) => void }> = ({ expert, onClick }) => {
    
    const handleProfileClick = () => {
        if (onClick) {
            onClick({
                name: expert.name,
                avatar: expert.avatar,
                role: 'Chuyên gia', // Default role for sidebar
                isVerified: expert.isVerified
            });
        }
    };

    return (
        <div className="bg-[#1a1f26] border border-[#2c2c2e] rounded-xl p-3 hover:border-gray-600 transition-colors">
            {/* Card Header: Profile */}
            <div className="flex justify-between items-start mb-3">
                <div className="flex gap-2.5">
                    <div 
                        className="w-10 h-10 rounded-full border border-[#2c2c2e] overflow-hidden shrink-0 cursor-pointer hover:border-[#2962ff] transition-colors"
                        onClick={handleProfileClick}
                    >
                        <img src={expert.avatar} alt={expert.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div 
                            className="flex items-center gap-1 cursor-pointer hover:opacity-80"
                            onClick={handleProfileClick}
                        >
                            <h3 className="font-bold text-sm text-gray-100 hover:text-[#2962ff] transition-colors">{expert.name}</h3>
                            {expert.isVerified && <BadgeCheck size={14} className="text-[#2962ff] fill-white shrink-0" />}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-0.5">
                            <span>{expert.followers} theo dõi</span>
                            <span className="flex items-center gap-0.5 text-yellow-500"><Star size={10} fill="currentColor" /> {expert.rating}</span>
                        </div>
                    </div>
                </div>
                
                <button 
                    className={`
                        px-3 py-1.5 rounded-full text-[10px] font-bold transition-colors
                        ${expert.isFollowing 
                            ? 'bg-[#2c2c2e] text-gray-400 hover:bg-[#3a3a3c]' 
                            : 'bg-[#2962ff] text-white hover:bg-[#1e4bd8]'}
                    `}
                >
                    {expert.isFollowing ? 'Đã theo dõi' : 'Theo dõi'}
                </button>
            </div>

            {/* Room Info Box */}
            {expert.rooms.map((room, idx) => (
                <div key={idx} className="bg-[#0b0e11] rounded-lg p-2.5 mb-3 flex items-center justify-between group cursor-pointer border border-[#2c2c2e] hover:border-[#2962ff]/50 transition-colors">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="w-7 h-7 rounded-full bg-[#1c1c1e] flex items-center justify-center shrink-0 text-gray-400 group-hover:text-[#2962ff]">
                            <MessageCircle size={14} />
                        </div>
                        <div className="min-w-0">
                            <div className="text-[11px] font-bold text-gray-200 truncate group-hover:text-[#2962ff] transition-colors">{room.name}</div>
                            <div className="text-[9px] text-gray-500">{room.members} thành viên</div>
                        </div>
                    </div>
                    <div className="text-[10px] font-bold text-[#2962ff] whitespace-nowrap pl-2">
                        {room.action}
                    </div>
                </div>
            ))}

            {/* Footer: P/L Stats */}
            <div className="flex items-center justify-between pt-2 border-t border-[#2c2c2e]">
                <span className="text-[10px] text-gray-500 font-medium">Lãi/lỗ 30 ngày</span>
                <span className="text-sm font-bold text-[#00c853]">{expert.return30d}</span>
            </div>
        </div>
    );
};

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1 border-l-2 border-[#2962ff] pl-2">
        {title}
    </h3>
);

export const ExpertSidebar: React.FC<ExpertSidebarProps> = ({ onExpertClick }) => {
  return (
    <div className="w-[340px] bg-[#13171b] border-l border-[#1c1c1e] flex flex-col shrink-0">
         
         {/* Content List - Scrollable */}
         <div className="flex-1 overflow-y-auto p-3 custom-scrollbar space-y-6">
             
             {/* Section 1: Featured */}
             <div>
                 <SectionHeader title="Nổi bật" />
                 <div className="space-y-3">
                    {FEATURED_EXPERTS.map((expert) => (
                        <ExpertCard key={expert.id} expert={expert} onClick={onExpertClick} />
                    ))}
                 </div>
             </div>

             {/* Section 2: Recommended */}
             <div>
                 <SectionHeader title="Đề xuất" />
                 <div className="space-y-3">
                    {RECOMMENDED_EXPERTS.map((expert) => (
                        <ExpertCard key={expert.id} expert={expert} onClick={onExpertClick} />
                    ))}
                 </div>
             </div>

             {/* Section 3: Top P/L */}
             <div>
                 <SectionHeader title="Lãi/lỗ 30 ngày" />
                 <div className="space-y-3">
                    {TOP_PL_EXPERTS.map((expert) => (
                        <ExpertCard key={expert.id} expert={expert} onClick={onExpertClick} />
                    ))}
                 </div>
             </div>
             
             {/* "View All" Button at bottom */}
             <button className="w-full py-3 text-[10px] font-bold text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-1 uppercase tracking-wide border-t border-[#2c2c2e] pt-4">
                 Xem tất cả chuyên gia <ChevronRight size={12} />
             </button>
             
             <div className="h-4"></div> {/* Bottom Spacer */}
         </div>

      </div>
  );
};
