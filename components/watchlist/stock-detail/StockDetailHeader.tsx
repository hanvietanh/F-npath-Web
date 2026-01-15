
import React from 'react';
import { Bot, Bell, Zap, X, TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

interface StockDetailHeaderProps {
    symbol: string;
    onClose: () => void;
    onAskCopilot: () => void;
}

export const StockDetailHeader: React.FC<StockDetailHeaderProps> = ({ symbol, onClose, onAskCopilot }) => {
    const ticker = symbol || "HPG";
    
    // Mock Data based on user request/screenshot context
    const data = {
        price: 28.50,
        change: 0.65,
        changePercent: 2.3,
        open: 28.00,
        high: 28.60,
        low: 27.90,
        volume: '35,102,400',
        marketCap: '205,900',
        foreignBuy: '150.2',
        foreignSell: '45.1',
        exchange: 'HOSE',
        sector: 'Thép'
    };

    return (
        <header className="h-[60px] bg-[#151a21] border-b border-gray-800 flex items-center justify-between px-4 shrink-0 gap-4">
          {/* Left: Ticker Identity & Main Price */}
          <div className="flex flex-col justify-center min-w-fit">
            <div className="flex items-baseline gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tighter leading-none">{ticker}</h1>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#2c2c2e] text-gray-400 border border-gray-700">{data.exchange}</span>
              <span className="text-[10px] font-medium text-gray-500 uppercase">{data.sector}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl font-bold text-emerald-500 leading-none">{data.price.toFixed(2)}</span>
              <div className="flex items-center gap-1 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                 <TrendingUp size={10} className="text-emerald-500" />
                 <span className="text-[11px] font-bold text-emerald-500">+{data.change} (+{data.changePercent}%)</span>
              </div>
            </div>
          </div>

          {/* Middle: Market Stats Grid */}
          <div className="hidden lg:flex items-center gap-6 px-6 border-l border-gray-800 h-3/4">
              
              {/* OHLC & Vol */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[10px]">
                  <div className="flex items-center justify-between gap-3 min-w-[100px]">
                      <span className="text-gray-500">Mở cửa</span>
                      <span className="font-mono font-bold text-yellow-500">{data.open.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 min-w-[100px]">
                      <span className="text-gray-500">Cao nhất</span>
                      <span className="font-mono font-bold text-emerald-500">{data.high.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 min-w-[100px]">
                      <span className="text-gray-500">Thấp nhất</span>
                      <span className="font-mono font-bold text-red-500">{data.low.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 min-w-[100px]">
                      <span className="text-gray-500">Tổng KL</span>
                      <span className="font-mono font-bold text-white">{data.volume}</span>
                  </div>
              </div>

              <div className="w-px h-full bg-gray-800"></div>

              {/* Fundamental & Foreign */}
              <div className="grid grid-cols-1 gap-y-1 text-[10px]">
                   <div className="flex items-center justify-between gap-3 min-w-[120px]">
                      <span className="text-gray-500 flex items-center gap-1"><DollarSign size={10} /> Vốn hóa</span>
                      <span className="font-mono font-bold text-gray-300">{data.marketCap} Tỷ</span>
                   </div>
                   <div className="flex items-center gap-3">
                       <span className="text-gray-500 flex items-center gap-1"><Activity size={10} /> NN Mua/Bán</span>
                       <div className="flex gap-1 font-mono font-bold">
                           <span className="text-emerald-500">{data.foreignBuy}</span>
                           <span className="text-gray-600">/</span>
                           <span className="text-red-500">{data.foreignSell}</span>
                           <span className="text-gray-500 text-[9px] font-normal ml-0.5">Tỷ</span>
                       </div>
                   </div>
              </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 ml-auto">
            <button 
              onClick={onAskCopilot}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:scale-105 transition-all border border-blue-400/30 text-xs"
            >
              <Bot size={14} /> 
              <span>Hỏi Copilot</span>
            </button>
            
            <div className="flex gap-1">
              <button className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded font-bold transition shadow-[0_0_10px_rgba(16,185,129,0.3)] text-xs uppercase tracking-wider">
                <Zap size={12} fill="white" /> Mua
              </button>
              <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 rounded font-bold transition text-xs uppercase tracking-wider">
                Bán
              </button>
            </div>
            
            <div className="h-5 w-px bg-gray-700 mx-1"></div>
            
            <button onClick={onClose} className="p-1.5 hover:bg-[#2c2c2e] hover:text-white rounded-full transition text-gray-400">
                <X size={20} />
            </button>
          </div>
        </header>
    );
};
