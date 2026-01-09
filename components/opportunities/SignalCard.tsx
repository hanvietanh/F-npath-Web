
import React from 'react';
import { BadgeCheck, FlaskConical } from 'lucide-react';
import { SignalData } from './constants';

interface SignalCardProps {
  signal: SignalData;
  onDetail?: () => void;
}

export const SignalCard: React.FC<SignalCardProps> = ({ signal, onDetail }) => {
  return (
    <div className="bg-[#13171b] border border-[#1c1c1e] rounded-xl p-4 hover:border-[#2962ff]/50 transition-all hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] group flex flex-col">
        
        {/* Card Header */}
        <div className="flex justify-between items-start mb-3">
            <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#2c2c2e] shrink-0">
                    <img src={signal.expert.avatar} alt={signal.expert.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                    <div className="flex items-center gap-1">
                        <h3 className="font-bold text-xs text-gray-100 truncate max-w-[100px]">{signal.expert.name}</h3>
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
