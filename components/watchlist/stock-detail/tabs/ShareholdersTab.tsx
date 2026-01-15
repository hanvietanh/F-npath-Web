
import React from 'react';
import { PieChart, Pie, Cell as PieCell, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Briefcase, DollarSign, Calendar, AlertCircle, Sparkles, PieChart as PieChartIcon } from 'lucide-react';
import { shareholderData } from '../stockDetailConstants';

interface ShareholdersTabProps {
    symbol: string;
    onAskCopilot: (type: string | null, query?: string) => void;
}

export const ShareholdersTab: React.FC<ShareholdersTabProps> = ({ symbol, onAskCopilot }) => {
  return (
    <div className="h-full w-full bg-[#0b0e11] flex flex-col p-4 overflow-y-auto custom-scrollbar gap-4">
        <div className="grid grid-cols-12 gap-4 min-h-[300px]">
        <div className="col-span-5 bg-[#151a21] border border-gray-800 rounded-lg p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-4"><PieChartIcon size={16} className="text-blue-400"/><h3 className="text-sm font-bold text-white uppercase">Tổng quan sở hữu</h3></div>
            <div className="flex-1 flex flex-col items-center">
                <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie data={shareholderData.structure} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value" stroke="none">
                        {shareholderData.structure.map((entry, index) => <PieCell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', fontSize: '11px', color: '#fff' }} itemStyle={{ color: '#fff' }}/>
                    </PieChart>
                </ResponsiveContainer>
                </div>
                <div className="w-full space-y-2 mt-2">
                <div className="flex justify-between text-xs items-center"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div><span className="text-gray-400">Nước ngoài</span></div><span className="text-white font-bold">25% <span className="text-[10px] font-normal text-gray-500">(Room còn 24%)</span></span></div>
                <div className="flex justify-between text-xs items-center"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-gray-400">Ban lãnh đạo & TC</span></div><span className="text-white font-bold">40%</span></div>
                <div className="flex justify-between text-xs items-center"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gray-500"></div><span className="text-gray-400">Trôi nổi (Free float)</span></div><span className="text-white font-bold">35%</span></div>
                </div>
            </div>
        </div>
        <div className="col-span-7 bg-[#151a21] border border-gray-800 rounded-lg p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4"><div className="flex items-center gap-2"><Users size={16} className="text-emerald-400"/><h3 className="text-sm font-bold text-white uppercase">Top Cổ đông lớn nhất</h3></div><button className="text-[10px] text-blue-400 hover:text-blue-300">Xem tất cả &gt;</button></div>
            <div className="overflow-x-auto"><table className="w-full text-xs text-left"><thead><tr className="text-gray-500 border-b border-gray-800"><th className="pb-2 font-medium">Tên cổ đông</th><th className="pb-2 text-right font-medium">Số lượng CP</th><th className="pb-2 text-right font-medium">Tỷ lệ %</th><th className="pb-2 text-right font-medium">Cập nhật</th></tr></thead><tbody className="divide-y divide-gray-800/50">{shareholderData.majorHolders.map((holder) => (<tr key={holder.id} className="group hover:bg-[#1e2530] transition"><td className="py-2.5 text-gray-300 font-medium">{holder.id}. {holder.name}</td><td className="py-2.5 text-right font-mono text-gray-400 group-hover:text-white">{holder.shares}</td><td className="py-2.5 text-right font-mono text-emerald-400 font-bold">{holder.percent}</td><td className="py-2.5 text-right text-gray-500 text-[10px]">{holder.date}</td></tr>))}</tbody></table></div>
        </div>
        </div>
        <div className="bg-[#151a21] border border-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2"><Briefcase size={16} className="text-yellow-500"/><h3 className="text-sm font-bold text-white uppercase">Giao dịch nội bộ (Insider Trading)</h3><span className="px-2 py-0.5 rounded bg-yellow-900/30 text-yellow-500 text-[9px] font-bold border border-yellow-700/30">QUAN TRỌNG ⚠️</span></div>
                <button 
                    onClick={() => onAskCopilot('insider_analysis', '')} 
                    className="text-[10px] flex items-center gap-1 text-yellow-400 hover:text-white bg-yellow-900/20 px-3 py-1.5 rounded-full border border-yellow-600/30 hover:border-yellow-500 transition"
                >
                    <Sparkles size={10} /> AI: Tốt hay Xấu?
                </button>
            </div>
            <div className="overflow-x-auto"><table className="w-full text-xs text-left"><thead><tr className="bg-[#1e2530] text-gray-400"><th className="py-2 px-3 font-medium rounded-l">Người thực hiện</th><th className="py-2 px-2 font-medium">Chức vụ</th><th className="py-2 px-2 font-medium">Loại GD</th><th className="py-2 px-2 text-right font-medium">Khối lượng</th><th className="py-2 px-2 text-right font-medium">Giá (Ước tính)</th><th className="py-2 px-3 text-right font-medium rounded-r">Ngày k.thuc</th></tr></thead><tbody className="divide-y divide-gray-800">{shareholderData.insiderDeals.map((deal) => (<tr key={deal.id} className="hover:bg-[#1f2937] transition"><td className="py-3 px-3"><div className="text-white font-medium">{deal.person}</div>{deal.tag && <span className="text-[9px] text-gray-500 bg-gray-800 px-1 rounded border border-gray-700 mt-1 inline-block">{deal.tag}</span>}</td><td className="py-3 px-2 text-gray-400">{deal.position}</td><td className={`py-3 px-2 ${deal.type.includes('Mua') ? 'text-emerald-400' : 'text-red-400'}`}>{deal.type}</td><td className={`py-3 px-2 text-right font-mono font-bold ${deal.color}`}>{deal.vol}</td><td className="py-3 px-2 text-right font-mono text-gray-300">{deal.price}</td><td className="py-3 px-3 text-right text-gray-400">{deal.date}</td></tr>))}</tbody></table></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#151a21] border border-gray-800 rounded-lg p-4"><div className="flex items-center gap-2 mb-4"><DollarSign size={16} className="text-emerald-400"/><h3 className="text-sm font-bold text-white uppercase">Lịch sử trả cổ tức & Tăng vốn</h3></div><div className="overflow-x-auto"><table className="w-full text-xs text-left"><thead><tr className="text-gray-500 border-b border-gray-800"><th className="pb-2 font-medium">Năm</th><th className="pb-2 font-medium">Loại hình</th><th className="pb-2 text-center font-medium">Tỷ lệ</th><th className="pb-2 text-right font-medium">Ngày GDKHQ</th></tr></thead><tbody className="divide-y divide-gray-800/50">{shareholderData.dividends.map((div, idx) => (<tr key={idx} className="hover:bg-[#1e2530]"><td className="py-2 text-gray-300 font-bold">{div.year}</td><td className={`py-2 ${div.type === 'Tiền mặt' ? 'text-emerald-400' : 'text-purple-400'}`}>{div.type}</td><td className="py-2 text-center font-mono text-white bg-gray-800/50 rounded">{div.ratio}</td><td className="py-2 text-right text-gray-500">{div.exDate}</td></tr>))}</tbody></table></div></div>
            <div className="bg-[#151a21] border border-gray-800 rounded-lg p-4 flex flex-col"><div className="flex items-center gap-2 mb-4"><Calendar size={16} className="text-blue-400"/><h3 className="text-sm font-bold text-white uppercase">Thống kê & Sự kiện</h3></div><div className="space-y-4 flex-1"><div className="bg-[#1e2530] p-3 rounded border border-gray-700/50"><div className="text-xs text-gray-400 mb-1">Tỷ suất cổ tức (Yield)</div><div className="text-2xl font-bold text-emerald-400 font-mono">4.5% <span className="text-[10px] text-gray-500 font-sans font-normal">/ năm</span></div><div className="mt-2 text-[10px] text-yellow-500 flex items-center gap-1"><AlertCircle size={10}/> So với lãi suất bank (5.5%): Thấp hơn</div></div><div><div className="text-xs font-bold text-gray-300 mb-2 uppercase tracking-wide">Sự kiện sắp tới</div><div className="bg-[#1e2530] p-3 rounded border border-gray-700/50 flex gap-3 items-center"><div className="bg-blue-900/30 p-2 rounded text-blue-400"><Calendar size={18}/></div><div><div className="font-bold text-white text-xs">28/04/2026: Họp ĐHCĐ Thường niên</div><div className="text-[10px] text-gray-500 italic">(Dự kiến chốt quyền chia cổ tức 2025)</div></div></div></div></div></div>
        </div>
    </div>
  );
};
