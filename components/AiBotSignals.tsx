import React, { useState } from 'react';
import { Bell, ChevronRight, Plus, Search, Calendar, PlusCircle } from 'lucide-react';
import { MOCK_BOT_SIGNALS, SignalItem } from './aiBotConstants';
import { SignalHistoryModal } from './ai-bot/SignalHistoryModal';

interface AiBotSignalsProps {
    onSymbolClick?: (symbol: string) => void;
}

const MiniSparkline = ({ data, color }: { data: number[], color: string }) => {
    const width = 60;
    const height = 20;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((d - min) / range) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg width={width} height={height} className="overflow-visible">
            <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" />
        </svg>
    )
}

const BotCard = ({ 
    title, 
    desc, 
    winRate, 
    avgProfit, 
    count 
}: { 
    title: string, 
    desc: string, 
    winRate: string, 
    avgProfit: string,
    count?: number
}) => (
    <div className="bg-[#13171b] border border-[#2c2c2e] rounded-lg p-4 flex flex-col justify-between hover:border-[#2962ff] transition-colors cursor-pointer group h-full">
        <div>
            <div className="flex justify-between items-start mb-2">
                <Bell size={20} className="text-gray-400 group-hover:text-[#2962ff] transition-colors" />
                <div className="flex items-center gap-2">
                    {count && (
                        <span className="bg-[#f23645] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            {count > 99 ? '99+' : count}
                        </span>
                    )}
                    <ChevronRight size={16} className="text-gray-600 group-hover:text-white" />
                </div>
            </div>
            <h3 className="text-sm font-bold text-white mb-2 leading-tight">{title}</h3>
            <p className="text-[11px] text-gray-500 line-clamp-2 mb-4">{desc}</p>
        </div>
        <div className="flex gap-6 pt-3 border-t border-[#2c2c2e]">
            <div>
                <div className="text-[10px] text-gray-500 uppercase">Win Rate</div>
                <div className="text-sm font-bold text-[#00c853]">{winRate}</div>
            </div>
            <div>
                <div className="text-[10px] text-gray-500 uppercase">Avg Profit</div>
                <div className="text-sm font-bold text-[#00c853]">{avgProfit}</div>
            </div>
        </div>
    </div>
);

