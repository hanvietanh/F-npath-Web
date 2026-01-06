import React from 'react';
import { User, Sparkles } from 'lucide-react';

interface AiMessageProps {
  role: 'user' | 'ai';
  text: string;
  isStreaming?: boolean;
}

export const AiMessage: React.FC<AiMessageProps> = ({ role, text, isStreaming }) => {
  // Simple Markdown Parser for Bold text
  const renderMessageContent = (content: string) => {
    // Split by **bold** markers
    const parts = content.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="text-white font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className={`flex gap-3 ${role === 'user' ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${role === 'ai' ? 'bg-[#2962ff]/20 text-[#2962ff]' : 'bg-gray-700 text-gray-300'}`}>
        {role === 'ai' ? <Sparkles size={16} /> : <User size={18} />}
      </div>
      <div className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed whitespace-pre-wrap ${
        role === 'ai' 
          ? 'bg-[#1e2329] border border-[#2d3748] text-gray-200' 
          : 'bg-[#2962ff] text-white'
      }`}>
        {renderMessageContent(text)}
        {isStreaming && (
            <span className="inline-block w-1.5 h-3 ml-1 bg-[#2962ff] animate-pulse align-middle"></span>
        )}
      </div>
    </div>
  );
};