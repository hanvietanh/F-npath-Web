
import React, { useState, useEffect, useRef } from 'react';
import { Bot, Sparkles, X, Send, ChevronRight } from 'lucide-react';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const generateAIResponse = (context: string | null) => {
  switch (context) {
    case 'valuation':
      return `**Định giá:**\n\n- **P/E:** 14.2x\n- **P/E TB:** 15.5x\n\n👉 **Kết luận: HẤP DẪN.**\nĐang rẻ hơn lịch sử ~10%. Vùng mua an toàn.`;
    case 'growth':
      return `**Tăng trưởng:**\n\n**Tín hiệu: TÍCH CỰC**\n\n1. **LNST:** +25%\n2. **Động lực:** Biên lãi gộp tăng mạnh do giá vốn giảm.`;
    case 'health':
      return `**Sức khỏe TC:**\n\n**Đánh giá: AN TOÀN**\n\n- **D/E:** 0.8x (An toàn)\n- **Dòng tiền:** +5000 tỷ từ HĐKD.`;
    default:
      return "Tôi có thể giúp gì thêm?";
  }
};

interface CopilotWidgetProps {
    isOpen: boolean;
    onClose: () => void;
    contextQuery: string;
    type: string | null;
}

export const CopilotWidget: React.FC<CopilotWidgetProps> = ({ isOpen, onClose, contextQuery, type }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && type) {
      let userText = "";
      if (type === 'valuation') userText = "Định giá HPG đắt hay rẻ?";
      if (type === 'growth') userText = "Động lực tăng trưởng?";
      if (type === 'health') userText = "Sức khỏe tài chính?";
      if (!type) userText = contextQuery;

      setMessages([{ role: 'user', text: userText }]);
      setIsTyping(true);

      setTimeout(() => {
        const response = generateAIResponse(type);
        setMessages(prev => [...prev, { role: 'ai', text: response }]);
        setIsTyping(false);
      }, 1500);
    } else if (isOpen && contextQuery && !type) {
       setMessages([{ role: 'user', text: contextQuery }]);
       setIsTyping(true);
       setTimeout(() => {
         setMessages(prev => [...prev, { role: 'ai', text: "Đang phân tích..." }]);
         setIsTyping(false);
       }, 1000);
    } else {
        if (!isOpen) {
            // Optional: clear messages or keep history
        }
    }
  }, [isOpen, type, contextQuery]);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div 
        className={`h-full bg-[#13171b] border-l border-gray-800 flex flex-col transition-all duration-300 ease-in-out shrink-0 overflow-hidden ${
            isOpen ? 'w-[220px]' : 'w-0'
        }`}
    >
      <div className="w-[220px] h-full flex flex-col">
          {/* Header */}
          <div className="h-10 bg-[#1a1f26] border-b border-gray-800 flex items-center justify-between px-3 shrink-0">
            <div className="flex items-center gap-2 text-white font-bold">
              <div className="p-1 bg-gradient-to-br from-blue-600 to-indigo-600 rounded shadow-lg shadow-blue-900/50">
                <Bot size={14} className="text-white" />
              </div>
              <span className="text-xs tracking-wide">Copilot</span>
            </div>
            <button 
                onClick={onClose} 
                className="p-1 hover:bg-[#2c2c2e] rounded text-gray-400 hover:text-white transition-colors"
                title="Đóng"
            >
                <ChevronRight size={16} />
            </button>
          </div>
          
          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-2 space-y-3 custom-scrollbar bg-[#0b0e11]" ref={scrollRef}>
            {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-60">
                <div className="w-12 h-12 bg-[#1a1f26] rounded-full flex items-center justify-center mb-2 border border-gray-800">
                    <Sparkles size={24} className="text-blue-500"/>
                </div>
                <p className="text-[10px] font-medium text-center px-4">Trợ lý AI đang sẵn sàng...</p>
            </div>
            )}

            {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[95%] rounded-xl p-2 text-[10px] leading-relaxed whitespace-pre-wrap shadow-sm ${
                msg.role === 'user' 
                    ? 'bg-[#2962ff] text-white rounded-br-none' 
                    : 'bg-[#1e2329] text-gray-200 border border-[#2c2c2e] rounded-bl-none'
                }`}>
                {msg.role === 'ai' && (
                    <div className="flex items-center gap-1 mb-1 text-[#2962ff] font-bold border-b border-gray-700/50 pb-1">
                        <Sparkles size={10}/> 
                        <span>Phân tích</span>
                    </div>
                )}
                {msg.text}
                </div>
            </div>
            ))}
            
            {isTyping && (
            <div className="flex justify-start">
                <div className="bg-[#1e2329] border border-[#2c2c2e] p-2 rounded-xl rounded-bl-none text-gray-400 flex items-center gap-1">
                <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-75"></span>
                <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                </div>
            </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-2 bg-[#13171b] border-t border-gray-800 shrink-0">
            <div className="relative flex items-center">
                <input 
                    type="text" 
                    placeholder="Hỏi thêm..." 
                    className="flex-1 bg-[#0b0e11] border border-gray-700 rounded-lg pl-3 pr-8 py-2 text-[10px] text-white focus:outline-none focus:border-[#2962ff] focus:ring-1 focus:ring-[#2962ff] transition-all placeholder-gray-600"
                />
                <button className="absolute right-1 p-1 bg-[#2962ff] hover:bg-[#1e4bd8] text-white rounded transition-all shadow-lg shadow-blue-900/30">
                    <Send size={12} />
                </button>
            </div>
            <div className="text-[8px] text-center text-gray-600 mt-1.5 font-medium">
                AI Model v3.0
            </div>
          </div>
      </div>
    </div>
  );
};
