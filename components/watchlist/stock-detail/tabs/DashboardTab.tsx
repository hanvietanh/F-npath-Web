
import React, { useState } from 'react';
import { Zap, Sparkles, Star, BarChart2, ChevronUp, ChevronDown } from 'lucide-react';
import { OrderBookWidget } from '../dashboard/OrderBookWidget';
import { TechnicalChartWidget } from '../dashboard/TechnicalChartWidget';

interface DashboardTabProps {
    symbol: string;
    onAskCopilot: (type: string | null, query: string) => void;
}

// Helper Component for Polished Net Value Chart (Matching Screenshot)
const NetValueChart = ({ data }: { data: { date: string, value: number }[] }) => {
    const maxAbs = Math.max(...data.map(d => Math.abs(d.value)));
    const range = maxAbs * 1.1; // Add 10% padding for visual breathing room

    return (
        <div className="h-40 mt-2 bg-[#13171b] rounded border border-gray-800 p-2 relative flex flex-col select-none animate-in slide-in-from-top-2 duration-300">
            {/* Header / Legend */}
            <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] text-gray-500 font-bold">Giá trị ròng (Tỷ)</span>
                <div className="flex bg-[#1c1c1e] rounded p-0.5 border border-[#2c2c2e]">
                    <span className="text-[8px] px-2 py-0.5 bg-[#2962ff] text-white rounded font-bold shadow-sm">10 phiên</span>
                    <span className="text-[8px] px-2 py-0.5 text-gray-500 hover:text-gray-300 cursor-pointer transition-colors">Hôm nay</span>
                </div>
            </div>

            {/* Chart Area */}
            <div className="flex-1 relative flex items-center justify-between gap-1 mx-1">
                {/* Zero Line */}
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gray-700 border-t border-dashed border-gray-600 opacity-50 z-0"></div>
                
                {/* Y-Axis Guidelines (Optional, faint) */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gray-800 opacity-30"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-800 opacity-30"></div>

                {data.map((item, idx) => {
                    // Calculate height percentage relative to half the container (from center)
                    const heightPct = (Math.abs(item.value) / range) * 50;
                    const isPos = item.value >= 0;
                    
                    return (
                        <div key={idx} className="flex-1 h-full relative group flex flex-col items-center justify-center z-10">
                            {/* Bar */}
                            <div 
                                className={`w-full max-w-[10px] rounded-[1px] transition-all duration-300 group-hover:brightness-125 group-hover:scale-x-110 ${isPos ? 'bg-gradient-to-t from-emerald-600 to-emerald-400' : 'bg-gradient-to-b from-red-600 to-red-400'}`}
                                style={{
                                    height: `${heightPct}%`,
                                    position: 'absolute',
                                    top: isPos ? 'auto' : '50%', // If positive, grow up from center (bottom is 50%)
                                    bottom: isPos ? '50%' : 'auto', // If negative, grow down from center (top is 50%)
                                }}
                            ></div>

                            {/* Tooltip */}
                            <div className={`opacity-0 group-hover:opacity-100 absolute left-1/2 -translate-x-1/2 bg-[#2c2c2e] border border-gray-600 text-white text-[9px] px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none shadow-xl transition-opacity duration-200 ${isPos ? '-top-8' : '-bottom-8'}`}>
                                <div className="font-bold text-gray-300 border-b border-gray-600 mb-0.5 pb-0.5">{item.date}</div>
                                <div className={`font-mono text-[10px] ${isPos ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {item.value > 0 ? '+' : ''}{item.value} tỷ
                                </div>
                            </div>
                            
                            {/* X-Axis Date */}
                            <div className="absolute -bottom-2 text-[7px] text-gray-500 font-medium opacity-70 group-hover:opacity-100 group-hover:text-white transition-all">
                                {item.date}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export const DashboardTab: React.FC<DashboardTabProps> = ({ symbol, onAskCopilot }) => {
  const [expandedChart, setExpandedChart] = useState<string | null>(null);

  const toggleChart = (type: string) => {
      setExpandedChart(prev => prev === type ? null : type);
  };

  // Mock data matching the screenshot style (10 sessions)
  const foreignData = [
    { date: '26/12', value: -1150 },
    { date: '29/12', value: -80 },
    { date: '30/12', value: 980 },
    { date: '31/12', value: 720 },
    { date: '05/01', value: -750 },
    { date: '06/01', value: -420 },
    { date: '07/01', value: 510 },
    { date: '08/01', value: 450 },
    { date: '09/01', value: 790 },
    { date: '12/01', value: 1050 }
  ];

  const propData = [
    { date: '26/12', value: 200 },
    { date: '29/12', value: 150 },
    { date: '30/12', value: -50 },
    { date: '31/12', value: -120 },
    { date: '05/01', value: 300 },
    { date: '06/01', value: 100 },
    { date: '07/01', value: -200 },
    { date: '08/01', value: 50 },
    { date: '09/01', value: 400 },
    { date: '12/01', value: 650 }
  ];

  return (
    <div className="flex h-full w-full">
        {/* Cột 1: Cung Cầu */}
        <OrderBookWidget />

        {/* Cột 2: Kỹ thuật */}
        <TechnicalChartWidget symbol={symbol} />

        {/* Cột 3: Sức mạnh & Cá Mập */}
        <aside className="w-[25%] border-l border-gray-800 bg-[#0b0e11] flex flex-col overflow-y-auto custom-scrollbar">
        
        {/* 1. Cá Mập & Dòng Tiền Lớn */}
        <div className="p-3 border-b border-gray-800">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-emerald-400">
                    <div className="p-1.5 bg-emerald-900/30 rounded"><Zap size={14}/></div>
                    <h3 className="font-bold text-sm uppercase">Dòng Tiền Lớn</h3>
                </div>
                <button 
                    onClick={() => onAskCopilot('shark_flow', '')} 
                    className="text-[10px] flex items-center gap-1 text-blue-400 hover:text-white bg-blue-900/20 px-2 py-1 rounded border border-blue-800 hover:border-blue-500 transition"
                >
                    <Sparkles size={10} /> AI Insight
                </button>
            </div>
            
            <div className="space-y-2">
                {/* A. Cá mập (Lệnh to) */}
                <div className="bg-[#151a21] p-2 rounded border border-gray-800">
                    <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-gray-400 font-bold">Cá mập ({'>'}1 tỷ/lệnh)</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col"><span className="text-emerald-500 font-bold text-xs">MUA: 15</span></div>
                        <div className="text-[10px] text-gray-500">vs</div>
                        <div className="flex flex-col items-end"><span className="text-red-500 font-bold text-xs">BÁN: 4</span></div>
                    </div>
                    <div className="mt-1 text-[10px] text-emerald-400 italic bg-emerald-900/10 px-1 py-0.5 rounded text-center">
                        Phe Mua đang gom mạnh
                    </div>
                </div>

                {/* B. Nước ngoài (NN) */}
                <div className="bg-[#151a21] p-2 rounded border border-gray-800 transition-all">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-400 text-[11px] font-bold">Nước ngoài (NN)</span>
                        <button onClick={() => toggleChart('foreign')} className="text-gray-500 hover:text-blue-400 transition-colors p-1 hover:bg-[#2c2c2e] rounded">
                            {expandedChart === 'foreign' ? <ChevronUp size={14}/> : <BarChart2 size={14}/>}
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[80%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                        </div>
                        <span className="font-bold text-emerald-500 text-xs whitespace-nowrap">+1,050 Tỷ</span>
                    </div>
                    {expandedChart === 'foreign' && <NetValueChart data={foreignData} />}
                </div>

                {/* C. Tự doanh (Prop Trading) */}
                <div className="bg-[#151a21] p-2 rounded border border-gray-800 transition-all">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-400 text-[11px] font-bold">Tự doanh (TD)</span>
                        <button onClick={() => toggleChart('prop')} className="text-gray-500 hover:text-blue-400 transition-colors p-1 hover:bg-[#2c2c2e] rounded">
                            {expandedChart === 'prop' ? <ChevronUp size={14}/> : <BarChart2 size={14}/>}
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[60%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                        </div>
                        <span className="font-bold text-emerald-500 text-xs whitespace-nowrap">+650 Tỷ</span>
                    </div>
                    {expandedChart === 'prop' && <NetValueChart data={propData} />}
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
            
            <div className="grid grid-cols-3 gap-y-3 gap-x-2 mb-4">
                <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 mb-0.5">Vốn hóa</span>
                    <span className="text-[11px] font-bold text-white">209,156 tỷ</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 mb-0.5">GT sổ sách</span>
                    <span className="text-[11px] font-bold text-white">125,260 tỷ</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 mb-0.5">P/E (D)</span>
                    <span className="text-[11px] font-bold text-white">14.5 lần</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 mb-0.5">KLGD TB15D</span>
                    <span className="text-[11px] font-bold text-white">41,132 k</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 mb-0.5">EPS</span>
                    <span className="text-[11px] font-bold text-white">1,875.8 ₫</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 mb-0.5">P/B (D)</span>
                    <span className="text-[11px] font-bold text-white">1.7 lần</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 mb-0.5">KLCP l.hành</span>
                    <span className="text-[11px] font-bold text-white">7,676 tr</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 mb-0.5">EV/EBITDA</span>
                    <span className="text-[11px] font-bold text-white">10.5 lần</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 mb-0.5">Kiểm toán</span>
                    <span className="text-[11px] font-bold text-orange-400">KPMG</span>
                </div>
            </div>

            <div className="mb-4 pt-3 border-t border-gray-800">
                <div className="flex justify-between text-[10px] text-gray-500 mb-1"><span>Rẻ</span><span>Đắt</span></div>
                <div className="relative h-2 bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-500 rounded-full">
                    <div className="absolute top-1/2 -translate-y-1/2 left-[60%] w-3 h-3 bg-white border-2 border-blue-900 rounded-full shadow-md transform -translate-x-1/2"></div>
                </div>
                <div className="text-center mt-1 text-[10px] text-gray-400">P/E: 14.5 (Trung tính)</div>
            </div>
            
            <button className="w-full py-1.5 bg-[#1e2530] hover:bg-[#2a3441] text-blue-400 text-[11px] rounded border border-blue-900/30 transition">Xem chi tiết BCTC &gt;</button>
        </div>
        </aside>
    </div>
  );
};
