
import React, { useState } from 'react';
import { BadgeCheck, Heart, MessageCircle, Share2, MoreHorizontal, Bookmark, ChevronRight } from 'lucide-react';
import { stockAnalysisFeed } from '../stockDetailConstants';

interface NewsTabProps {
    onAskCopilot: (type: string | null, query?: string) => void;
}

export const NewsTab: React.FC<NewsTabProps> = ({ onAskCopilot }) => {
  const [activeTab, setActiveTab] = useState<'Nổi bật' | 'Mới nhất' | 'Cơ hội đầu tư'>('Nổi bật');

  // Filter logic (mock)
  const feedItems = stockAnalysisFeed.filter(item => {
      if (activeTab === 'Cơ hội đầu tư') return item.type === 'signal';
      return true; // Show all for other tabs for now (or sort differently)
  });

  return (
    <div className="flex flex-col h-full w-full bg-[#0b0e11]">
        
        {/* SUB-NAVIGATION TABS */}
        <div className="flex items-center px-4 pt-2 border-b border-[#2c2c2e] shrink-0 bg-[#0b0e11]">
            {['Nổi bật', 'Mới nhất', 'Cơ hội đầu tư'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`
                        px-4 py-3 text-xs font-bold border-b-2 transition-all relative uppercase tracking-wide
                        ${activeTab === tab 
                            ? 'text-white border-[#2962ff]' 
                            : 'text-gray-500 border-transparent hover:text-gray-300 hover:border-[#2c2c2e]'}
                    `}
                >
                    {tab}
                </button>
            ))}
        </div>

        {/* FEED CONTENT */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
            <div className="max-w-3xl mx-auto space-y-4">
                {feedItems.map((item) => (
                    <div key={item.id} className="bg-[#13171b] border border-[#2c2c2e] rounded-xl p-4 hover:border-[#3a3a3c] transition-colors">
                        
                        {/* HEADER: Author Info */}
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full border border-[#2c2c2e] overflow-hidden shrink-0">
                                    <img src={item.author.avatar} alt={item.author.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <h3 className="font-bold text-sm text-white hover:text-[#2962ff] cursor-pointer transition-colors">
                                            {item.author.name}
                                        </h3>
                                        {item.author.verified && <BadgeCheck size={14} className="text-[#2962ff] fill-white shrink-0" />}
                                        <button className="bg-[#2c2c2e] text-[#2962ff] text-[10px] font-bold px-2 py-0.5 rounded ml-2 hover:bg-[#3a3a3c] transition-colors">
                                            Theo dõi
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5">
                                        {item.author.role && <span className="text-[#f59e0b] font-medium">{item.author.role}</span>}
                                        <span>•</span>
                                        <span>{item.time}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="text-gray-500 hover:text-white transition-colors">
                                <MoreHorizontal size={18} />
                            </button>
                        </div>

                        {/* CONTENT: Signal or Post */}
                        <div className="mb-3">
                            {item.type === 'signal' && item.signal ? (
                                <div className="mb-3">
                                    <div className="text-[13px] text-white font-medium mb-2">
                                        <span className="text-gray-400">[Tín hiệu]</span> <span className="text-[#00c853] font-bold">Mua {item.signal.symbol}</span> giá <span className="font-bold text-white">{item.signal.price.toFixed(2)}</span>, lợi nhuận kỳ vọng <span className="text-[#00c853] font-bold">+{item.signal.profit}%</span>. Nắm giữ dự kiến {item.signal.duration}.
                                    </div>
                                    <button 
                                        className="text-[12px] font-bold text-[#2962ff] hover:underline flex items-center gap-0.5"
                                        onClick={() => onAskCopilot(null, `Phân tích tín hiệu mua ${item.signal?.symbol} giá ${item.signal?.price} của ${item.author.name}`)}
                                    >
                                        Xem chi tiết <ChevronRight size={14} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-sm font-bold text-white mb-2 leading-snug hover:text-[#2962ff] cursor-pointer transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-[13px] text-gray-300 leading-relaxed">
                                        {item.content}
                                        <span className="text-gray-500 ml-1">...</span>
                                        <button className="text-[#2962ff] font-bold ml-1 hover:underline text-xs">Xem thêm</button>
                                    </p>
                                </>
                            )}
                        </div>

                        {/* FOOTER: Stats & Actions */}
                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-6">
                                <button className="flex items-center gap-1.5 text-gray-500 hover:text-[#f23645] transition-colors group">
                                    <Heart size={18} className="group-hover:fill-[#f23645]" />
                                    <span className="text-xs font-bold">{item.stats.likes}</span>
                                </button>
                                <button className="flex items-center gap-1.5 text-gray-500 hover:text-[#2962ff] transition-colors">
                                    <MessageCircle size={18} />
                                    <span className="text-xs font-bold">{item.stats.comments}</span>
                                </button>
                                <button className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors">
                                    <Bookmark size={18} />
                                    <span className="text-xs font-bold">{item.stats.shares}</span>
                                </button>
                            </div>
                            <button className="text-gray-500 hover:text-white transition-colors">
                                <Share2 size={18} />
                            </button>
                        </div>

                    </div>
                ))}
                
                {/* Fallback for empty state */}
                {feedItems.length === 0 && (
                    <div className="text-center py-10 text-gray-500 text-sm">
                        Chưa có bài viết nào trong mục này.
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
