
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

  // --- Feature Spec: Consensus Cloud Detailed Table ---
  if (activeModule === 'consensus_cloud') {
      const cloud = getConsensusCloud();
      return (
          <div className="absolute top-[45%] right-[20px] group z-40">
                <div className="bg-[#13171b]/95 backdrop-blur border border-[#2c2c2e] rounded-lg shadow-2xl w-[280px] animate-in fade-in overflow-hidden">
                     <div className="flex items-center gap-2 px-3 py-2 border-b border-[#2c2c2e] bg-[#1a1f26]">
                         <Users size={14} className="text-[#0ea5e9]" />
                         <span className="text-xs font-bold text-white">Chi tiết Định giá</span>
                     </div>
                     <div className="p-0">
                         <table className="w-full text-[10px]">
                             <tbody>
                                 {cloud.sources.map((src, i) => (
                                     <tr key={i} className="border-b border-[#2c2c2e] last:border-0 hover:bg-[#1c1c1e]">
                                         <td className="py-2 pl-3 text-gray-300 font-medium">
                                             {src.firm} <span className="text-[9px] text-gray-500 ml-1">({src.date})</span>
                                         </td>
                                         <td className="py-2 text-right font-bold text-white w-12">{src.price}</td>
                                         <td className="py-2 pr-3 text-right font-bold w-20" style={{ color: src.color }}>{src.rec}</td>
                                     </tr>
                                 ))}
                                 <tr className="bg-[#2c2c2e]/50">
                                     <td className="py-2 pl-3 font-bold text-white">Trung bình</td>
                                     <td className="py-2 text-right font-bold text-[#0ea5e9]">{cloud.avgTablePrice}</td>
                                     <td></td>
                                 </tr>
                             </tbody>
                         </table>
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
