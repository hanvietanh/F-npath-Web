
import React from 'react';
import { BadgeCheck, Star, MessageSquare, Plus, TrendingUp, GraduationCap, ChevronRight } from 'lucide-react';
import { ExpertProfile } from '../constants';

interface ProfileSidebarProps {
    expert: ExpertProfile;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ expert }) => {
    return (
        <div className="w-[320px] md:w-[360px] bg-[#13171b] border-r border-[#2c2c2e] flex flex-col overflow-y-auto custom-scrollbar shrink-0">
            <div className="p-6 pb-4 flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative mb-4">
                    <div className="w-28 h-28 rounded-full border-2 border-[#2c2c2e] overflow-hidden p-1 bg-[#13171b]">
                        <div className="w-full h-full rounded-full overflow-hidden">
                            <img src={expert.avatar} alt={expert.name} className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="absolute -bottom-1 right-1 bg-[#fbbf24] text-black text-[11px] font-bold px-2 py-0.5 rounded-full border-2 border-[#13171b] flex items-center gap-0.5 shadow-sm">
                        4.9 <Star size={10} fill="black" />
                    </div>
                </div>
                
                {/* Name & Role */}
                <div className="flex items-center gap-1.5 mb-1">
                    <h2 className="text-xl font-bold text-white">{expert.name}</h2>
                    {expert.isVerified && <BadgeCheck size={18} className="text-[#2962ff] fill-white" />}
                </div>
                <div className="text-[11px] text-[#2962ff] bg-[#2962ff]/10 px-2.5 py-0.5 rounded-full mb-4 font-bold border border-[#2962ff]/20">
                    {expert.role}
                </div>
                
                {/* Bio */}
                <p className="text-xs text-gray-400 mb-6 leading-relaxed px-2 text-center">
                    Đầu cơ cổ phiếu khi uptrend, bán khống khi downtrend. Tập trung cơ hội tăng trưởng mạnh.
                </p>

                {/* Actions */}
                <div className="flex gap-3 w-full mb-6">
                    <button className="flex-1 py-2.5 bg-[#2c2c2e] hover:bg-[#3a3a3c] text-gray-200 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors">
                        <MessageSquare size={16} /> Nhắn tin
                    </button>
                    <button className="flex-1 py-2.5 bg-[#2962ff] hover:bg-[#1e4bd8] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/20">
                        <Plus size={16} /> Theo dõi
                    </button>
                </div>

                {/* Stats Grid - Fixed Borders matching image */}
                <div className="w-full border-t border-l border-[#2c2c2e] grid grid-cols-2 bg-[#13171b] mb-6">
                    {/* Item 1 */}
                    <div className="p-4 border-r border-b border-[#2c2c2e] flex flex-col items-center">
                        <div className="text-[10px] text-gray-500 uppercase font-bold mb-1 tracking-wider">Tỉ lệ thắng</div>
                        <div className="text-lg font-bold text-white">65.5%</div>
                    </div>
                    {/* Item 2 */}
                    <div className="p-4 border-r border-b border-[#2c2c2e] flex flex-col items-center">
                        <div className="text-[10px] text-gray-500 uppercase font-bold mb-1 tracking-wider">Lãi/Lỗ 30 ngày</div>
                        <div className="text-lg font-bold text-[#00c853]">+833.8%</div>
                    </div>
                    {/* Item 3 */}
                    <div className="p-4 border-r border-b border-[#2c2c2e] flex flex-col items-center">
                        <div className="text-[10px] text-gray-500 uppercase font-bold mb-1 tracking-wider">Người theo dõi</div>
                        <div className="text-lg font-bold text-white">1,292</div>
                    </div>
                    {/* Item 4 */}
                    <div className="p-4 border-r border-b border-[#2c2c2e] flex flex-col items-center">
                        <div className="text-[10px] text-gray-500 uppercase font-bold mb-1 tracking-wider">Đang nắm giữ</div>
                        <div className="text-lg font-bold text-white">4 mã</div>
                    </div>
                </div>

                {/* Performance Chart */}
                <div className="w-full mb-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-white mb-3 pl-1">
                        <TrendingUp size={16} /> HIỆU SUẤT ĐẦU TƯ
                    </div>
                    <div className="h-32 bg-[#1a1f26] rounded-xl border border-[#2c2c2e] relative overflow-hidden flex items-end px-2 pb-0">
                         <div className="w-full h-full flex items-end justify-between gap-1 z-10">
                             {[20, 35, 40, 25, 50, 45, 60, 70, 85, 65, 75, 80].map((h, i) => (
                                 <div 
                                    key={i} 
                                    className="flex-1 bg-[#2962ff]/40 hover:bg-[#2962ff] transition-all rounded-t-sm" 
                                    style={{ height: `${h}%` }}
                                 ></div>
                             ))}
                         </div>
                    </div>
                </div>
            </div>

            {/* Bottom Actions List */}
            <div className="p-4 pt-0 mt-auto">
                 <div className="mb-4">
                     <button className="w-full flex items-center justify-between group p-3 hover:bg-[#1c1c1e] rounded-lg transition-colors border border-transparent hover:border-[#2c2c2e]">
                         <div className="flex items-center gap-3">
                             <div className="p-2 bg-[#2c2c2e] rounded-lg text-gray-400 group-hover:text-white transition-colors">
                                 <GraduationCap size={18} />
                             </div>
                             <span className="text-sm text-gray-300 font-medium group-hover:text-white">Học vấn</span>
                         </div>
                     </button>
                 </div>

                 {/* Community CTA */}
                 <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-4 text-center">
                        <div className="text-xs text-gray-400 mb-1">Đang có <span className="text-white font-bold">+22 cơ hội</span></div>
                        <div className="text-xs text-gray-400 mb-4">trong nhóm tư vấn độc quyền</div>
                        <button className="w-full py-3 bg-[#2962ff] hover:bg-[#1e4bd8] text-white text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2">
                            Tham gia Cộng đồng <ChevronRight size={16} />
                        </button>
                 </div>
            </div>
        </div>
    );
};
