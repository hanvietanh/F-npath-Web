
import React, { useState, useEffect, useRef } from 'react';
import { Bot, Sparkles, X, Send, ChevronRight, User } from 'lucide-react';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const generateAIResponse = (context: string | null) => {
  // Global Persona: Trading Coach - Sắc sảo, thực chiến, cá nhân hóa theo User Context.
  // Mock User Context: Swing Trader, 8 năm kn, Sợ rủi ro > 10%, Thích VCG/BTC, FOMO cao (0.75).
  
  switch (context) {
    // --- TAB TÀI CHÍNH (Đã có) ---
    case 'valuation':
      return `**Setup "Đáy lợi nhuận" đẹp, nhưng KÌM cái tay lại! 🛑**\n\n` +
             `P/E đang vọt lên 25.x do lợi nhuận chạm đáy. Case này rất giống nhịp **VCG** tạo đáy năm 2020 mà bạn từng theo dõi.\n\n` +
             `**Cảnh báo FOMO (Score: 0.75):**\n` +
             `Giá đã chạy 15% từ nền. Với quy tắc sụt giảm <10% của bạn, mua đuổi bây giờ rủi ro vi phạm Stoploss là rất cao.\n\n` +
             `**Action:** Chờ nhịp test lại nền giá (Pullback) để có điểm vào Swing an toàn hơn.`;
    
    case 'growth':
      return `**Tăng trưởng "khét" như BTC - Đúng gu Swing của bạn. ⚡**\n\n` +
             `Lợi nhuận tăng 30% nhờ **Biên lãi gộp** nới rộng. Dòng tiền vào cuồn cuộn, biến động giá mạnh không kém gì Crypto.\n\n` +
             `**Góc nhìn Swing Trader:**\n` +
             `Đây là dạng cổ phiếu có thể mang lại tỷ suất sinh lời nhanh (Alpha cao).\n\n` +
             `**Lưu ý:** Tuyệt đối tuân thủ kỷ luật cắt lỗ vì biên độ dao động lớn có thể chạm ngưỡng 10% chỉ trong 1-2 phiên sàn.`;
    
    case 'health':
      return `**Cảnh báo: "Quả bom nổ chậm" về đòn bẩy. ❌**\n\n` +
             `Tỷ lệ **D/E lên tới 1.8x**, cao hơn nhiều so với mức trung bình ngành Xây dựng (VCG thường chỉ quanh 1.2x).\n\n` +
             `**Phân tích rủi ro:**\n` +
             `Trong môi trường lãi suất này, chỉ cần một tin xấu là giá sẽ "sập hầm".\n\n` +
             `**Lời khuyên:** Deal này vi phạm nguyên tắc an toàn vốn của bạn. Bỏ qua để bảo vệ NAV.`;

    // --- TAB DASHBOARD (Mới) ---
    case 'shark_flow':
      return `**Soi lệnh Cá Mập: Có mùi "Rũ bỏ" (Shakeout). 🦈**\n\n` +
             `**Dữ liệu:** Cá mập MUA chủ động 15 lệnh lớn (>1 tỷ), nhưng giá không tăng mạnh mà chỉ đi ngang tham chiếu.\n\n` +
             `**Góc nhìn Chuyên gia:**\n` +
             `Họ đang dùng lệnh đè gom hàng, ép nhỏ lẻ ói hàng ra. Kịch bản này y hệt cách lái đánh con **VCG** đoạn tháng 5.\n\n` +
             `**Chiến lược Swing:**\n` +
             `Đừng manh động! Đợi một cây nến Breakout với Vol lớn xác nhận "Cá mập đánh lên" hãy vào. Vào sớm dễ bị chôn vốn.`;

    // --- TAB TIN TỨC (Mới) ---
    case 'news_impact':
      return `**Tin ra là Bán? Coi chừng bẫy tâm lý! 📰**\n\n` +
             `**Sự kiện:** Lợi nhuận tăng trưởng mạnh. Nhưng giá cổ phiếu đã tăng 20% *trước* khi tin ra.\n\n` +
             `**Phân tích (Buy rumor, Sell news):**\n` +
             `Đám đông đang hưng phấn (FOMO Score cao). Khả năng cao sẽ có nhịp chốt lời ngắn hạn T+2.\n\n` +
             `**Lời khuyên:**\n` +
             `Tuyệt đối không mua đua lệnh lúc tin vừa ra. Hãy canh nhịp chỉnh về hỗ trợ MA20 để vào lại vòng mới an toàn hơn.`;

    // --- TAB CỔ ĐÔNG (Mới) ---
    case 'insider_analysis':
      return `**Nội bộ bán ra: Cờ đỏ (Red Flag) cho Swing Trader! 🚩**\n\n` +
             `**Hành động:** Thành viên HĐQT đăng ký bán 200k cổ phiếu ngay vùng kháng cự đỉnh cũ.\n\n` +
             `**Góc nhìn thực chiến:**\n` +
             `Lãnh đạo là người hiểu rõ doanh nghiệp nhất. Họ bán ra là tín hiệu định giá đã căng hoặc KQKD quý tới có vấn đề.\n\n` +
             `**Action:**\n` +
             `Nếu đang có lãi >7%, hãy chốt lời một phần theo lãnh đạo. Bảo vệ thành quả là ưu tiên số 1.`;
             
    default:
      return `**Xin chào, tôi là Trading Coach riêng của bạn.**\n\n` +
             `Tôi đã phân tích hồ sơ giao dịch của bạn (Swing Trader, Risk Averse).\n` +
             `Tôi sẽ giúp bạn soi mã này dưới góc độ:\n` +
             `1. **Định giá:** Có bị FOMO không?\n` +
             `2. **Động lực:** Có đủ "phiêu" như BTC không?\n` +
             `3. **Rủi ro:** Có vi phạm quy tắc sụt giảm 10% không?\n\n` +
             `Hãy chọn các nút chức năng bên cạnh các biểu đồ để tôi phân tích cụ thể.`;
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
    if (isOpen) {
      let userText = "";
      // Map types to user questions for better UX
      if (type === 'valuation') userText = "Định giá mã này đắt hay rẻ? Có nên vào lệnh Swing không?";
      if (type === 'growth') userText = "Động lực tăng trưởng thế nào? Có hợp gu tôi không?";
      if (type === 'health') userText = "Sức khỏe tài chính có rủi ro gì với NAV của tôi không?";
      
      // New mappings
      if (type === 'shark_flow') userText = "Phân tích dòng tiền Cá Mập hôm nay. Có nên vào lệnh theo họ không?";
      if (type === 'news_impact') userText = "Tin này ra tốt hay xấu? Có nên mua theo tin không hay là 'bô'?";
      if (type === 'insider_analysis') userText = "Giao dịch nội bộ này có tín hiệu gì? Tốt hay xấu?";

      if (!type && contextQuery) userText = contextQuery;
      
      if (!userText && messages.length === 0) {
          setIsTyping(true);
          setTimeout(() => {
            const response = generateAIResponse(null);
            setMessages([{ role: 'ai', text: response }]);
            setIsTyping(false);
          }, 800);
          return;
      }

      if (userText) {
          setMessages(prev => [...prev, { role: 'user', text: userText }]);
          setIsTyping(true);

          setTimeout(() => {
            const response = generateAIResponse(type);
            setMessages(prev => [...prev, { role: 'ai', text: response }]);
            setIsTyping(false);
          }, 1500);
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
            isOpen ? 'w-[20%]' : 'w-0'
        }`}
    >
      <div className="w-full h-full flex flex-col">
          {/* Header */}
          <div className="h-10 bg-[#1a1f26] border-b border-gray-800 flex items-center justify-between px-3 shrink-0">
            <div className="flex items-center gap-2 text-white font-bold truncate">
              <div className="p-1 bg-gradient-to-br from-blue-600 to-indigo-600 rounded shadow-lg shadow-blue-900/50 shrink-0">
                <Bot size={14} className="text-white" />
              </div>
              <span className="text-xs tracking-wide truncate">Trading Coach AI</span>
            </div>
            <button 
                onClick={onClose} 
                className="p-1 hover:bg-[#2c2c2e] rounded text-gray-400 hover:text-white transition-colors shrink-0"
                title="Đóng"
            >
                <ChevronRight size={16} />
            </button>
          </div>
          
          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-2 space-y-3 custom-scrollbar bg-[#0b0e11]" ref={scrollRef}>
            {/* User Context Banner */}
            <div className="bg-[#1e2329] border border-[#2c2c2e] rounded-lg p-2 mb-2">
                <div className="flex items-center gap-2 text-[9px] text-gray-400 mb-1 uppercase font-bold tracking-wider border-b border-[#2c2c2e] pb-1">
                    <User size={10} /> User Context
                </div>
                <div className="grid grid-cols-2 gap-y-1 text-[9px] text-gray-300">
                    <div>Style: <span className="text-blue-400 font-bold">Swing Trader</span></div>
                    <div>Exp: <span className="text-white">8 Năm</span></div>
                    <div>Max DD: <span className="text-red-400 font-bold">10%</span></div>
                    <div>Bias: <span className="text-yellow-500 font-bold">VCG, BTC</span></div>
                </div>
            </div>

            {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[95%] rounded-xl p-2.5 text-[11px] leading-relaxed whitespace-pre-wrap shadow-sm ${
                msg.role === 'user' 
                    ? 'bg-[#2962ff] text-white rounded-br-none' 
                    : 'bg-[#1e2329] text-gray-200 border border-[#2c2c2e] rounded-bl-none'
                }`}>
                {msg.role === 'ai' && (
                    <div className="flex items-center gap-1 mb-1.5 text-[#2962ff] font-bold border-b border-gray-700/50 pb-1">
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
                    placeholder="Hỏi Coach..." 
                    className="flex-1 bg-[#0b0e11] border border-gray-700 rounded-lg pl-3 pr-8 py-2 text-xs text-white focus:outline-none focus:border-[#2962ff] focus:ring-1 focus:ring-[#2962ff] transition-all placeholder-gray-600"
                />
                <button className="absolute right-1 p-1 bg-[#2962ff] hover:bg-[#1e4bd8] text-white rounded transition-all shadow-lg shadow-blue-900/30">
                    <Send size={12} />
                </button>
            </div>
            <div className="text-[8px] text-center text-gray-600 mt-1.5 font-medium truncate">
                Mode: Personalized Coaching (Alpha)
            </div>
          </div>
      </div>
    </div>
  );
};
