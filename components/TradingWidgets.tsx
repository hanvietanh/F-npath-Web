import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  ChevronUp, 
  X, 
  RefreshCw, 
  MoreVertical, 
  BookOpen, 
  Briefcase, 
  DollarSign, 
  History, 
  Minus, 
  PlusCircle, 
} from 'lucide-react';

export const ToolbarButton = ({ icon: Icon, active = false }: { icon: any, active?: boolean }) => (
  <button className={`p-2 rounded hover:bg-[#2a2e39] transition-colors ${active ? 'text-[#2962ff]' : 'text-gray-400'}`}>
    <Icon size={18} strokeWidth={1.5} />
  </button>
);

export const TopBarButton = ({ label, icon: Icon, active = false, hasDropdown = false }: { label?: string, icon?: any, active?: boolean, hasDropdown?: boolean }) => (
  <button className={`h-8 px-2 flex items-center gap-1 rounded hover:bg-[#2a2e39] transition-colors ${active ? 'text-[#2962ff]' : 'text-gray-300'} text-xs font-medium`}>
    {Icon && <Icon size={16} strokeWidth={1.5} />}
    {label && <span>{label}</span>}
    {hasDropdown && <ChevronDown size={12} className="opacity-70 ml-0.5" />}
  </button>
);

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

