
import React, { useState } from 'react';
import { 
  X, MessageSquare, Plus, BadgeCheck, TrendingUp, GraduationCap, 
  ChevronRight, Users, Lock, Clock, FlaskConical, Star, ChevronDown,
  Heart, MessageCircle, Bookmark, Send, MoreHorizontal
} from 'lucide-react';
import { ExpertProfile } from './constants';

interface ExpertProfileModalProps {
  expert: ExpertProfile;
  onClose: () => void;
}

export const ExpertProfileModal: React.FC<ExpertProfileModalProps> = ({ expert, onClose }) => {
  const [activeTab, setActiveTab] = useState('opportunities');
  const [subTab, setSubTab] = useState('running'); // running | closed

  // Mock Data for Signals (Expanded for Grid View)
  const signals = [
    { id: 1, symbol: 'VND', type: 'MUA', price: 126.02, target: 148.50, stop: 118.00, profit: 17.68, days: '45 ngày', date: '1 phút trước', isOpen: true },
    { id: 2, symbol: 'FPT', type: 'MUA', price: 96.50, target: 108.00, stop: 92.00, profit: 12.4, days: '14-20 ngày', date: '10 phút trước', isOpen: true },
    { id: 3, symbol: 'HPG', type: 'MUA', price: 28.10, target: 32.00, stop: 26.5, profit: 12.5, days: '30 ngày', date: '15 phút trước', isOpen: true },
    { id: 4, symbol: 'MWG', type: 'MUA', price: 45.20, target: 52.00, stop: 41.5, profit: 15.0, days: '3 tháng', date: '1 giờ trước', isOpen: true }
  ];

  // Mock Data for Posts
  const posts = [
      {
          id: 1,
          time: '1 giờ trước',
          title: 'Tại Sao 90% Nhà Đầu Tư Mắc Kẹt Ở Mức Hòa Vốn?',
          content: 'Giấc mơ nâng hạng đã chính thức trở thành hiện thực, Việt Nam sẽ thoát bỏ chiếc áo chật chội và bước...',
          likes: 112,
          comments: 26,
          saves: 12
      },
      {
          id: 2,
          time: '3 giờ trước',
          title: 'Làm Thế Nào Để Tìm Ra Cổ Phiếu Chất Lượng Sau Mùa Báo Cáo Kết Quả Kinh Doanh?',
          content: 'Mùa báo cáo kết quả kinh doanh quý 1 đã qua đi, để lại nhiều dư địa tăng trưởng cho các nhóm ngành...',
          likes: 245,
          comments: 58,
          saves: 34
      },
      {
          id: 3,
          time: '5 giờ trước',
          title: 'Chứng Sĩ F0 Cần Hiểu Về Lợi Nhuận Để Tìm Ra Siêu Cổ Phiếu.',
          content: 'Không phải cứ lợi nhuận tăng là cổ phiếu sẽ tăng. Quan trọng là chất lượng lợi nhuận đến từ đâu...',
          likes: 89,
          comments: 14,
          saves: 8
      }
  ];

  return (
    <div 
        className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200" 
        onClick={(e) => {
            e.stopPropagation(); 
            onClose();
        }}
    >
      <div 
        className="w-full max-w-6xl h-[85vh] bg-[#0b0e11] border border-[#2c2c2e] rounded-xl shadow-2xl flex overflow-hidden animate-in zoom-in-95 duration-200 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* === LEFT SIDEBAR: PROFILE INFO === */}
        <div className="w-[320px] md:w-[360px] bg-[#13171b] border-r border-[#2c2c2e] flex flex-col overflow-y-auto custom-scrollbar shrink-0">
            <div className="p-6 pb-4 flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative mb-4">
                    <div className="w-28 h-28 rounded-full border-2 border-[#2c2c2e] overflow-hidden p-1 bg-[#13171b]">
                        <div className="w-full h-full rounded-full overflow-hidden">
                            <img src={expert.avatar} alt={expert.name} className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="absolute -bottom-1 right-1 bg-[#fbbf24] text-black text-[11px] font-bold px-2 py-0.5 rounded-full border-2 border-[#13171b] flex items-center gap-0.5 shadow-sm">
                        4.9 <Star size={10} fill="black" />
                    </div>
                </div>
                
                {/* Name & Role */}
                <div className="flex items-center gap-1.5 mb-1">
                    <h2 className="text-xl font-bold text-white">{expert.name}</h2>
                    {expert.isVerified && <BadgeCheck size={18} className="text-[#2962ff] fill-white" />}
                </div>
                <div className="text-[11px] text-[#2962ff] bg-[#2962ff]/10 px-2.5 py-0.5 rounded-full mb-4 font-bold border border-[#2962ff]/20">
                    {expert.role}
                </div>
                
                {/* Bio */}
                <p className="text-xs text-gray-400 mb-6 leading-relaxed px-2 text-center">
                    Đầu cơ cổ phiếu khi uptrend, bán khống khi downtrend. Tập trung cơ hội tăng trưởng mạnh.
                </p>

                {/* Actions */}
                <div className="flex gap-3 w-full mb-6">
                    <button className="flex-1 py-2.5 bg-[#2c2c2e] hover:bg-[#3a3a3c] text-gray-200 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors">
                        <MessageSquare size={16} /> Nhắn tin
                    </button>
                    <button className="flex-1 py-2.5 bg-[#2962ff] hover:bg-[#1e4bd8] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/20">
                        <Plus size={16} /> Theo dõi
                    </button>
                </div>

                {/* Stats Grid - Fixed Borders matching image */}
                <div className="w-full border-t border-l border-[#2c2c2e] grid grid-cols-2 bg-[#13171b] mb-6">
                    {/* Item 1 */}
                    <div className="p-4 border-r border-b border-[#2c2c2e] flex flex-col items-center">
                        <div className="text-[10px] text-gray-500 uppercase font-bold mb-1 tracking-wider">Tỉ lệ thắng</div>
                        <div className="text-lg font-bold text-white">65.5%</div>
                    </div>
                    {/* Item 2 */}
                    <div className="p-4 border-r border-b border-[#2c2c2e] flex flex-col items-center">
                        <div className="text-[10px] text-gray-500 uppercase font-bold mb-1 tracking-wider">Lãi/Lỗ 30 ngày</div>
                        <div className="text-lg font-bold text-[#00c853]">+833.8%</div>
                    </div>
                    {/* Item 3 */}
                    <div className="p-4 border-r border-b border-[#2c2c2e] flex flex-col items-center">
                        <div className="text-[10px] text-gray-500 uppercase font-bold mb-1 tracking-wider">Người theo dõi</div>
                        <div className="text-lg font-bold text-white">1,292</div>
                    </div>
                    {/* Item 4 */}
                    <div className="p-4 border-r border-b border-[#2c2c2e] flex flex-col items-center">
                        <div className="text-[10px] text-gray-500 uppercase font-bold mb-1 tracking-wider">Đang nắm giữ</div>
                        <div className="text-lg font-bold text-white">4 mã</div>
                    </div>
                </div>

                {/* Performance Chart */}
                <div className="w-full mb-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-white mb-3 pl-1">
                        <TrendingUp size={16} /> HIỆU SUẤT ĐẦU TƯ
                    </div>
                    <div className="h-32 bg-[#1a1f26] rounded-xl border border-[#2c2c2e] relative overflow-hidden flex items-end px-2 pb-0">
                         <div className="w-full h-full flex items-end justify-between gap-1 z-10">
                             {[20, 35, 40, 25, 50, 45, 60, 70, 85, 65, 75, 80].map((h, i) => (
                                 <div 
                                    key={i} 
                                    className="flex-1 bg-[#2962ff]/40 hover:bg-[#2962ff] transition-all rounded-t-sm" 
                                    style={{ height: `${h}%` }}
                                 ></div>
                             ))}
                         </div>
                    </div>
                </div>
            </div>

            {/* Bottom Actions List */}
            <div className="p-4 pt-0 mt-auto">
                 <div className="mb-4">
                     <button className="w-full flex items-center justify-between group p-3 hover:bg-[#1c1c1e] rounded-lg transition-colors border border-transparent hover:border-[#2c2c2e]">
                         <div className="flex items-center gap-3">
                             <div className="p-2 bg-[#2c2c2e] rounded-lg text-gray-400 group-hover:text-white transition-colors">
                                 <GraduationCap size={18} />
                             </div>
                             <span className="text-sm text-gray-300 font-medium group-hover:text-white">Học vấn</span>
                         </div>
                     </button>
                 </div>

                 {/* Community CTA */}
                 <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-4 text-center">
                        <div className="text-xs text-gray-400 mb-1">Đang có <span className="text-white font-bold">+22 cơ hội</span></div>
                        <div className="text-xs text-gray-400 mb-4">trong nhóm tư vấn độc quyền</div>
                        <button className="w-full py-3 bg-[#2962ff] hover:bg-[#1e4bd8] text-white text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2">
                            Tham gia Cộng đồng <ChevronRight size={16} />
                        </button>
                 </div>
            </div>
        </div>

        {/* === RIGHT CONTENT: TABS & LIST === */}
        <div className="flex-1 flex flex-col bg-[#0b0e11] relative">
            {/* Close Button Absolute */}
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 p-2 bg-[#1c1c1e] hover:bg-[#2c2c2e] rounded-full text-gray-400 hover:text-white transition-colors z-20"
            >
                <X size={18} />
            </button>

            {/* Main Tabs */}
            <div className="flex items-center px-6 pt-6 border-b border-[#2c2c2e] bg-[#0b0e11]">
                {['Cơ hội đầu tư', 'Thông tin', 'Bài viết', 'Đánh giá'].map((tab) => {
                    // Normalize ID mapping
                    let id = tab.toLowerCase();
                    if (tab === 'Cơ hội đầu tư') id = 'opportunities';
                    if (tab === 'Thông tin') id = 'info';
                    if (tab === 'Bài viết') id = 'posts';
                    if (tab === 'Đánh giá') id = 'reviews';

                    const isActive = activeTab === id;
                    return (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`
                                py-3 mr-8 text-sm font-bold border-b-2 transition-all relative
                                ${isActive ? 'text-white border-[#2962ff]' : 'text-gray-500 border-transparent hover:text-gray-300'}
                            `}
                        >
                            {tab}
                            {tab === 'Cơ hội đầu tư' && <span className="ml-1.5 bg-[#2c2c2e] text-white text-[10px] px-1.5 py-0.5 rounded">{signals.length}</span>}
                        </button>
                    )
                })}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                
                {/* --- TAB: OPPORTUNITIES --- */}
                {activeTab === 'opportunities' && (
                    <div className="w-full">
                        {/* Sub Tabs */}
                        <div className="flex gap-4 mb-6">
                            <button 
                                onClick={() => setSubTab('running')}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${subTab === 'running' ? 'bg-[#2c2c2e] text-white' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                <span className="w-2 h-2 rounded-full bg-[#00c853] inline-block mr-2"></span>
                                Kèo đang chạy
                            </button>
                            <button 
                                onClick={() => setSubTab('closed')}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${subTab === 'closed' ? 'bg-[#2c2c2e] text-white' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                Kèo đã đóng
                            </button>
                        </div>

                        {/* Signals Grid: 2 Columns */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                            {signals.map((signal) => (
                                <div key={signal.id} className="bg-[#13171b] border border-[#2c2c2e] rounded-xl p-4 hover:border-[#2962ff]/50 transition-all group flex flex-col shadow-sm">
                                    
                                    {/* Card Header: Profile Info */}
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex gap-2">
                                            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#2c2c2e] shrink-0">
                                                <img src={expert.avatar} alt={expert.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-1">
                                                    <h3 className="font-bold text-xs text-gray-100 truncate max-w-[100px] hover:text-[#2962ff] transition-colors cursor-pointer">{expert.name}</h3>
                                                    {expert.isVerified && <BadgeCheck size={12} className="text-[#2962ff] fill-white shrink-0" />}
                                                </div>
                                                <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-0.5">
                                                    <span className="truncate max-w-[80px]">{expert.role}</span>
                                                    <span>•</span>
                                                    <span>{signal.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="text-[10px] font-bold text-[#2962ff] hover:text-[#2962ff]/80 transition-colors shrink-0">
                                            Theo dõi
                                        </button>
                                    </div>

                                    {/* Card Body: Signal Info */}
                                    <div className="bg-[#0b0e11] rounded-lg p-3 mb-3 border border-[#1c1c1e] relative overflow-hidden flex-1 cursor-pointer hover:bg-[#1a1f26] transition-colors">
                                        {/* Row 1: Action + Price & Profit */}
                                        <div className="flex justify-between items-start mb-2 relative z-10">
                                            <div>
                                                <div className="text-xs font-bold mb-0.5 text-[#00c853]">
                                                    Mua <span className="text-lg text-white ml-0.5">{signal.symbol}</span>
                                                </div>
                                                <div className="text-[10px] text-gray-500 font-medium">giá <span className="text-gray-300">{signal.price}</span></div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[9px] text-gray-500 uppercase font-bold mb-0.5">Lợi nhuận</div>
                                                <div className="text-base font-bold tracking-tight text-[#00c853]">
                                                    +{signal.profit}%
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Row 2: Holding Time */}
                                        <div className="flex justify-between items-center text-[10px] border-t border-[#1c1c1e] pt-2 relative z-10 mt-1">
                                            <span className="text-gray-500">Nắm giữ</span>
                                            <span className="font-bold text-gray-300">{signal.days}</span>
                                        </div>
                                    </div>

                                    {/* Card Footer: Actions */}
                                    <div className="grid grid-cols-2 gap-3 mt-auto">
                                        <button className="py-2.5 bg-[#2c2c2e] hover:bg-[#3a3a3c] text-gray-300 text-[11px] font-bold rounded-lg transition-colors">
                                            Chi tiết
                                        </button>
                                        <button className="py-2.5 bg-[#2c2c2e] hover:bg-[#3a3a3c] text-gray-300 text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 group/btn border border-transparent hover:border-[#2962ff]/50">
                                            <span>Đặt lệnh</span>
                                            <FlaskConical size={12} className="text-[#2962ff] group-hover/btn:rotate-12 transition-transform" />
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>

                        {/* Locked History */}
                        <div className="mt-6 border border-dashed border-[#2c2c2e] rounded-xl p-8 flex flex-col items-center justify-center text-center bg-[#13171b]/50">
                            <div className="w-12 h-12 bg-[#1c1c1e] rounded-full flex items-center justify-center mb-3 text-gray-500">
                                <Lock size={20} />
                            </div>
                            <p className="text-sm text-gray-400 mb-1">Tham gia cộng đồng để xem thêm</p>
                            <p className="text-sm font-bold text-white">Lịch sử giao dịch</p>
                        </div>
                    </div>
                )}

                {/* --- TAB: INFO (Thông tin) --- */}
                {activeTab === 'info' && (
                    <div className="space-y-8">
                        
                        {/* Section 1: Statistics Cards */}
                        <div>
                            <h3 className="text-sm font-bold text-white mb-4">Thống kê</h3>
                            <div className="grid grid-cols-4 gap-4">
                                <div className="bg-[#1a1f26] border border-[#2c2c2e] rounded-lg p-4 flex flex-col justify-center">
                                    <span className="text-[10px] text-gray-500 mb-1">Lãi/Lỗ 7 ngày</span>
                                    <span className="text-xl font-bold text-[#00c853]">+13.4%</span>
                                </div>
                                <div className="bg-[#1a1f26] border border-[#2c2c2e] rounded-lg p-4 flex flex-col justify-center">
                                    <span className="text-[10px] text-gray-500 mb-1">Lãi/Lỗ 30 ngày</span>
                                    <span className="text-xl font-bold text-[#00c853]">+13.4%</span>
                                </div>
                                <div className="bg-[#1a1f26] border border-[#2c2c2e] rounded-lg p-4 flex flex-col justify-center">
                                    <span className="text-[10px] text-gray-500 mb-1">Lãi/Lỗ 365 ngày</span>
                                    <span className="text-xl font-bold text-[#f23645]">-213.4%</span>
                                </div>
                                <div className="bg-[#1a1f26] border border-[#2c2c2e] rounded-lg p-4 flex flex-col justify-center">
                                    <span className="text-[10px] text-gray-500 mb-1">Tỉ lệ thắng 30 ngày</span>
                                    <span className="text-xl font-bold text-white">65.5%</span>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Performance Chart */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-sm font-bold text-white">Hiệu suất đầu tư</h3>
                                <button className="bg-[#1c1c1e] border border-[#2c2c2e] rounded px-3 py-1 text-xs text-gray-400 flex items-center gap-1 hover:text-white transition-colors">
                                    Tất cả <ChevronDown size={12} />
                                </button>
                            </div>
                            <div className="bg-[#1a1f26] border border-[#2c2c2e] rounded-xl p-4 h-[280px] relative">
                                {/* Simple SVG Chart Implementation */}
                                <svg width="100%" height="100%" viewBox="0 0 800 250" preserveAspectRatio="none">
                                    {/* Grid Lines */}
                                    {[0, 0.2, 0.4, 0.6, 0.8, 1].map(p => (
                                        <line key={p} x1="30" y1={p * 220 + 10} x2="780" y2={p * 220 + 10} stroke="#2c2c2e" strokeWidth="1" strokeDasharray="4 4" />
                                    ))}
                                    
                                    {/* Y Axis Labels */}
                                    <text x="795" y="10" textAnchor="end" fill="#525252" fontSize="9">100%</text>
                                    <text x="795" y="75" textAnchor="end" fill="#525252" fontSize="9">30%</text>
                                    <text x="795" y="120" textAnchor="end" fill="#525252" fontSize="9">20%</text>
                                    <text x="795" y="170" textAnchor="end" fill="#525252" fontSize="9">10%</text>
                                    <text x="795" y="215" textAnchor="end" fill="#525252" fontSize="9">0</text>
                                    <text x="795" y="245" textAnchor="end" fill="#525252" fontSize="9">-100%</text>

                                    {/* X Axis Labels */}
                                    <text x="30" y="245" fill="#525252" fontSize="10">12/2022</text>
                                    <text x="400" y="245" textAnchor="middle" fill="#525252" fontSize="10">01/2024</text>
                                    <text x="760" y="245" textAnchor="end" fill="#525252" fontSize="10">08/2025</text>

                                    {/* Blue Line (Portfolio) - Using a simplified bezier curve path */}
                                    <defs>
                                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#2962ff" stopOpacity="0.2"/>
                                            <stop offset="100%" stopColor="#2962ff" stopOpacity="0"/>
                                        </linearGradient>
                                    </defs>
                                    <path 
                                        d="M 30 215 C 200 200, 350 120, 450 100 S 650 90, 760 30" 
                                        fill="none" stroke="#3b82f6" strokeWidth="3" 
                                    />
                                    {/* Blue Area Under Curve */}
                                    <path 
                                        d="M 30 215 C 200 200, 350 120, 450 100 S 650 90, 760 30 L 760 250 L 30 250 Z" 
                                        fill="url(#blueGradient)" stroke="none" 
                                    />

                                    {/* Yellow Line (VNINDEX) - Flatter */}
                                    <path 
                                        d="M 30 215 C 150 200, 300 210, 450 180 S 650 170, 760 120" 
                                        fill="none" stroke="#eab308" strokeWidth="3" 
                                    />
                                </svg>

                                {/* Legend */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]"></div>
                                        <span className="text-[10px] text-gray-400">Danh mục</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#eab308]"></div>
                                        <span className="text-[10px] text-gray-400">VNINDEX</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Expert Info */}
                        <div>
                            <h3 className="text-sm font-bold text-white mb-4">Thông tin chuyên gia</h3>
                            <div className="bg-[#1a1f26] border border-[#2c2c2e] rounded-lg divide-y divide-[#2c2c2e]">
                                <div className="p-4">
                                    <div className="text-sm font-bold text-white mb-2">Trường phái đầu tư: Trend Following</div>
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        Tập trung vào giai đoạn tăng trưởng mạnh nhất của cổ phiếu. Mục tiêu tạo ra hiệu suất lớn trong thời gian ngắn nhất.
                                    </p>
                                </div>
                                <div className="p-4">
                                    <div className="text-sm font-bold text-white mb-2">Học vấn</div>
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        Cử nhân tài chính ngân hàng - Đại học kinh tế quốc dân, CFA
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                )}

                {/* --- TAB: POSTS (Bài viết) --- */}
                {activeTab === 'posts' && (
                    <div className="max-w-3xl space-y-4">
                        {posts.map((post) => (
                            <div key={post.id} className="bg-[#13171b] border-b border-[#2c2c2e] py-4 last:border-0 hover:bg-[#1a1f26]/50 transition-colors p-2 rounded-lg">
                                {/* Header */}
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex gap-3">
                                        <div className="relative">
                                            <div className="w-10 h-10 rounded-full border border-[#2c2c2e] overflow-hidden">
                                                <img src={expert.avatar} alt={expert.name} className="w-full h-full object-cover" />
                                            </div>
                                            {expert.isVerified && (
                                                <div className="absolute -bottom-1 -right-1 bg-[#0b0e11] rounded-full p-[1px]">
                                                    <BadgeCheck size={14} className="text-[#2962ff] fill-white" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-sm text-white hover:text-[#2962ff] cursor-pointer transition-colors">
                                                    {expert.name}
                                                </h3>
                                            </div>
                                            <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5">
                                                <span className="text-[#f59e0b] font-medium">{expert.role}</span>
                                                <span>•</span>
                                                <span>{post.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="text-[11px] font-bold text-[#2962ff] hover:bg-[#2962ff]/10 px-3 py-1.5 rounded transition-colors">
                                        Theo dõi
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="mb-3 pl-[52px]">
                                    <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">{post.title}</h3>
                                    <p className="text-[13px] text-gray-300 leading-relaxed">
                                        {post.content} 
                                        <span className="text-[#2962ff] cursor-pointer hover:underline text-xs font-bold ml-1">Xem thêm</span>
                                    </p>
                                </div>

                                {/* Footer Interactions */}
                                <div className="flex items-center gap-6 text-gray-500 pl-[52px]">
                                    <button className="flex items-center gap-1.5 hover:text-[#f23645] transition-colors group">
                                        <Heart size={16} className="group-hover:fill-[#f23645]" />
                                        <span className="text-xs font-bold">{post.likes}</span>
                                    </button>
                                    <button className="flex items-center gap-1.5 hover:text-[#2962ff] transition-colors">
                                        <MessageCircle size={16} />
                                        <span className="text-xs font-bold">{post.comments}</span>
                                    </button>
                                    <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                                        <Bookmark size={16} />
                                        <span className="text-xs font-bold">{post.saves}</span>
                                    </button>
                                    <button className="flex items-center gap-1.5 hover:text-white transition-colors ml-auto">
                                        <Send size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab !== 'opportunities' && activeTab !== 'info' && activeTab !== 'posts' && (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <Lock size={32} className="mb-3 opacity-50" />
                        <p className="text-sm">Nội dung {activeTab} đang được cập nhật.</p>
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};
