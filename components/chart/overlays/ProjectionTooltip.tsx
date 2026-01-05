import React from 'react';
import { FileText } from 'lucide-react';

export const ProjectionTooltip: React.FC = () => {
  return (
      <div className="absolute top-1/4 left-[70%] transform -translate-x-1/2 z-50 animate-in zoom-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white text-black p-3 rounded-xl border-2 border-yellow-500 shadow-2xl flex items-start gap-3 max-w-xs relative">
              <div className="text-yellow-600 bg-yellow-50 p-2 rounded-lg">
                  <FileText size={20} />
              </div>
              <div>
                  <div className="text-sm font-bold leading-snug">7/10 lần mẫu hình này xuất hiện, giá đã tăng 5% trong T+5.</div>
              </div>
          </div>
      </div>
  );
};