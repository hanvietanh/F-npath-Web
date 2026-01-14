
import React, { useState } from 'react';
import { 
  X, Bell, Star, Zap, ChevronRight, AlertTriangle, 
  PieChart, TrendingUp, Activity, FileText, Users,
  ArrowRight, Search, Clock, ShieldCheck, PlayCircle
} from 'lucide-react';
import { CandleChart } from '../CandleChart';

interface Props {
  symbol: string;
  onClose: () => void;
}

const TradingTicket = ({ symbol, onClose }: { symbol: string, onClose: () => void }) => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-[#1a1f26] border border-[#2c2c2e] rounded-xl shadow-2xl z-[150] animate-in zoom-in-95 duration-200 font-sans text-white">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-[#2c2c2e] bg-[#2962ff]">
          <h3 className="font-bold text-sm flex items-center gap-2">
              <Zap size={16} className="fill-white" /> ĐẶT LỆNH NHANH
          </h3>
          <button onClick={onClose} className="hover:bg-white/20 rounded p-1"><X size={16} /></button>
      </div>
      
      <div className="p-5">
          {/* Account Info */}
          <div className="flex justify-between text-xs text-gray-400 mb-4 bg-[#13171b] p-2 rounded">
              <span>Mã: <strong className="text-white">{symbol}</strong></span>
              <span>Sức mua: <strong className="text-[#00c853]">1.5 Tỷ</strong></span>
              <span>Margin: <strong className="text-yellow-500">3.5 Tỷ</strong></span>
          </div>

          {/* Order Type */}
          <div className="flex gap-2 mb-4">
              {['LO', 'MP', 'ATC'].map(type => (
                  <button key={type} className={`flex-1 py-1.5 text-xs font-bold rounded border ${type === 'LO' ? 'bg-[#2c2c2e] border-[#2962ff] text-[#2962ff]' : 'border-[#2c2c2e] text-gray-400'}`}>
                      {type}
                  </button>
              ))}
          </div>

          {/* Inputs */}
          <div className="space-y-3 mb-4">
              <div>
                  <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                      <span>KHỐI LƯỢNG</span>
                      <span>Max: 50,000</span>
                  </div>
                  <div className="flex items-center bg-[#13171b] border border-[#2c2c2e] rounded h-9 px-3">
                      <input type="text" defaultValue="10,000" className="bg-transparent w-full text-sm font-bold text-white focus:outline-none text-right" />
                  </div>
              </div>
              <div>
                  <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                      <span>GIÁ ĐẶT</span>
                      <span className="text-[#2962ff] cursor-pointer">Thị trường</span>
                  </div>
                  <div className="flex items-center bg-[#13171b] border border-[#2c2c2e] rounded h-9 px-3 relative">
                      <input type="text" defaultValue="28.55" className="bg-transparent w-full text-sm font-bold text-white focus:outline-none text-right" />
                      <div className="absolute -bottom-6 right-0 text-[9px] text-[#00c853] flex items-center gap-1 w-full justify-end">
                          <SparklesIcon /> AI Suggest: "Quét lệnh bán mỏng"
                      </div>
                  </div>
              </div>
          </div>

          <div className="pt-4 mt-6">
              <label className="flex items-center gap-2 text-xs text-gray-400 mb-4 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-600 bg-[#13171b]" />
                  Đặt Stoploss tự động (-7%)
              </label>
              <button className="w-full bg-[#00c853] hover:bg-[#00e676] text-white font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(0,200,83,0.4)] transition-all">
                  XÁC NHẬN MUA (ENTER)
              </button>
          </div>
      </div>
  </div>
);

const SparklesIcon = () => <Zap size={10} className="text-yellow-400 fill-yellow-400" />;

