
import React, { useState } from 'react';
import { Clock, Sparkles, FileText, Globe } from 'lucide-react';
import { newsData } from '../stockDetailConstants';

interface NewsTabProps {
    onAskCopilot: (type: string | null, query?: string) => void;
}

export const NewsTab: React.FC<NewsTabProps> = ({ onAskCopilot }) => {
  const [newsFilter, setNewsFilter] = useState('all');
  const [selectedNews, setSelectedNews] = useState(newsData[0]);

  const filteredNews = newsData.filter(item => {
    if (newsFilter === 'all') return true;
    return item.type === newsFilter;
  });

  return (
    <div className="flex h-full w-full bg-[#0b0e11]">
        <div className="w-[40%] border-r border-gray-800 flex flex-col min-w-[320px]">
            <div className="p-2 border-b border-gray-800 flex gap-2 overflow-x-auto no-scrollbar bg-[#101317]">
            {['all', 'official', 'press', 'rumor'].map(f => (
                <button key={f} onClick={() => setNewsFilter(f)} className={`px-3 py-1.5 rounded text-[11px] font-medium whitespace-nowrap transition ${newsFilter === f ? 'bg-blue-600 text-white' : 'bg-[#1e2530] text-gray-400 hover:text-white hover:bg-[#2a3441]'}`}>{f === 'all' ? 'Tất cả' : f}</button>
            ))}
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredNews.map((news) => (
                <div key={news.id} onClick={() => setSelectedNews(news)} className={`p-3 border-b border-gray-800 cursor-pointer transition hover:bg-[#1e2530] group ${selectedNews?.id === news.id ? 'bg-[#1e2530] border-l-2 border-l-blue-500' : 'border-l-2 border-l-transparent'}`}>
                <div className="flex justify-between items-center mb-1"><div className="flex items-center gap-2"><span className={`text-[10px] font-mono px-1.5 rounded ${news.type === 'official' ? 'bg-purple-900/40 text-purple-400 border border-purple-700/50' : news.type === 'rumor' ? 'bg-yellow-900/40 text-yellow-500 border border-yellow-700/50' : 'bg-blue-900/30 text-blue-400 border border-blue-800/50'}`}>{news.source}</span>{news.isHot && <span className="text-[10px] text-red-500 animate-pulse font-bold">LIVE 🔥</span>}</div><span className="text-[10px] text-gray-500">{news.time}</span></div>
                <h4 className={`text-xs font-medium mb-1 line-clamp-2 ${selectedNews?.id === news.id ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>{news.title}</h4>
                <p className="text-[10px] text-gray-500 line-clamp-2">{news.summary}</p>
                </div>
            ))}
            </div>
        </div>
        <div className="w-[60%] bg-[#0b0e11] flex flex-col">
        {selectedNews ? (
            <>
            <div className="p-4 border-b border-gray-800 bg-[#101317]">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] text-gray-500 flex items-center gap-1"><Clock size={12}/> {selectedNews.date} lúc {selectedNews.time}</span>
                    <button 
                        onClick={() => onAskCopilot('news_impact', '')}
                        className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded text-[10px] text-white shadow-lg border border-emerald-500/30 transition"
                    >
                        <Sparkles size={10}/> AI: Tóm tắt & Tác động
                    </button>
                </div>
                <h2 className="text-lg font-bold text-white leading-snug">{selectedNews.title}</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-[#0b0e11]">
                {selectedNews.image && <div className="mb-6 w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700 relative overflow-hidden group"><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div><div className="text-gray-500 flex flex-col items-center z-10"><FileText size={48} strokeWidth={1} className="mb-2 opacity-50"/><span className="text-xs italic">[Ảnh minh họa bài viết]</span></div></div>}
                <div className="prose prose-invert prose-sm max-w-none text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedNews.content }}></div>
            </div>
            </>
        ) : <div className="flex-1 flex flex-col items-center justify-center text-gray-500"><Globe size={48} strokeWidth={1} className="mb-2 opacity-20"/><p>Chọn một tin để xem chi tiết</p></div>}
        </div>
    </div>
  );
};
