
import React from 'react';
import { 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Share2, 
  MoreHorizontal, 
  BadgeCheck, 
  Flame, 
  Sparkles 
} from 'lucide-react';
import { ExpertProfile } from './opportunities/constants';

interface PostCardProps {
    post: any;
    onOpenProfile?: (expert: ExpertProfile) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onOpenProfile }) => {
  // Hot Event Card (handled inside NewsFeed header in new design usually, but if passed here...)
  if (post.type === 'hot_event') {
     return (
       <div className="flex items-center gap-3 p-3 bg-[#111] border border-[#2a2e39] rounded-lg mb-4">
           <div className="bg-[#2a2e39] p-2 rounded-full">
                <Flame size={18} className="text-orange-500 fill-orange-500" />
           </div>
           <div>
               <div className="text-orange-500 font-bold text-xs uppercase mb-0.5">{post.title}</div>
               <div className="text-gray-300 text-sm">{post.content}</div>
           </div>
       </div>
     )
  }

  const isQuote = post.isQuote || post.type === 'quote';

  const handleProfileClick = () => {
      if (onOpenProfile) {
          const profile: ExpertProfile = {
              name: post.author,
              avatar: post.avatar,
              role: post.role || 'Chuyên gia',
              isVerified: post.verified
          };
          onOpenProfile(profile);
      }
  };

  return (
    <div className="border-b border-[#1c1c1e] py-4 px-0 last:border-0 hover:bg-transparent transition-colors mb-2">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
         <div className="flex gap-3">
             <div className="relative cursor-pointer" onClick={handleProfileClick}>
                 <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full border border-[#2c2c2e] hover:border-[#2962ff] transition-colors object-cover" />
                 {post.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-[#000] rounded-full p-[1px]">
                         <BadgeCheck size={14} className="text-[#2962ff] fill-white" />
                    </div>
                 )}
             </div>
             <div>
                 <div className="flex items-center gap-2">
                     <h3 
                        className="font-bold text-sm text-white hover:underline cursor-pointer hover:text-[#2962ff] transition-colors"
                        onClick={handleProfileClick}
                     >
                         {post.author}
                     </h3>
                     {post.tag && <button className="text-xs font-medium text-[#2962ff] hover:text-[#2962ff]/80">{post.tag}</button>}
                 </div>
                 <div className="flex items-center gap-2 mt-0.5">
                     {post.role && <span className="text-[10px] text-yellow-500 font-medium">{post.role}</span>}
                     <span className="text-[10px] text-gray-500">• {post.time}</span>
                 </div>
             </div>
         </div>
         <MoreHorizontal size={16} className="text-gray-500 hover:text-white cursor-pointer" />
      </div>

      {/* Content */}
      <div className="mb-3">
          {post.title && <h3 className="text-sm font-bold text-white mb-1">{post.title}</h3>}
          
          {isQuote ? (
            <div className="p-4 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] text-white text-sm font-medium leading-relaxed shadow-lg">
                {post.content}
            </div>
          ) : (
            <p className="text-sm text-gray-300 leading-relaxed">
                {post.content} <span className="text-[#2962ff] cursor-pointer hover:underline text-xs font-bold ml-1">Xem thêm</span>
            </p>
          )}

          {post.hasImage && post.imageUrl && (
              <div className="mt-3 rounded-lg overflow-hidden border border-[#2c2c2e]">
                  <img src={post.imageUrl} className="w-full h-auto" alt="content" />
              </div>
          )}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center gap-6 text-gray-400">
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
