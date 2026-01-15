
import React from 'react';
import { Bot, Bell, Zap, X } from 'lucide-react';

interface StockDetailHeaderProps {
    symbol: string;
    onClose: () => void;
    onAskCopilot: () => void;
}

export const StockDetailHeader: React.FC<StockDetailHeaderProps> = ({ symbol, onClose, onAskCopilot }) => {
    const ticker = symbol || "HPG";
    return (
        <header className="h-12 bg-[#151a21] border-b border-gray-800 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-6">
            <div className="flex items-baseline gap-2">
              <h1 className="text-2xl font-bold text-white tracking-tighter">{ticker}</h1>
              <span className="text-xl font-bold text-emerald-500">28.50</span>
              <div className="flex flex-col text-[10px] leading-3">
                <span className="text-emerald-500">▲ +0.65</span>
                <span className="text-emerald-500">+2.3%</span>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex flex-col">
              <span className="text-gray-400 text-[10px]">Tổng KL</span>
              <span className="text-white font-mono font-bold">35,102,400</span>
            </div>
            <div className="hidden md:block px-2 py-0.5 rounded bg-yellow-900/30 text-yellow-500 border border-yellow-700/50 text-[10px] font-bold">
              Đột biến KL
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onAskCopilot}
              className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:scale-105 transition border border-blue-400/30"
            >
              <Bot size={14} /> Hỏi Copilot
            </button>
            <div className="h-4 w-px bg-gray-700 mx-1"></div>
            <button className="p-2 hover:bg-gray-700 rounded-full transition text-gray-400"><Bell size={16} /></button>
            <div className="flex gap-1 ml-2">
              <button className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded font-bold transition shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                <Zap size={14} /> MUA
              </button>
              <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 rounded font-bold transition">
                BÁN
              </button>
            </div>
            <button onClick={onClose} className="ml-2 p-1.5 hover:bg-red-500/20 hover:text-red-500 rounded-full transition text-gray-400">
                <X size={20} />
            </button>
          </div>
        </header>
    );
};
