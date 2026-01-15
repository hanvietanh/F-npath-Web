
import React from 'react';
import { Search, Calendar } from 'lucide-react';
import { historicalPriceData } from '../stockDetailConstants';

export const HistoricalPriceTab: React.FC = () => {
  const stats = [
    { label: '7 Ngày', val: '-0,4%', color: 'text-[#f23645]' },
    { label: '1 Tháng', val: '+91,4%', color: 'text-[#00c853]' },
    { label: '3 Tháng', val: '+122,1%', color: 'text-[#00c853]' },
    { label: '1 Năm', val: '+100,9%', color: 'text-[#00c853]' },
    { label: '5 Năm', val: '-521,4%', color: 'text-[#f23645]' },
    { label: 'Tất cả', val: '+2,845%', color: 'text-[#00c853]' },
  ];

  return (
    <div className="flex flex-col h-full w-full bg-[#0b0e11] font-sans">
        
        {/* Toolbar */}
        <div className="flex items-center justify-end px-4 py-3 border-b border-[#2c2c2e] shrink-0 gap-3 bg-[#13171b]">
            <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Từ ngày</span>
                <div className="flex items-center bg-[#1c1c1e] border border-[#2c2c2e] rounded px-3 py-1.5 gap-2">
                    <span className="text-xs text-white font-medium">15/12/2025</span>
                    <Calendar size={14} className="text-gray-500" />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Đến ngày</span>
                <div className="flex items-center bg-[#1c1c1e] border border-[#2c2c2e] rounded px-3 py-1.5 gap-2">
                    <span className="text-xs text-white font-medium">15/01/2026</span>
                    <Calendar size={14} className="text-gray-500" />
                </div>
            </div>
            <button className="flex items-center gap-1.5 bg-[#1e2530] hover:bg-[#2a3441] border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white rounded px-4 py-1.5 text-xs font-bold transition-all">
                <Search size={14} />
                Tìm kiếm
            </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-6 border-b border-[#2c2c2e] bg-[#0b0e11] py-4 shrink-0">
            {stats.map((s, i) => (
                <div key={i} className={`flex flex-col items-center justify-center border-r border-[#2c2c2e] last:border-0 gap-1`}>
                    <span className="text-[13px] text-gray-500 font-medium">{s.label}</span>
                    <span className={`text-[16px] font-bold tracking-tight ${s.color}`}>{s.val}</span>
                </div>
            ))}
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-auto custom-scrollbar relative">
            <table className="w-full text-right border-collapse min-w-[1200px]">
                <thead className="bg-[#1a1f26] text-[11px] text-gray-400 font-medium sticky top-0 z-20 shadow-sm uppercase tracking-tight">
                    <tr className="border-b border-[#2c2c2e]">
                        <th className="py-3 px-2 text-center sticky left-0 bg-[#1a1f26] z-30 border-r border-[#2c2c2e] w-10">#</th>
                        <th className="py-3 px-3 text-left font-semibold text-gray-300">Ngày</th>
                        <th className="py-3 px-2">+/-</th>
                        <th className="py-3 px-2">+/- (%)</th>
                        <th className="py-3 px-2">Mở</th>
                        <th className="py-3 px-2">Cao</th>
                        <th className="py-3 px-2">Thấp</th>
                        <th className="py-3 px-2">Đóng</th>
                        <th className="py-3 px-2">TB</th>
                        <th className="py-3 px-2">Đóng cửa điều chỉnh</th>
                        <th className="py-3 px-3">KL GDTT</th>
                        <th className="py-3 px-3">KL Khớp lệnh</th>
                        <th className="py-3 px-3">Tổng KL</th>
                        <th className="py-3 px-2 text-[#d946ef]">RS (1M)</th>
                        <th className="py-3 px-2 text-[#d946ef]">RS (3M)</th>
                        <th className="py-3 px-2 text-[#d946ef]">RS (6M)</th>
                        <th className="py-3 px-2 text-[#d946ef]">RS (52W)</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#1c1c1e]/50 text-[11px] font-mono text-gray-300">
                    {historicalPriceData.map((row, idx) => {
                        const changeColor = row.change > 0 ? 'text-[#00c853]' : (row.change < 0 ? 'text-[#f23645]' : 'text-yellow-500');
                        
                        return (
                            <tr key={row.id} className="hover:bg-[#1c1c1e] transition-colors group">
                                <td className="py-2.5 px-2 text-center text-gray-500 bg-[#0b0e11] group-hover:bg-[#1c1c1e] sticky left-0 z-10 border-r border-[#2c2c2e]">
                                    {row.id}
                                </td>
                                <td className="py-2.5 px-3 text-left font-sans font-medium text-white">
                                    {row.date}
                                </td>
                                <td className={`py-2.5 px-2 font-bold ${changeColor}`}>
                                    {row.change > 0 ? '+' : ''}{row.change.toFixed(2)}
                                </td>
                                <td className={`py-2.5 px-2 font-bold ${changeColor}`}>
                                    {row.changePercent > 0 ? '+' : ''}{row.changePercent.toFixed(2)}%
                                </td>
                                <td className="py-2.5 px-2">{row.open.toFixed(2)}</td>
                                <td className="py-2.5 px-2">{row.high.toFixed(2)}</td>
                                <td className="py-2.5 px-2">{row.low.toFixed(2)}</td>
                                <td className="py-2.5 px-2 font-bold text-white">{row.close.toFixed(2)}</td>
                                <td className="py-2.5 px-2">{row.avg.toFixed(2)}</td>
                                <td className="py-2.5 px-2">{row.adjClose.toFixed(2)}</td>
                                <td className="py-2.5 px-3">{row.putThroughVol.toLocaleString()}</td>
                                <td className="py-2.5 px-3">{row.matchedVol.toLocaleString()}</td>
                                <td className="py-2.5 px-3 font-bold text-white">{row.totalVol.toLocaleString()}</td>
                                <td className="py-2.5 px-2 text-[#d946ef]">{row.rsi1m}</td>
                                <td className="py-2.5 px-2 text-[#d946ef]">{row.rsi3m}</td>
                                <td className="py-2.5 px-2 text-[#d946ef]">{row.rsi6m}</td>
                                <td className="py-2.5 px-2 text-[#d946ef]">{row.rsi52w}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
  );
};
