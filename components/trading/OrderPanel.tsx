import React from 'react';
import { ChevronDown, Minus, PlusCircle } from 'lucide-react';

export const OrderPlacementPanel = () => (
  <div className="w-full bg-[#000000] border-b border-[#1c1c1e] shadow-lg z-20 font-sans text-sm overflow-hidden animate-in slide-in-from-top-2 duration-300">
    {/* Buy/Sell Tabs */}
    <div className="flex border-b border-[#1c1c1e]">
        <button className="flex-1 py-3 text-sm font-bold text-gray-400 bg-[#121212] hover:bg-[#1c1c1e] border-r border-[#1c1c1e]">Mua</button>
        <button className="flex-1 py-3 text-sm font-bold text-white bg-[#f23645] relative overflow-hidden">
            <span className="relative z-10">Bán</span>
            <div className="absolute top-0 right-0 w-8 h-8 bg-white/10 -rotate-45 transform translate-x-4 -translate-y-4"></div>
        </button>
    </div>

    {/* Content */}
    <div className="p-4 bg-[#000000]">
       
       {/* Info Row */}
       <div className="flex justify-between items-center mb-4 text-xs">
           <div className="text-gray-400">Chọn Deal <span className="text-[#2962ff] font-bold ml-1">Vay</span> <span className="text-white ml-2">265.80</span></div>
           <div className="text-right">
               <div className="text-gray-400">Khối lượng <span className="text-white ml-1">5,000</span></div>
           </div>
           <div className="text-right text-[#00c853] font-bold">+800K (+3.5%)</div>
       </div>

       {/* Checkboxes Row (Mock) */}
       <div className="flex gap-4 mb-4">
           <div className="w-4 h-4 rounded-full border border-blue-500 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-blue-500"></div></div>
           <div className="w-4 h-4 rounded-full border border-gray-600"></div>
           <div className="w-4 h-4 rounded-full border border-gray-600"></div>
       </div>

       {/* Ký quỹ Toggle */}
       <div className="flex items-center justify-between mb-4">
           <span className="text-white font-bold">Ký quỹ</span>
           <div className="w-10 h-5 bg-[#2a2e39] rounded-full relative cursor-pointer">
               <div className="absolute left-1 top-1 w-3 h-3 bg-gray-500 rounded-full"></div>
           </div>
       </div>

       {/* Order Type Dropdown */}
       <div className="mb-3">
           <div className="w-full bg-[#1c1c1e] rounded-lg px-4 py-2.5 flex justify-between items-center text-white border border-[#2c2c2e]">
               <span>Lệnh ATO</span>
               <ChevronDown size={16} className="text-gray-400" />
           </div>
       </div>

       {/* Max Info */}
       <div className="flex justify-between text-[10px] text-gray-500 mb-2">
           <span>Mua Max: <span className="text-white">1,000</span> | Bán Max: <span className="text-white">3,000</span></span>
       </div>

       {/* Quantity Input */}
       <div className="flex items-center mb-3">
           <button className="w-10 h-10 bg-[#1c1c1e] rounded-l-lg border-y border-l border-[#2c2c2e] text-gray-400 flex items-center justify-center hover:text-white"><Minus size={16} /></button>
           <div className="flex-1 h-10 bg-[#121212] border-y border-[#2c2c2e] flex items-center justify-center text-white font-bold text-lg">5,000</div>
           <button className="w-10 h-10 bg-[#1c1c1e] rounded-r-lg border-y border-r border-[#2c2c2e] text-gray-400 flex items-center justify-center hover:text-white"><PlusCircle size={16} /></button>
       </div>

       {/* Percent Selectors */}
       <div className="flex gap-2 mb-4">
           {['25%', '50%', '75%', '100%'].map((p, i) => (
               <button key={p} className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${i === 1 ? 'bg-[#2962ff] text-white border-[#2962ff]' : 'bg-[#1c1c1e] text-gray-400 border-[#2c2c2e] hover:border-gray-500'}`}>
                   {p}
               </button>
           ))}
       </div>

       {/* Action Button */}
       <button className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#00c853] to-[#00e676] text-white font-bold text-base shadow-[0_0_15px_rgba(0,200,83,0.4)] hover:shadow-[0_0_25px_rgba(0,200,83,0.6)] transition-all">
           Mua VIC
       </button>
       
       <div className="flex justify-between mt-3 text-[10px] text-gray-400">
           <div className="flex items-center gap-1">TC <span className="text-yellow-500 font-bold">125.30</span></div>
           <div className="flex items-center gap-1">Trần <span className="text-purple-500 font-bold">125.30</span></div>
           <div className="flex items-center gap-1">Sàn <span className="text-blue-400 font-bold">125.30</span></div>
       </div>
    </div>
  </div>
);