
import React from 'react';
import { BadgeCheck, FlaskConical, Lock } from 'lucide-react';
import { SignalData, ExpertProfile } from './constants';

interface SignalCardProps {
  signal: SignalData;
  onDetail?: () => void;
  onExpertClick?: (expert: ExpertProfile) => void;
}

export const SignalCard: React.FC<SignalCardProps> = ({ signal, onDetail, onExpertClick }) => {
  
  const handleExpertClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onExpertClick) {
          onExpertClick(signal.expert);
      }
  };

  // --- LOCKED STATE VIEW ---
  if (signal.isLocked) {
      return (
        <div className="bg-[#13171b] border border-[#2c2c2e] rounded-xl p-4 hover:border-[#eab308]/50 transition-all flex flex-col gap-4 shadow-sm group">
            {/* Time Header */}
            <div className="text-xs text-gray-500 font-medium">{signal.time}</div>

            {/* Info Box */}
            <div className="bg-[#fffbeb] dark:bg-[#422006]/20 border border-[#facc15] dark:border-[#ca8a04] rounded-xl p-4 relative overflow-hidden">
                {/* Info Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col gap-1">
                         <div className="flex items-center gap-2">
                             <span className="text-xl font-bold text-[#b45309] dark:text-[#facc15]">Mua ***</span>
                             <div className="border border-[#facc15] dark:border-[#eab308] rounded-full p-1 text-[#b45309] dark:text-[#facc15]">
                                 <Lock size={12} strokeWidth={2.5} />
                             </div>
                         </div>
                         <div className="text-sm font-bold text-[#b45309] dark:text-[#facc15]">giá ***</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] text-gray-500 uppercase font-medium">Lợi nhuận kỳ vọng</div>
                        <div className="text-2xl font-bold text-[#b45309] dark:text-[#facc15]">+{signal.expectedProfit}%</div>
                    </div>
                </div>

                {/* Reasons List */}
                <div className="space-y-1 text-[13px] text-gray-800 dark:text-gray-200 font-medium leading-snug">
                    {signal.reasons?.map((r, i) => (
                        <div key={i} className="flex gap-1.5 items-start">
                            <span className="font-bold">{i + 1}.</span>
                            <p className="line-clamp-2">
                                {r}
                                {i === (signal.reasons?.length || 0) - 1 && <span className="text-[#2962ff] font-bold ml-1 cursor-pointer hover:underline">Thêm</span>}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Button */}
            <button className="w-full py-3 bg-[#d97706] hover:bg-[#b45309] text-white font-bold rounded-full text-sm shadow-lg transition-all transform active:scale-[0.98]">
                Gắn mã giới thiệu để mở khóa
            </button>

            {/* Footer */}
            <div className="text-center text-[11px] text-gray-500">
                Dành riêng cho khách hàng của chuyên gia <span className="font-bold text-gray-300 hover:text-[#2962ff] cursor-pointer transition-colors" onClick={handleExpertClick}>{signal.expert.name}</span>
            </div>
        </div>
      );
  }

  // --- UNLOCKED / DEFAULT STATE VIEW ---
  return (
    <div className="bg-[#13171b] border border-[#1c1c1e] rounded-xl p-4 hover:border-[#2962ff]/50 transition-all hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] group flex flex-col">
        
        {/* Card Header */}
        <div className="flex justify-between items-start mb-3">
            <div className="flex gap-2">
                <div 
                    className="w-8 h-8 rounded-full overflow-hidden border border-[#2c2c2e] shrink-0 cursor-pointer hover:border-[#2962ff] transition-colors"
                    onClick={handleExpertClick}
                >
                    <img src={signal.expert.avatar} alt={signal.expert.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                    <div 
                        className="flex items-center gap-1 cursor-pointer hover:opacity-80"
                        onClick={handleExpertClick}
                    >
                        <h3 className="font-bold text-xs text-gray-100 truncate max-w-[100px] hover:text-[#2962ff] transition-colors">{signal.expert.name}</h3>
                        {signal.expert.isVerified && <BadgeCheck size={12} className="text-[#2962ff] fill-white shrink-0" />}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-0.5">
                        <span className="truncate max-w-[80px]">{signal.expert.role}</span>
                        <span>•</span>
                        <span>{signal.time}</span>
                    </div>
                </div>
            </div>
            <button className="text-[10px] font-medium text-[#2962ff] hover:text-[#2962ff]/80 transition-colors shrink-0">
                Theo dõi
            </button>
        </div>

        {/* Card Body */}
        <div 
            className="bg-[#0b0e11] rounded-lg p-3 mb-3 border border-[#1c1c1e] relative overflow-hidden flex-1 cursor-pointer hover:bg-[#1a1f26] transition-colors"
            onClick={onDetail}
        >
            {/* Decorative Background Blur */}
            <div className={`absolute top-0 right-0 w-24 h-24 ${signal.isSell ? 'bg-[#f23645]/5' : 'bg-[#00c853]/5'} rounded-full blur-xl -translate-y-1/2 translate-x-1/2 pointer-events-none`}></div>

            <div className="flex justify-between items-start mb-2 relative z-10">
                <div>
                    <div className={`text-xs font-bold mb-0.5 ${signal.isSell ? 'text-[#f23645]' : 'text-[#00c853]'}`}>
                        {signal.action} <span className="text-lg text-white ml-0.5">{signal.symbol}</span>
                    </div>
                    <div className="text-[10px] text-gray-500 font-medium">giá <span className="text-gray-300">{signal.price}</span></div>
                </div>
                <div className="text-right">
                    <div className="text-[9px] text-gray-500 uppercase font-bold mb-0.5">Lợi nhuận</div>
                    <div className={`text-base font-bold tracking-tight ${signal.isSell ? 'text-[#00c853]' : 'text-[#00c853]'}`}>
                        +{signal.expectedProfit}%
                    </div>
                </div>
            </div>
            
            <div className="flex justify-between items-center text-[10px] border-t border-[#1c1c1e] pt-2 relative z-10">
                <span className="text-gray-500">Nắm giữ</span>
                <span className="font-bold text-gray-300">{signal.holdingTime}</span>
            </div>
        </div>

        {/* Card Footer Actions */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
            <button 
                onClick={onDetail}
                className="py-2 rounded bg-[#2c2c2e] hover:bg-[#3a3a3c] text-[10px] font-bold text-gray-300 transition-colors"
            >
                Chi tiết
            </button>
            <button className="py-2 rounded bg-[#2c2c2e] hover:bg-[#3a3a3c] text-[10px] font-bold text-gray-300 transition-colors flex items-center justify-center gap-1.5 group/btn">
                <span>Đặt lệnh</span>
                <FlaskConical size={12} className="text-[#2962ff] group-hover/btn:rotate-12 transition-transform" />
            </button>
        </div>

    </div>
  );
};
