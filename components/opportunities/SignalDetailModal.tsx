
import React from 'react';
import { X, BadgeCheck, Heart, MessageCircle, Share2, ThumbsUp, ArrowRight, Minus } from 'lucide-react';
import { SignalData, ExpertProfile } from './constants';
import { SignalCard } from './SignalCard';

interface SignalDetailModalProps {
  signal: SignalData;
  onClose: () => void;
  onOpenProfile?: (expert: ExpertProfile) => void;
}

export const SignalDetailModal: React.FC<SignalDetailModalProps> = ({ signal, onClose, onOpenProfile }) => {
  // Removed local state showExpertProfile, triggering parent instead.

  const isBuy = !signal.isSell;
  const colorClass = isBuy ? 'text-[#00c853]' : 'text-[#f23645]';
  const bgClass = isBuy ? 'bg-[#00c853]' : 'bg-[#f23645]';
  
  // Mock derived data for the UI
  const targetPrice = (signal.price * (1 + signal.expectedProfit / 100)).toFixed(2);
  const stopLoss = (signal.price * 0.92).toFixed(2);
  const currentPL = -10.5; // Mock current P/L

  // Mock Related Signals for the "Cùng khuyến nghị" section
  const relatedSignals: SignalData[] = [
      {
        id: 101,
        expert: { name: 'Phạm Minh Hương', avatar: 'https://i.pravatar.cc/150?u=huong', role: 'Chuyên gia kỹ thuật', isVerified: true },
        time: '5 phút trước', action: 'Mua', symbol: signal.symbol, price: signal.price - 0.5, expectedProfit: 15.20, holdingTime: '30 ngày'
      },
      {
        id: 102,
        expert: { name: 'Dragon Capital', avatar: 'https://ui-avatars.com/api/?name=Dragon&background=00c853&color=fff', role: 'Quỹ đầu tư', isVerified: true },
        time: '12 phút trước', action: 'Mua', symbol: signal.symbol, price: signal.price + 0.1, expectedProfit: 20.00, holdingTime: '3 tháng'
      },
       {
        id: 103,
        expert: { name: 'MBS Research', avatar: 'https://ui-avatars.com/api/?name=MBS&background=0ea5e9&color=fff', role: 'Công ty Chứng Khoán', isVerified: true },
        time: '30 phút trước', action: 'Mua', symbol: signal.symbol, price: signal.price + 0.5, expectedProfit: 18.00, holdingTime: '6 tháng'
      }
  ];

  const handleExpertClick = () => {
      if (onOpenProfile) {
          onOpenProfile(signal.expert);
      }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-6xl bg-[#13171b] border border-[#2c2c2e] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2c2c2e] bg-[#1a1f26] shrink-0">
          <div className="flex items-center gap-3">
            <div 
                className="w-10 h-10 rounded-full border border-[#2c2c2e] overflow-hidden cursor-pointer hover:border-[#2962ff] transition-colors"
                onClick={handleExpertClick}
            >
               <img src={signal.expert.avatar} alt={signal.expert.name} className="w-full h-full object-cover" />
            </div>
            <div>
               <div 
                    className="flex items-center gap-1.5 cursor-pointer hover:opacity-80"
                    onClick={handleExpertClick}
               >
                   <h3 className="font-bold text-base text-white hover:text-[#2962ff] transition-colors">{signal.expert.name}</h3>
                   {signal.expert.isVerified && <BadgeCheck size={16} className="text-[#2962ff] fill-white" />}
               </div>
               <div className="flex items-center gap-2 text-xs text-gray-400">
                   <span>{signal.expert.role}</span>
                   <span>•</span>
                   <span>{signal.time}</span>
               </div>
            </div>
            <button className="ml-2 text-xs font-bold text-[#2962ff] hover:bg-[#2962ff]/10 px-3 py-1 rounded transition-colors">
                Theo dõi
            </button>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#2c2c2e] rounded-full text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body - Split View Layout */}
        <div className="flex-1 flex overflow-hidden bg-[#0b0e11]">
           
           {/* LEFT PANEL: Signal Stats (Fixed/Sticky behavior via independent scrolling container) */}
           <div className="w-[40%] overflow-y-auto p-6 border-r border-[#1c1c1e] custom-scrollbar bg-[#13171b]">
               <div className="flex flex-col gap-4 min-h-min">
                   {/* Main Stats Card */}
                   <div className="bg-[#1a1f26] border border-[#2c2c2e] rounded-lg p-5 relative overflow-hidden">
                       {/* Header Row */}
                       <div className="flex justify-between items-start mb-6">
                           <div>
                               <div className="flex items-baseline gap-2 mb-1">
                                   <span className={`text-2xl font-bold ${colorClass} uppercase`}>{signal.action}</span>
                                   <span className="text-3xl font-bold text-white">{signal.symbol}</span>
                               </div>
                               <div className="text-xs text-gray-400">giá <span className="font-bold text-gray-200">{signal.price}</span></div>
                           </div>
                           <div className="text-right">
                               <div className="text-xs text-gray-500 mb-1">Lợi nhuận kỳ vọng</div>
                               <div className="text-2xl font-bold text-[#00c853]">+{signal.expectedProfit}%</div>
                           </div>
                       </div>

                       {/* Stats Grid */}
                       <div className="space-y-4 text-sm">
                           <div className="flex justify-between items-center py-2 border-b border-[#2c2c2e]/50">
                               <span className="text-gray-400">Nắm giữ dự kiến</span>
                               <span className="font-bold text-white">{signal.holdingTime}</span>
                           </div>
                           
                           <div className="flex justify-between items-center py-2 border-b border-[#2c2c2e]/50">
                               <span className="text-gray-400">Giá chốt lời</span>
                               <span className="font-bold text-white">{targetPrice}</span>
                           </div>
                           
                           <div className="flex justify-between items-center py-2 border-b border-[#2c2c2e]/50">
                               <span className="text-gray-400">Giá cắt lỗ</span>
                               <span className="font-bold text-[#f23645]">{stopLoss} <span className="text-xs font-normal opacity-80">(-8%)</span></span>
                           </div>

                           <div className="flex justify-between items-center py-2 border-b border-[#2c2c2e]/50">
                               <span className="text-gray-400">Lãi/Lỗ hiện tại</span>
                               <span className={`font-bold ${currentPL >= 0 ? 'text-[#00c853]' : 'text-[#f23645]'}`}>
                                   {currentPL > 0 ? '+' : ''}{currentPL}%
                               </span>
                           </div>

                           <div className="flex justify-between items-center pt-2">
                               <div className="flex items-center gap-2 text-gray-400">
                                   <div className="w-3 h-3 border border-gray-500 rounded-sm flex items-center justify-center">
                                       <div className="w-1.5 h-1.5 bg-gray-500 rounded-[1px]"></div>
                                   </div> 
                                   Tỉ lệ sử dụng vốn
                               </div>
                               <button className="text-xs text-[#2962ff] hover:text-[#2962ff]/80 flex items-center gap-1 font-medium">
                                   Vào nhóm xem <ArrowRight size={12} />
                               </button>
                           </div>
                       </div>

                       {/* Big Action Button */}
                       <button className="w-full mt-6 py-3 bg-[#13171b] hover:bg-[#2c2c2e] border border-[#2c2c2e] rounded-lg text-[#2962ff] font-bold text-sm flex items-center justify-center gap-2 transition-all">
                           <div className="w-4 h-4 rounded-full border border-[#2962ff] flex items-center justify-center">
                               <div className="w-2 h-2 bg-[#2962ff] rounded-full"></div>
                           </div>
                           Xem toàn bộ danh mục
                       </button>
                   </div>

                   {/* Footer Actions */}
                   <div className="grid grid-cols-2 gap-3 mt-auto">
                       <button className="py-3 bg-[#1a1f26] hover:bg-[#2c2c2e] text-gray-200 font-bold rounded-lg transition-colors text-sm">
                           Chi tiết mã
                       </button>
                       <button className="py-3 bg-[#2962ff] hover:bg-[#1e4bd8] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-lg shadow-blue-900/40">
                           Đặt lệnh <ArrowRight size={16} />
                       </button>
                   </div>
               </div>
           </div>

           {/* RIGHT PANEL: Reasoning, Discussion & Related (Scrollable independently) */}
           <div className="w-[60%] overflow-y-auto p-6 custom-scrollbar bg-[#0b0e11]">
               <div className="flex flex-col gap-6">
                   
                   {/* Reasoning Section */}
                   <div>
                       <div className="flex items-center justify-between mb-3">
                           <h4 className="text-lg font-bold text-white">Lý do khuyến nghị</h4>
                           <button className="text-gray-500 hover:text-white"><Minus size={16} /></button>
                       </div>
                       <ul className="space-y-3 pl-4">
                           <li className="text-gray-300 text-sm list-disc marker:text-[#2962ff]">
                               Cổ phiếu đi nền tích lũy 6 tháng, đã break cản chéo với Volume lớn xác nhận xu hướng tăng.
                           </li>
                           <li className="text-gray-300 text-sm list-disc marker:text-[#2962ff]">
                               Tôi đã soi ăn 2 vòng con này, nhịp này kỳ vọng dòng tiền thông minh sẽ đẩy giá vượt đỉnh cũ.
                           </li>
                           <li className="text-gray-300 text-sm list-disc marker:text-[#2962ff]">
                               Hưởng lợi từ câu chuyện nâng hạng thị trường và hệ thống KRX đi vào hoạt động cuối năm.
                           </li>
                       </ul>
                   </div>

                   {/* Discussion Section */}
                   <div className="bg-[#1a1f26] border border-[#2c2c2e] rounded-xl p-4 flex-1 flex flex-col">
                       <div className="space-y-4 mb-4">
                           {/* Comment 1 */}
                           <div className="flex gap-3">
                               <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold border border-blue-500/30">KV</div>
                               <div className="flex-1 bg-[#2c2c2e] rounded-lg rounded-tl-none p-3 text-sm text-gray-200 shadow-sm">
                                   <p className="mb-2">tiền càng ngày càng cuồn cuộn chảy vào, lan tới ngân hàng + ck là 2 ngành chính</p>
                                   <div className="flex items-center gap-3 text-[10px] text-gray-500">
                                       <span className="flex items-center gap-1"><Heart size={12} className="text-[#f23645] fill-[#f23645]" /> 37</span>
                                       <span>Phản hồi</span>
                                   </div>
                               </div>
                           </div>

                           {/* Comment 2 */}
                           <div className="flex gap-3">
                               <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold border border-purple-500/30">AD</div>
                               <div className="flex-1 bg-[#2c2c2e] rounded-lg rounded-tl-none p-3 text-sm text-gray-200 shadow-sm">
                                   <p>gia cố xong 1500, kéo thẳng lên lại 1540</p>
                               </div>
                           </div>

                            {/* Comment 3 */}
                           <div className="flex gap-3">
                               <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-bold border border-green-500/30">TR</div>
                               <div className="flex-1 bg-[#2c2c2e] rounded-lg rounded-tl-none p-3 text-sm text-gray-200 shadow-sm">
                                   <p className="mb-2">cơ cấu d/mục là quan trọng, tập trung d/mục bank + ck ( bank 60-80%, ck 10-15% / ) các ngành khác ( vốn nhà nước cao như bank nhà nước, dầu khí, sản xuất nhựa, thuốc, bảo hiểm, vận tải, nhôm đồng xi măng, điện nước ) chỉ nên tỷ trọng nhỏ dưới 10% / danh mục /</p>
                                   <div className="flex items-center gap-3 text-[10px] text-gray-500">
                                       <span className="flex items-center gap-1"><ThumbsUp size={12} className="text-yellow-500 fill-yellow-500" /> 4</span>
                                       <div className="flex items-center gap-2">
                                           <button className="hover:bg-gray-700 p-1 rounded-full"><Heart size={12} /></button>
                                           <button className="hover:bg-gray-700 p-1 rounded-full"><Share2 size={12} /></button>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                       
                       {/* Comment Input */}
                       <div className="mt-2 pt-2 border-t border-[#2c2c2e]">
                           <div className="bg-[#0b0e11] rounded-lg p-2 flex items-center gap-2">
                               <div className="w-6 h-6 rounded-full bg-gray-700"></div>
                               <input type="text" placeholder="Viết bình luận..." className="bg-transparent text-sm w-full outline-none text-white placeholder-gray-500" />
                           </div>
                       </div>
                   </div>

                   {/* Related Recommendation */}
                   <div>
                       <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                           Cùng khuyến nghị {signal.symbol} 
                           <span className="bg-[#2c2c2e] text-gray-400 px-1.5 py-0.5 rounded text-[10px]">{relatedSignals.length}</span>
                       </h4>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {relatedSignals.map((item) => (
                               <SignalCard key={item.id} signal={item} onExpertClick={onOpenProfile} />
                           ))}
                       </div>
                   </div>

               </div>
           </div>
        </div>
      </div>
    </div>
  );
};
