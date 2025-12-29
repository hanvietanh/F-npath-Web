import React from 'react';
import { 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Share2, 
  MoreHorizontal, 
  BadgeCheck, 
  Flame, 
  Zap, 
  Sparkles 
} from 'lucide-react';

export const PostCard: React.FC<{ post: any }> = ({ post }) => {
  if (post.type === 'hot_event') {
    return (
      <div className="flex items-start gap-3 p-3 bg-[#000000] border border-[#2a2e39] rounded-lg mb-2 cursor-pointer hover:bg-[#121212] transition-colors">
         <div className="bg-[#1c1c1e] p-2 rounded-full border border-[#2c2c2e]">
             <Flame size={20} className="text-orange-500 fill-orange-500 animate-pulse" />
         </div>
         <div>
             <div className="text-orange-500 font-bold text-sm mb-0.5 flex items-center gap-1">
                 {post.title}
             </div>
             <div className="text-gray-300 text-sm font-medium leading-tight">
                 {post.content}
             </div>
         </div>
      </div>
    );
  }

  if (post.isQuote) {
     return (
        <div className="border-b border-[#1c1c1e] py-4 px-1">
             <div className="flex justify-between items-start mb-3">
                 <div className="flex gap-3">
                     <div className="relative">
                         <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full border-2 border-[#1c1c1e]" />
                         {post.verified && <div className="absolute -bottom-0 -right-0 bg-blue-500 rounded-full p-[2px]"><BadgeCheck size={10} className="text-white fill-blue-500" /></div>}
                     </div>
                     <div>
                         <div className="flex items-center gap-1">
                             <h3 className="font-bold text-sm text-white">{post.author}</h3>
                             {post.verified && <BadgeCheck size={14} className="text-[#2962ff] fill-white" />}
                             <button className="ml-2 text-xs font-bold text-[#2962ff] hover:underline">Theo dõi</button>
                         </div>
                         <div className="flex items-center gap-2">
                             {post.role && <span className="text-[10px] text-orange-400 font-medium bg-orange-400/10 px-1 rounded">{post.role}</span>}
                             <span className="text-[10px] text-gray-500">• {post.time}</span>
                         </div>
                     </div>
                 </div>
                 <MoreHorizontal size={16} className="text-gray-500" />
             </div>
             
             {/* Quote Content */}
             <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white text-center font-medium text-lg leading-relaxed shadow-lg mb-3">
                 "{post.content}"
             </div>

             <div className="flex items-center gap-6 mt-3 text-gray-400">
                <button className="flex items-center gap-1.5 hover:text-[#f23645] transition-colors group">
                    <Heart size={18} className="group-hover:fill-[#f23645]" />
                    <span className="text-xs font-bold">{post.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-[#2962ff] transition-colors">
                    <MessageCircle size={18} />
                    <span className="text-xs font-bold">{post.comments}</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <Bookmark size={18} />
                    <span className="text-xs font-bold">{post.saves}</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-[#2962ff] transition-colors ml-auto">
                    <Sparkles size={16} />
                    <span className="text-xs font-bold">Hỏi AI</span>
                </button>
                 <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <Share2 size={18} />
                </button>
            </div>
        </div>
     );
  }

  // Handle List Content (Finpath Master style)
  if (post.author === 'Finpath Master') {
      return (
        <div className="border-b border-[#1c1c1e] py-4 px-1 last:border-0 hover:bg-[#0b0e11] transition-colors">
            <div className="flex justify-between items-start mb-2">
                <div className="flex gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-[#2962ff] flex items-center justify-center text-white font-bold text-lg border-2 border-[#1c1c1e]">
                            <Zap size={20} fill="white" />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm text-[#2962ff]">{post.author}</h3>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-gray-500">{post.time}</span>
                        </div>
                    </div>
                </div>
                <MoreHorizontal size={16} className="text-gray-500 hover:text-white cursor-pointer" />
            </div>

            <h3 className="text-sm font-bold text-gray-100 mb-1 leading-snug mt-2">
                {post.title}
            </h3>
            
            {post.subtitle && (
                <div className="text-xs font-bold text-gray-400 mb-2">{post.subtitle}</div>
            )}
            
            <div className="text-sm text-gray-300 leading-relaxed mb-3 whitespace-pre-line">
                {post.highlightLinks ? (
                    post.content.split(' ').map((word: string, i: number) => {
                        if (['mwg', 'hpg', 'pvs', 'ctg', 'mbb', 'ctd', 'hhv', 'nt2', 'hah', 'dgw'].includes(word.toLowerCase())) {
                            return <span key={i} className="text-[#2962ff] font-bold cursor-pointer hover:underline uppercase">{word} </span>
                        }
                        return word + ' ';
                    })
                ) : (
                    post.content
                )}
            </div>

            {post.disclaimer && (
                <div className="text-[10px] text-gray-500 italic mb-3">
                    {post.disclaimer}
                </div>
            )}

            <div className="flex items-center gap-6 mt-3 text-gray-400">
                <button className="flex items-center gap-1.5 hover:text-[#f23645] transition-colors group">
                    <Heart size={16} className={`group-hover:fill-[#f23645] ${post.likes > 0 ? 'fill-[#f23645] text-[#f23645]' : ''}`} />
                    <span className="text-xs font-bold">{post.likes}</span>
                </button>
                 <button className="flex items-center gap-1.5 hover:text-[#2962ff] transition-colors">
                    <MessageCircle size={16} />
                </button>
                <button className="flex items-center gap-1.5 hover:text-[#2962ff] transition-colors ml-auto">
                    <Sparkles size={16} />
                    <span className="text-xs font-bold">Hỏi AI</span>
                </button>
                 <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <Share2 size={16} />
                </button>
            </div>
        </div>
      );
  }

  return (
    <div className="border-b border-[#1c1c1e] py-4 px-1 last:border-0 hover:bg-[#0b0e11] transition-colors">
      <div className="flex justify-between items-start mb-2">
         <div className="flex gap-3">
             <div className="relative">
                 <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full border-2 border-[#1c1c1e]" />
                 {/* Simplified verification badge logic for demo */}
                 <div className="absolute -bottom-1 -right-1 bg-[#13171b] rounded-full p-[1px]">
                     <BadgeCheck size={14} className="text-[#2962ff] fill-white" />
                 </div>
             </div>
             <div>
                 <div className="flex items-center gap-2">
                     <h3 className="font-bold text-sm text-white">{post.author}</h3>
                     {post.tag && <button className="text-xs font-bold text-[#2962ff] hover:underline">{post.tag}</button>}
                 </div>
                 <div className="flex items-center gap-2 mt-0.5">
                     {post.role && <span className="text-[10px] text-orange-400 font-medium">{post.role}</span>}
                     <span className="text-[10px] text-gray-500">• {post.time}</span>
                 </div>
             </div>
         </div>
         <MoreHorizontal size={16} className="text-gray-500 hover:text-white cursor-pointer" />
      </div>

      <h3 className="text-sm font-bold text-gray-100 mb-2 leading-snug mt-2">
          {post.title}
      </h3>
      
      <p className="text-sm text-gray-300 leading-relaxed mb-1">
          {post.content} <span className="text-[#2962ff] cursor-pointer hover:underline">Xem thêm</span>
      </p>

      {post.hasImage && (
          <div className="mb-3 mt-2 rounded-lg overflow-hidden border border-[#2a2e39] relative group">
               <div className="w-full h-48 bg-[#1e2329] flex items-center justify-center text-gray-600 relative overflow-hidden">
                  <img src={post.imageUrl} alt="Post content" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               </div>
          </div>
      )}

      <div className="flex items-center gap-6 mt-3 text-gray-400">
          <button className="flex items-center gap-1.5 hover:text-[#f23645] transition-colors group">
              <Heart size={18} className="group-hover:fill-[#f23645]" />
              <span className="text-xs font-bold">{post.likes}</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-[#2962ff] transition-colors">
              <MessageCircle size={18} />
              <span className="text-xs font-bold">{post.comments}</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Bookmark size={18} />
               <span className="text-xs font-bold">{post.saves}</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-[#2962ff] transition-colors ml-auto">
              <Sparkles size={16} />
              <span className="text-xs font-bold">Hỏi AI</span>
          </button>
           <button className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Share2 size={18} />
          </button>
      </div>
    </div>
  );
};
