
import React from 'react';
import { Zap, Sparkles, Star, BarChart2 } from 'lucide-react';
import { OrderBookWidget } from '../dashboard/OrderBookWidget';
import { TechnicalChartWidget } from '../dashboard/TechnicalChartWidget';

interface DashboardTabProps {
    symbol: string;
    onAskCopilot: (type: string | null, query: string) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({ symbol, onAskCopilot }) => {
  return (
    <div className="flex h-full w-full">
        {/* Cột 1: Cung Cầu */}
        <OrderBookWidget />

        {/* Cột 2: Kỹ thuật */}
        <TechnicalChartWidget symbol={symbol} />

        {/* Cột 3: Sức mạnh & Cá Mập */}
        <aside className="w-[25%] border-l border-gray-800 bg-[#0b0e11] flex flex-col overflow-y-auto custom-scrollbar">
        {/* 1. Cá Mập */}
        <div className="p-3 border-b border-gray-800">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-emerald-400">
                <div className="p-1.5 bg-emerald-900/30 rounded"><Zap size={14}/></div>
                <h3 className="font-bold text-sm uppercase">Cá Mập</h3>
                </div>
                <button onClick={() => onAskCopilot(null, `Phân tích dòng tiền và động thái cá mập của ${symbol} hôm nay?`)} className="text-[10px] flex items-center gap-1 text-blue-400 hover:text-white bg-blue-900/20 px-2 py-1 rounded border border-blue-800 hover:border-blue-500 transition"><Sparkles size={10} /> AI Insight</button>
            </div>
            
            <div className="space-y-3">
            <div className="bg-[#151a21] p-2 rounded border border-gray-800">
                <div className="flex justify-between text-[11px] mb-1"><span className="text-gray-400">Cá mập ({'>'}1 tỷ/lệnh)</span></div>
                <div className="flex justify-between items-center"><div className="flex flex-col"><span className="text-emerald-500 font-bold text-xs">MUA: 15</span></div><div className="text-[10px] text-gray-500">vs</div><div className="flex flex-col items-end"><span className="text-red-500 font-bold text-xs">BÁN: 4</span></div></div>
                <div className="mt-1 text-[10px] text-emerald-400 italic bg-emerald-900/10 px-1 py-0.5 rounded text-center">Phe Mua đang gom mạnh</div>
            </div>
            <div className="bg-[#151a21] p-2 rounded border border-gray-800">
                <div className="flex justify-between text-[11px] mb-1"><span className="text-gray-400">Nước ngoài (NN)</span></div>
                <div className="flex items-center gap-2"><div className="flex-1 h-1.5 bg-gray-700 rounded-full"><div className="h-full bg-emerald-500 w-[80%] rounded-full"></div></div><span className="font-bold text-emerald-500 text-xs">+25.5 Tỷ</span></div>
            </div>
            </div>
        </div>

        {/* 2. SỨC MẠNH (RS) */}
        <div className="p-3 border-b border-gray-800">
            <div className="flex items-center gap-2 mb-3 text-purple-400"><div className="p-1.5 bg-purple-900/30 rounded"><Star size={14}/></div><h3 className="font-bold text-sm uppercase">Sức mạnh (RS)</h3></div>
            <div className="flex items-center justify-between mb-2"><span className="text-3xl font-bold text-white">85<span className="text-sm text-gray-500 font-normal">/99</span></span><span className="px-2 py-1 bg-purple-600 text-white text-[10px] font-bold rounded shadow-lg shadow-purple-900/50">RẤT KHỎE</span></div>
            <div className="space-y-2 text-[11px]">
            <div className="flex justify-between items-center py-1 border-b border-gray-800/50"><span className="text-gray-400">Vs VN-Index</span><span className="text-emerald-400 font-bold">[Mạnh hơn]</span></div>
            <div className="flex justify-between items-center py-1 border-b border-gray-800/50"><span className="text-gray-400">Vs Ngành Thép</span><span className="text-yellow-500 font-bold">[Trung bình]</span></div>
            </div>
        </div>

        {/* 3. CƠ BẢN (Fundamental) */}
        <div className="p-3">
            <div className="flex items-center gap-2 mb-3 text-blue-400"><div className="p-1.5 bg-blue-900/30 rounded"><BarChart2 size={14}/></div><h3 className="font-bold text-sm uppercase">Cơ bản (Fundamental)</h3></div>
            <div className="mb-4"><div className="flex justify-between text-[10px] text-gray-500 mb-1"><span>Rẻ</span><span>Đắt</span></div><div className="relative h-2 bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-500 rounded-full"><div className="absolute top-1/2 -translate-y-1/2 left-[60%] w-3 h-3 bg-white border-2 border-blue-900 rounded-full shadow-md transform -translate-x-1/2"></div></div><div className="text-center mt-1 text-[10px] text-gray-400">P/E: 14.5 (Trung tính)</div></div>
            <button className="w-full py-1.5 bg-[#1e2530] hover:bg-[#2a3441] text-blue-400 text-[11px] rounded border border-blue-900/30 transition">Xem chi tiết BCTC &gt;</button>
        </div>
        </aside>
    </div>
  );
};
