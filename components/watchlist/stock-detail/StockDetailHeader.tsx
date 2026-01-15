
import React from 'react';
import { Bot, X, Zap } from 'lucide-react';

interface StockDetailHeaderProps {
    symbol: string;
    onClose: () => void;
    onAskCopilot: () => void;
}

export const StockDetailHeader: React.FC<StockDetailHeaderProps> = ({ symbol, onClose, onAskCopilot }) => {
    const ticker = symbol || "HPG";
    const companyName = "Công ty CP Tập đoàn Hòa Phát";
    
    // Mock Data
    const data = {
        price: 28.50,
        change: 0.65,
        changePercent: 2.3,
        ref: 27.25,
        ceiling: 29.15,
        floor: 25.35,
        open: 27.50,
        highest: 28.60,
        lowest: 27.40,
        totalVol: '53.9M',
        tradeVal: '1,469B',
        foreignBuy: '12.5B', 
        foreignSell: '236B',
        exchange: 'HOSE'
    };

    const isUp = data.change >= 0;
    const colorClass = isUp ? 'text-[#00c853]' : 'text-[#f23645]';

    return (
        <header className="h-[60px] bg-[#0b0e11] border-b border-[#2c2c2e] flex items-center px-4 shrink-0 font-sans justify-between">
          
          {/* LEFT: All Info Grouped & Left Aligned */}
          <div className="flex items-center gap-6 flex-1 overflow-hidden">
              
              {/* 1. Ticker & Price Block */}
              <div className="flex items-center gap-4 shrink-0">
                  <div className="flex flex-col justify-center">
                      <div className="flex items-baseline gap-2">
                          <h1 className="text-2xl font-extrabold text-white tracking-tighter leading-none">{ticker}</h1>
                          <span className="text-[10px] text-gray-400 font-bold bg-[#1c1c1e] px-1 rounded border border-[#2c2c2e]">{data.exchange}</span>
                      </div>
                      <div className="text-[9px] text-gray-500 font-medium truncate max-w-[150px] mt-0.5">
                          {companyName}
                      </div>
                  </div>

                  {/* Price Display */}
                  <div className="flex flex-col justify-center">
                      <div className="flex items-baseline gap-2">
                          <span className={`text-2xl font-bold ${colorClass} tracking-tight`}>
                              {data.price.toFixed(2)}
                          </span>
                          <div className="flex gap-1 text-[11px] font-bold leading-none">
                              <span className={colorClass}>{data.change > 0 ? '+' : ''}{data.change.toFixed(2)}</span>
                              <span className={colorClass}>({data.changePercent.toFixed(2)}%)</span>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Vertical Divider */}
              <div className="w-px h-8 bg-[#2c2c2e] shrink-0"></div>

              {/* 2. Stats Clusters (Left Aligned) */}
              <div className="flex items-center gap-6 text-[10px]">
                  
                  {/* Cluster A: Volume */}
                  <div className="flex flex-col gap-0.5 min-w-fit">
                      <div className="flex items-center gap-3 justify-between">
                          <span className="text-gray-500">Tổng KL</span>
                          <span className="text-white font-mono font-bold">{data.totalVol}</span>
                      </div>
                      <div className="flex items-center gap-3 justify-between">
                          <span className="text-gray-500">Giá trị</span>
                          <span className="text-white font-mono font-bold">{data.tradeVal}</span>
                      </div>
                  </div>

                  {/* Cluster B: Range */}
                  <div className="flex flex-col gap-0.5 min-w-fit border-l border-[#2c2c2e] pl-4">
                      <div className="flex items-center gap-3 justify-between">
                          <span className="text-gray-500">Cao/Thấp</span>
                          <span className="text-white font-mono font-medium">{data.highest.toFixed(2)} / {data.lowest.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-3 justify-between">
                          <span className="text-gray-500">Mở cửa</span>
                          <span className={`${colorClass} font-mono font-medium`}>{data.open.toFixed(2)}</span>
                      </div>
                  </div>

                  {/* Cluster C: Limits */}
                  <div className="flex flex-col gap-0.5 min-w-fit border-l border-[#2c2c2e] pl-4">
                      <div className="flex items-center gap-2">
                          <span className="text-gray-500 w-4">TC</span>
                          <span className="text-[#eab308] font-mono font-bold">{data.ref.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <span className="text-[#d946ef] font-mono font-bold">{data.ceiling.toFixed(2)}</span>
                          <span className="text-gray-600 text-[8px]">|</span>
                          <span className="text-[#0ea5e9] font-mono font-bold">{data.floor.toFixed(2)}</span>
                      </div>
                  </div>

                  {/* Cluster D: Foreign */}
                  <div className="flex flex-col gap-0.5 min-w-fit border-l border-[#2c2c2e] pl-4">
                      <div className="flex items-center gap-2 justify-between">
                          <span className="text-gray-500">NN Mua</span>
                          <span className="text-[#00c853] font-mono font-bold">{data.foreignBuy}</span>
                      </div>
                      <div className="flex items-center gap-2 justify-between">
                          <span className="text-gray-500">NN Bán</span>
                          <span className="text-[#f23645] font-mono font-bold">{data.foreignSell}</span>
                      </div>
                  </div>

              </div>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-2 shrink-0 ml-4">
            <button className={`
                h-8 px-3 rounded font-bold text-xs text-white transition-all shadow-lg flex items-center gap-1.5
                ${isUp ? 'bg-[#2962ff] hover:bg-[#1e4bd8]' : 'bg-[#f23645] hover:bg-[#d50000]'}
            `}>
                <Zap size={14} className="fill-white" />
                Giao dịch
            </button>

            <button 
              onClick={onAskCopilot}
              className="flex items-center justify-center w-8 h-8 bg-[#2962ff]/10 text-[#2962ff] rounded hover:bg-[#2962ff] hover:text-white transition-all border border-[#2962ff]/30"
              title="Hỏi Copilot"
            >
              <Bot size={16} />
            </button>
            
            <button onClick={onClose} className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-white hover:bg-[#2c2c2e] rounded transition-colors">
                <X size={18} />
            </button>
          </div>
        </header>
    );
};
