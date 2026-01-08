
import React, { useState } from 'react';
import { BarChart2, Sparkles, PlusCircle, ArrowUpDown, Menu } from 'lucide-react';
import { AI_NEWS_ITEMS } from '../mockData';
import { OrderBookTable } from '../trading/OrderBook';
import { OrderPlacementPanel } from '../trading/OrderPanel';

interface RightSidebarProps {
  isTradeMode: boolean;
}

const Sparkline: React.FC<{ data: number[], color: string }> = ({ data, color }) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 80;
    const height = 24;

    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="overflow-visible">
            <path d={`M ${points}`} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Optional glow effect */}
            <path d={`M ${points}`} fill="none" stroke={color} strokeWidth="4" strokeOpacity="0.1" />
        </svg>
    );
};

const WatchlistTabContent = () => {
    const [activeSubTab, setActiveSubTab] = useState('Đầu tư');
    const subTabs = ['Đầu tư', 'Top biến động', 'Top khối lượng', 'Top nước ngoài', 'Chỉ số', 'Crypto', 'Vàng'];

    // Mock Data matching the screenshot
    const items = [
        { s: 'VNINDEX', vol: 'KL:348.8 triệu', p: '1,872.99', c: '+11.41/+0.61%', color: '#00c853', chart: [1860, 1865, 1862, 1870, 1868, 1875, 1872.99] },
        { s: 'TRC', vol: 'KL:9,000.00', p: '79.00', c: '+0.10/+0.13%', color: '#00c853', chart: [78.8, 79.2, 79.0, 78.9, 79.1, 79.0] },
        { s: 'PHR', vol: 'KL:295.3 ng', p: '59.70', c: '-0.30/-0.50%', color: '#f23645', chart: [60.2, 60.0, 59.8, 59.9, 59.6, 59.7] },
        { s: 'TV1', vol: 'KL:200.00', p: '22.00', c: '0/0%', color: '#eab308', chart: [22, 22, 22, 22, 22, 22] },
        { s: 'HPG', vol: 'KL:8.8 triệu', p: '26.55', c: '-0.05/-0.19%', color: '#f23645', chart: [26.8, 26.7, 26.6, 26.65, 26.5, 26.55] },
        { s: 'VCG', vol: 'KL:1.5 triệu', p: '22.60', c: '+0.15/+0.67%', color: '#00c853', chart: [22.4, 22.5, 22.4, 22.6, 22.55, 22.6] },
        { s: 'CTG', vol: 'KL:4.3 triệu', p: '37.50', c: '+0.05/+0.13%', color: '#00c853', chart: [37.4, 37.3, 37.5, 37.4, 37.6, 37.5] },
        { s: 'VTP', vol: 'KL:449.6 ng', p: '102.90', c: '+0.70/+0.68%', color: '#00c853', chart: [102, 102.2, 102.1, 102.5, 102.8, 102.9] },
        { s: 'CTR', vol: 'KL:537.1 ng', p: '91.30', c: '+2.20/+2.47%', color: '#00c853', chart: [89, 90, 89.5, 91, 91.2, 91.3] },
        { s: 'VGI', vol: 'KL:1.0 triệu', p: '80.00', c: '+4.30/+5.68%', color: '#00c853', chart: [76, 77, 78, 79, 79.5, 80] },
        { s: 'FPT', vol: 'KL:1.5 triệu', p: '96.70', c: '-0.80/-0.82%', color: '#f23645', chart: [97.5, 97, 97.2, 96.8, 96.9, 96.7] },
        { s: 'VCB', vol: 'KL:3.4 triệu', p: '60.20', c: '+0.60/+1.01%', color: '#00c853', chart: [59.6, 59.8, 60, 60.1, 60.2, 60.2] },
        { s: 'SSI', vol: 'KL:--', p: '30.65', c: '+--/+--', color: '#00c853', chart: [30, 30.2, 30.5, 30.4, 30.6, 30.65] },
    ];

    return (
        <div className="flex flex-col h-full bg-[#13171b]">
            {/* Top Controls & Sub-tabs */}
            <div className="flex items-center px-3 py-2 border-b border-[#1c1c1e] shrink-0 bg-[#13171b]">
                <div className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar" style={{ scrollbarWidth: 'none' }}>
                     {subTabs.map(tab => (
                         <button 
                            key={tab}
                            onClick={() => setActiveSubTab(tab)}
                            className={`
                                whitespace-nowrap text-[11px] font-bold px-3 py-1.5 rounded transition-all shrink-0
                                ${activeSubTab === tab 
                                    ? 'bg-[#2c2c2e] text-white shadow-sm ring-1 ring-white/5' 
                                    : 'text-gray-500 hover:text-gray-300 hover:bg-[#2c2c2e]/50'}
                            `}
                         >
                             {tab}
                         </button>
                     ))}
                </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 px-3 py-1.5 text-[10px] text-gray-500 font-medium border-b border-[#1c1c1e] bg-[#13171b] shrink-0">
                <div className="col-span-4">Mã CK/KL</div>
                <div className="col-span-4 text-center">Biểu đồ</div>
                <div className="col-span-4 text-right">Giá/%</div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {items.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-12 px-3 py-3 border-b border-[#1c1c1e] hover:bg-[#1a1f26] transition-colors cursor-pointer group items-center">
                        {/* Left: Symbol & Vol */}
                        <div className="col-span-4 flex items-center gap-2 overflow-hidden">
                            <div className="text-gray-600 group-hover:text-gray-400 cursor-grab shrink-0">
                                <Menu size={12} />
                            </div>
                            <div className="min-w-0">
                                <div className={`text-sm font-bold truncate ${item.s === 'VNINDEX' ? 'text-white' : 'text-gray-200'}`}>{item.s}</div>
                                <div className="text-[9px] text-gray-500 truncate font-medium">{item.vol}</div>
                            </div>
                        </div>

                        {/* Center: Sparkline */}
                        <div className="col-span-4 h-6 px-2 flex items-center justify-center">
                            <Sparkline data={item.chart} color={item.color} />
                        </div>

                        {/* Right: Price & Change */}
                        <div className="col-span-4 text-right">
                            <div className={`text-sm font-bold tracking-tight ${item.color === '#00c853' ? 'text-[#00c853]' : item.color === '#f23645' ? 'text-[#f23645]' : 'text-[#eab308]'}`}>
                                {item.p}
                            </div>
                            <div className={`text-[9px] font-medium ${item.color === '#00c853' ? 'text-[#00c853]' : item.color === '#f23645' ? 'text-[#f23645]' : 'text-[#eab308]'}`}>
                                {item.c}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Footer Actions */}
            <div className="p-3 border-t border-[#1c1c1e] flex items-center justify-between text-[11px] text-gray-400 bg-[#13171b] shrink-0">
                 <button className="flex items-center gap-1.5 hover:text-white transition-colors hover:bg-[#2c2c2e] px-2 py-1 rounded">
                     <PlusCircle size={14} /> Thêm mã CK
                 </button>
                 <button className="flex items-center gap-1.5 hover:text-white transition-colors hover:bg-[#2c2c2e] px-2 py-1 rounded">
                     <ArrowUpDown size={12} /> Sắp xếp: Thủ công
                 </button>
            </div>
        </div>
    );
};

export const RightSidebar: React.FC<RightSidebarProps> = ({ isTradeMode }) => {
  const [sidebarTab, setSidebarTab] = useState('Theo dõi');

  return (
    <div className="w-[340px] flex-shrink-0 border-l border-[#1c1c1e] bg-[#13171b] flex flex-col transition-all duration-300">
         {isTradeMode && <OrderPlacementPanel />}

         <div className="flex h-10 border-b border-[#1c1c1e] flex-shrink-0 bg-[#13171b]">
            {['Chi tiết', 'AI News', 'Theo dõi', 'Chỉ số'].map((tab) => (
                <button 
                    key={tab} 
                    onClick={() => setSidebarTab(tab)}
                    className={`flex-1 text-xs font-bold uppercase tracking-wide hover:bg-[#1e2329] transition-colors
                    ${sidebarTab === tab ? 'text-[#2962ff] border-b-2 border-[#2962ff] bg-[#1a1f26]' : 'text-gray-500'}`}
                >
                    {tab}
                </button>
            ))}
         </div>

         {sidebarTab === 'Chi tiết' ? (
             <>
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

                 <div className="flex-1 overflow-y-auto bg-[#13171b]">
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
             </>
         ) : sidebarTab === 'AI News' ? (
             <div className="flex-1 overflow-y-auto bg-[#13171b] p-3 space-y-3 custom-scrollbar">
                 {AI_NEWS_ITEMS.map((item) => (
                    <div key={item.id} className="bg-[#1a1f26] border border-[#2c2c2e] rounded-lg p-3 hover:border-gray-600 transition-colors cursor-pointer group">
                        <div className="flex items-start gap-3 mb-2">
                             {item.type === 'ai' ? (
                                 <div className="w-9 h-9 rounded-full bg-[#2962ff] flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/20">
                                     <Sparkles size={18} className="text-white" />
                                 </div>
                             ) : (
                                 <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-[#2c2c2e]">
                                     <img src={item.avatar || 'https://i.pravatar.cc/150'} alt={item.source} className="w-full h-full object-cover" />
                                 </div>
                             )}
                             <div className="flex-1 min-w-0">
                                 <div className="flex justify-between items-start">
                                     <h4 className="text-sm font-bold text-[#2962ff] truncate pr-2 group-hover:underline">{item.title}</h4>
                                 </div>
                                 <div className="flex items-center gap-1.5 text-[10px] text-gray-500 mt-0.5">
                                     <span className="font-medium text-gray-300">{item.source}</span>
                                 </div>
                             </div>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed text-justify line-clamp-3">{item.content}</p>
                    </div>
                 ))}
             </div>
         ) : sidebarTab === 'Theo dõi' ? (
            <WatchlistTabContent />
         ) : (
             <div className="flex-1 flex items-center justify-center text-gray-500 text-xs">Coming soon</div>
         )}
      </div>
  );
};