export const OrderPlacementPanel = () => (
  <div className="w-full bg-[#000000] border-b border-[#1c1c1e] shadow-lg z-20 font-sans text-sm overflow-hidden animate-in slide-in-from-top-2 duration-300">
    {/* Buy/Sell Tabs */}
    <div className="flex border-b border-[#1c1c1e]">
        <button className="flex-1 py-3 text-sm font-bold text-gray-400 bg-[#121212] hover:bg-[#1c1c1e] border-r border-[#1c1c1e]">Mua</button>
        <button className="flex-1 py-3 text-sm font-bold text-white bg-[#f23645] relative overflow-hidden">
            <span className="relative z-10">Bán</span>
            <div className="absolute top-0 right-0 w-8 h-8 bg-white/10 -rotate-45 transform translate-x-4 -translate-y-4"></div>
        </button>
    </div>

    {/* Content */}
    <div className="p-4 bg-[#000000]">
       
       {/* Info Row */}
       <div className="flex justify-between items-center mb-4 text-xs">
           <div className="text-gray-400">Chọn Deal <span className="text-[#2962ff] font-bold ml-1">Vay</span> <span className="text-white ml-2">265.80</span></div>
           <div className="text-right">
               <div className="text-gray-400">Khối lượng <span className="text-white ml-1">5,000</span></div>
           </div>
           <div className="text-right text-[#00c853] font-bold">+800K (+3.5%)</div>
       </div>

       {/* Checkboxes Row (Mock) */}
       <div className="flex gap-4 mb-4">
           <div className="w-4 h-4 rounded-full border border-blue-500 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-blue-500"></div></div>
           <div className="w-4 h-4 rounded-full border border-gray-600"></div>
           <div className="w-4 h-4 rounded-full border border-gray-600"></div>
       </div>

       {/* Ký quỹ Toggle */}
       <div className="flex items-center justify-between mb-4">
           <span className="text-white font-bold">Ký quỹ</span>
           <div className="w-10 h-5 bg-[#2a2e39] rounded-full relative cursor-pointer">
               <div className="absolute left-1 top-1 w-3 h-3 bg-gray-500 rounded-full"></div>
           </div>
       </div>

       {/* Order Type Dropdown */}
       <div className="mb-3">
           <div className="w-full bg-[#1c1c1e] rounded-lg px-4 py-2.5 flex justify-between items-center text-white border border-[#2c2c2e]">
               <span>Lệnh ATO</span>
               <ChevronDown size={16} className="text-gray-400" />
           </div>
       </div>

       {/* Max Info */}
       <div className="flex justify-between text-[10px] text-gray-500 mb-2">
           <span>Mua Max: <span className="text-white">1,000</span> | Bán Max: <span className="text-white">3,000</span></span>
       </div>

       {/* Quantity Input */}
       <div className="flex items-center mb-3">
           <button className="w-10 h-10 bg-[#1c1c1e] rounded-l-lg border-y border-l border-[#2c2c2e] text-gray-400 flex items-center justify-center hover:text-white"><Minus size={16} /></button>
           <div className="flex-1 h-10 bg-[#121212] border-y border-[#2c2c2e] flex items-center justify-center text-white font-bold text-lg">5,000</div>
           <button className="w-10 h-10 bg-[#1c1c1e] rounded-r-lg border-y border-r border-[#2c2c2e] text-gray-400 flex items-center justify-center hover:text-white"><PlusCircle size={16} /></button>
       </div>

       {/* Percent Selectors */}
       <div className="flex gap-2 mb-4">
           {['25%', '50%', '75%', '100%'].map((p, i) => (
               <button key={p} className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${i === 1 ? 'bg-[#2962ff] text-white border-[#2962ff]' : 'bg-[#1c1c1e] text-gray-400 border-[#2c2c2e] hover:border-gray-500'}`}>
                   {p}
               </button>
           ))}
       </div>

       {/* Action Button */}
       <button className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#00c853] to-[#00e676] text-white font-bold text-base shadow-[0_0_15px_rgba(0,200,83,0.4)] hover:shadow-[0_0_25px_rgba(0,200,83,0.6)] transition-all">
           Mua VIC
       </button>
       
       <div className="flex justify-between mt-3 text-[10px] text-gray-400">
           <div className="flex items-center gap-1">TC <span className="text-yellow-500 font-bold">125.30</span></div>
           <div className="flex items-center gap-1">Trần <span className="text-purple-500 font-bold">125.30</span></div>
           <div className="flex items-center gap-1">Sàn <span className="text-blue-400 font-bold">125.30</span></div>
       </div>
    </div>
  </div>
);

export const BottomTradingPanel = ({ onClose }: { onClose: () => void }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={`flex flex-col bg-[#13171b] border-t border-[#1c1c1e] animate-in slide-in-from-bottom-10 duration-300 transition-[height] ease-in-out ${isCollapsed ? 'h-[32px]' : 'h-[300px]'}`}>
            {/* Header + Content (Hidden when collapsed) */}
            <div className={`flex-1 flex flex-col min-h-0 ${isCollapsed ? 'hidden' : 'flex'}`}>
                {/* Header / Tabs */}
                <div className="flex items-center justify-between px-2 h-9 bg-[#1a1f26] border-b border-[#1c1c1e]">
                    <div className="flex items-center">
                        <button className="w-8 flex items-center justify-center text-gray-400 hover:bg-[#2a2e39] h-9">
                            <ChevronRight size={16} />
                        </button>
                        <div className="flex space-x-1 ml-2">
                            <button className="px-3 py-1 text-xs font-bold text-gray-200 bg-[#2a2e39] rounded-t border-t border-x border-[#1c1c1e] relative top-[1px]">Tài sản</button>
                            <button className="px-3 py-1 text-xs font-medium text-gray-400 hover:text-white hover:bg-[#2a2e39]/50 rounded-t transition-colors">Nợ</button>
                            <button className="px-3 py-1 text-xs font-medium text-gray-400 hover:text-white hover:bg-[#2a2e39]/50 rounded-t transition-colors">Khoản vay</button>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                            <span className="opacity-70">18:11 24/12/25</span>
                        </div>
                        <div className="w-[1px] h-4 bg-[#2a2e39]"></div>
                        <div className="flex items-center gap-2">
                            <span>Tiểu khoản</span>
                            <span className="text-white font-medium flex items-center gap-1 cursor-pointer">Thường <ChevronDown size={12}/></span>
                        </div>
                        <div className="w-[1px] h-4 bg-[#2a2e39]"></div>
                        <RefreshCw size={14} className="cursor-pointer hover:text-white" />
                        <button onClick={onClose} className="hover:text-red-400 transition-colors ml-2"><X size={16} /></button>
                    </div>
                </div>

                {/* Content Table */}
                <div className="flex-1 overflow-auto bg-[#000000]">
                    <div className="flex items-center px-4 py-2 border-b border-[#1c1c1e] bg-[#13171b]">
                        <span className="text-sm font-semibold text-gray-200">Cổ phiếu</span>
                        <div className="flex-1"></div>
                        <MoreVertical size={16} className="text-gray-500 cursor-pointer" />
                    </div>
                    
                    <table className="w-full text-right text-xs border-collapse">
                        <thead className="bg-[#1a1f26] text-gray-400 sticky top-0 z-10">
                            <tr>
                                <th className="py-2 pl-4 text-left font-medium border-r border-[#1c1c1e]">Mã <span className="inline-block border border-gray-600 rounded px-1 text-[9px] ml-1">6</span></th>
                                <th className="py-2 px-2 font-medium border-r border-[#1c1c1e]">SL Tổng</th>
                                <th className="py-2 px-2 font-medium border-r border-[#1c1c1e]">Được GD</th>
                                <th className="py-2 px-2 font-medium border-r border-[#1c1c1e]">Giá vốn</th>
                                <th className="py-2 px-2 font-medium border-r border-[#1c1c1e]">Thị giá</th>
                                <th className="py-2 px-2 font-medium border-r border-[#1c1c1e]">% Thị giá</th>
                                <th className="py-2 px-2 font-medium border-r border-[#1c1c1e]">Chờ về</th>
                                <th className="py-2 px-2 font-medium border-r border-[#1c1c1e]">Giá trị vốn</th>
                                <th className="py-2 px-2 font-medium border-r border-[#1c1c1e]">Giá trị</th>
                                <th className="py-2 px-2 font-medium border-r border-[#1c1c1e]">Lãi/Lỗ</th>
                                <th className="py-2 pr-4 font-medium">% Lãi/Lỗ</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-200 divide-y divide-[#1c1c1e]">
                            {/* Totals Row */}
                            <tr className="bg-[#13171b] font-bold">
                                <td className="py-2 pl-4 text-left border-r border-[#1c1c1e]">Tổng</td>
                                <td className="py-2 px-2 border-r border-[#1c1c1e]"></td>
                                <td className="py-2 px-2 border-r border-[#1c1c1e]"></td>
                                <td className="py-2 px-2 border-r border-[#1c1c1e]"></td>
                                <td className="py-2 px-2 border-r border-[#1c1c1e]"></td>
                                <td className="py-2 px-2 border-r border-[#1c1c1e]"></td>
                                <td className="py-2 px-2 border-r border-[#1c1c1e]"></td>
                                <td className="py-2 px-2 border-r border-[#1c1c1e]">431,547,600</td>
                                <td className="py-2 px-2 border-r border-[#1c1c1e]">436,300,000</td>
                                <td className="py-2 px-2 border-r border-[#1c1c1e] text-[#00c853]">+4,752,400</td>
                                <td className="py-2 pr-4 text-[#00c853]">+1.1%</td>
                            </tr>
                            
                            {/* Stock Rows */}
                            {[
                                { symbol: 'CTG', qty: '2,200', avail: '1,531', cost: '26.59', market: '35.30', mktPct: '0.9%', pending: '0', valCost: '58,506,800', valMkt: '77,660,000', pl: '+19,153,200', plPct: '+32.7%', color: '#00c853' },
                                { symbol: 'CTR', qty: '700', avail: '700', cost: '91.21', market: '83.50', mktPct: '-0.6%', pending: '0', valCost: '63,849,800', valMkt: '58,450,000', pl: '-5,399,800', plPct: '-8.5%', color: '#f23645' },
                                { symbol: 'PHR', qty: '3,000', avail: '3,000', cost: '56.07', market: '56.30', mktPct: '-0.7%', pending: '0', valCost: '168,201,000', valMkt: '168,900,000', pl: '+699,000', plPct: '+0.4%', color: '#00c853' },
                            ].map((stock) => (
                                <tr key={stock.symbol} className="hover:bg-[#1a1f26] transition-colors group">
                                    <td className="py-2 pl-4 text-left font-bold border-r border-[#1c1c1e]">
                                        {stock.symbol} <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 ml-1"></span>
                                    </td>
                                    <td className="py-2 px-2 border-r border-[#1c1c1e] font-mono">{stock.qty}</td>
                                    <td className="py-2 px-2 border-r border-[#1c1c1e] font-mono">{stock.avail}</td>
                                    <td className="py-2 px-2 border-r border-[#1c1c1e] font-mono text-gray-400">{stock.cost}</td>
                                    <td className={`py-2 px-2 border-r border-[#1c1c1e] font-mono ${stock.symbol === 'CTR' || stock.symbol === 'PHR' ? 'text-[#f23645]' : 'text-[#00c853]'}`}>{stock.market}</td>
                                    <td className={`py-2 px-2 border-r border-[#1c1c1e] font-mono ${stock.symbol === 'CTR' || stock.symbol === 'PHR' ? 'text-[#f23645]' : 'text-[#00c853]'}`}>{stock.mktPct}</td>
                                    <td className="py-2 px-2 border-r border-[#1c1c1e] font-mono">{stock.pending}</td>
                                    <td className="py-2 px-2 border-r border-[#1c1c1e] font-mono text-gray-400">{stock.valCost}</td>
                                    <td className="py-2 px-2 border-r border-[#1c1c1e] font-mono">{stock.valMkt}</td>
                                    <td className={`py-2 px-2 border-r border-[#1c1c1e] font-mono ${stock.color === '#00c853' ? 'text-[#00c853]' : 'text-[#f23645]'}`}>{stock.pl}</td>
                                    <td className={`py-2 pr-4 font-mono ${stock.color === '#00c853' ? 'text-[#00c853]' : 'text-[#f23645]'}`}>{stock.plPct}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer Tabs (Always visible) */}
            <div 
                className="h-8 bg-[#13171b] border-t border-[#1c1c1e] flex items-center px-1 shrink-0 cursor-pointer hover:bg-[#1a1f26] transition-colors"
                onClick={() => isCollapsed && setIsCollapsed(false)}
            >
                 <button className="flex items-center gap-1.5 px-3 py-1 hover:bg-[#2a2e39] text-gray-400 text-xs rounded transition-colors" onClick={(e) => { e.stopPropagation(); setIsCollapsed(false); }}>
                     <BookOpen size={14} /> Sổ lệnh
                 </button>
                 <div className="w-[1px] h-4 bg-[#2a2e39] mx-1"></div>
                 <button className="flex items-center gap-1.5 px-3 py-1 bg-[#2a2e39] text-[#f23645] text-xs rounded transition-colors font-medium" onClick={(e) => { e.stopPropagation(); setIsCollapsed(false); }}>
                     <Briefcase size={14} /> Tài sản
                 </button>
                 <div className="w-[1px] h-4 bg-[#2a2e39] mx-1"></div>
                 <button className="flex items-center gap-1.5 px-3 py-1 hover:bg-[#2a2e39] text-gray-400 text-xs rounded transition-colors" onClick={(e) => { e.stopPropagation(); setIsCollapsed(false); }}>
                     <DollarSign size={14} /> Lãi/Lỗ
                 </button>
                 <div className="w-[1px] h-4 bg-[#2a2e39] mx-1"></div>
                 <button className="flex items-center gap-1.5 px-3 py-1 hover:bg-[#2a2e39] text-gray-400 text-xs rounded transition-colors" onClick={(e) => { e.stopPropagation(); setIsCollapsed(false); }}>
                     <History size={14} /> Lịch sử
                 </button>

                 <div className="flex-1"></div>

                 {/* Collapse/Expand Button */}
                 <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsCollapsed(!isCollapsed);
                    }}
                    className="p-1 hover:bg-[#2a2e39] text-gray-400 rounded mr-1 hover:text-white"
                 >
                    {isCollapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                 </button>
            </div>
        </div>
    );
};
