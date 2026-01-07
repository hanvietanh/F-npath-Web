
import React from 'react';
import { Search, Filter, CheckCircle2, UserPlus, FlaskConical, ChevronRight, BadgeCheck } from 'lucide-react';

// Mock Data
const SIGNALS = [
  {
    id: 1,
    expert: {
      name: 'Dương Văn Duy',
      avatar: 'https://i.pravatar.cc/150?u=duy',
      role: 'Chuyên gia nổi bật',
      isVerified: true
    },
    time: '1 phút trước',
    action: 'Mua',
    symbol: 'VND',
    price: 126.02,
    expectedProfit: 17.68,
    holdingTime: '45 ngày'
  },
  {
    id: 2,
    expert: {
      name: 'VnDirect Research',
      avatar: 'https://ui-avatars.com/api/?name=VnDirect&background=f97316&color=fff',
      role: 'Công ty Chứng Khoán',
      isVerified: true
    },
    time: '1 phút trước',
    action: 'Mua',
    symbol: 'VND',
    price: 126.02,
    expectedProfit: 17.68,
    holdingTime: '3-6 tháng'
  },
  {
    id: 3,
    expert: {
      name: 'Dương Văn Duy',
      avatar: 'https://i.pravatar.cc/150?u=duy',
      role: 'Chuyên gia nổi bật',
      isVerified: true
    },
    time: '1 phút trước',
    action: 'Bán',
    symbol: 'VND',
    price: 126.02,
    expectedProfit: 17.68,
    holdingTime: '---',
    isSell: true
  },
  {
    id: 4,
    expert: {
      name: 'Alpha Seekers',
      avatar: 'https://ui-avatars.com/api/?name=Alpha+Seekers&background=a855f7&color=fff',
      role: 'Quỹ đầu tư',
      isVerified: true
    },
    time: '5 phút trước',
    action: 'Mua',
    symbol: 'FPT',
    price: 96.50,
    expectedProfit: 24.50,
    holdingTime: '6-12 tháng'
  },
  {
    id: 5,
    expert: {
      name: 'Finpath AI',
      avatar: 'https://ui-avatars.com/api/?name=AI&background=2962ff&color=fff',
      role: 'AI Signal',
      isVerified: true
    },
    time: '10 phút trước',
    action: 'Mua',
    symbol: 'HPG',
    price: 28.10,
    expectedProfit: 12.50,
    holdingTime: '30 ngày'
  },
  {
    id: 6,
    expert: {
      name: 'Dragon Capital',
      avatar: 'https://ui-avatars.com/api/?name=Dragon&background=00c853&color=fff',
      role: 'Quỹ ngoại',
      isVerified: true
    },
    time: '15 phút trước',
    action: 'Mua',
    symbol: 'MWG',
    price: 45.20,
    expectedProfit: 15.00,
    holdingTime: '3 tháng'
  },
  {
    id: 7,
    expert: {
      name: 'SSI Research',
      avatar: 'https://ui-avatars.com/api/?name=SSI&background=f23645&color=fff',
      role: 'Công ty Chứng Khoán',
      isVerified: true
    },
    time: '20 phút trước',
    action: 'Bán',
    symbol: 'NVL',
    price: 16.50,
    expectedProfit: 8.50,
    holdingTime: '---',
    isSell: true
  },
  {
    id: 8,
    expert: {
      name: 'MBS Research',
      avatar: 'https://ui-avatars.com/api/?name=MBS&background=0ea5e9&color=fff',
      role: 'Công ty Chứng Khoán',
      isVerified: true
    },
    time: '30 phút trước',
    action: 'Mua',
    symbol: 'PVS',
    price: 36.80,
    expectedProfit: 21.00,
    holdingTime: '6 tháng'
  }
];

const EXPERTS = [
  { id: 1, name: 'Dương Văn Duy', return: '+134.5%', avatar: 'https://i.pravatar.cc/150?u=duy' },
  { id: 2, name: 'VnDirect Research', return: '+89.2%', avatar: 'https://ui-avatars.com/api/?name=VnDirect&background=f97316&color=fff' },
  { id: 3, name: 'Alpha Seekers', return: '+112.0%', avatar: 'https://ui-avatars.com/api/?name=Alpha+Seekers&background=a855f7&color=fff' },
];

