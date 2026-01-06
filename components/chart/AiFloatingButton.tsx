import React from 'react';
import { Sparkles } from 'lucide-react';

interface AiFloatingButtonProps {
    onClick: () => void;
    notificationCount: number;
}

export const AiFloatingButton: React.FC<AiFloatingButtonProps> = ({ onClick, notificationCount }) => {
    return (
        <div className="relative group">
            <button 
                onClick={onClick}
                className={`
                    flex items-center bg-[#2962ff] hover:bg-[#1e4bd8] text-white rounded-full p-3 
                    shadow-[0_0_20px_rgba(41,98,255,0.3)] transition-all duration-300 backdrop-blur-sm
                    ${notificationCount > 0 ? 'opacity-100' : 'opacity-20 group-hover:opacity-100'}
                `}
            >
                <Sparkles size={20} className="shrink-0" />
                <span className="max-w-0 overflow-hidden group-hover:max-w-[300px] transition-all duration-300 font-bold text-sm whitespace-nowrap ml-0 group-hover:ml-2">
                    Có nên mua HPG thời điểm này không?
                </span>
            </button>
            {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#f23645] text-[10px] font-bold text-white shadow-sm ring-2 ring-[#000000]">
                    {notificationCount}
                </span>
            )}
        </div>
    );
};