
import React from 'react';
import { Zap, Eye, UserPlus, ArrowUpRight, Flame } from 'lucide-react';
import { PostCard } from './PostCard';
import { INTELLIGENCE_POSTS } from './mockData';

const SidebarWidget = ({ title, children }: { title: string, children?: React.ReactNode }) => (
    <div className="bg-[#111] rounded-lg border border-[#2a2e39] overflow-hidden mb-4">
        <div className="px-4 py-3 border-b border-[#2a2e39]">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{title}</h3>
        </div>
        <div className="p-4">
            {children}
        </div>
    </div>
);

export const NewsFeed = () => {
  // Filter out the 'hot_event' type from standard mapping if we render it manually
  const posts = INTELLIGENCE_POSTS.filter(p => p.type !== 'hot_event');
  const hotEvent = INTELLIGENCE_POSTS.find(p => p.type === 'hot_event');

  return (
    <div className="w-full h-full bg-[#000000] overflow-y-auto custom-scrollbar">
      <div className="w-full max-w-6xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
         
         {/* Main Feed (Left 8 cols) */}
         <div className="lg:col-span-8">
            
            {/* Featured Header */}
            <div className="mb-6">
                
                
                {/* Hot Event Banner */}
                {hotEvent && (
                    <div className="bg-[#0b0e11] border border-[#2c2c2e] rounded-lg p-3 flex items-start gap-3 mb-6 hover:bg-[#121212] transition-colors cursor-pointer">
                         <div className="bg-[#1c1c1e] p-2 rounded-full shrink-0 border border-[#2c2c2e]">
                             <Flame size={20} className="text-orange-500 fill-orange-500 animate-pulse" />
                         </div>
                         <div>
                             <div className="text-orange-500 font-bold text-xs uppercase mb-1">{hotEvent.title}</div>
                             <div className="text-gray-300 text-sm">{hotEvent.content}</div>
                         </div>
                    </div>
                )}
            </div>

            {/* Posts */}
            <div className="space-y-4">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
            
            <div className="text-center py-8 text-xs text-gray-600">
                ~ Đã hiển thị hết tin mới ~
            </div>
         </div>

         {/* Sidebar (Right 4 cols) */}
         <div className="lg:col-span-4 space-y-4">
             
             {/* 1. Topics */}
             <SidebarWidget title="Chủ đề quan tâm">
                 <div className="flex flex-wrap gap-2">
                     {['#NângHạng', '#BấtĐộngSản', '#NgânHàng', '#LãiSuất', '#VinGroup', '#FPT'].map(tag => (
                         <span key={tag} className="px-3 py-1.5 bg-[#1c1c1e] hover:bg-[#2c2c2e] text-gray-400 hover:text-white rounded border border-[#2c2c2e] text-[11px] font-medium cursor-pointer transition-colors">
                             {tag}
                         </span>
                     ))}
                 </div>
             </SidebarWidget>

             {/* 2. Trending */}
             <SidebarWidget title="Bài thịnh hành">
                 <div className="space-y-4">
                     {[
                         { title: "Nhận định thị trường tuần 25-29/12: Cơ hội bắt đáy?", views: "15K" },
                         { title: "Top 5 cổ phiếu ngân hàng đáng mua nhất Q1/2025", views: "12K" },
                         { title: "Phân tích kỹ thuật VNINDEX: Vượt đỉnh 1300?", views: "10K" },
                     ].map((item, i) => (
                         <div key={i} className="group cursor-pointer">
                             <h4 className="text-xs font-bold text-gray-200 group-hover:text-[#2962ff] transition-colors leading-relaxed mb-1">
                                 {item.title}
                             </h4>
                             <div className="flex items-center gap-1 text-[10px] text-gray-500">
                                 <Eye size={12} /> {item.views} lượt xem
                             </div>
                         </div>
                     ))}
                 </div>
             </SidebarWidget>

             {/* 3. Top Stocks */}
             <SidebarWidget title="Cổ phiếu tìm kiếm nhiều">
                 <div className="space-y-1">
                     {[
                         { symbol: "HPG", name: "Hòa Phát", change: "+2.5%", color: "#00c853" },
                         { symbol: "NVL", name: "Novaland", change: "-1.2%", color: "#f23645" },
                         { symbol: "DIG", name: "DIC Corp", change: "+0.8%", color: "#00c853" },
                         { symbol: "SSI", name: "SSI Securities", change: "+1.5%", color: "#00c853" },
                         { symbol: "VHM", name: "Vinhomes", change: "-0.5%", color: "#f23645" },
                     ].map((stock, i) => (
                         <div key={i} className="flex items-center justify-between py-2 px-1 hover:bg-[#1c1c1e] rounded transition-colors cursor-pointer group border-b border-[#1c1c1e]/50 last:border-0">
                             <div className="flex items-center gap-3">
                                 <span className="font-bold text-xs text-white group-hover:text-[#2962ff] w-8">{stock.symbol}</span>
                                 <span className="text-[10px] text-gray-500">{stock.name}</span>
                             </div>
                             <span className="text-[10px] font-bold" style={{ color: stock.color }}>{stock.change}</span>
                         </div>
                     ))}
                 </div>
             </SidebarWidget>

             {/* 4. Experts */}
             <SidebarWidget title="Chuyên gia đề xuất">
                 <div className="space-y-4">
                     {[
                         { name: "Dương Văn Duy", role: "Chuyên gia kỹ thuật", avatar: "https://i.pravatar.cc/150?u=duy" },
                         { name: "Lý Phạm Stock", role: "Phân tích cơ bản", avatar: "https://i.pravatar.cc/150?u=lypham" },
                         { name: "Team TVI", role: "Tư vấn đầu tư", avatar: "https://i.pravatar.cc/150?u=tvi" },
                     ].map((expert, i) => (
                         <div key={i} className="flex items-center justify-between group cursor-pointer">
                             <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-full border border-[#2c2c2e] overflow-hidden">
                                    <img src={expert.avatar} alt={expert.name} className="w-full h-full object-cover" />
                                 </div>
                                 <div>
                                     <div className="text-xs font-bold text-gray-200 group-hover:text-[#2962ff]">{expert.name}</div>
                                     <div className="text-[10px] text-gray-500">{expert.role}</div>
                                 </div>
                             </div>
                             <button className="text-gray-400 hover:text-[#2962ff] transition-colors p-1 hover:bg-[#2c2c2e] rounded">
                                 <UserPlus size={14} />
                             </button>
                         </div>
                     ))}
                 </div>
             </SidebarWidget>

             {/* Promo */}
             <div className="bg-gradient-to-br from-[#111] to-[#0b0e11] rounded-lg border border-[#2a2e39] p-5 relative overflow-hidden group cursor-pointer">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#00c853]/20 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
                  <h3 className="text-base font-bold text-white mb-1">Gói Pro</h3>
                  <p className="text-[10px] text-gray-400 mb-4 leading-relaxed max-w-[80%]">Nâng cấp để xem dữ liệu realtime và AI phân tích chuyên sâu.</p>
                  <button className="text-[10px] font-bold text-[#00c853] flex items-center gap-1 group-hover:gap-2 transition-all">
                      Nâng cấp ngay <ArrowUpRight size={12} />
                  </button>
             </div>

         </div>
      </div>
    </div>
  )
};