const TRENDING = [
  { symbol: 'VIC', change: '+4.5%', color: '#00c853' },
  { symbol: 'VHM', change: '-1.2%', color: '#f23645' },
  { symbol: 'FPT', change: '+2.1%', color: '#00c853' },
  { symbol: 'HPG', change: '0.0%', color: '#eab308' },
];

export const InvestmentOpportunities: React.FC = () => {
  return (
    <div className="flex h-full w-full bg-[#000000] text-white overflow-hidden font-sans">
      
      {/* LEFT COLUMN - MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-[#1c1c1e]">
        
        {/* Sub Header / Filter Bar */}
        <div className="h-12 px-4 flex items-center justify-between border-b border-[#1c1c1e] bg-[#0b0e11] shrink-0">
          
          {/* LEFT: Filter Tabs (Moved from right as requested) */}
          <div className="flex items-center gap-6 h-full">
             <button className="h-full border-b-2 border-[#2962ff] text-[#2962ff] text-xs font-bold uppercase tracking-wide flex items-center gap-2 px-1">
                 <CheckCircle2 size={14} /> Admin chọn lọc
             </button>
             <button className="h-full border-b-2 border-transparent hover:border-[#2c2c2e] text-gray-400 hover:text-white text-xs font-bold uppercase tracking-wide flex items-center relative px-1">
                 Mới nhất
                 <span className="absolute top-3 -right-1.5 w-1.5 h-1.5 bg-[#f23645] rounded-full"></span>
             </button>
             <button className="h-full border-b-2 border-transparent hover:border-[#2c2c2e] text-gray-400 hover:text-white text-xs font-bold uppercase tracking-wide flex items-center px-1">
                 Lãi nhất
             </button>
          </div>

          {/* RIGHT: Search & Tools (Moved from left as requested) */}
          <div className="flex items-center gap-3">
             <div className="relative group">
               <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#2962ff]" />
               <input 
                  type="text" 
                  placeholder="Tìm kiếm..."
                  className="bg-[#1c1c1e] border border-[#2c2c2e] rounded pl-8 pr-3 py-1.5 text-xs w-32 focus:w-48 transition-all duration-300 focus:outline-none focus:border-[#2962ff] placeholder-gray-600 text-white"
               />
            </div>
            <div className="h-4 w-[1px] bg-[#2c2c2e]"></div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1c1c1e] hover:bg-[#2c2c2e] border border-[#2c2c2e] rounded text-xs font-medium text-gray-300 transition-colors">
                <Filter size={14} />
                <span>Bộ lọc</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#000000] custom-scrollbar">
            
            {/* Stats Cards REMOVED as requested */}

            {/* Signals Grid: 4 Columns as requested */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {SIGNALS.map((signal) => (
                    <div key={signal.id} className="bg-[#13171b] border border-[#1c1c1e] rounded-xl p-4 hover:border-[#2962ff]/50 transition-all hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] group flex flex-col">
                        
                        {/* Card Header */}
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex gap-2">
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#2c2c2e] shrink-0">
                                    <img src={signal.expert.avatar} alt={signal.expert.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-1">
                                        <h3 className="font-bold text-xs text-gray-100 truncate max-w-[100px]">{signal.expert.name}</h3>
                                        {signal.expert.isVerified && <BadgeCheck size={12} className="text-[#2962ff] fill-white shrink-0" />}
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-0.5">
                                        <span className="truncate max-w-[80px]">{signal.expert.role}</span>
                                        <span>•</span>
                                        <span>{signal.time}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="text-[10px] font-medium text-[#2962ff] hover:text-[#2962ff]/80 transition-colors shrink-0">
                                Theo dõi
                            </button>
                        </div>

                        {/* Card Body */}
                        <div className="bg-[#0b0e11] rounded-lg p-3 mb-3 border border-[#1c1c1e] relative overflow-hidden flex-1">
                            {/* Decorative Background Blur */}
                            <div className={`absolute top-0 right-0 w-24 h-24 ${signal.isSell ? 'bg-[#f23645]/5' : 'bg-[#00c853]/5'} rounded-full blur-xl -translate-y-1/2 translate-x-1/2 pointer-events-none`}></div>

                            <div className="flex justify-between items-start mb-2 relative z-10">
                                <div>
                                    <div className={`text-xs font-bold mb-0.5 ${signal.isSell ? 'text-[#f23645]' : 'text-[#00c853]'}`}>
                                        {signal.action} <span className="text-lg text-white ml-0.5">{signal.symbol}</span>
                                    </div>
                                    <div className="text-[10px] text-gray-500 font-medium">giá <span className="text-gray-300">{signal.price}</span></div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[9px] text-gray-500 uppercase font-bold mb-0.5">Lợi nhuận</div>
                                    <div className={`text-base font-bold tracking-tight ${signal.isSell ? 'text-[#00c853]' : 'text-[#00c853]'}`}>
                                        +{signal.expectedProfit}%
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center text-[10px] border-t border-[#1c1c1e] pt-2 relative z-10">
                                <span className="text-gray-500">Nắm giữ</span>
                                <span className="font-bold text-gray-300">{signal.holdingTime}</span>
                            </div>
                        </div>

                        {/* Card Footer Actions */}
                        <div className="grid grid-cols-2 gap-2 mt-auto">
                            <button className="py-2 rounded bg-[#2c2c2e] hover:bg-[#3a3a3c] text-[10px] font-bold text-gray-300 transition-colors">
                                Chi tiết
                            </button>
                            <button className="py-2 rounded bg-[#2c2c2e] hover:bg-[#3a3a3c] text-[10px] font-bold text-gray-300 transition-colors flex items-center justify-center gap-1.5 group/btn">
                                <span>Đặt lệnh</span>
                                <FlaskConical size={12} className="text-[#2962ff] group-hover/btn:rotate-12 transition-transform" />
                            </button>
                        </div>

                    </div>
                ))}
            </div>

            <div className="h-10"></div> {/* Spacer */}
        </div>
      </div>

      {/* RIGHT COLUMN - SIDEBAR */}
      <div className="w-[300px] bg-[#13171b] border-l border-[#1c1c1e] flex flex-col shrink-0">
         
         {/* Section 1: Top Experts */}
         <div className="p-4 border-b border-[#1c1c1e]">
             <h3 className="text-xs font-bold text-white mb-3 uppercase tracking-wider">Top Chuyên gia</h3>
             <div className="space-y-3">
                 {EXPERTS.map((expert) => (
                     <div key={expert.id} className="flex items-center justify-between group cursor-pointer">
                         <div className="flex items-center gap-3">
                             <div className="w-9 h-9 rounded-full border border-[#2c2c2e] overflow-hidden">
                                 <img src={expert.avatar} alt={expert.name} className="w-full h-full object-cover" />
                             </div>
                             <div>
                                 <div className="text-xs font-bold text-gray-200 group-hover:text-[#2962ff] transition-colors">{expert.name}</div>
                                 <div className="text-[10px] text-[#00c853] font-medium">{expert.return} / năm</div>
                             </div>
                         </div>
                         <button className="p-1.5 rounded-full hover:bg-[#2c2c2e] text-[#2962ff] transition-colors">
                             <UserPlus size={16} />
                         </button>
                     </div>
                 ))}
             </div>
             <button className="w-full mt-3 text-[10px] font-medium text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-1">
                 Xem tất cả <ChevronRight size={10} />
             </button>
         </div>

         {/* Section 2: Trending Today */}
         <div className="p-4 flex-1 overflow-y-auto">
             <h3 className="text-xs font-bold text-white mb-3 uppercase tracking-wider">Xu hướng hôm nay</h3>
             <div className="space-y-2">
                 {TRENDING.map((item, i) => (
                     <div key={i} className="flex items-center justify-between p-2.5 bg-[#0b0e11] border border-[#1c1c1e] rounded hover:border-[#2c2c2e] cursor-pointer transition-colors">
                         <span className="font-bold text-xs text-white">{item.symbol}</span>
                         <span className="font-bold text-xs" style={{ color: item.color }}>{item.change}</span>
                     </div>
                 ))}
             </div>
         </div>

      </div>
    </div>
  );
};
