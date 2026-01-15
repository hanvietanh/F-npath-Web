
import React from 'react';
import { Search, Calendar } from 'lucide-react';
import { historicalPriceData } from '../stockDetailConstants';

export const HistoricalPriceTab: React.FC = () => {
  const stats = [
    { label: '7 Ngày', val: '-0,4%', color: 'text-[#f23645]' },
    { label: '1 Tháng', val: '+91,4%', color: 'text-[#00c853]' },
    { label: '3 Tháng', val: '+122,1%', color: 'text-[#00c853]' },
    { label: '1 Năm', val: '+100,9%', color: 'text-[#00c853]' },
    { label: '5 Năm', val: '-52,4%', color: 'text-[#f23645]' },
    { label: 'Tất cả', val: '+2,845%', color: 'text-[#00c853]' },
  ];

  return (
    <div className="flex flex-col h-full w-full bg-[#0b0e11] font-sans">
        
        {/* Compact Toolbar with Stats & Date Filters */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-[#2c2c2e] shrink-0 bg-[#13171b]">
            
            {/* Left: Stats Cluster */}
            <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
                {stats.map((s, i) => (
                    <div key={i} className="flex flex-col items-center justify-center min-w-fit">
                        <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap mb-0.5">{s.label}</span>
                        <span className={`text-[13px] font-bold tracking-tight leading-none ${s.color}`}>{s.val}</span>
                    </div>
                ))}
            </div>

            {/* Right: Date Controls */}
            <div className="flex items-center gap-3 pl-4 border-l border-[#2c2c2e] ml-4 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="flex items-center bg-[#1c1c1e] border border-[#2c2c2e] rounded px-2 py-1 gap-2 hover:border-[#2962ff] transition-colors cursor-pointer group">
                        <span className="text-[11px] text-gray-300 group-hover:text-white transition-colors">15/12/25</span>
                        <Calendar size={12} className="text-gray-500 group-hover:text-[#2962ff] transition-colors" />
                    </div>
                    <span className="text-gray-600">-</span>
                    <div className="flex items-center bg-[#1c1c1e] border border-[#2c2c2e] rounded px-2 py-1 gap-2 hover:border-[#2962ff] transition-colors cursor-pointer group">
                        <span className="text-[11px] text-gray-300 group-hover:text-white transition-colors">15/01/26</span>
                        <Calendar size={12} className="text-gray-500 group-hover:text-[#2962ff] transition-colors" />
                    </div>
                </div>
                <button className="flex items-center justify-center w-7 h-7 bg-[#2962ff] hover:bg-[#1e4bd8] text-white rounded transition-all shadow-lg shadow-blue-900/20">
                    <Search size={14} />
                </button>
            </div>
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
