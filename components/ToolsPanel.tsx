import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Pin, PinOff, MoreHorizontal, User, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { PanelMode, ToolId } from '../types';

interface ToolsPanelProps {
  activeTool: ToolId | null;
  mode: PanelMode;
  onTogglePin: () => void;
  onClose: () => void;
}

const FULL_HPG_RESPONSE = `**FINPATH AI: CÓ NÊN MUA [HPG] KHÔNG? (Cập nhật lúc 14:15)**

**KẾT LUẬN: MUA (An toàn)** (AI chấm điểm: 8/10 - Cơ hội tăng giá cao hơn rủi ro)

**1. Soi Quá Khứ (Lịch sử có lặp lại?)**
• **Mẫu hình:** Giá đang đi ngang tích lũy giống 8 lần trong quá khứ.
• **Kết quả cũ:** 6/8 lần giá đã tăng mạnh sau khi đi ngang thế này.
• **Ý nghĩa:** Cửa thắng sáng (xác suất 75%).

**2. Tin Đồn & Đám Đông (Sentiment 360°)**
AI phân tách luồng thông tin từ 50 hội nhóm và KOLs lớn nhất:

• **Phe Bò (Bullish) - Nguồn: Facebook Groups & Báo Chí**
   - **Tin đồn KQKD:** Group “F189...” rò rỉ tin lợi nhuận Quý này của HPG vượt 20% so với cùng kỳ.
   - **KOLs hô hào:** Chuyên gia Long Lãng vừa đăng chart HPG với caption "Siêu cổ phiếu chu kỳ mới", view break đỉnh 30.x.

• **Phe Gấu (Bearish) - Nguồn: Zalo Room VIP & Telegram**
   - **Rủi ro ngắn hạn:** Room “VPS Broker...” cảnh báo áp lực chốt lời vùng 29.5 rất mạnh (vùng kẹp hàng tháng 9).
   - **Tin vĩ mô:** Giá than cốc thế giới (nguyên liệu đầu vào) đang nhích nhẹ, có thể ảnh hưởng biên lợi nhuận (Margin) quý sau.

**3. Giá Này Đắt Hay Rẻ? (Cơ bản)**
• **So với định giá:** Giá hiện tại (28.000đ) vẫn **RẺ HƠN** giá mục tiêu của các công ty chứng khoán (34.000đ). Dư địa tăng còn lớn.
• **Sóng Ngành:** Cả dòng Thép hôm nay đều xanh tím, tiền đang vào mạnh cả ngành chứ không chỉ riêng mã này. Nước lên thuyền lên.

**4. Kịch Bản Tương Lai (Dự phóng)**
• **Kịch bản tốt:** Nếu vượt giá 28.5, giá sẽ bay thẳng lên 30.000.
• **Cản trở:** Lưu ý vùng giá 29.5 có nhiều người đang bị lỗ (kẹp hàng), lên đó họ sẽ bán ra hòa vốn, giá sẽ rung lắc.

**HÀNH ĐỘNG NGAY**
• 🟢 **MUA:** Vùng giá 28.0 - 28.2 (Mua 30% tiền).
• 🔴 **CẮT LỖ:** Nếu giá thủng 27.0 (Xấu, bỏ chạy).
• 🎯 **CHỐT LỜI:** Tại giá 30.0 (Lãi dự kiến ~7%).`;

