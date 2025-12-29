import React from 'react';
import { Zap, Eye, UserPlus, ArrowUpRight } from 'lucide-react';
import { PostCard } from './PostCard';
import { INTELLIGENCE_POSTS } from './mockData';

const NewsFeedHero = () => (
    <div className="w-full rounded-2xl border border-[#2c2c2e] bg-[#13171b] p-6 mb-8 hover:border-[#2962ff] transition-colors cursor-pointer group shadow-lg">
        <span className="inline-block px-2 py-1 bg-[#2962ff] text-white text-[10px] font-bold uppercase rounded mb-3">Tiêu điểm</span>
        <h1 className="text-3xl font-bold text-white mb-3 leading-tight group-hover:text-[#2962ff] transition-colors">
            Thị trường chứng khoán năm 2025: Cơ hội nâng hạng và dòng vốn ngoại
        </h1>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
            Với việc áp dụng hệ thống KRX và triển vọng nâng hạng thị trường mới nổi của FTSE Russell, chứng khoán Việt Nam đang đứng trước cơ hội thu hút hàng tỷ USD vốn ngoại trong năm nay.
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <span className="text-white">Ban biên tập Finpath</span>
            <span>•</span>
            <span>2 giờ trước</span>
        </div>
    </div>
);

const SidebarWidget = ({ title, children }: { title: string, children?: React.ReactNode }) => (
    <div className="bg-[#13171b] rounded-xl border border-[#2c2c2e] overflow-hidden">
        <div className="px-4 py-3 border-b border-[#2c2c2e]">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">{title}</h3>
        </div>
        <div className="p-4">
            {children}
        </div>
    </div>
);

export const NewsFeed = () => {
  return (
    <div className="w-full h-full bg-[#000000] overflow-y-auto custom-scrollbar">
      <div className="w-full max-w-5xl mx-auto p-6">
         {/* Hero Section */}
         <NewsFeedHero />
         
         {/* News List */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             {/* Main Feed */}
             <div className="lg:col-span-2 space-y-4">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Zap size={20} className="text-yellow-500 fill-yellow-500" /> Tin nổi bật
                </h2>
                {INTELLIGENCE_POSTS.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
             </div>

             {/* Sidebar (4 Requested Widgets) */}
             <div className="space-y-6">
                 
                 {/* 1. Chủ đề quan tâm */}
                 <SidebarWidget title="Chủ đề quan tâm">
                     <div className="flex flex-wrap gap-2">
                         {['#NângHạng', '#BấtĐộngSản', '#NgânHàng', '#LãiSuất', '#VinGroup', '#FPT'].map(tag => (
                             <span key={tag} className="px-3 py-1 bg-[#1c1c1e] hover:bg-[#2962ff] hover:text-white text-gray-400 rounded-full text-xs cursor-pointer transition-colors border border-[#2c2c2e]">
                                 {tag}
                             </span>
                         ))}
                     </div>
                 </SidebarWidget>

                 {/* 2. Bài thịnh hành */}
                 <SidebarWidget title="Bài thịnh hành">
                     <div className="space-y-4">
                         {[
                             { title: "Nhận định thị trường tuần 25-29/12: Cơ hội bắt đáy?", views: "15K" },
                             { title: "Top 5 cổ phiếu ngân hàng đáng mua nhất Q1/2025", views: "12K" },
                             { title: "Phân tích kỹ thuật VNINDEX: Vượt đỉnh 1300?", views: "10K" },
                         ].map((item, i) => (
                             <div key={i} className="group cursor-pointer">
                                 <h4 className="text-sm font-medium text-gray-200 group-hover:text-[#2962ff] transition-colors line-clamp-2 leading-snug mb-1">
                                     {item.title}
                                 </h4>
                                 <div className="flex items-center gap-1 text-[10px] text-gray-500">
                                     <Eye size={12} /> {item.views} lượt xem
                                 </div>
                             </div>
                         ))}
                     </div>
                 </SidebarWidget>

                 {/* 3. Cổ phiếu tìm kiếm nhiều */}
                 <SidebarWidget title="Cổ phiếu tìm kiếm nhiều">
                     <div className="space-y-2">
                         {[
                             { symbol: "HPG", name: "Hòa Phát", change: "+2.5%", color: "#00c853" },
                             { symbol: "NVL", name: "Novaland", change: "-1.2%", color: "#f23645" },
                             { symbol: "DIG", name: "DIC Corp", change: "+0.8%", color: "#00c853" },
                             { symbol: "SSI", name: "SSI Securities", change: "+1.5%", color: "#00c853" },
                             { symbol: "VHM", name: "Vinhomes", change: "-0.5%", color: "#f23645" },
                         ].map((stock, i) => (
                             <div key={i} className="flex items-center justify-between py-1 hover:bg-[#1c1c1e] rounded px-1 transition-colors cursor-pointer group">
                                 <div className="flex items-center gap-3">
                                     <span className="font-bold text-sm text-white group-hover:text-[#2962ff]">{stock.symbol}</span>
                                     <span className="text-xs text-gray-500">{stock.name}</span>
                                 </div>
                                 <span className="text-xs font-bold" style={{ color: stock.color }}>{stock.change}</span>
                             </div>
                         ))}
                     </div>
                 </SidebarWidget>

                 {/* 4. Chuyên gia đề xuất */}
                 <SidebarWidget title="Chuyên gia đề xuất">
                     <div className="space-y-4">
                         {[
                             { name: "Dương Văn Duy", role: "Chuyên gia kỹ thuật", avatar: "https://i.pravatar.cc/150?u=duy" },
                             { name: "Lý Phạm Stock", role: "Phân tích cơ bản", avatar: "https://i.pravatar.cc/150?u=lypham" },
                             { name: "Team TVI", role: "Tư vấn đầu tư", avatar: "https://i.pravatar.cc/150?u=tvi" },
                         ].map((expert, i) => (
                             <div key={i} className="flex items-center justify-between group cursor-pointer">
                                 <div className="flex items-center gap-3">
                                     <img src={expert.avatar} alt={expert.name} className="w-8 h-8 rounded-full border border-[#2c2c2e]" />
                                     <div>
                                         <div className="text-sm font-bold text-gray-200 group-hover:text-[#2962ff]">{expert.name}</div>
                                         <div className="text-[10px] text-gray-500">{expert.role}</div>
                                     </div>
                                 </div>
                                 <button className="text-gray-400 hover:text-[#2962ff] transition-colors">
                                     <UserPlus size={16} />
                                 </button>
                             </div>
                         ))}
                     </div>
                 </SidebarWidget>

                 {/* Mini Chart or Ad placeholder - Upgraded to match screenshot style */}
                 <div className="bg-gradient-to-br from-[#13171b] to-[#0b0e11] rounded-xl border border-[#2c2c2e] p-5 relative overflow-hidden group cursor-pointer">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#00c853]/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
                      <h3 className="text-lg font-bold text-white mb-1">Gói Pro</h3>
                      <p className="text-xs text-gray-400 mb-4">Nâng cấp để xem dữ liệu realtime và AI phân tích chuyên sâu.</p>
                      <button className="text-xs font-bold text-[#00c853] flex items-center gap-1 group-hover:gap-2 transition-all">
                          Nâng cấp ngay <ArrowUpRight size={14} />
                      </button>
                 </div>

             </div>
         </div>

         {/* End of content indicator */}
         <div className="h-20 flex items-center justify-center text-xs text-gray-600 mt-8">
             ~ Đã hiển thị hết tin mới ~
         </div> 
      </div>
    </div>
  )
};