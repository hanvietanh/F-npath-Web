
import React, { useState } from 'react';
import { 
  BadgeCheck, MoreVertical, Search, Heart, Lock, PlusCircle, Smile, Send, Crown
} from 'lucide-react';
import { CHAT_MESSAGES } from './constants';
import { SignalDetailModal } from '../opportunities/SignalDetailModal';
import { SignalData } from '../opportunities/constants';

export const CommunityFeed: React.FC = () => {
  const [selectedSignal, setSelectedSignal] = useState<SignalData | null>(null);

  const handleOpenSignal = (post: any) => {
      // Attempt to find profit % in rows to use as expected profit
      let profitPct = 0;
      if (post.rows) {
          for (const row of post.rows) {
              if (typeof row.value === 'string' && row.value.includes('%')) {
                  const match = row.value.match(/([0-9.]+)%/);
                  if (match) {
                      profitPct = parseFloat(match[1]);
                      break;
                  }
              }
          }
      }

      // Transform post data into SignalData structure expected by the modal
      const signal: SignalData = {
          id: post.id,
          expert: {
              name: post.author,
              avatar: post.avatar,
              role: post.role || 'Chuyên gia',
              isVerified: post.isVerified
          },
          time: post.time,
          action: (post.action === 'Bán' || post.action === 'Bán sớm' || post.action === 'Cắt lỗ') ? 'Bán' : 'Mua',
          symbol: post.symbol === '***' ? 'VND' : post.symbol, // Reveal symbol for demo purposes if masked
          price: post.price === '***' ? 124.5 : (parseFloat(post.price) || 0),
          expectedProfit: profitPct || 15.5,
          holdingTime: '3 - 5 tuần', // Mock value as this isn't in chat data
          isSell: (post.action === 'Bán' || post.action === 'Bán sớm' || post.action === 'Cắt lỗ'),
          reasons: [
              'Cổ phiếu đã tạo nền giá phẳng 6 tuần, rũ bỏ cạn kiệt khối lượng.',
              'Dòng tiền lớn (Big Boys) đã có dấu hiệu gom hàng vùng giá thấp.',
              'Kỳ vọng kết quả kinh doanh quý tới tăng trưởng 20% so với cùng kỳ.'
          ]
      };
      setSelectedSignal(signal);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#000000] min-w-0 relative">
      
      {/* Chat Header */}
      <div className="h-[57px] flex items-center justify-between px-4 border-b border-[#1c1c1e] bg-[#13171b] shrink-0">
          <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-[#2c2c2e]">
                  <img src="https://i.pravatar.cc/150?u=duy" alt="Admin" className="w-full h-full object-cover" />
              </div>
              <div>
                  <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-sm text-white">Dương Văn Duy</h3>
                      <BadgeCheck size={14} className="text-[#2962ff] fill-white" />
                  </div>
                  <div className="text-[10px] text-[#00c853] font-medium">+17.31% hiệu suất đầu tư</div>
              </div>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
              <Search size={18} className="hover:text-white cursor-pointer" />
              <MoreVertical size={18} className="hover:text-white cursor-pointer" />
          </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-6">
        
        {/* Date Separator */}
        <div className="flex justify-center my-2">
            <span className="bg-[#1c1c1e] text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full border border-[#2c2c2e]">
                Hôm nay, 13 Tháng 7
            </span>
        </div>

        {CHAT_MESSAGES.map((post: any) => (
          <div key={post.id} className="flex gap-3 max-w-xl group">
            {/* Avatar */}
            <div className="flex-shrink-0 pt-1">
               <img src={post.avatar} alt={post.author} className="w-9 h-9 rounded-full border border-[#2c2c2e]" />
            </div>

            {/* Message Content Wrapper */}
            <div className="flex-1 min-w-0">
               
               {/* Author Name */}
               <div className="flex items-center gap-2 mb-1">
                   <span className="text-sm font-bold text-white hover:underline cursor-pointer">{post.author}</span>
                   {post.isVerified && <BadgeCheck size={14} className="text-[#2962ff] fill-white" />}
                   {post.role && <span className="text-[10px] text-gray-500">{post.role}</span>}
                   {/* Gold Crown Icon for VIP feeling if needed - optional based on screenshot */}
                   <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center border border-white/20">
                        <Crown size={10} className="text-white fill-white" />
                   </div>
               </div>

               {/* --- SIGNAL CARD TYPE --- */}
               {post.type === 'signal_card' && (
                   <div className="bg-[#1e2329] border border-[#2c2c2e] rounded-xl overflow-hidden shadow-sm relative">
                       {/* Header Section */}
                       <div className="px-4 pt-3 pb-2">
                           {post.customTitle ? (
                               <div className="text-sm font-bold text-white mb-2">
                                   {post.customTitle.split(post.highlightText)[0]}
                                   <span className="text-[#f23645]">{post.highlightText}</span>
                                   {post.customTitle.split(post.highlightText)[1]}
                               </div>
                           ) : (
                               <div className="flex justify-between items-start mb-2">
                                   <div className="flex items-baseline gap-1.5">
                                       <span className={`text-sm font-bold ${post.actionColor}`}>{post.action}</span>
                                       <span className="text-sm font-bold text-white">{post.symbol}</span>
                                       <span className="text-sm text-gray-200">giá {post.price}</span>
                                   </div>
                                   {post.statusLabel && (
                                       <span className="text-[9px] font-bold bg-[#2c2c2e] text-gray-400 px-1.5 py-0.5 rounded border border-[#3a3a3c]">
                                           {post.statusLabel}
                                       </span>
                                   )}
                               </div>
                           )}

                           {/* Rows */}
                           <div className={`space-y-1.5 ${post.isLocked ? 'mb-2' : 'mb-1'}`}>
                               {post.rows?.map((row: any, i: number) => (
                                   <div key={i} className={`flex justify-between items-center text-xs ${i !== 0 ? 'border-t border-[#2c2c2e]/50 pt-1.5' : ''}`}>
                                       <span className="text-gray-400 font-medium">{row.label}</span>
                                       <span 
                                            className={`font-bold ${row.valueColor} ${row.isLink ? 'hover:underline cursor-pointer' : ''}`}
                                            onClick={(e) => {
                                                if (row.isLink) {
                                                    e.stopPropagation();
                                                    handleOpenSignal(post);
                                                }
                                            }}
                                       >
                                           {row.value}
                                       </span>
                                   </div>
                               ))}
                           </div>
                       </div>

                       {/* Locked Overlay / Banner */}
                       {post.isLocked && (
                           <div className="bg-[#f8fafc] dark:bg-[#13171b] border-t border-[#2c2c2e] p-3 flex items-start gap-3 mx-2 mb-2 rounded-lg border">
                               <div className="mt-0.5 text-[#2962ff]">
                                   <Lock size={16} />
                               </div>
                               <div>
                                   <div className="text-[11px] font-bold text-gray-700 dark:text-gray-300 leading-tight">
                                       Đây là nội dung dành cho thành viên VIP
                                   </div>
                                   <div className="text-[10px] text-gray-500 mt-0.5">
                                       Mở khoá sau 2 giờ : 23 phút
                                   </div>
                               </div>
                           </div>
                       )}
                   </div>
               )}

               {/* --- TEXT CARD TYPE --- */}
               {post.type === 'text_card' && (
                   <div className="bg-[#1e2329] border border-[#2c2c2e] rounded-xl overflow-hidden shadow-sm p-4 relative">
                       <h3 className="text-sm font-bold text-white mb-2">{post.title}</h3>
                       
                       <div className="space-y-1 mb-3">
                           {post.contentLines?.map((line: string, i: number) => (
                               <p key={i} className="text-xs text-gray-200 leading-relaxed">{line}</p>
                           ))}
                       </div>

                       <div className="text-[10px] text-gray-500 italic mb-3 pt-2 border-t border-[#2c2c2e] border-dashed">
                           {post.footer}
                       </div>

                       {/* Locked Overlay / Banner */}
                       {post.isLocked && (
                           <div className="bg-[#f8fafc] dark:bg-[#13171b] border border-[#2c2c2e] p-3 flex items-start gap-3 rounded-lg">
                               <div className="mt-0.5 text-[#2962ff]">
                                   <Lock size={16} />
                               </div>
                               <div>
                                   <div className="text-[11px] font-bold text-gray-700 dark:text-gray-300 leading-tight">
                                       Đây là nội dung dành cho thành viên VIP
                                   </div>
                                   <div className="text-[10px] text-gray-500 mt-0.5">
                                       Mở khoá sau 2 giờ : 23 phút
                                   </div>
                               </div>
                           </div>
                       )}
                   </div>
               )}

               {/* Reactions & Timestamp */}
               <div className="flex items-center justify-between mt-1 px-1">
                   <div className="flex items-center gap-2">
                       <div className="flex -space-x-1 bg-[#2c2c2e] rounded-full px-1.5 py-0.5 border border-[#1c1c1e]">
                           {post.reactions?.icons?.map((icon: string, i: number) => (
                               <span key={i} className="text-[10px]">{icon}</span>
                           ))}
                       </div>
                       <span className="text-[10px] font-bold text-gray-400">{post.reactions?.likes}</span>
                   </div>
                   <span className="text-[10px] text-gray-500">{post.time}</span>
               </div>

            </div>
            
            {/* Like Button (Hover) */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-start pt-1">
                <button className="p-1.5 hover:bg-[#2c2c2e] rounded-full text-gray-500 hover:text-[#f23645]">
                    <Heart size={16} />
                </button>
            </div>
          </div>
        ))}
        
        {/* Extra Space at bottom */}
        <div className="h-4"></div>
      </div>

      {/* Chat Input Area (Fixed Bottom) */}
      <div className="p-4 bg-[#13171b] border-t border-[#1c1c1e]">
          <div className="bg-[#2c2c2e] rounded-xl flex items-center p-2 gap-2 h-11">
              <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors hover:bg-[#3a3a3c] rounded-full">
                  <PlusCircle size={20} />
              </button>
              <input 
                type="text" 
                placeholder="Nhập tin nhắn..." 
                className="bg-transparent flex-1 text-sm text-white placeholder-gray-500 focus:outline-none px-2"
              />
              <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors hover:bg-[#3a3a3c] rounded-full">
                  <Smile size={20} />
              </button>
              <button className="w-8 h-8 bg-[#2962ff] flex items-center justify-center text-white rounded-lg hover:bg-[#1e4bd8] transition-colors shadow-lg shadow-blue-900/30">
                  <Send size={16} />
              </button>
          </div>
      </div>

      {/* Signal Detail Modal */}
      {selectedSignal && (
          <SignalDetailModal 
              signal={selectedSignal} 
              onClose={() => setSelectedSignal(null)} 
          />
      )}

    </div>
  );
};
