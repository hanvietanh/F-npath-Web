
import React, { useState } from 'react';
import { PlusCircle, ArrowUpDown, Menu } from 'lucide-react';
import { Sparkline } from './Sparkline';

export const WatchlistTabContent = () => {
    const [activeSubTab, setActiveSubTab] = useState('Đầu tư');
    const subTabs = ['Đầu tư', 'Top biến động', 'Top khối lượng', 'Top nước ngoài', 'Chỉ số', 'Crypto', 'Vàng'];

    // Mock Data for "Đầu tư" / Default
    const defaultItems = [
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

    // Mock Data for "Top khối lượng"
    const topVolumeItems = [
        { s: 'SSI', vol: '5,893,483', p: '45.34', vPct: '642.2%', dPct: 7.68, wPct: 7.68 },
        { s: 'HPG', vol: '15,200,100', p: '27.40', vPct: '120.5%', dPct: 4.38, wPct: 2.62 },
        { s: 'VND', vol: '12,500,000', p: '22.10', vPct: '95.2%', dPct: -2.10, wPct: -5.40 },
        { s: 'STB', vol: '10,100,200', p: '31.20', vPct: '105.0%', dPct: 1.50, wPct: 3.20 },
        { s: 'DIG', vol: '8,400,300', p: '25.60', vPct: '88.5%', dPct: -1.20, wPct: -4.50 },
        { s: 'NVL', vol: '15,200,500', p: '16.80', vPct: '210.1%', dPct: 0.50, wPct: -1.20 },
        { s: 'PDR', vol: '5,100,000', p: '28.40', vPct: '150.2%', dPct: 6.80, wPct: 12.40 },
        { s: 'VIX', vol: '9,800,000', p: '18.20', vPct: '180.5%', dPct: -3.20, wPct: -8.50 },
        { s: 'GEX', vol: '6,500,000', p: '21.50', vPct: '98.0%', dPct: 2.10, wPct: 1.50 },
        { s: 'VHM', vol: '4,200,000', p: '42.50', vPct: '75.4%', dPct: -0.80, wPct: -2.10 },
    ];

    // Mock Data for "Top biến động" (High % Change)
    const topMoversItems = [
        { s: 'BSI', vol: '1,200,500', p: '52.40', vPct: '150.2%', dPct: 6.95, wPct: 12.5 },
        { s: 'FTS', vol: '2,500,100', p: '48.10', vPct: '120.5%', dPct: 6.85, wPct: 10.2 },
        { s: 'CTS', vol: '1,800,000', p: '32.50', vPct: '95.2%', dPct: 6.50, wPct: 8.4 },
        { s: 'VIX', vol: '15,100,200', p: '18.20', vPct: '210.0%', dPct: 5.80, wPct: 3.2 },
        { s: 'AGR', vol: '900,300', p: '19.60', vPct: '88.5%', dPct: 5.20, wPct: 4.5 },
        { s: 'ORS', vol: '1,200,500', p: '16.80', vPct: '110.1%', dPct: 4.90, wPct: 1.2 },
        { s: 'MBS', vol: '3,100,000', p: '28.40', vPct: '150.2%', dPct: 4.50, wPct: 7.4 },
        { s: 'VDS', vol: '800,000', p: '18.20', vPct: '80.5%', dPct: 4.20, wPct: 2.5 },
        { s: 'VCI', vol: '4,500,000', p: '48.50', vPct: '98.0%', dPct: 3.80, wPct: 1.5 },
        { s: 'HCM', vol: '5,200,000', p: '29.50', vPct: '75.4%', dPct: 3.50, wPct: 2.1 },
    ];

    const isSpecialView = activeSubTab === 'Top khối lượng' || activeSubTab === 'Top biến động';
    const activeData = activeSubTab === 'Top khối lượng' ? topVolumeItems : (activeSubTab === 'Top biến động' ? topMoversItems : []);

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
            {isSpecialView ? (
                <div className="grid grid-cols-12 px-3 py-2 text-[10px] text-gray-500 font-bold border-b border-[#1c1c1e] bg-[#13171b] shrink-0">
                    <div className="col-span-3 flex items-center gap-1">
                        <span className="hover:text-gray-300 cursor-pointer flex items-center">Mã <ArrowUpDown size={8} className="ml-0.5 text-gray-600"/></span>
                        <span className="text-gray-700 font-light">|</span>
                        <span className="hover:text-gray-300 cursor-pointer flex items-center">KL <ArrowUpDown size={8} className="ml-0.5 text-gray-600"/></span>
                    </div>
                    <div className="col-span-3 text-right flex items-center justify-end gap-1">
                        <span className="hover:text-gray-300 cursor-pointer flex items-center">Giá <ArrowUpDown size={8} className="ml-0.5 text-gray-600"/></span>
                        <span className="text-gray-700 font-light">|</span>
                        <span className="hover:text-gray-300 cursor-pointer flex items-center">%KL <ArrowUpDown size={8} className="ml-0.5 text-gray-600"/></span>
                    </div>
                    <div className="col-span-3 text-center hover:text-gray-300 cursor-pointer flex items-center justify-center gap-1">
                        % Hôm nay <ArrowUpDown size={8} className="text-gray-600"/>
                    </div>
                    <div className="col-span-3 text-center hover:text-gray-300 cursor-pointer flex items-center justify-center gap-1">
                        % Tuần này <ArrowUpDown size={8} className="text-gray-600"/>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-12 px-3 py-1.5 text-[10px] text-gray-500 font-medium border-b border-[#1c1c1e] bg-[#13171b] shrink-0">
                    <div className="col-span-4">Mã CK/KL</div>
                    <div className="col-span-4 text-center">Biểu đồ</div>
                    <div className="col-span-4 text-right">Giá/%</div>
                </div>
            )}

            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {isSpecialView ? (
                    // ADVANCED LIST LAYOUT (Top Volume & Top Movers)
                    activeData.map((item, idx) => (
                        <div key={idx} className="grid grid-cols-12 px-3 py-3 border-b border-[#1c1c1e] hover:bg-[#1a1f26] transition-colors cursor-pointer items-center group">
                            {/* Col 1: Symbol / Vol */}
                            <div className="col-span-3 flex flex-col items-start justify-center gap-0.5">
                                <span className="text-sm font-bold text-gray-200 group-hover:text-white">{item.s}</span>
                                <span className="text-[10px] text-gray-500 font-medium tracking-tight">{item.vol}</span>
                            </div>
                            
                            {/* Col 2: Price / % Vol */}
                            <div className="col-span-3 flex flex-col items-end justify-center gap-0.5 text-right">
                                <span className="text-sm font-bold text-gray-200 group-hover:text-white">{item.p}</span>
                                <span className="text-[10px] text-gray-500 font-medium">{item.vPct}</span>
                            </div>

                            {/* Col 3: Today % */}
                            <div className="col-span-3 flex items-center justify-center">
                                <div className={`px-2 py-1.5 rounded text-[11px] font-bold min-w-[56px] text-center ${item.dPct >= 0 ? 'bg-[#00c853]/15 text-[#00c853]' : 'bg-[#f23645]/15 text-[#f23645]'}`}>
                                    {item.dPct > 0 ? '+' : ''}{item.dPct.toFixed(2)}%
                                </div>
                            </div>

                            {/* Col 4: Week % */}
                            <div className="col-span-3 flex items-center justify-center">
                                <div className={`px-2 py-1.5 rounded text-[11px] font-bold min-w-[56px] text-center ${item.wPct >= 0 ? 'bg-[#00c853]/15 text-[#00c853]' : 'bg-[#f23645]/15 text-[#f23645]'}`}>
                                    {item.wPct > 0 ? '+' : ''}{item.wPct.toFixed(2)}%
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    // DEFAULT LAYOUT (Sparkline)
                    defaultItems.map((item, idx) => (
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
                    ))
                )}
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
