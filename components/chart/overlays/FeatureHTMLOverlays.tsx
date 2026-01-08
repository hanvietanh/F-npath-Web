import React from 'react';
import { Shield, HelpCircle } from 'lucide-react';

interface FeatureHTMLProps {
  activeFeature: string;
}

export const FeatureHTMLOverlays: React.FC<FeatureHTMLProps> = ({ activeFeature }) => {
  
  if (activeFeature === 'vip_room_heatmap') {
      return <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-transparent via-[#00c853]/10 to-[#00c853]/30" />
  }

  if (activeFeature === 'foreign_room_arbitrage') {
      return (
          <div className="absolute top-16 right-4 w-48 bg-[#000]/80 border border-[#2c2c2e] rounded-lg p-3 z-30 shadow-[0_0_15px_rgba(0,255,0,0.2)] animate-pulse">
              <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-400">Room Ngoại</span>
                  <span className="text-[10px] text-[#00c853] font-bold border border-[#00c853] px-1 rounded animate-pulse">HỞ ROOM</span>
              </div>
              <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-[#00c853] w-[95%]"></div>
              </div>
              <div className="text-right text-xs text-white font-mono mb-2">95.4% <span className="text-gray-500">&rarr;</span> 100%</div>
              <button className="w-full bg-[#00c853] text-black font-bold text-xs py-1 rounded hover:bg-[#00e676]">MUA NGAY (MP)</button>
          </div>
      )
  }

  if (activeFeature === 'native_trade') {
      return (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center">
               <div className="flex gap-2 mb-2">
                   <button className="bg-[#00c853] text-white px-6 py-3 rounded font-bold shadow-lg hover:scale-105 transition-transform">MUA</button>
                   <button className="bg-[#f23645] text-white px-6 py-3 rounded font-bold shadow-lg hover:scale-105 transition-transform">BÁN</button>
               </div>
               <div className="bg-black/80 text-white px-3 py-1 rounded border border-dashed border-gray-500 text-xs">
                   P&L: <span className="text-[#00c853] font-bold">+2,500,000</span> (Tạm tính)
               </div>
               <div className="absolute w-[800px] h-[1px] bg-yellow-500 border-dashed top-1/2 -z-10 opacity-50"></div>
               <span className="absolute right-[-400px] top-1/2 -translate-y-1/2 text-yellow-500 text-[10px] bg-black px-1">Giá vốn</span>
          </div>
      )
  }

  if (activeFeature === 'etf_rebalancing') {
      return (
          <div className="absolute top-20 right-24 bg-blue-900/90 text-white p-2 rounded text-xs border border-blue-500 z-30 max-w-[150px]">
              <strong>Quỹ Diamond</strong><br/>
              Dự kiến MUA: 3tr CP<br/>
              <span className="text-gray-300 text-[10px]">Review: 15/3</span>
          </div>
      )
  }

  if (activeFeature === 'earnings_replay') {
      return (
          <div className="absolute bottom-10 left-10 bg-[#1c1c1e] border border-[#2c2c2e] p-3 rounded shadow-lg z-30 w-64">
              <div className="text-xs font-bold text-gray-300 mb-2 border-b border-gray-700 pb-1">Lịch sử BCTC (4 kỳ gần nhất)</div>
              <div className="space-y-2">
                  <div className="flex justify-between text-xs"><span className="text-gray-500">Q3/24</span> <span className="text-[#00c853] font-bold">+15% (Sau tin)</span></div>
                  <div className="flex justify-between text-xs"><span className="text-gray-500">Q2/24</span> <span className="text-[#f23645] font-bold">-5% (Sau tin)</span></div>
                  <div className="flex justify-between text-xs"><span className="text-gray-500">Q1/24</span> <span className="text-[#00c853] font-bold">+8% (Sau tin)</span></div>
              </div>
              <div className="mt-2 text-[10px] text-orange-400 italic">Xu hướng: Tăng 3/4 lần</div>
          </div>
      )
  }

  if (activeFeature === 'bull_bear_debate') {
      return (
        <div className="absolute top-16 right-4 w-64 bg-black/90 border border-gray-700 rounded-lg p-0 overflow-hidden z-30">
            <div className="flex text-xs font-bold text-center">
                <div className="flex-1 bg-[#00c853]/20 text-[#00c853] py-2 border-b-2 border-[#00c853]">BULL (65%)</div>
                <div className="flex-1 bg-[#f23645]/20 text-[#f23645] py-2 border-b border-gray-700">BEAR (35%)</div>
            </div>
            <div className="p-3 grid grid-cols-2 gap-2 text-[10px]">
                <div className="text-gray-300">• Kỳ vọng cổ tức<br/>• Tây mua ròng</div>
                <div className="text-gray-400 border-l border-gray-700 pl-2">• Giá cao su giảm<br/>• Cản 60 cứng</div>
            </div>
        </div>
      )
  }

  if (activeFeature === 'sector_rotation') {
      return (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#1c1c1e]/80 backdrop-blur px-4 py-1 rounded-full border border-[#2962ff]/50 text-xs text-white z-20 whitespace-nowrap overflow-hidden w-[300px]">
              <div className="animate-marquee inline-block">
                  Dòng tiền rút khỏi <span className="text-[#f23645]">BĐS</span> {'->'} Sang <span className="text-[#00c853]">Thép</span>. HPG RS: 98 (Mạnh hơn ngành).
              </div>
          </div>
      )
  }

  if (activeFeature === 'visual_fundamentals') {
      return (
          <div className="absolute top-[40%] left-[30%] bg-[#00c853] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-lg transform -translate-y-1/2 z-20">
              🚀 +20% YoY
          </div>
      )
  }

  if (activeFeature === 'scenario_planner') {
      return (
          <div className="absolute top-[30%] right-[20%] w-[1px] h-[300px] bg-[#2962ff] border-r border-dashed border-[#2962ff] z-30 group cursor-ew-resize">
               <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-full bg-[#2962ff] text-white text-xs px-2 py-1 rounded mb-1 whitespace-nowrap">
                   Mục tiêu: 62.0 (+12%)
               </div>
               <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-full bg-black text-xs px-2 py-1 rounded border border-gray-700 whitespace-nowrap">
                   PE fwd: 15.x
               </div>
          </div>
      )
  }
  
  if (activeFeature === 'ai_fundamental_insight') {
       return (
           <div className="absolute top-4 left-4 z-50">
               <div className="absolute top-8 left-20 cursor-pointer text-gray-400 hover:text-white">
                   <HelpCircle size={14} />
                   <div className="absolute left-6 top-0 w-48 bg-black border border-gray-600 p-2 text-[10px] text-gray-300 rounded hidden hover:block">
                       P/E (Price to Earnings): Hệ số giá trên thu nhập. P/E thấp hơn trung bình ngành thường là rẻ.
                   </div>
               </div>
           </div>
       )
  }
  
  if (activeFeature === 'rumor_credibility') {
      return (
          <div className="absolute top-1/4 left-1/3 z-50 animate-in zoom-in">
               <div className="bg-[#1c1c1e] border border-gray-700 rounded-lg p-3 w-64 shadow-2xl">
                   <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-white">Tin đồn: Game phát hành thêm</span>
                        <Shield size={14} className="text-[#00c853] fill-[#00c853]/20" />
                   </div>
                   <div className="flex items-center gap-2 mb-2">
                       <img src="https://i.pravatar.cc/150?u=source" className="w-6 h-6 rounded-full" />
                       <div className="text-[10px]">
                           <div className="text-white font-bold">Nguồn: FireAnt User</div>
                           <div className="text-gray-500">Độ tin cậy: <span className="text-[#00c853] font-bold">Cao (85%)</span></div>
                       </div>
                   </div>
                   <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                       <div className="bg-[#00c853] h-full w-[85%]"></div>
                   </div>
               </div>
          </div>
      )
  }

  return null;
};