export const ToolsPanel: React.FC<ToolsPanelProps> = ({
  activeTool,
  mode,
  onTogglePin,
  onClose
}) => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string, isStreaming?: boolean}[]>([
    { role: 'user', text: 'Có nên mua HPG thời điểm này không?' }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Initial Auto-Reply Trigger
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'user') {
        const timeout = setTimeout(() => {
             setMessages(prev => [...prev, { role: 'ai', text: '', isStreaming: true }]);
        }, 500);
        return () => clearTimeout(timeout);
    }
  }, [messages.length]);

  // Streaming Effect
  useEffect(() => {
      const lastMsgIdx = messages.length - 1;
      const lastMsg = messages[lastMsgIdx];
      
      if (lastMsg?.role === 'ai' && lastMsg?.isStreaming) {
          if (lastMsg.text.length < FULL_HPG_RESPONSE.length) {
               const timeout = setTimeout(() => {
                   setMessages(prev => {
                       const newMsgs = [...prev];
                       // Typing speed: 3 chars per 10ms
                       const nextChunk = FULL_HPG_RESPONSE.slice(lastMsg.text.length, lastMsg.text.length + 3);
                       newMsgs[lastMsgIdx] = { 
                           ...lastMsg, 
                           text: lastMsg.text + nextChunk
                       };
                       return newMsgs;
                   });
               }, 10);
               return () => clearTimeout(timeout);
          } else {
               // Done streaming
               setMessages(prev => {
                   const newMsgs = [...prev];
                   newMsgs[lastMsgIdx] = { ...lastMsg, isStreaming: false };
                   return newMsgs;
               });
          }
      }
  }, [messages]);

  // Simple Markdown Parser for Bold text
  const renderMessageContent = (text: string) => {
    // Split by **bold** markers
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="text-white font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userInput = input;
    setMessages(prev => [...prev, { role: 'user', text: userInput }]);
    setInput('');
    setIsLoading(true);

    try {
      if (!process.env.API_KEY) {
         // Fallback simulation
         setTimeout(() => {
             setMessages(prev => [...prev, { 
                 role: 'ai', 
                 text: "Tôi đang phân tích yêu cầu của bạn dựa trên dữ liệu thị trường mới nhất. Vui lòng đợi trong giây lát..." 
             }]);
             setIsLoading(false);
         }, 1000);
         return;
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
            {
                role: 'user',
                parts: [
                    { 
                        text: `You are a financial trading assistant for the Finpath Pro terminal. 
                        Context: The user is looking at the Vietnamese stock market (HOSE). 
                        User Query: ${userInput}` 
                    }
                ]
            }
        ],
        config: {
           systemInstruction: "Keep answers concise, professional, and data-driven. Use markdown for formatting."
        }
      });

      const text = response.text || "I couldn't generate a response at this time.";
      setMessages(prev => [...prev, { role: 'ai', text: text }]);

    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { 
          role: 'ai', 
          text: "I'm having trouble connecting to the Gemini network right now. Please check your API key configuration." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getToolTitle = () => {
    switch (activeTool) {
      case 'ask-ai': return 'Hỏi Gemini Assistant';
      case 'chat': return 'Community Chat';
      case 'intelligence': return 'Market Intelligence';
      case 'news': return 'AI Curated News';
      default: return 'Tools';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#13171b] border-l border-[#1e2329]">
      {/* Panel Header */}
      <div className="flex items-center justify-between px-4 h-12 border-b border-[#1e2329] bg-[#1a1f26]">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-200">
            {activeTool === 'ask-ai' && <Sparkles size={16} className="text-[#2962ff]" />}
            {getToolTitle()}
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={onTogglePin}
            className={`p-1.5 rounded hover:bg-[#2d3748] transition-colors ${mode === 'pinned' ? 'text-[#2962ff]' : 'text-gray-400'}`}
            title={mode === 'pinned' ? "Unpin panel" : "Pin panel"}
          >
            {mode === 'pinned' ? <PinOff size={16} /> : <Pin size={16} />}
          </button>
          <button 
            onClick={onClose}
            className="p-1.5 rounded hover:bg-[#2d3748] text-gray-400 hover:text-red-400 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-hidden flex flex-col relative">
        {activeTool === 'ask-ai' ? (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'ai' ? 'bg-[#2962ff]/20 text-[#2962ff]' : 'bg-gray-700 text-gray-300'}`}>
                    {msg.role === 'ai' ? <Sparkles size={16} /> : <User size={18} />}
                  </div>
                  <div className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'ai' 
                      ? 'bg-[#1e2329] border border-[#2d3748] text-gray-200' 
                      : 'bg-[#2962ff] text-white'
                  }`}>
                    {renderMessageContent(msg.text)}
                    {msg.isStreaming && (
                        <span className="inline-block w-1.5 h-3 ml-1 bg-[#2962ff] animate-pulse align-middle"></span>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                  <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#2962ff]/20 text-[#2962ff] flex items-center justify-center flex-shrink-0">
                          <Sparkles size={16} />
                      </div>
                      <div className="bg-[#1e2329] border border-[#2d3748] text-gray-200 px-4 py-3 rounded-lg flex items-center gap-2">
                          <Loader2 size={16} className="animate-spin text-[#2962ff]" />
                          <span className="text-xs text-gray-400">Gemini is thinking...</span>
                      </div>
                  </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-[#1e2329] bg-[#13171b]">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Hỏi Gemini về thị trường..."
                  disabled={isLoading}
                  className="w-full bg-[#0b0e11] border border-[#2d3748] rounded-lg pl-4 pr-10 py-3 text-sm focus:outline-none focus:border-[#2962ff] focus:ring-1 focus:ring-[#2962ff] transition-all text-white placeholder-gray-500 disabled:opacity-50"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-2 p-1.5 bg-[#2962ff] rounded hover:bg-[#1e4bd8] text-white transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed"
                >
                  <Send size={14} />
                </button>
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-gray-500 font-mono uppercase">
                <span>Model: Gemini 3 Flash</span>
                <span>Powered by Google</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 flex-col gap-3">
             <div className="w-16 h-16 rounded-full bg-[#1e2329] flex items-center justify-center">
                <MoreHorizontal size={32} />
             </div>
             <p className="text-sm">Content for {getToolTitle()} is coming soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};