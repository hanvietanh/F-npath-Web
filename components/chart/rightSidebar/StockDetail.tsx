
import React from 'react';
import { ChevronDown, BarChart2, X, Maximize2, Minimize2, ChevronUp } from 'lucide-react';

interface StockDetailProps {
    onClose?: () => void;
    isMaximized?: boolean;
    onToggleMaximize?: () => void;
}

export const StockDetail: React.FC<StockDetailProps> = ({ onClose, isMaximized, onToggleMaximize }) => {
    // Mock Data mimicking the image structure
    const orderBook = [
        { buyVol: '234,300', buyPrice: '22.85', sellPrice: '22.90', sellVol: '540,200', buyColor: 'text-[#00c853]', sellColor: 'text-[#f23645]' },
        { buyVol: '150,000', buyPrice: '22.80', sellPrice: '22.95', sellVol: '120,500', buyColor: 'text-[#00c853]', sellColor: 'text-[#f23645]' },
        { buyVol: '89,500', buyPrice: '22.75', sellPrice: '23.00', sellVol: '45,000', buyColor: 'text-[#00c853]', sellColor: 'text-[#f23645]' },
    ];

    const transactions = [
        { time: '01:52:20', price: '22.90', change: '+1.45', vol: '10,000', side: 'Mua', color: 'text-[#00c853]' },
        { time: '01:52:15', price: '22.90', change: '+1.45', vol: '5,000', side: 'Bán', color: 'text-[#f23645]' },
        { time: '01:52:10', price: '22.90', change: '+1.45', vol: '20,000', side: 'Mua', color: 'text-[#00c853]' },
        { time: '01:51:55', price: '22.85', change: '+1.20', vol: '2,500', side: 'Bán', color: 'text-[#f23645]' },
        { time: '01:51:40', price: '22.90', change: '+1.45', vol: '15,000', side: 'Mua', color: 'text-[#00c853]' },
        { time: '01:51:30', price: '22.95', change: '+1.65', vol: '8,000', side: 'Mua', color: 'text-[#d946ef]' }, // Purple for strong move
        { time: '01:51:20', price: '22.85', change: '+1.20', vol: '12,000', side: 'Bán', color: 'text-[#f23645]' },
        { time: '01:51:10', price: '22.80', change: '+1.00', vol: '3,000', side: 'Bán', color: 'text-[#f23645]' },
        { time: '01:51:05', price: '22.90', change: '+1.45', vol: '50,000', side: 'Mua', color: 'text-[#00c853]' },
        { time: '01:51:00', price: '22.90', change: '+1.45', vol: '10,000', side: 'Mua', color: 'text-[#00c853]' },
        { time: '01:50:50', price: '22.90', change: '+1.45', vol: '10,000', side: 'Mua', color: 'text-[#00c853]' },
        { time: '01:50:40', price: '22.90', change: '+1.45', vol: '2,000', side: 'Bán', color: 'text-[#f23645]' },
        { time: '01:50:30', price: '22.90', change: '+1.45', vol: '12,000', side: 'Mua', color: 'text-[#00c853]' },
    ];

    return (
        <div className="flex flex-col h-full bg-[#13171b] text-white font-sans">
             {/* Window Controls */}
             <div className="flex items-center justify-between px-3 py-1 bg-[#1a1f26] border-b border-[#1c1c1e] shrink-0">
                 <span className="text-[10px] font-bold text-gray-500 uppercase">Chi tiết</span>
                 <div className="flex items-center gap-1">
                     {onToggleMaximize && (
                        <button 
                            onClick={onToggleMaximize}
                            className={`p-1 hover:bg-[#2c2c2e] rounded hover:text-white ${isMaximized ? 'text-[#2962ff]' : 'text-gray-400'}`} 
                        >
                            {isMaximized ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
                        </button>
                     )}
                     {onClose && (
                         <button onClick={onClose} className="p-1 hover:bg-[#2c2c2e] rounded text-gray-400 hover:text-[#f23645]">
                             <X size={12} />
                         </button>
                     )}
                 </div>
             </div>

             {/* 1. Header Section */}
             <div className="p-3 border-b border-[#1c1c1e]">
                 <div className="flex justify-between items-start mb-1">
                     <div className="flex items-center gap-1">
                         <span className="text-xl font-extrabold tracking-tight">HPG</span>
                         <div className="bg-[#2c2c2e] rounded p-0.5 cursor-pointer hover:bg-gray-600">
                             <ChevronUp size={12} />
                         </div>
                     </div>
                     <div className="text-right">
                         <div className="text-2xl font-bold text-[#00c853]">22.90</div>
                         <div className="text-[10px] font-bold text-[#00c853] mt-[-2px]">+3.35 / +1.45%</div>
                     </div>
                 </div>
                 
                 <div className="flex justify-between items-center text-[10px] font-medium mt-2">
                     <span className="text-gray-400">Trần <span className="text-[#d946ef] font-bold ml-1">25.85</span></span>
                     <span className="text-gray-400 mx-1">|</span>
                     <span className="text-gray-400">Sàn <span className="text-[#0ea5e9] font-bold ml-1">20.50</span></span>
                     <span className="text-gray-400 mx-1">|</span>
                     <span className="text-gray-400">TC <span className="text-[#eab308] font-bold ml-1">24.45</span></span>
                 </div>
             </div>

             {/* 2. Order Book Section */}
             <div className="py-1">
                 {/* Headers */}
                 <div className="grid grid-cols-4 px-2 py-1 text-[9px] text-gray-500 font-bold uppercase">
                     <div className="text-left">KL mua</div>
                     <div className="text-center">Giá mua</div>
                     <div className="text-center">Giá bán</div>
                     <div className="text-right">KL bán</div>
                 </div>
                 
                 {/* Rows */}
                 <div className="text-[11px] font-mono">
                     {orderBook.map((row, i) => (
                         <div key={i} className="grid grid-cols-4 px-2 py-1.5 hover:bg-[#1c1c1e] cursor-pointer relative overflow-hidden">
                             {/* Visual Volume Bars (Optional Background) */}
                             <div className="absolute right-[50%] top-1 bottom-1 bg-[#00c853]/10" style={{ width: `${Math.random() * 40}%` }}></div>
                             <div className="absolute left-[50%] top-1 bottom-1 bg-[#f23645]/10" style={{ width: `${Math.random() * 40}%` }}></div>

                             <div className="text-left text-white relative z-10">{row.buyVol}</div>
                             <div className={`text-center font-bold relative z-10 ${row.buyColor}`}>{row.buyPrice}</div>
                             <div className={`text-center font-bold relative z-10 ${row.sellColor}`}>{row.sellPrice}</div>
                             <div className="text-right text-white relative z-10">{row.sellVol}</div>
                         </div>
                     ))}
                 </div>
                 
                 {/* Expand Button */}
                 <div className="flex justify-center py-1 cursor-pointer hover:bg-[#1c1c1e]">
                     <div className="flex items-center gap-1 text-[10px] text-gray-400">
                         Mở rộng <ChevronDown size={10} />
                     </div>
                 </div>
             </div>

             {/* 3. Matched Volume Summary */}
             <div className="border-t border-[#1c1c1e] bg-[#0b0e11] px-3 py-3">
                 <div className="flex justify-between items-center mb-1">
                     <span className="text-[10px] text-gray-500">Tổng KL khớp</span>
                     <div className="flex items-center gap-2 text-[10px]">
                         <span className="text-gray-500">KL Mua chủ động</span>
                         <span className="text-[#00c853] font-bold">906.2k</span>
                     </div>
                 </div>
                 <div className="flex justify-between items-center mb-2">
                     <div className="text-lg font-bold text-white">1,654 M</div>
                     <div className="flex items-center gap-2 text-[10px]">
                         <span className="text-gray-500">KL Bán chủ động</span>
                         <span className="text-[#f23645] font-bold">748.4k</span>
                     </div>
                 </div>
                 
                 {/* Volume Bar */}
                 <div className="flex h-1 w-full bg-[#1c1c1e] rounded overflow-hidden">
                     <div className="h-full bg-[#00c853]" style={{ width: '55%' }}></div>
                     <div className="h-full bg-[#f23645]" style={{ width: '45%' }}></div>
                 </div>
             </div>

             {/* 4. Transaction List */}
             <div className="flex-1 overflow-auto custom-scrollbar bg-[#13171b] border-t border-[#1c1c1e]">
                 <div className="flex items-center justify-end px-2 py-1">
                     <BarChart2 size={12} className="text-white opacity-50" />
                 </div>

                 <table className="w-full text-right text-[10px] font-mono">
                     <thead className="text-gray-500 font-medium bg-[#13171b] sticky top-0 z-10">
                         <tr>
                             <th className="py-1.5 pl-3 text-left">Thời gian</th>
                             <th className="py-1.5 text-center">Giá</th>
                             <th className="py-1.5 text-center">+/- %</th>
                             <th className="py-1.5 text-right">Khối lượng</th>
                             <th className="py-1.5 pr-3 text-right">Phe</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-[#1c1c1e]/30">
                         {transactions.map((t, i) => (
                             <tr key={i} className="hover:bg-[#1c1c1e]">
                                 <td className="py-1.5 pl-3 text-left text-gray-400">{t.time}</td>
                                 <td className={`py-1.5 text-center font-bold ${t.color}`}>{t.price}</td>
                                 <td className={`py-1.5 text-center ${t.color}`}>{t.change}%</td>
                                 <td className="py-1.5 text-right text-white">{t.vol}</td>
                                 <td className={`py-1.5 pr-3 text-right font-bold ${t.side === 'Mua' ? 'text-[#00c853]' : 'text-[#f23645]'}`}>{t.side}</td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>
        </div>
    );
};