export const AiBotSignals: React.FC<AiBotSignalsProps> = ({ onSymbolClick }) => {
  const [selectedSignal, setSelectedSignal] = useState<SignalItem | null>(null);

  return (
    <div className="flex flex-col h-full bg-[#000000] p-6 overflow-hidden relative">
        
        {/* Signal History Modal Popup */}
        {selectedSignal && (
            <SignalHistoryModal 
                signal={selectedSignal} 
                onClose={() => setSelectedSignal(null)} 
            />
        )}

        {/* Header */}
        <h1 className="text-xl font-bold text-white mb-6">Tín hiệu AI Bot</h1>

        {/* Top Cards Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8 shrink-0">
            <BotCard 
                title="Cổ phiếu Vượt đỉnh Khối lượng lớn" 
                desc="Cổ phiếu tăng giá vượt qua mức cao nhất trước đó với khối lượng đột biến."
                winRate="68%"
                avgProfit="12.5%"
            />
            <BotCard 
                title="Giảm mạnh về vùng hỗ trợ" 
                desc="Cổ phiếu giảm mạnh về vùng hỗ trợ, báo hiệu xu hướng retest."
                winRate="54%"
                avgProfit="8.2%"
                count={13}
            />
            <BotCard 
                title="Tích lũy chặt ở nền giá" 
                desc="Cổ phiếu có khối lượng tích lũy chặt ở nền giá, chuẩn bị bứt phá."
                winRate="72%"
                avgProfit="15.1%"
                count={6}
            />
            <BotCard 
                title="Cá mập mua/bán lệnh lớn" 
                desc="Cổ phiếu có khối lượng mua/bán lớn từ các cổ đông lớn."
                winRate="61%"
                avgProfit="18.4%"
                count={150} // 99+
            />
             <div className="border border-dashed border-[#2c2c2e] rounded-lg flex flex-col items-center justify-center p-4 hover:border-[#2962ff] hover:bg-[#13171b] cursor-pointer transition-colors group h-full min-h-[160px]">
                <div className="w-12 h-12 rounded-full border border-[#2c2c2e] flex items-center justify-center mb-3 group-hover:border-[#2962ff] group-hover:bg-[#2962ff]/10 transition-colors">
                    <Plus size={24} className="text-gray-400 group-hover:text-[#2962ff]" />
                </div>
                <span className="text-sm font-bold text-gray-300 group-hover:text-white">Tạo bot mới</span>
            </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
                <h2 className="text-lg font-bold text-white">Tất cả tín hiệu</h2>
                <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input 
                        type="text" 
                        placeholder="Mã CK" 
                        className="bg-[#13171b] border border-[#2c2c2e] rounded py-1.5 pl-9 pr-3 text-xs text-white focus:border-[#2962ff] focus:outline-none w-32"
                    />
                </div>
                <div className="relative">
                    <button className="bg-[#13171b] border border-[#2c2c2e] rounded py-1.5 px-3 text-xs text-gray-300 flex items-center gap-2 hover:border-gray-500">
                        <span className="text-gray-500">Thời gian</span>
                        <span className="font-medium text-white">09/12/2025 - 09/01/2026</span>
                        <Calendar size={14} className="text-gray-500" />
                    </button>
                </div>
            </div>
            
            <button className="flex items-center gap-1.5 text-gray-400 hover:text-white text-xs font-medium px-3 py-1.5 rounded hover:bg-[#1c1c1e] transition-colors">
                <PlusCircle size={14} /> Thêm cột
            </button>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-auto custom-scrollbar border-t border-[#1c1c1e]">
            <table className="w-full text-right border-collapse">
                <thead className="bg-[#000000] text-gray-500 text-[11px] font-medium sticky top-0 z-10">
                    <tr>
                        <th className="text-left py-3 font-medium">Thời gian ghi nhận</th>
                        <th className="text-center py-3 font-medium">Mã CK</th>
                        <th className="text-left py-3 font-medium pl-4">Tín hiệu</th>
                        <th className="py-3 font-medium">Giá ghi nhận</th>
                        <th className="py-3 font-medium">% Từ giá ghi nhận</th>
                        <th className="py-3 font-medium">Giá hiện tại</th>
                        <th className="py-3 font-medium">% Hôm nay</th>
                        <th className="py-3 font-medium">% 1 tuần</th>
                        <th className="py-3 font-medium">% 1 tháng</th>
                        <th className="py-3 font-medium">P/B</th>
                        <th className="py-3 font-medium">P/E</th>
                        <th className="py-3 font-medium">Vốn hoá</th>
                        <th className="py-3 font-medium pr-2">% Khối lượng dự kiến</th>
                    </tr>
                </thead>
                <tbody className="text-xs">
                    {MOCK_BOT_SIGNALS.map((item, idx) => {
                        const isPositive = item.pctToday >= 0;
                        const colorClass = isPositive ? 'text-[#00c853]' : 'text-[#f23645]';
                        
                        return (
                            <tr 
                                key={idx} 
                                className="border-b border-[#1c1c1e] hover:bg-[#13171b] transition-colors group cursor-pointer"
                            >
                                <td className="text-left py-4 text-gray-200 tabular-nums">{item.time}</td>
                                <td 
                                    className={`text-center py-4 font-bold cursor-pointer hover:bg-[#2c2c2e] ${item.symbol === 'FOX' || item.symbol === 'PLX' || item.symbol === 'BSR' ? 'text-[#00c853]' : 'text-[#f23645]'}`}
                                    onClick={() => onSymbolClick && onSymbolClick(item.symbol)}
                                >
                                    {item.symbol}
                                </td>
                                <td className="text-left py-4 text-gray-200 pl-4 font-medium max-w-[250px] truncate" title={item.signalName} onClick={() => setSelectedSignal(item)}>
                                    {item.signalName}
                                </td>
                                <td className="py-4 text-gray-200 font-mono">{item.entryPrice.toFixed(2)}</td>
                                <td className={`py-4 font-mono ${item.pctFromEntry >= 0 ? 'text-[#00c853]' : 'text-[#f23645]'}`}>
                                    {item.pctFromEntry}%
                                </td>
                                <td className="py-4 text-[#f23645] font-mono">{item.currentPrice}</td>
                                <td className="py-4">
                                    <div className="flex flex-col items-end gap-1">
                                        <span className={`font-mono ${colorClass}`}>{item.pctToday > 0 ? '+' : ''}{item.pctToday}%</span>
                                        <MiniSparkline data={item.chartData} color={isPositive ? '#00c853' : '#f23645'} />
                                    </div>
                                </td>
                                <td className={`py-4 font-mono ${item.pctWeek >= 0 ? 'text-[#00c853]' : 'text-[#f23645]'}`}>
                                    {item.pctWeek}%
                                </td>
                                <td className={`py-4 font-mono ${item.pctMonth >= 0 ? 'text-[#00c853]' : 'text-[#f23645]'}`}>
                                    {item.pctMonth}%
                                </td>
                                <td className="py-4 text-gray-200 font-mono">{item.pb}</td>
                                <td className="py-4 text-gray-200 font-mono">{item.pe}</td>
                                <td className="py-4 text-gray-200 font-mono">
                                    <div className="flex flex-col items-end">
                                        <span>{item.marketCap.split(' ')[0]}</span>
                                        <span className="text-[10px] text-gray-500">tỷ</span>
                                    </div>
                                </td>
                                <td className="py-4 pr-2">
                                    <div className="flex flex-col items-end gap-1">
                                        <span className={`font-mono font-bold ${item.volForecastPct > 100 ? 'text-[#00c853]' : 'text-[#f23645]'}`}>
                                            {item.volForecastPct}%
                                        </span>
                                        <div className="w-16 h-1 bg-[#2c2c2e] rounded overflow-hidden">
                                            <div 
                                                className={`h-full ${item.volForecastPct > 100 ? 'bg-[#00c853]' : 'bg-[#f23645]'}`} 
                                                style={{ width: `${Math.min(item.volForecastPct, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
  );
};