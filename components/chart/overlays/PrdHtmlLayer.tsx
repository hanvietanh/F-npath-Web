
import React from 'react';
import { PrdModuleId, getConsensusCloud } from '../prdConstants';
import { Volume2, AlertTriangle, Users } from 'lucide-react';

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
             </div>
             <div className="absolute top-[50%] left-[60%] group">
                 <div className="bg-red-500 p-1 rounded-full text-white shadow-lg cursor-pointer hover:scale-110 transition-transform animate-pulse">
                     <AlertTriangle size={12} />
                 </div>
             </div>
          </>
      );
  }

  // --- Feature Spec: Consensus Cloud Tooltip (Module 7) ---
  if (activeModule === 'consensus_cloud') {
      const cloud = getConsensusCloud();
      return (
          <div className="absolute top-[30%] right-[5%] group">
                <div className="bg-[#1c1c1e] border border-[#2c2c2e] p-3 rounded-lg shadow-2xl w-52 animate-in fade-in">
                     <div className="flex items-center gap-2 mb-2 border-b border-[#2c2c2e] pb-1">
                         <Users size={12} className="text-[#0ea5e9]" />
                         <span className="text-xs font-bold text-white">Chi tiết Định giá</span>
                     </div>
                     <div className="space-y-1.5">
                         {cloud.sources.map((src, i) => (
                             <div key={i} className="flex justify-between text-[10px]">
                                 <span className="text-gray-400">{src.firm} <span className="text-[9px] text-gray-600">({src.date})</span></span>
                                 <div className="flex gap-2">
                                     <span className="text-white font-bold">{src.price}</span>
                                     <span className={`${src.rec === 'BUY' ? 'text-[#00c853]' : 'text-yellow-500'} font-bold`}>{src.rec}</span>
                                 </div>
                             </div>
                         ))}
                         <div className="border-t border-[#2c2c2e] mt-1 pt-1 flex justify-between text-[10px] font-bold">
                             <span className="text-gray-300">Trung bình</span>
                             <span className="text-[#0ea5e9]">{cloud.avg}</span>
                         </div>
                     </div>
                </div>
          </div>
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
