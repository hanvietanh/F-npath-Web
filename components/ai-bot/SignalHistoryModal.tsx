
import React from 'react';
import { X, History, Star, BarChart2, Rocket, ArrowRight, ChevronRight, FileText } from 'lucide-react';
import { SignalItem } from '../aiBotConstants';
import { SignalChart } from './SignalChart';

interface SignalHistoryModalProps {
  signal: SignalItem;
  onClose: () => void;
}

export const SignalHistoryModal: React.FC<SignalHistoryModalProps> = ({ signal, onClose }) => {
  // Hardcoded data to match the screenshot exactly for the demo
  const historyItems = [
      { time: '5 phút trước', action: 'HPG vượt đỉnh', price: '26.15', profit: '+17.68%', date: null },
      { time: '09:45', action: 'HPG vượt đỉnh', price: '24.50', profit: '+17.68%', date: '01/09/2025' },
      { time: '14:15', action: 'Tích lũy nền giá', price: '23.80', profit: '+5.22%', date: '28/08/2025' },
  ];

  return (
    <div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        onClick={onClose}
    >
        <div 
            className="w-full max-w-[1000px] bg-[#13171b] border border-[#2c2c2e] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 h-[600px]"
            onClick={(e) => e.stopPropagation()}
        >
            {/* 1. Header Area */}
            <div className="flex items-start justify-between px-6 py-5 shrink-0 border-b border-[#1c1c1e]/50">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">HPG</h1>
                    <div className="flex flex-col justify-center">
                        <div className="text-gray-400 text-sm font-medium">Thép Hòa Phát - Vượt đỉnh ngắn hạn</div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-3xl font-bold text-[#00c853] tracking-tight">26.35</div>
                        <div className="text-sm font-medium text-[#00c853] text-right mt-[-2px]">+0.45 (+1.74%)</div>
                    </div>
                </div>
            </div>

            {/* 2. Main Content Grid */}
            <div className="flex-1 grid grid-cols-12 gap-6 p-6 min-h-0 bg-[#13171b]">
                
                {/* Left Column: Chart (Approx 60-65% width) */}
                <div className="col-span-7 h-full min-h-0 flex flex-col">
                    <SignalChart />
                </div>

                {/* Right Column: History & Stats (Approx 35-40% width) */}
                <div className="col-span-5 h-full min-h-0 flex flex-col">
                    
                    {/* Header for Right Panel */}
                    <div className="flex justify-between items-start mb-5">
                        <div className="flex items-center gap-2 text-white text-sm font-bold">
                            <History size={18} className="text-[#2962ff]" />
                            Lịch sử báo tín hiệu trong 30 ngày
                        </div>
                        <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Stats Cards Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-[#1a1f26] border border-[#2c2c2e] p-4 rounded-lg flex flex-col justify-center">
                            <div className="text-[11px] text-gray-500 font-medium mb-1">Lợi nhuận TB 30 ngày</div>
                            <div className="text-2xl font-bold text-[#00c853]">+13.4%</div>
                        </div>
                        <div className="bg-[#1a1f26] border border-[#2c2c2e] p-4 rounded-lg flex flex-col justify-center">
                            <div className="text-[11px] text-gray-500 font-medium mb-1">Tỷ lệ thắng TB 30 ngày</div>
                            <div className="text-2xl font-bold text-[#00c853]">68.5%</div>
                        </div>
                    </div>

                    {/* History List */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 -mr-2 space-y-4">
                        {historyItems.map((item, idx) => (
                            <div key={idx} className="border-b border-[#2c2c2e] pb-4 last:border-0 last:pb-0 relative group">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[11px] text-gray-500">
                                        {item.date ? `${item.date}, ${item.time}` : item.time}
                                    </span>
                                    <span className="text-[11px] text-[#2962ff] flex items-center gap-0.5 cursor-pointer hover:underline font-medium transition-colors">
                                        Chi tiết <ArrowRight size={10} />
                                    </span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="text-sm font-bold text-white mb-1">{item.action}</div>
                                        <div className="text-[11px] text-gray-500">
                                            báo tại giá <span className="text-gray-300 font-mono">{item.price}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-[#00c853] tracking-tight">{item.profit}</div>
                                        <div className="text-[10px] text-gray-500">từ lúc cảnh báo</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-6 pt-0 shrink-0 flex flex-col gap-3">
                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 bg-[#2c2c2e] hover:bg-[#3a3a3c] text-white text-xs font-bold py-3 rounded-lg transition-colors border border-transparent hover:border-gray-600">
                                <Star size={14} className="fill-white text-white" /> Theo dõi HPG
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-[#2c2c2e] hover:bg-[#3a3a3c] text-white text-xs font-bold py-3 rounded-lg transition-colors border border-transparent hover:border-gray-600">
                                <FileText size={14} /> Chi tiết HPG <ArrowRight size={12} />
                            </button>
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 bg-[#2962ff] hover:bg-[#1e4bd8] text-white text-sm font-bold py-3.5 rounded-lg transition-colors shadow-lg shadow-blue-900/30">
                            Đặt lệnh thử <Rocket size={16} />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
  );
};
