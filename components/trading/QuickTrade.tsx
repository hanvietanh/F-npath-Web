import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const DraggableWidget: React.FC<{
    initialX: number;
    initialY: number;
    children: React.ReactNode;
    className?: string;
}> = ({ initialX, initialY, children, className }) => {
    const [pos, setPos] = useState({ x: initialX, y: initialY });
    const [dragging, setDragging] = useState(false);
    const [rel, setRel] = useState({ x: 0, y: 0 });

    const onMouseDown = (e: React.MouseEvent) => {
        if (e.button !== 0) return; // Only left mouse button
        setDragging(true);
        setRel({
            x: e.clientX - pos.x,
            y: e.clientY - pos.y
        });
        e.preventDefault();
        e.stopPropagation();
    };

    useEffect(() => {
        if (dragging) {
            const onMouseMove = (e: MouseEvent) => {
                setPos({
                    x: e.clientX - rel.x,
                    y: e.clientY - rel.y
                });
                e.stopPropagation();
                e.preventDefault();
            };
            const onMouseUp = () => {
                setDragging(false);
            };
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
            return () => {
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
            };
        }
    }, [dragging, rel]);

    return (
        <div 
            onMouseDown={onMouseDown}
            style={{ left: pos.x, top: pos.y }}
            className={`absolute z-30 cursor-grab active:cursor-grabbing select-none ${className || ''}`}
        >
            {children}
        </div>
    );
};

export const MarketQuickTrade = ({ onClose }: { onClose?: () => void }) => {
    return (
        <div className="relative group">
            <button 
                onClick={(e) => { e.stopPropagation(); onClose?.(); }}
                onMouseDown={(e) => e.stopPropagation()} 
                className="absolute -top-2.5 -right-2.5 w-5 h-5 bg-[#2c2c2e] hover:bg-[#f23645] text-gray-400 hover:text-white rounded-full border border-[#1c1c1e] flex items-center justify-center shadow-md z-50 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"
            >
                <X size={12} strokeWidth={2.5} />
            </button>
            <div className="flex bg-[#1c1c1e] border border-[#2c2c2e] rounded-md overflow-hidden shadow-2xl shadow-black/80">
                {/* Buy Button */}
                <div className="flex flex-col justify-center px-4 py-2 bg-[#00c853] hover:bg-[#00e676] active:bg-[#00c853] transition-colors cursor-pointer min-w-[120px] group/buy border-r border-[#000]/20">
                    <span className="text-[10px] font-bold text-white/90 uppercase mb-0.5">Thị trường-mua</span>
                    <span className="text-sm font-bold text-white group-active/buy:scale-95 transition-transform">87.539,2</span>
                </div>

                {/* Input Section */}
                <div className="flex flex-col justify-center px-3 py-1 bg-[#1a1f26] min-w-[140px]">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[9px] text-gray-400">Số lượng (CP)</span>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Nhập số tiền" 
                        className="w-full bg-[#13171b] text-xs text-white px-2 py-1 rounded border border-[#2c2c2e] focus:border-[#2962ff] focus:outline-none text-right"
                        defaultValue="1,000"
                    />
                </div>

                {/* Sell Button */}
                <div className="flex flex-col justify-center px-4 py-2 bg-[#f23645] hover:bg-[#ff5252] active:bg-[#f23645] transition-colors cursor-pointer min-w-[120px] group/sell border-l border-[#000]/20 text-right">
                    <span className="text-[10px] font-bold text-white/90 uppercase mb-0.5">Thị trường-bán</span>
                    <span className="text-sm font-bold text-white group-active/sell:scale-95 transition-transform">87.539,1</span>
                </div>
            </div>
        </div>
    );
};

export const LimitQuickTrade = ({ onClose }: { onClose?: () => void }) => {
    return (
        <div className="flex flex-col bg-[#1c1c1e] border border-[#2c2c2e] rounded-md overflow-hidden w-[220px] shadow-2xl shadow-black/80">
             {/* Header Handle */}
             <div className="h-1 bg-gray-700 w-full mb-1 cursor-grab active:cursor-grabbing"></div>
             
             <div className="px-3 pb-3 pt-1">
                 <div className="flex items-center justify-between mb-2">
                     <span className="text-[10px] text-gray-400 font-bold uppercase">Giới hạn - Bán</span>
                     <X 
                        size={14} 
                        className="text-gray-500 hover:text-white cursor-pointer hover:bg-[#2a2e39] rounded p-0.5 transition-colors" 
                        onClick={(e) => { e.stopPropagation(); onClose?.(); }}
                        onMouseDown={(e) => e.stopPropagation()} 
                     />
                 </div>

                 {/* Inputs */}
                 <div className="space-y-2 mb-3">
                     <div>
                         <div className="text-[9px] text-gray-500 mb-0.5">Số lượng</div>
                         <div className="flex items-center bg-[#13171b] border border-[#2c2c2e] rounded">
                             <input type="text" defaultValue="0.5" className="w-full bg-transparent text-xs text-white px-2 py-1.5 focus:outline-none text-right" />
                             <span className="text-[9px] text-gray-500 pr-2">BTC</span>
                         </div>
                     </div>
                     <div>
                         <div className="text-[9px] text-gray-500 mb-0.5">Giá đặt</div>
                         <div className="flex items-center bg-[#13171b] border border-[#2c2c2e] rounded">
                             <input type="text" defaultValue="101,588.7" className="w-full bg-transparent text-xs text-white px-2 py-1.5 focus:outline-none text-right" />
                             <span className="text-[9px] text-gray-500 pr-2">USDT</span>
                         </div>
                     </div>
                 </div>

                 {/* Percentages */}
                 <div className="flex justify-between gap-1 mb-3">
                     {['10%', '20%', '50%', '100%'].map(p => (
                         <button key={p} className="flex-1 bg-[#2a2e39] hover:bg-[#363c4a] text-[9px] text-gray-300 py-1 rounded transition-colors border border-[#1c1c1e]">
                             {p}
                         </button>
                     ))}
                 </div>

                 {/* Action Button */}
                 <button className="w-full bg-[#f23645] hover:bg-[#ff5252] text-white py-2 rounded font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-900/20 active:translate-y-0.5 transition-all">
                     <span>Bán Ngay</span>
                 </button>
                 <div className="text-[9px] text-gray-500 text-center mt-1.5 font-mono">15:07:18</div>
             </div>
        </div>
    );
};