export const StockDetailSuperPopup: React.FC<Props> = ({ symbol, onClose }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'finance' | 'news' | 'holders'>('dashboard');
  const [showTicket, setShowTicket] = useState(false);

  // --- MOCK DATA ---
  const orderBookData = [
      { p: 28.55, v: '20k', type: 'S' },
      { p: 28.50, v: '15k', type: 'S' },
      { p: 28.45, v: '100k', type: 'B', highlight: true },
      { p: 28.40, v: '500k', type: 'B' },
      { p: 28.35, v: '50k', type: 'B' },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200">
      
      {/* Container - 90% Screen */}
      <div 
        className="w-[95vw] h-[90vh] bg-[#0b0e11] border border-[#2c2c2e] rounded-xl shadow-2xl flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* I. GLOBAL HEADER */}
        <div className="h-14 bg-[#13171b] border-b border-[#2c2c2e] flex items-center px-4 justify-between shrink-0">
            {/* Stock Context */}
            <div className="flex items-center gap-4">
                <div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-[#00c853]">{symbol}</span>
                        <span className="text-xl font-bold text-[#00c853]">28.50</span>
                        <span className="text-sm font-medium text-[#00c853] flex items-center gap-1">
                            <TrendingUp size={14} /> +0.65 (+2.3%)
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-gray-400 mt-0.5">
                        <span className="flex items-center gap-1">Vol: <span className="text-white font-bold">35M</span> (Cao hơn TB 20p)</span>
                        <span className="w-[1px] h-3 bg-gray-600"></span>
                        <span className="flex items-center gap-1">RS Rating: <span className="text-[#2962ff] font-bold">85</span></span>
                        <span className="w-[1px] h-3 bg-gray-600"></span>
                        <span className="flex items-center gap-1 text-[#00c853] bg-[#00c853]/10 px-1.5 rounded border border-[#00c853]/20 cursor-help" title="Dòng tiền vào mạnh, xu hướng tăng bền vững">
                            <SparklesIcon /> AI SCAN: TÍCH CỰC
                        </span>
                    </div>
                </div>
                
                {/* Market Context */}
                <div className="hidden lg:block pl-4 border-l border-[#2c2c2e]">
                    <div className="text-[10px] text-gray-500 uppercase font-bold">VN-Index</div>
                    <div className="text-xs font-bold text-[#00c853] flex items-center gap-1">
                        ▲ +0.5% (Đồng pha)
                    </div>
                </div>
            </div>

            {/* Navigation & Actions */}
            <div className="flex items-center gap-4">
                {/* Tabs */}
                <div className="flex bg-[#1a1f26] rounded-lg p-1 gap-1">
                    {[
                        { id: 'dashboard', label: 'DASHBOARD', key: 'F1' },
                        { id: 'finance', label: 'TÀI CHÍNH', key: 'F2' },
                        { id: 'news', label: 'TIN TỨC', key: 'F3' },
                        { id: 'holders', label: 'CỔ ĐÔNG', key: 'F4' },
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`
                                px-4 py-1.5 text-xs font-bold rounded transition-colors flex flex-col items-center leading-none gap-0.5 min-w-[90px]
                                ${activeTab === tab.id ? 'bg-[#2c2c2e] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300 hover:bg-[#2c2c2e]/50'}
                            `}
                        >
                            {tab.label}
                            {activeTab === tab.id && <span className="w-1 h-1 rounded-full bg-[#2962ff]"></span>}
                        </button>
                    ))}
                </div>

                {/* Icons */}
                <div className="flex items-center gap-2 text-gray-400">
                    <button className="p-2 hover:bg-[#2c2c2e] rounded hover:text-white"><Bell size={18} /></button>
                    <button className="p-2 hover:bg-[#2c2c2e] rounded hover:text-yellow-500"><Star size={18} /></button>
                </div>

                {/* Big Actions */}
                <div className="flex items-center gap-2">
                    <button className="px-6 py-2 bg-[#f23645]/10 hover:bg-[#f23645] text-[#f23645] hover:text-white border border-[#f23645] font-bold rounded transition-all text-sm">
                        BÁN
                    </button>
                    <button 
                        onClick={() => setShowTicket(true)}
                        className="px-6 py-2 bg-[#00c853] hover:bg-[#00e676] text-white font-bold rounded transition-all text-sm shadow-[0_0_15px_rgba(0,200,83,0.3)] flex items-center gap-2 animate-pulse"
                    >
                        <Zap size={16} className="fill-white" /> MUA
                    </button>
                </div>

                <button onClick={onClose} className="ml-2 p-2 hover:bg-[#f23645] rounded text-gray-400 hover:text-white transition-colors">
                    <X size={20} />
                </button>
            </div>
        </div>

        {/* II. CONTENT AREA */}
        <div className="flex-1 bg-[#0b0e11] overflow-hidden relative">
            
            {/* TAB 1: DASHBOARD */}
            {activeTab === 'dashboard' && (
                <div className="h-full flex">
                    
                    {/* COL 1: ORDER BOOK & TAPE (20%) */}
                    <div className="w-[20%] border-r border-[#1c1c1e] flex flex-col bg-[#13171b]">
                        <div className="px-3 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-[#1c1c1e] bg-[#1a1f26]">
                            Sổ Lệnh (Level 2)
                        </div>
                        <div className="flex-1 overflow-auto custom-scrollbar">
                            <table className="w-full text-xs font-mono">
                                <thead>
                                    <tr className="text-[9px] text-gray-500 border-b border-[#1c1c1e]">
                                        <th className="text-left pl-2 py-1">Mua</th>
                                        <th className="text-center py-1">Giá</th>
                                        <th className="text-right pr-2 py-1">Bán</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Ask Side (Sell) - Red - Reversed */}
                                    {[3, 2, 1, 0].map(i => (
                                        <tr key={`ask-${i}`} className="hover:bg-[#1a1f26] relative">
                                            <td className="pl-2 py-1 text-gray-600">-</td>
                                            <td className="text-center font-bold text-[#f23645]">{(28.60 + i*0.05).toFixed(2)}</td>
                                            <td className="pr-2 text-right text-white relative z-10">{(Math.random()*50).toFixed(1)}k
                                                <div className="absolute top-0 bottom-0 right-0 bg-[#f23645]/10 z-[-1]" style={{width: `${Math.random()*80}%`}}></div>
                                            </td>
                                        </tr>
                                    ))}
                                    
                                    {/* Spread Divider */}
                                    <tr className="border-y border-[#2c2c2e] bg-[#1a1f26]">
                                        <td colSpan={3} className="text-center py-1 text-[10px] text-yellow-500 font-bold">28.50 (Khớp)</td>
                                    </tr>

                                    {/* Bid Side (Buy) - Green */}
                                    {[0, 1, 2, 3, 4].map(i => {
                                        const vol = (Math.random()*200).toFixed(1);
                                        const isHuge = parseFloat(vol) > 100;
                                        return (
                                            <tr key={`bid-${i}`} className="hover:bg-[#1a1f26] relative group">
                                                <td className="pl-2 py-1 text-white relative z-10">
                                                    {vol}k {isHuge && <span className="text-[#d946ef] font-bold text-[9px]">🟣</span>}
                                                    <div className="absolute top-0 bottom-0 left-0 bg-[#00c853]/10 z-[-1]" style={{width: `${Math.random()*80}%`}}></div>
                                                </td>
                                                <td className="text-center font-bold text-[#00c853]">{(28.45 - i*0.05).toFixed(2)}</td>
                                                <td className="pr-2 text-right text-gray-600">-</td>
                                                
                                                {/* Spoofing Alert (Mock) */}
                                                {i === 2 && (
                                                    <div className="absolute inset-0 bg-yellow-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                                                        <span className="text-[9px] text-yellow-500 font-bold bg-black/80 px-1 rounded flex items-center gap-1">
                                                            <AlertTriangle size={8} /> AI: Spoofing?
                                                        </span>
                                                    </div>
                                                )}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Tape */}
                        <div className="h-[40%] border-t border-[#1c1c1e] flex flex-col">
                             <div className="px-3 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-[#1a1f26] flex justify-between">
                                 <span>Khớp lệnh (Tape)</span>
                                 <span className="text-[#00c853] flex items-center gap-1"><Activity size={10} /> Live</span>
                             </div>
                             <div className="flex-1 overflow-auto custom-scrollbar p-2 space-y-1">
                                 {[1,2,3,4,5,6].map((_, i) => (
                                     <div key={i} className="flex justify-between text-[10px] font-mono hover:bg-[#1c1c1e] rounded px-1">
                                         <span className="text-gray-500">10:45:0{i}</span>
                                         <span className="text-white font-bold">28.50</span>
                                         <span className={`${Math.random() > 0.5 ? 'text-[#00c853]' : 'text-[#f23645]'}`}>
                                             {Math.floor(Math.random()*20)}k ({Math.random() > 0.5 ? 'M' : 'B'})
                                         </span>
                                     </div>
                                 ))}
                             </div>
                        </div>
                    </div>

                    {/* COL 2: CHART (55%) */}
                    <div className="w-[55%] flex flex-col border-r border-[#1c1c1e] relative">
                        {/* Toolbar */}
                        <div className="h-8 border-b border-[#1c1c1e] bg-[#1a1f26] flex items-center px-2 gap-2 text-[10px]">
                            {['1D', '1W', '1M'].map(t => <button key={t} className="hover:bg-[#2c2c2e] px-2 py-0.5 rounded text-gray-300">{t}</button>)}
                            <span className="w-[1px] h-3 bg-gray-600 mx-1"></span>
                            <span className="text-[#2962ff] font-bold flex items-center gap-1"><Zap size={10} /> AI Sentinel Active</span>
                        </div>
                        
                        {/* Chart Area */}
                        <div className="flex-1 relative">
                            {/* Overlay Alerts */}
                            <div className="absolute top-4 left-4 z-20 bg-[#13171b]/90 border border-[#00c853] rounded p-2 shadow-lg animate-in slide-in-from-left">
                                <div className="text-[10px] font-bold text-[#00c853] flex items-center gap-1 mb-1">
                                    <SparklesIcon /> AI DETECT
                                </div>
                                <div className="text-xs text-white">Phân kỳ dương RSI + Vol giảm tại hỗ trợ 28.0</div>
                            </div>

                            <CandleChart 
                                symbol={symbol} 
                                activeFeature="smart_money_divergence" // Trigger visual overlay
                                colorUp="#00c853"
                                colorDown="#f23645"
                            />
                        </div>
                    </div>

                    {/* COL 3: SHARK FLOW (25%) */}
                    <div className="w-[25%] flex flex-col bg-[#13171b] p-4 overflow-y-auto custom-scrollbar">
                        
                        {/* 1. Shark Status */}
                        <div className="mb-6">
                            <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Users size={14} /> Dòng tiền Cá mập
                            </h4>
                            
                            <div className="bg-[#1a1f26] border border-[#2c2c2e] rounded-lg p-3 mb-3">
                                <div className="text-[10px] text-gray-400 mb-1">TRẠNG THÁI</div>
                                <div className="text-lg font-bold text-[#00c853] flex items-center gap-2">
                                    🟢 ĐANG GOM
                                </div>
                                <p className="text-[10px] text-gray-500 mt-1 italic">
                                    "Lực mua chủ động áp đảo phe bán trong 30p qua."
                                </p>
                            </div>

                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Cá mập ({'>'}1 tỷ):</span>
                                    <span className="text-[#00c853] font-bold">Mua 15 / Bán 4</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Nước ngoài:</span>
                                    <span className="text-[#00c853] font-bold">+25.4 Tỷ</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Tự doanh:</span>
                                    <span className="text-[#f23645] font-bold">-2.1 Tỷ</span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                                    <span>Mua chủ động</span>
                                    <span className="text-white">70%</span>
                                </div>
                                <div className="w-full h-1.5 bg-[#2c2c2e] rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-[#00c853] to-[#00e676]" style={{ width: '70%' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Quick Fundamentals */}
                        <div className="mb-6 border-t border-[#2c2c2e] pt-4">
                            <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <FileText size={14} /> Cơ bản nhanh
                            </h4>
                            
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-400">P/E (12.5x)</span>
                                        <span className="text-[#00c853] font-bold">Rẻ</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-[#2c2c2e] rounded-full relative">
                                        <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full border border-black shadow"></div>
                                        <span className="absolute left-0 -bottom-3 text-[8px] text-gray-500">Rẻ</span>
                                        <span className="absolute right-0 -bottom-3 text-[8px] text-gray-500">Đắt</span>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-400">LNST Q3:</span>
                                        <span className="text-[#00c853] font-bold">Tăng trưởng +25%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Live Alert */}
                        <div className="mt-auto bg-[#f23645]/10 border border-[#f23645]/30 rounded p-2 flex items-start gap-2 animate-pulse">
                            <AlertTriangle size={14} className="text-[#f23645] shrink-0 mt-0.5" />
                            <div>
                                <div className="text-[10px] font-bold text-[#f23645] uppercase">Cảnh báo Live</div>
                                <div className="text-[10px] text-white">10:30: Vol nổ gấp 2 lần trung bình phiên sáng.</div>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* TAB 2: FINANCIALS */}
            {activeTab === 'finance' && (
                <div className="p-6 h-full overflow-y-auto custom-scrollbar">
                    {/* Valuation Section */}
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                            1. Định giá (Valuation) 
                            <span className="bg-[#2962ff] text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1 cursor-help">
                                <SparklesIcon /> AI Đánh giá: HẤP DẪN (RẺ)
                            </span>
                        </h3>
                        
                        <div className="grid grid-cols-2 gap-8 bg-[#13171b] p-6 rounded-xl border border-[#2c2c2e]">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-400 text-xs">P/E Hiện tại: <strong className="text-white">12.5x</strong></span>
                                    <span className="text-gray-500 text-xs">Vs Lịch sử 5Y</span>
                                </div>
                                <div className="relative h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full">
                                    <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-black rounded-full shadow-lg" style={{ left: '30%' }}></div>
                                </div>
                                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                                    <span>Rẻ (8x)</span>
                                    <span>Đắt (20x)</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-400 text-xs">P/B Hiện tại: <strong className="text-white">1.8x</strong></span>
                                    <span className="text-gray-500 text-xs">Vs Lịch sử 5Y</span>
                                </div>
                                <div className="relative h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full">
                                    <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-black rounded-full shadow-lg" style={{ left: '45%' }}></div>
                                </div>
                                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                                    <span>Rẻ (1.0x)</span>
                                    <span>Đắt (3.5x)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* P&L Table */}
                    <div className="mb-8">
                        <div className="flex justify-between items-end mb-4">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                2. Kết quả kinh doanh
                                <span className="bg-[#f23645]/10 text-[#f23645] text-[10px] px-2 py-0.5 rounded border border-[#f23645]/30 flex items-center gap-1">
                                    <AlertTriangle size={10} /> AI Audit: CẢNH BÁO DÒNG TIỀN
                                </span>
                            </h3>
                            <div className="flex bg-[#1a1f26] rounded p-0.5 text-[10px]">
                                <button className="px-3 py-1 bg-[#2c2c2e] text-white rounded shadow">Theo Quý</button>
                                <button className="px-3 py-1 text-gray-500 hover:text-white">Theo Năm</button>
                            </div>
                        </div>

                        <table className="w-full text-xs text-right border-collapse">
                            <thead className="bg-[#1a1f26] text-gray-400">
                                <tr>
                                    <th className="text-left p-3 rounded-tl-lg">Chỉ tiêu (Tỷ VNĐ)</th>
                                    <th className="p-3">Q3/2024</th>
                                    <th className="p-3">Q2/2024</th>
                                    <th className="p-3">Q1/2024</th>
                                    <th className="p-3">%YoY (Q3)</th>
                                    <th className="p-3 rounded-tr-lg text-center">Xu hướng</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-300 divide-y divide-[#1c1c1e]">
                                <tr>
                                    <td className="text-left p-3 font-medium">Doanh thu thuần</td>
                                    <td className="p-3">35,000</td>
                                    <td className="p-3">33,000</td>
                                    <td className="p-3">31,000</td>
                                    <td className="p-3 text-[#00c853] font-bold">▲ +18.6%</td>
                                    <td className="p-3 flex justify-center items-end gap-0.5 h-full pt-4">
                                        <div className="w-1 h-3 bg-[#2c2c2e]"></div>
                                        <div className="w-1 h-4 bg-[#2c2c2e]"></div>
                                        <div className="w-1 h-6 bg-[#00c853]"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-left p-3 font-medium">Lợi nhuận gộp</td>
                                    <td className="p-3">6,000</td>
                                    <td className="p-3">5,000</td>
                                    <td className="p-3">4,500</td>
                                    <td className="p-3 text-[#00c853] font-bold">▲ +20%</td>
                                    <td className="p-3 text-center text-[10px] text-gray-500">Biên lãi tăng</td>
                                </tr>
                                <tr className="bg-[#1a1f26]/50">
                                    <td className="text-left p-3 font-bold text-white">LNST (Lãi ròng)</td>
                                    <td className="p-3 font-bold text-[#00c853]">3,500</td>
                                    <td className="p-3">2,800</td>
                                    <td className="p-3">2,500</td>
                                    <td className="p-3 text-[#00c853] font-bold">▲ +25%</td>
                                    <td className="p-3 flex justify-center items-end gap-0.5 h-full pt-4">
                                        <div className="w-1 h-3 bg-[#2c2c2e]"></div>
                                        <div className="w-1 h-4 bg-[#2c2c2e]"></div>
                                        <div className="w-1 h-6 bg-[#00c853]"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Health Section */}
                    <div>
                        <h3 className="text-sm font-bold text-white mb-4">3. Sức khỏe tài chính</h3>
                        <div className="flex gap-4">
                            <div className="flex-1 bg-[#13171b] border border-[#2c2c2e] p-4 rounded-lg flex items-center justify-between">
                                <span className="text-xs text-gray-400">Nợ vay / VCSH</span>
                                <span className="text-[#00c853] font-bold text-sm">0.8 (An toàn)</span>
                            </div>
                            <div className="flex-1 bg-[#13171b] border border-[#2c2c2e] p-4 rounded-lg flex items-center justify-between">
                                <span className="text-xs text-gray-400">Dòng tiền HĐKD</span>
                                <div className="text-right">
                                    <span className="text-[#f23645] font-bold text-sm">(500) Tỷ [Âm]</span>
                                    <div className="text-[9px] text-[#f23645] flex items-center gap-1 justify-end mt-1">
                                        <AlertTriangle size={8} /> AI: Lãi nằm ở khoản phải thu
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 3 & 4: NEWS & HOLDERS (SPLIT) */}
            {(activeTab === 'news' || activeTab === 'holders') && (
                <div className="flex h-full">
                    {/* List Column */}
                    <div className="w-[40%] border-r border-[#1c1c1e] bg-[#13171b] overflow-y-auto custom-scrollbar">
                        {activeTab === 'news' ? (
                            <div className="divide-y divide-[#2c2c2e]">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="p-4 hover:bg-[#1a1f26] cursor-pointer transition-colors group">
                                        <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                                            <span>10:3{i} - CafeF</span>
                                            <span className="text-[#00c853] font-bold">🟢 Tích cực</span>
                                        </div>
                                        <h4 className="text-sm font-bold text-gray-200 group-hover:text-white leading-snug">
                                            HPG lãi kỷ lục 3.500 tỷ, vượt xa dự báo của giới phân tích...
                                        </h4>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-4">
                                <div className="flex items-center gap-4 mb-6">
                                    <PieChart size={40} className="text-[#2962ff]" />
                                    <div>
                                        <div className="text-xs text-gray-400">Cô đặc</div>
                                        <div className="text-xl font-bold text-white">65%</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400">Room ngoại</div>
                                        <div className="text-xl font-bold text-white">15%</div>
                                    </div>
                                </div>
                                <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Giao dịch nội bộ</h4>
                                <div className="space-y-3">
                                    <div className="bg-[#1a1f26] p-3 rounded border border-[#2c2c2e]">
                                        <div className="text-xs font-bold text-white">Nguyễn Văn A (HĐQT)</div>
                                        <div className="flex justify-between mt-1 text-[11px]">
                                            <span className="text-[#00c853]">Mua 500k</span>
                                            <span className="text-gray-500">10/01/2025</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Detail Column */}
                    <div className="w-[60%] bg-[#0b0e11] p-6 overflow-y-auto custom-scrollbar">
                        {activeTab === 'news' ? (
                            <div>
                                <div className="bg-[#1a1f26] border border-[#2c2c2e] rounded-lg p-4 mb-6">
                                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#00c853]">
                                        <SparklesIcon /> AI Sentiment: TÍCH CỰC (+3) | Tác động: CAO
                                    </div>
                                    <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#00c853]" style={{width: '80%'}}></div>
                                    </div>
                                </div>
                                
                                <h3 className="text-sm font-bold text-white mb-3">TÓM TẮT THÔNG MINH (KEY TAKEAWAYS):</h3>
                                <ul className="space-y-2">
                                    <li className="flex gap-2 text-sm text-gray-300">
                                        <span className="text-[#2962ff]">•</span> Sự kiện: Lợi nhuận vượt dự báo 15% nhờ hoàn nhập dự phòng.
                                    </li>
                                    <li className="flex gap-2 text-sm text-gray-300">
                                        <span className="text-[#2962ff]">•</span> Động lực: Giá vốn than cốc giảm sâu giúp biên lợi nhuận cải thiện.
                                    </li>
                                    <li className="flex gap-2 text-sm text-gray-300">
                                        <span className="text-[#2962ff]">•</span> Rủi ro: Sản lượng tiêu thụ thép xây dựng giảm nhẹ do mùa mưa.
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div>
                                <div className="bg-[#1a1f26] border border-[#2c2c2e] rounded-lg p-4 mb-6">
                                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-yellow-500">
                                        <SparklesIcon /> AI Detect: TÍN HIỆU TRÁI CHIỀU
                                    </div>
                                    <p className="text-[11px] text-gray-400">
                                        Mâu thuẫn giữa việc HĐQT mua vào nhưng người nhà lại bán ra lượng tương ứng. Có thể là nghiệp vụ sang tay.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-xs font-bold text-white">A</div>
                                        <div>
                                            <div className="text-sm font-bold text-white">Nguyễn Văn A (HĐQT)</div>
                                            <div className="text-xs text-[#00c853]">Đăng ký mua 500k</div>
                                            <div className="text-[10px] text-gray-500">Mục đích: Tăng tỷ lệ sở hữu</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-xs font-bold text-white">B</div>
                                        <div>
                                            <div className="text-sm font-bold text-white">Trần Thị B (Vợ ông A)</div>
                                            <div className="text-xs text-[#f23645]">Đăng ký bán 500k</div>
                                            <div className="text-[10px] text-gray-500">Mục đích: Nhu cầu cá nhân</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>

        {/* III. TRADING TICKET OVERLAY */}
        {showTicket && <TradingTicket symbol={symbol} onClose={() => setShowTicket(false)} />}

      </div>
    </div>
  );
};
