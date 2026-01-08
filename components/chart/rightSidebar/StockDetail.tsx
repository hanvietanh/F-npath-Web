
import React from 'react';
import { BarChart2, X, Maximize2, Minimize2 } from 'lucide-react';
import { OrderBookTable } from '../../trading/OrderBook';

interface StockDetailProps {
    onClose?: () => void;
    isMaximized?: boolean;
    onToggleMaximize?: () => void;
}

export const StockDetail: React.FC<StockDetailProps> = ({ onClose, isMaximized, onToggleMaximize }) => {
    return (
        <div className="flex flex-col h-full bg-[#13171b]">
             {/* Header Control for Floating Panel */}
             <div className="flex items-center justify-between px-3 py-2 bg-[#1a1f26] border-b border-[#1c1c1e] shrink-0">
                 <span className="text-xs font-bold text-[#2962ff] uppercase tracking-wide">Thông tin chi tiết</span>
                 <div className="flex items-center gap-1">
                     {onToggleMaximize && (
                        <button 
                            onClick={onToggleMaximize}
                            className={`p-1 hover:bg-[#2c2c2e] rounded hover:text-white ${isMaximized ? 'text-[#2962ff]' : 'text-gray-400'}`} 
                            title={isMaximized ? "Thu nhỏ" : "Mở rộng"}
                        >
                            {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                        </button>
                     )}
                     {onClose && (
                         <button onClick={onClose} className="p-1 hover:bg-[#2c2c2e] rounded text-gray-400 hover:text-[#f23645]" title="Đóng">
                             <X size={14} />
                         </button>
                     )}
                 </div>
             </div>

             <div className="p-4 border-b border-[#1c1c1e] flex-shrink-0 bg-[#13171b]">
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-white">PHR</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#1c1c1e] border border-[#2c2c2e] text-gray-300">HOSE</span>
                    </div>
                    <div className="text-2xl font-bold text-[#00c853]">56.30</div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-[10px] text-gray-500">Phuoc Hoa Rubber</div>
                    <div className="text-sm font-bold text-[#00c853]">+1.30 (+2.35%)</div>
                </div>
             </div>

             <div className="flex-1 overflow-y-auto bg-[#13171b] custom-scrollbar">
                 <OrderBookTable />
                 <div className="h-2 bg-[#000000]" />
                 <div className="p-3 bg-[#13171b]">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-gray-200">Khớp lệnh</span>
                        <BarChart2 size={14} className="text-gray-500" />
                    </div>
                    <table className="w-full text-right">
                        <thead className="text-[10px] text-gray-500 uppercase font-medium">
                            <tr>
                                <th className="pb-2 text-left">Thời gian</th>
                                <th className="pb-2">Giá</th>
                                <th className="pb-2">+/-</th>
                                <th className="pb-2">Khối lượng</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs font-mono">
                            {[
                                { time: '14:45:00', price: '56.30', change: '+1.30', vol: '11,300', type: 'buy' },
                                { time: '14:29:21', price: '56.20', change: '+1.20', vol: '200', type: 'sell' },
                                { time: '14:28:56', price: '56.20', change: '+1.20', vol: '200', type: 'buy' },
                                { time: '14:26:34', price: '56.10', change: '+1.10', vol: '500', type: 'buy' },
                                { time: '14:25:12', price: '56.10', change: '+1.10', vol: '1,200', type: 'sell' },
                                { time: '14:24:05', price: '56.00', change: '+1.00', vol: '5,000', type: 'buy' },
                                { time: '14:22:45', price: '56.00', change: '+1.00', vol: '300', type: 'buy' },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-[#1c1c1e] transition-colors cursor-pointer group">
                                    <td className="py-1.5 text-left text-gray-400">{row.time}</td>
                                    <td className={`py-1.5 font-medium ${row.type === 'buy' ? 'text-[#00c853]' : 'text-[#f23645]'}`}>{row.price}</td>
                                    <td className={`py-1.5 ${row.type === 'buy' ? 'text-[#00c853]' : 'text-[#f23645]'}`}>{row.change}</td>
                                    <td className={`py-1.5 ${row.type === 'buy' ? 'text-[#00c853]' : 'text-[#f23645]'}`}>{row.vol}</td>
                                    <td className="py-1.5 pl-1 text-[9px] font-bold">{row.type === 'buy' ? 'M' : 'B'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
             </div>
        </div>
    );
};
