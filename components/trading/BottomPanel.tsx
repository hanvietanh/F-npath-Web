import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  ChevronUp, 
  X, 
  RefreshCw, 
  MoreVertical, 
  BookOpen, 
  Briefcase, 
  DollarSign, 
  History
} from 'lucide-react';

export const BottomTradingPanel = ({ onClose }: { onClose: () => void }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={`flex flex-col bg-[#13171b] border-t border-[#1c1c1e] animate-in slide-in-from-bottom-10 duration-300 transition-[height] ease-in-out ${isCollapsed ? 'h-[32px]' : 'h-[300px]'}`}>
            {/* Header + Content (Hidden when collapsed) */}
            <div className={`flex-1 flex flex-col min-h-0 ${isCollapsed ? 'hidden' : 'flex'}`}>
                {/* Header / Tabs */}
                <div className="flex items-center justify-between px-2 h-9 bg-[#1a1f26] border-b border-[#1c1c1e]">
                    <div className="flex items-center">
                        <button className="w-8 flex items-center justify-center text-gray-400 hover:bg-[#2a2e39] h-9">
                            <ChevronRight size={16} />
                        </button>
                        <div className="flex space-x-1 ml-2">
                            <button className="px-3 py-1 text-xs font-bold text-gray-200 bg-[#2a2e39] rounded-t border-t border-x border-[#1c1c1e] relative top-[1px]">Tài sản</button>
                            <button className="px-3 py-1 text-xs font-medium text-gray-400 hover:text-white hover:bg-[#2a2e39]/50 rounded-t transition-colors">Nợ</button>
                            <button className="px-3 py-1 text-xs font-medium text-gray-400 hover:text-white hover:bg-[#2a2e39]/50 rounded-t transition-colors">Khoản vay</button>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                            <span className="opacity-70">18:11 24/12/25</span>
                        </div>
                        <div className="w-[1px] h-4 bg-[#2a2e39]"></div>
                        <div className="flex items-center gap-2">
                            <span>Tiểu khoản</span>
                            <span className="text-white font-medium flex items-center gap-1 cursor-pointer">Thường <ChevronDown size={12}/></span>
                        </div>
                        <div className="w-[1px] h-4 bg-[#2a2e39]"></div>
                        <RefreshCw size={14} className="cursor-pointer hover:text-white" />
                        <button onClick={onClose} className="hover:text-red-400 transition-colors ml-2"><X size={16} /></button>
                    </div>
                </div>

                {/* Content Table */}
                <div className="flex-1 overflow-auto bg-[#000000]">
                    <div className="flex items-center px-4 py-2 border-b border-[#1c1c1e] bg-[#13171b]">
                        <span className="text-sm font-semibold text-gray-200">Cổ phiếu</span>
                        <div className="flex-1"></div>
                        <MoreVertical size={16} className="text-gray-500 cursor-pointer" />
                    </div>
                    
                    <table className="w-full text-right text-xs border-collapse">
                        <thead className="bg-[#1a1f26] text-gray-400 sticky top-0 z-10">
                            <tr>
                                <th className="py-2 pl-4 text-left font-medium border-r border-[#1c1c1e]">Mã <span className="inline-block border border-gray-600 rounded px-1 text-[9px] ml-1">6</span></th>
                                <th className="py-2 px-2 font-medium border-r border-[#1c1c1e]">SL Tổng</th>
                                <th className="py-2 px-2 font-medium border-r border-[#1c1c1e]">Được GD</th>
                                <th className="py-2 px-2 font-medium border-r border-[#1c1c1e]">Giá vốn</th>
                                <th className="py-2 px-2 font-medium border-r border-[#1c1c1e]">Thị giá</th>
                                <th className="py-2 px-2 font-medium border-r border-[#1c1c1e]">% Thị giá</th>
                                <th className="py-2 px-2 font-medium border-r border-[#1c1c1e]">Chờ về</th>
                                <th className="py-2 px-2 font-medium border-r border-[#1c1c1e]">Giá trị vốn</th>
                                <th className="py-2 px-2 font-medium border-r border-[#1c1c1e]">Giá trị</th>
                                <th className="py-2 px-2 font-medium border-r border-[#1c1c1e]">Lãi/Lỗ</th>
                                <th className="py-2 pr-4 font-medium">% Lãi/Lỗ</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-200 divide-y divide-[#1c1c1e]">
                            {/* Totals Row */}
                            <tr className="bg-[#13171b] font-bold">
                                <td className="py-2 pl-4 text-left border-r border-[#1c1c1e]">Tổng</td>
                                <td className="py-2 px-2 border-r border-[#1c1c1e]"></td>
                                <td className="py-2 px-2 border-r border-[#1c1c1e]"></td>
                                <td className="py-2 px-2 border-r border-[#1c1c1e]"></td>
                                <td className="py-2 px-2 border-r border-[#1c1c1e]"></td>
                                <td className="py-2 px-2 border-r border-[#1c1c1e]"></td>
                                <td className="py-2 px-2 border-r border-[#1c1c1e]"></td>
                                <td className="py-2 px-2 border-r border-[#1c1c1e]">431,547,600</td>
                                <td className="py-2 px-2 border-r border-[#1c1c1e]">436,300,000</td>
                                <td className="py-2 px-2 border-r border-[#1c1c1e] text-[#00c853]">+4,752,400</td>
                                <td className="py-2 pr-4 text-[#00c853]">+1.1%</td>
                            </tr>
                            
                            {/* Stock Rows */}
                            {[
                                { symbol: 'CTG', qty: '2,200', avail: '1,531', cost: '26.59', market: '35.30', mktPct: '0.9%', pending: '0', valCost: '58,506,800', valMkt: '77,660,000', pl: '+19,153,200', plPct: '+32.7%', color: '#00c853' },
                                { symbol: 'CTR', qty: '700', avail: '700', cost: '91.21', market: '83.50', mktPct: '-0.6%', pending: '0', valCost: '63,849,800', valMkt: '58,450,000', pl: '-5,399,800', plPct: '-8.5%', color: '#f23645' },
                                { symbol: 'PHR', qty: '3,000', avail: '3,000', cost: '56.07', market: '56.30', mktPct: '-0.7%', pending: '0', valCost: '168,201,000', valMkt: '168,900,000', pl: '+699,000', plPct: '+0.4%', color: '#00c853' },
                            ].map((stock) => (
                                <tr key={stock.symbol} className="hover:bg-[#1a1f26] transition-colors group">
                                    <td className="py-2 pl-4 text-left font-bold border-r border-[#1c1c1e]">
                                        {stock.symbol} <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 ml-1"></span>
                                    </td>
                                    <td className="py-2 px-2 border-r border-[#1c1c1e] font-mono">{stock.qty}</td>
                                    <td className="py-2 px-2 border-r border-[#1c1c1e] font-mono">{stock.avail}</td>
                                    <td className="py-2 px-2 border-r border-[#1c1c1e] font-mono text-gray-400">{stock.cost}</td>
                                    <td className={`py-2 px-2 border-r border-[#1c1c1e] font-mono ${stock.symbol === 'CTR' || stock.symbol === 'PHR' ? 'text-[#f23645]' : 'text-[#00c853]'}`}>{stock.market}</td>
                                    <td className={`py-2 px-2 border-r border-[#1c1c1e] font-mono ${stock.symbol === 'CTR' || stock.symbol === 'PHR' ? 'text-[#f23645]' : 'text-[#00c853]'}`}>{stock.mktPct}</td>
                                    <td className="py-2 px-2 border-r border-[#1c1c1e] font-mono">{stock.pending}</td>
                                    <td className="py-2 px-2 border-r border-[#1c1c1e] font-mono text-gray-400">{stock.valCost}</td>
                                    <td className="py-2 px-2 border-r border-[#1c1c1e] font-mono">{stock.valMkt}</td>
                                    <td className={`py-2 px-2 border-r border-[#1c1c1e] font-mono ${stock.color === '#00c853' ? 'text-[#00c853]' : 'text-[#f23645]'}`}>{stock.pl}</td>
                                    <td className={`py-2 pr-4 font-mono ${stock.color === '#00c853' ? 'text-[#00c853]' : 'text-[#f23645]'}`}>{stock.plPct}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer Tabs (Always visible) */}
            <div 
                className="h-8 bg-[#13171b] border-t border-[#1c1c1e] flex items-center px-1 shrink-0 cursor-pointer hover:bg-[#1a1f26] transition-colors"
                onClick={() => isCollapsed && setIsCollapsed(false)}
            >
                 <button className="flex items-center gap-1.5 px-3 py-1 hover:bg-[#2a2e39] text-gray-400 text-xs rounded transition-colors" onClick={(e) => { e.stopPropagation(); setIsCollapsed(false); }}>
                     <BookOpen size={14} /> Sổ lệnh
                 </button>
                 <div className="w-[1px] h-4 bg-[#2a2e39] mx-1"></div>
                 <button className="flex items-center gap-1.5 px-3 py-1 bg-[#2a2e39] text-[#f23645] text-xs rounded transition-colors font-medium" onClick={(e) => { e.stopPropagation(); setIsCollapsed(false); }}>
                     <Briefcase size={14} /> Tài sản
                 </button>
                 <div className="w-[1px] h-4 bg-[#2a2e39] mx-1"></div>
                 <button className="flex items-center gap-1.5 px-3 py-1 hover:bg-[#2a2e39] text-gray-400 text-xs rounded transition-colors" onClick={(e) => { e.stopPropagation(); setIsCollapsed(false); }}>
                     <DollarSign size={14} /> Lãi/Lỗ
                 </button>
                 <div className="w-[1px] h-4 bg-[#2a2e39] mx-1"></div>
                 <button className="flex items-center gap-1.5 px-3 py-1 hover:bg-[#2a2e39] text-gray-400 text-xs rounded transition-colors" onClick={(e) => { e.stopPropagation(); setIsCollapsed(false); }}>
                     <History size={14} /> Lịch sử
                 </button>

                 <div className="flex-1"></div>

                 {/* Collapse/Expand Button */}
                 <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsCollapsed(!isCollapsed);
                    }}
                    className="p-1 hover:bg-[#2a2e39] text-gray-400 rounded mr-1 hover:text-white"
                 >
                    {isCollapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                 </button>
            </div>
        </div>
    );
};