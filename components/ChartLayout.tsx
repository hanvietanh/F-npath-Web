import React, { useState, useEffect, useRef } from 'react';
import { 
  Crosshair, 
  MousePointer2, 
  Minus, 
  TrendingUp, 
  Type, 
  Pencil, 
  Smile, 
  Ruler, 
  ZoomIn, 
  Magnet, 
  Lock, 
  Trash2,
  ChevronDown,
  ChevronUp,
  Settings,
  Camera,
  Maximize,
  PlusCircle,
  BarChart2,
  FunctionSquare,
  MoreVertical,
  RefreshCw,
  Search,
  X,
  ChevronRight,
  PieChart,
  History,
  BookOpen,
  DollarSign,
  Briefcase,
  GripHorizontal,
  Sparkles,
  MoreHorizontal
} from 'lucide-react';
import { CandleChart } from './CandleChart';

// --- Mock Data for AI News ---
const AI_NEWS_ITEMS = [
  {
    id: 1,
    title: 'Cổ phiếu HPG',
    source: 'Vnexpress',
    time: '10 phút trước',
    content: 'Sản lượng thép cuộn cán nóng Q3/2025 tăng 71% so với cùng kỳ nhờ mở rộng công suất và cầu nội địa phục hồi. Tăng trưởng mạnh giúp tận dụng kinh tế quy mô, giảm chi phí đơn vị, cải thiện biên lợi nhuận. Xu hướng này củng cố vị thế dẫn đầu và tăng khả năng cạnh tranh trong ngành thép.',
    type: 'ai'
  },
  {
    id: 2,
    title: 'Chủ đề Nâng hạng',
    source: 'Duy Uptrend',
    time: '1 giờ trước',
    content: 'Nâng hạng thị trường thu hút dòng vốn ngoại từ quỹ lớn, cải thiện thanh khoản, nâng định giá cổ phiếu nhờ PE cao hơn, thúc đẩy minh bạch và quản trị, tăng uy tín quốc tế. Ngắn hạn có áp lực từ tiêu chuẩn cao, nhưng dài hạn tạo nền tảng phát triển bền vững, thu hẹp khoảng cách với thị trường phát triển.',
    type: 'user',
    avatar: 'https://i.pravatar.cc/150?u=duy'
  },
  {
    id: 3,
    title: 'Chủ đề Vingroup',
    source: 'CafeF',
    time: '10 phút trước',
    content: 'Cổ phiếu Vingroup tăng mạnh khi VN-Index vượt đỉnh lịch sử. Nhóm này là trụ cột, chiếm tỷ trọng lớn trong chỉ số. Động lực từ kỳ vọng nâng hạng thị trường, dòng tiền ngoại tăng và triển vọng phục hồi bất động sản. Thanh khoản cải thiện phản ánh tâm lý lạc quan với nhóm blue-chip.',
    type: 'ai'
  },
  {
    id: 4,
    title: 'Chủ đề VNINDEX',
    source: 'Tình báo chứng khoán',
    time: '10 phút trước',
    content: 'VN-Index lần đầu đóng cửa trên 1,700 điểm, hướng đến 1,800. Động lực từ kỳ vọng nâng hạng thị trường, dòng vốn ngoại tăng mạnh, tín dụng và GDP phục hồi. Thanh khoản cải thiện, blue-chip ngân hàng, bất động sản dẫn dắt. Rủi ro ngắn hạn từ định giá cao và chốt lời, nhưng xu hướng trung hạn tích cực.',
    type: 'user',
    avatar: 'https://i.pravatar.cc/150?u=vnindex'
  },
  {
    id: 5,
    title: 'Chủ đề Tỷ giá',
    source: 'Room Lý Phạm Stock',
    time: '10 phút trước',
    content: 'Tỷ giá 9/10 giảm với USD và NDT suy yếu do Fed nới lỏng chính sách, dòng vốn chuyển sang thị trường mới nổi, kích thích kinh tế Trung Quốc chưa hiệu quả. VNĐ được hỗ trợ nhờ xuất khẩu ổn định và dự trữ ngoại hối cải thiện. Xu hướng này giảm chi phí nhập khẩu, hỗ trợ doanh nghiệp phụ thuộc nguyên liệu ngoại.',
    type: 'user',
    avatar: 'https://i.pravatar.cc/150?u=tygia'
  }
];

