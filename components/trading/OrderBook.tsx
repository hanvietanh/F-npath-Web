import React from 'react';
import { ChevronDown } from 'lucide-react';

export const OrderBookTable = () => (
  <div className="w-full bg-[#13171b]">
    <div className="grid grid-cols-4 text-[11px] text-gray-500 font-medium py-2 border-b border-[#1c1c1e]">
      <span className="pl-3 text-left">KL mua</span>
      <span className="text-center text-white font-bold">Giá mua</span>
      <span className="text-center text-white font-bold">Giá bán</span>
      <span className="pr-3 text-right">KL bán</span>
    </div>
    
    <div className="text-xs font-mono">
         {/* Row 1 */}
         <div className="grid grid-cols-4 h-8 border-b border-[#1c1c1e]/30 hover:bg-[#1c1c1e] transition-colors">
             <div className="flex items-center pl-3 text-white">135,500</div>
             <div className="flex items-center justify-center text-[#f23645] font-bold bg-[#4a2224]">56.00</div>
             <div className="flex items-center justify-center text-[#f23645] font-bold bg-[#4a2224]">56.10</div>
             <div className="flex items-center justify-end pr-3 text-white">600</div>
         </div>
         {/* Row 2 */}
         <div className="grid grid-cols-4 h-8 border-b border-[#1c1c1e]/30 hover:bg-[#1c1c1e] transition-colors">
             <div className="flex items-center pl-3 text-white">6,200</div>
             <div className="flex items-center justify-center text-[#f23645] font-bold bg-[#3a1a1c]">55.90</div>
             <div className="flex items-center justify-center text-[#f23645] font-bold bg-[#3a1a1c]">56.20</div>
             <div className="flex items-center justify-end pr-3 text-white">2,000</div>
         </div>
         {/* Row 3 */}
         <div className="grid grid-cols-4 h-8 border-b border-[#1c1c1e]/30 hover:bg-[#1c1c1e] transition-colors">
             <div className="flex items-center pl-3 text-white">4,000</div>
             <div className="flex items-center justify-center text-[#f23645] font-bold bg-[#2f1516]">55.80</div>
             <div className="flex items-center justify-center text-yellow-500 font-bold bg-[#3d3618]">56.30</div>
             <div className="flex items-center justify-end pr-3 text-white">3,900</div>
         </div>
    </div>
    
    <div className="flex justify-center py-2 border-t border-[#1c1c1e]">
        <span className="text-[11px] text-gray-500 hover:text-white cursor-pointer flex items-center gap-1 font-medium">Mở rộng <ChevronDown size={12} /></span>
    </div>
  </div>
);