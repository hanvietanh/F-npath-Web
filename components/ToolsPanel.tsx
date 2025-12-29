import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, Pin, PinOff, MoreHorizontal, User, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { PanelMode, ToolId } from '../types';

interface ToolsPanelProps {
  activeTool: ToolId | null;
  mode: PanelMode;
  onTogglePin: () => void;
  onClose: () => void;
}

export const ToolsPanel: React.FC<ToolsPanelProps> = ({
  activeTool,
  mode,
  onTogglePin,
  onClose
}) => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Hello! I am your Finpath Gemini Assistant. Ask me about specific tickers, market trends, or technical analysis.' }
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

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userInput = input;
    setMessages(prev => [...prev, { role: 'user', text: userInput }]);
    setInput('');
    setIsLoading(true);

    try {
      // Initialize Gemini Client
      // Note: In a real production app, API keys should be handled securely on the backend.
      // For this prototype, we assume process.env.API_KEY is available.
      if (!process.env.API_KEY) {
         throw new Error("API Key not found.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Use gemini-3-flash-preview for fast text tasks
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
      // Fallback for demo if API key fails or network error
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                    {msg.text}
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
                  placeholder="Ask Gemini about market trends..."
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