const ToolbarButton = ({ icon: Icon, active = false }: { icon: any, active?: boolean }) => (
  <button className={`p-2 rounded hover:bg-[#2a2e39] transition-colors ${active ? 'text-[#2962ff]' : 'text-gray-400'}`}>
    <Icon size={18} strokeWidth={1.5} />
  </button>
);

const TopBarButton = ({ label, icon: Icon, active = false, hasDropdown = false }: { label?: string, icon?: any, active?: boolean, hasDropdown?: boolean }) => (
  <button className={`h-8 px-2 flex items-center gap-1 rounded hover:bg-[#2a2e39] transition-colors ${active ? 'text-[#2962ff]' : 'text-gray-300'} text-xs font-medium`}>
    {Icon && <Icon size={16} strokeWidth={1.5} />}
    {label && <span>{label}</span>}
    {hasDropdown && <ChevronDown size={12} className="opacity-70 ml-0.5" />}
  </button>
);

const OrderBookTable = () => (
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

// --- Draggable Widget Component ---
const DraggableWidget: React.FC<{
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

// --- Market Quick Trade Widget ---
const MarketQuickTrade = ({ onClose }: { onClose?: () => void }) => {
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

// --- Limit Sell Widget ---
const LimitQuickTrade = ({ onClose }: { onClose?: () => void }) => {
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

const OrderPlacementPanel = () => (
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

const BottomTradingPanel = ({ onClose }: { onClose: () => void }) => {
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

interface ChartLayoutProps {
  isTradeMode: boolean;
  onToggleTradeMode: (mode: boolean) => void;
  onOpenAiAssistant: () => void;
  aiNotificationCount: number;
}

export const ChartLayout: React.FC<ChartLayoutProps> = ({ isTradeMode, onToggleTradeMode, onOpenAiAssistant, aiNotificationCount }) => {
  const [showMarketWidget, setShowMarketWidget] = useState(true);
  const [showLimitWidget, setShowLimitWidget] = useState(true);
  const [sidebarTab, setSidebarTab] = useState('Chi tiết');

  return (
    <div className="flex h-full w-full bg-[#13171b]">
      {/* 1. Left Vertical Toolbar (Drawing Tools) */}
      <div className="w-[50px] flex-shrink-0 flex flex-col items-center py-2 gap-1 border-r border-[#1c1c1e] bg-[#13171b] z-10">
        <ToolbarButton icon={Crosshair} active />
        <div className="w-4 h-[1px] bg-[#1c1c1e] my-1" />
        <ToolbarButton icon={Minus} />
        <ToolbarButton icon={TrendingUp} />
        <ToolbarButton icon={FunctionSquare} />
        <ToolbarButton icon={Type} />
        <ToolbarButton icon={Pencil} />
        <ToolbarButton icon={Smile} />
        <ToolbarButton icon={Ruler} />
        <ToolbarButton icon={ZoomIn} />
        <div className="flex-1" />
        <ToolbarButton icon={Magnet} />
        <ToolbarButton icon={Lock} />
        <ToolbarButton icon={Trash2} />
      </div>

      {/* 2. Main Center Area (Chart + Bottom Panel) */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#000000]">
        {/* Top Horizontal Toolbar */}
        <div className="h-[46px] flex items-center px-2 gap-1 border-b border-[#1c1c1e] bg-[#13171b]">
           {/* Symbol Search Mock */}
           <div className="flex items-center gap-2 cursor-pointer hover:bg-[#2a2e39] px-2 py-1 rounded transition-colors mr-2">
              <span className="font-bold text-white text-sm">PHR</span>
              <PlusCircle size={14} className="text-gray-400" />
           </div>
           
           <div className="w-[1px] h-5 bg-[#1c1c1e] mx-1" />
           
           {/* Timeframes */}
           <TopBarButton label="D" active />
           <TopBarButton label="W" />
           <TopBarButton label="" icon={ChevronDown} />
           
           <div className="w-[1px] h-5 bg-[#1c1c1e] mx-1" />

           {/* Chart Type */}
           <TopBarButton icon={BarChart2} active hasDropdown />
           
           {/* Indicators */}
           <TopBarButton label="Các chỉ báo" icon={FunctionSquare} />
           <TopBarButton label="Biểu đồ" hasDropdown />
           
           <div className="flex-1" />

           {/* Trade Button (Toggles Both Panels) */}
           <button 
             onClick={() => onToggleTradeMode(!isTradeMode)}
             className={`
               bg-[#2962ff] hover:bg-[#1e4bd8] text-white text-xs font-bold px-4 py-1.5 rounded flex items-center gap-1 transition-colors mr-3 shadow-lg shadow-blue-900/20
               ${isTradeMode ? 'ring-2 ring-white/20' : ''}
             `}
           >
              Giao dịch
           </button>
           
           {/* Right side controls */}
           <div className="flex items-center gap-1">
             <TopBarButton label="VA_999999" hasDropdown />
             <TopBarButton icon={Settings} />
             <TopBarButton icon={Maximize} />
             <TopBarButton icon={Camera} />
           </div>
        </div>

        {/* Chart Canvas & Overlays */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
             <div className="flex-1 relative">
                 <CandleChart symbol="PHR" />

                 {/* Ask AI Floating Button */}
                 <div className="absolute bottom-10 right-10 z-20">
                    <div className="relative group">
                        <button 
                            onClick={onOpenAiAssistant}
                            className={`
                                flex items-center bg-[#2962ff] hover:bg-[#1e4bd8] text-white rounded-full p-3 
                                shadow-[0_0_20px_rgba(41,98,255,0.3)] transition-all duration-300 backdrop-blur-sm
                                ${aiNotificationCount > 0 ? 'opacity-100' : 'opacity-20 group-hover:opacity-100'}
                            `}
                        >
                            <Sparkles size={20} className="shrink-0" />
                            <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-300 font-bold text-sm whitespace-nowrap ml-0 group-hover:ml-2">
                                Hỏi AI
                            </span>
                        </button>
                        {aiNotificationCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#f23645] text-[10px] font-bold text-white shadow-sm ring-2 ring-[#000000]">
                                {aiNotificationCount}
                            </span>
                        )}
                    </div>
                 </div>
                 
                 {/* Draggable Quick Trade Widgets */}
                 {showMarketWidget && (
                    <DraggableWidget initialX={20} initialY={80}>
                        <MarketQuickTrade onClose={() => setShowMarketWidget(false)} />
                    </DraggableWidget>
                 )}

                 {showLimitWidget && (
                    <DraggableWidget initialX={window.innerWidth - 650} initialY={window.innerHeight - 500}>
                        <LimitQuickTrade onClose={() => setShowLimitWidget(false)} />
                    </DraggableWidget>
                 )}
             </div>
             {/* Bottom Panel (Assets) */}
             {isTradeMode && <BottomTradingPanel onClose={() => onToggleTradeMode(false)} />}
        </div>
      </div>

      {/* 3. Right Sidebar (Details & Order Book) */}
      <div className="w-[340px] flex-shrink-0 border-l border-[#1c1c1e] bg-[#13171b] flex flex-col transition-all duration-300">
         
         {/* Order Placement Panel (Inserted at Top when active) */}
         {isTradeMode && <OrderPlacementPanel />}

         {/* Tabs */}
         <div className="flex h-10 border-b border-[#1c1c1e] flex-shrink-0">
            {['Chi tiết', 'AI News', 'Theo dõi', 'Chỉ số'].map((tab, i) => (
                <button 
                    key={tab} 
                    onClick={() => setSidebarTab(tab)}
                    className={`flex-1 text-xs font-semibold uppercase tracking-wide hover:bg-[#1e2329] transition-colors
                    ${sidebarTab === tab ? 'text-[#2962ff] border-b-2 border-[#2962ff] bg-[#1e2329]' : 'text-gray-500'}`}
                >
                    {tab}
                </button>
            ))}
         </div>

         {/* Conditional Content based on Active Tab */}
         {sidebarTab === 'Chi tiết' ? (
             <>
                 {/* Stock Header */}
                 <div className="p-4 border-b border-[#1c1c1e] flex-shrink-0 bg-[#13171b]">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-white">VIC</span>
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#1c1c1e] border border-[#2c2c2e] text-gray-300">HOSE</span>
                        </div>
                        <div className="text-2xl font-bold text-[#00c853]">150.04</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-[10px] text-gray-500">Vingroup Corporation</div>
                        <div className="text-sm font-bold text-[#00c853]">+1.04 (+3.88%)</div>
                    </div>
                 </div>

                 {/* Order Book Section - Flex-1 to scroll */}
                 <div className="flex-1 overflow-y-auto bg-[#13171b]">
                     {/* Order Table */}
                     <OrderBookTable />

                     <div className="h-2 bg-[#000000]" /> {/* Spacer */}

                     {/* Match History (Khớp lệnh) */}
                     <div className="p-3 bg-[#13171b]">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-gray-200">Khớp lệnh</span>
                            <BarChart2 size={14} className="text-gray-500" />
                        </div>
                        
                        <table className="w-full text-right">
                            <thead className="text-[10px] text-gray-500 uppercase font-medium">
                                <tr>
                                    <th className="pb-2 text-left">Thời gian</th>
                                    <th className="pb-2">Giá</th>
                                    <th className="pb-2">+/-</th>
                                    <th className="pb-2">Khối lượng</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs font-mono">
                                {[
                                    { time: '14:45:00', price: '150.04', change: '+1.04', vol: '11,300', type: 'buy' },
                                    { time: '14:29:21', price: '150.00', change: '+1.00', vol: '200', type: 'sell' },
                                    { time: '14:28:56', price: '150.00', change: '+1.00', vol: '200', type: 'buy' },
                                    { time: '14:26:34', price: '149.90', change: '+0.90', vol: '500', type: 'buy' },
                                    { time: '14:24:21', price: '149.90', change: '+0.90', vol: '1,800', type: 'buy' },
                                    { time: '14:23:36', price: '149.80', change: '+0.80', vol: '400', type: 'buy' },
                                    { time: '14:23:01', price: '149.50', change: '+0.50', vol: '400', type: 'sell' },
                                    { time: '14:20:38', price: '149.50', change: '+0.50', vol: '6,000', type: 'sell' },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-[#1c1c1e] transition-colors cursor-pointer group">
                                        <td className="py-1.5 text-left text-gray-400">{row.time}</td>
                                        <td className={`py-1.5 font-medium ${row.type === 'buy' ? 'text-[#00c853]' : 'text-[#f23645]'}`}>{row.price}</td>
                                        <td className={`py-1.5 ${row.type === 'buy' ? 'text-[#00c853]' : 'text-[#f23645]'}`}>{row.change}</td>
                                        <td className={`py-1.5 ${row.type === 'buy' ? 'text-[#00c853]' : 'text-[#f23645]'}`}>{row.vol}</td>
                                        <td className="py-1.5 pl-1 text-[9px] font-bold">{row.type === 'buy' ? 'M' : 'B'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                     </div>
                     
                     {/* Bottom Summary Mock */}
                     <div className="mt-4 px-3 py-2 border-t border-[#1c1c1e] text-xs space-y-2 bg-[#13171b]">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Tổng KL khớp</span>
                            <span className="font-bold text-white">1,654 M</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">KL Mua chủ động</span>
                            <span className="font-bold text-[#00c853]">906.2k</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">KL Bán chủ động</span>
                            <span className="font-bold text-[#f23645]">748.4k</span>
                        </div>
                     </div>
                 </div>
             </>
         ) : sidebarTab === 'AI News' ? (
             <div className="flex-1 overflow-y-auto bg-[#13171b] p-3 space-y-3 custom-scrollbar">
                 {AI_NEWS_ITEMS.map((item) => (
                    <div key={item.id} className="bg-[#1a1f26] border border-[#2c2c2e] rounded-lg p-3 hover:border-gray-600 transition-colors cursor-pointer group">
                        <div className="flex items-start gap-3 mb-2">
                             {item.type === 'ai' ? (
                                 <div className="w-9 h-9 rounded-full bg-[#2962ff] flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/20">
                                     <Sparkles size={18} className="text-white" />
                                 </div>
                             ) : (
                                 <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-[#2c2c2e]">
                                     <img src={item.avatar} alt={item.source} className="w-full h-full object-cover" />
                                 </div>
                             )}
                             <div className="flex-1 min-w-0">
                                 <div className="flex justify-between items-start">
                                     <h4 className="text-sm font-bold text-[#2962ff] truncate pr-2 group-hover:underline">{item.title}</h4>
                                     <MoreHorizontal size={14} className="text-gray-500 shrink-0" />
                                 </div>
                                 <div className="flex items-center gap-1.5 text-[10px] text-gray-500 mt-0.5">
                                     <span className="font-medium text-gray-300">{item.source}</span>
                                     <span className="w-0.5 h-0.5 rounded-full bg-gray-500"></span>
                                     <span>{item.time}</span>
                                 </div>
                             </div>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed text-justify">
                            {item.content} <span className="text-[#2962ff] cursor-pointer hover:underline whitespace-nowrap ml-1">Xem chi tiết</span>
                        </p>
                    </div>
                 ))}
             </div>
         ) : (
             <div className="flex-1 flex items-center justify-center text-gray-500 text-xs">
                 Coming soon
             </div>
         )}
      </div>
    </div>
  );
};