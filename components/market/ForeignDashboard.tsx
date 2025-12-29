import React from 'react';

export const ForeignMarketDashboard = () => {
    return (
        <div className="flex-1 flex flex-col min-h-0 bg-[#000000] text-white overflow-hidden">
            {/* Top Section: Overview Stats + Chart */}
            <div className="h-[220px] flex border-b border-[#1c1c1e] shrink-0">
                {/* Left: Stats */}
                <div className="w-[30%] border-r border-[#1c1c1e] p-4 flex flex-col justify-center gap-6">
                    <h3 className="text-base font-bold text-white mb-2">Tổng quan</h3>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Mua</span>
                        <div className="text-right">
                            <div className="font-mono font-bold text-[#00c853]">37,802,230</div>
                            <div className="font-mono text-xs text-[#00c853]">1,659.0 tỷ</div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Bán</span>
                        <div className="text-right">
                            <div className="font-mono font-bold text-[#f23645]">38,603,794</div>
                            <div className="font-mono text-xs text-[#f23645]">1,406.1 tỷ</div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-[#1c1c1e]">
                        <span className="text-gray-400 text-sm">Mua - Bán</span>
                        <div className="text-right">
                            <div className="font-mono font-bold text-[#f23645]">-801,564</div>
                            <div className="font-mono text-xs text-[#00c853]">252.8 tỷ</div>
                        </div>
                    </div>
                </div>

                {/* Right: Net Buy Chart */}
                <div className="flex-1 p-4 flex flex-col relative">
                     <div className="flex justify-between items-center mb-4 z-10">
                        <h3 className="text-sm font-bold text-gray-200">NN mua ròng (tỷ)</h3>
                        <div className="flex bg-[#1c1c1e] rounded p-0.5">
                            <button className="px-2 py-0.5 text-[10px] bg-[#2962ff] text-white rounded shadow-sm">10 phiên</button>
                            <button className="px-2 py-0.5 text-[10px] text-gray-400 hover:text-white">Hôm nay</button>
                        </div>
                     </div>
                     
                     <div className="flex-1 relative flex items-end gap-3 pb-6 border-b border-[#1c1c1e]/50 ml-6">
                        {/* Axis Lines */}
                        <div className="absolute left-0 top-0 bottom-6 w-[1px] bg-[#1c1c1e]"></div>
                        <div className="absolute left-0 right-0 top-[50%] h-[1px] bg-[#1c1c1e]/50 border-dashed"></div>
                        
                        {/* Y-Axis Labels */}
                        <div className="absolute -left-8 top-0 text-[9px] text-gray-500">1,500</div>
                        <div className="absolute -left-8 top-[25%] text-[9px] text-gray-500">1,000</div>
                        <div className="absolute -left-8 top-[50%] text-[9px] text-gray-500">500</div>
                        <div className="absolute -left-8 top-[75%] text-[9px] text-gray-500">0</div>
                        <div className="absolute -left-8 bottom-6 text-[9px] text-gray-500">-500</div>

                        {/* Bars */}
                        {[
                            { d: '12/12', v: -600, c: '#f23645' },
                            { d: '15/12', v: 700, c: '#00c853' },
                            { d: '16/12', v: 10, c: '#00c853' },
                            { d: '17/12', v: 20, c: '#00c853' },
                            { d: '18/12', v: -900, c: '#f23645' },
                            { d: '19/12', v: 550, c: '#00c853' },
                            { d: '22/12', v: 550, c: '#00c853' },
                            { d: '23/12', v: 750, c: '#00c853' },
                            { d: '24/12', v: 1100, c: '#00c853' },
                            { d: '00:00', v: 300, c: '#00c853' },
                        ].map((item, i) => (
                             <div key={i} className="flex-1 flex flex-col justify-end h-full relative group">
                                  <div 
                                    className="w-full rounded-sm opacity-90 group-hover:opacity-100 transition-opacity"
                                    style={{ 
                                        height: `${Math.abs(item.v) / 15}%`, 
                                        backgroundColor: item.c,
                                        marginBottom: item.v > 0 ? '50%' : `calc(50% - ${Math.abs(item.v) / 15}%)`
                                    }}
                                  ></div>
                                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-gray-500 whitespace-nowrap">{item.d}</span>
                             </div>
                        ))}
                     </div>
                </div>
            </div>

            {/* Bottom Section: Treemap */}
            <div className="flex-1 bg-[#13171b] overflow-hidden p-1 relative">
                {/* Simulated Treemap using CSS Grid for exact look matching the screenshot */}
                <div className="w-full h-full grid grid-cols-6 grid-rows-4 gap-0.5">
                    {/* Big Green Blocks */}
                    <div className="col-span-2 row-span-2 bg-[#00c853] p-2 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-lg drop-shadow">VHM</span>
                         <span className="text-xs font-medium">118.63 tỷ</span>
                    </div>
                    <div className="col-span-2 row-span-2 bg-[#00c853] p-2 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-lg drop-shadow">VPB</span>
                         <span className="text-xs font-medium">63.51 tỷ</span>
                    </div>
                    
                    {/* Mixed Column 3 Row 1 */}
                    <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-sm drop-shadow">GAS</span>
                         <span className="text-[10px]">49.98 tỷ</span>
                    </div>
                     {/* Mixed Column 3 Row 2 */}
                    <div className="col-span-1 row-span-1 bg-[#f23645] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-sm drop-shadow">DGC</span>
                         <span className="text-[10px]">-49.19 tỷ</span>
                    </div>

                    {/* Column 4 Row 1 & 2 */}
                    <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-sm drop-shadow">VND</span>
                         <span className="text-[10px]">39.59 tỷ</span>
                    </div>
                     <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-sm drop-shadow">CTG</span>
                         <span className="text-[10px]">16.84 tỷ</span>
                    </div>

                    {/* Row 3 - Big STB */}
                    <div className="col-span-2 row-span-2 bg-[#00c853] p-2 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-lg drop-shadow">STB</span>
                         <span className="text-xs font-medium">117.39 tỷ</span>
                    </div>

                    {/* Row 3 Middle Section */}
                     <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-sm drop-shadow">FPT</span>
                         <span className="text-[10px]">31.32 tỷ</span>
                    </div>
                    <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-xs drop-shadow">TAL</span>
                         <span className="text-[9px]">19.93 tỷ</span>
                    </div>
                    <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-xs drop-shadow">SSI</span>
                         <span className="text-[9px]">18.29 tỷ</span>
                    </div>
                    <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-xs drop-shadow">MSN</span>
                         <span className="text-[9px]">17.4 tỷ</span>
                    </div>

                    {/* Row 4 Bottom Section */}
                    <div className="col-span-1 row-span-1 bg-[#f23645] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-sm drop-shadow">VIX</span>
                         <span className="text-[10px]">-24.91 tỷ</span>
                    </div>
                    <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-xs drop-shadow">GEX</span>
                         <span className="text-[9px]">16.55 tỷ</span>
                    </div>
                    <div className="col-span-1 row-span-1 bg-[#f23645] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-xs drop-shadow">NLG</span>
                         <span className="text-[9px]">-16.45 tỷ</span>
                    </div>
                     <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-xs drop-shadow">KDH</span>
                         <span className="text-[9px]">16.29 tỷ</span>
                    </div>

                </div>
            </div>
        </div>
    );
};