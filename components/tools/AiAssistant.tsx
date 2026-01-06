import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { AiMessage } from './AiMessage';
import { FULL_HPG_RESPONSE } from './constants';

interface AiAssistantProps {
    onClose?: () => void;
}

export const AiAssistant: React.FC<AiAssistantProps> = () => {
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

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg, idx) => (
          <AiMessage key={idx} role={msg.role} text={msg.text} isStreaming={msg.isStreaming} />
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
  );
};