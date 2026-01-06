import React from 'react';
import { PrdModuleId } from '../prdConstants';
import { Volume2, AlertTriangle } from 'lucide-react';

interface PrdHtmlLayerProps {
  activeModule: PrdModuleId;
}

export const PrdHtmlLayer: React.FC<PrdHtmlLayerProps> = ({ activeModule }) => {
  
  if (activeModule === 'safety_scanner') {
      return (
          <div className="absolute top-[20%] left-[25%] bg-white/90 text-black text-[10px] p-2 rounded shadow-xl border border-green-500 animate-in zoom-in">
              <div className="font-bold">Ngày: 12/12/2023</div>
              <div className="text-green-600 font-bold">Kết quả T+2.5: +5.2%</div>
          </div>
      );
  }

  if (activeModule === 'ghost_projection') {
      return (
          <div className="absolute top-[10%] left-[20%] bg-cyan-500/10 border border-cyan-500 text-cyan-400 text-[10px] p-1.5 rounded backdrop-blur-sm">
              Độ tương đồng: 85%
          </div>
      );
  }

  if (activeModule === 'sentiment_360') {
      return (
          <>
             <div className="absolute top-[30%] left-[40%] group">
                 <div className="bg-blue-500 p-1 rounded-full text-white shadow-lg cursor-pointer hover:scale-110 transition-transform animate-pulse">
                     <Volume2 size={12} />
                 </div>
                 <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-[#1c1c1e] border border-[#2c2c2e] p-2 rounded hidden group-hover:block z-50 shadow-xl">
                     <div className="text-[10px] text-gray-400 mb-1">Tin đồn • 14:00</div>
                     <div className="text-xs text-white">"KOL Long Lãng khuyến nghị Mua"</div>
                 </div>
             </div>
             
             <div className="absolute top-[50%] left-[60%] group">
                 <div className="bg-red-500 p-1 rounded-full text-white shadow-lg cursor-pointer hover:scale-110 transition-transform animate-pulse">
                     <AlertTriangle size={12} />
                 </div>
                 <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-[#1c1c1e] border border-[#2c2c2e] p-2 rounded hidden group-hover:block z-50 shadow-xl">
                     <div className="text-[10px] text-gray-400 mb-1">Cảnh báo • 09:15</div>
                     <div className="text-xs text-white">"Áp lực bán vùng 29.5"</div>
                 </div>
             </div>
          </>
      );
  }

  if (activeModule === 'trapped_zones') {
      return (
          <div className="absolute top-[18%] right-[5%] bg-red-900/90 text-white text-[10px] px-2 py-1 rounded border border-red-500 shadow-lg">
              Kẹp hàng: ~15.4M cổ
          </div>
      );
  }

  return null;
};