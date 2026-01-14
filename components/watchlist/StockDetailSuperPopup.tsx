
import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, Star, Zap, Activity, BarChart2, Layers, 
  TrendingUp, TrendingDown, DollarSign, Clock, 
  MoreHorizontal, Maximize2, Search, Settings, 
  Filter, ArrowUpRight, ArrowDownRight, PieChart as PieChartIcon,
  FileText, Globe, MessageSquare, ExternalLink, Share2, Printer,
  Users, Briefcase, Calendar, AlertCircle, Bot, Sparkles, X, Send,
  Scale, ShieldCheck, LineChart as LineChartIcon
} from 'lucide-react';
import { 
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Area, Cell, ReferenceLine, 
  LineChart, PieChart, Pie, Cell as PieCell, Legend,
  BarChart
} from 'recharts';

// --- TYPES & INTERFACES ---

interface StockDetailSuperPopupProps {
  symbol: string;
  onClose: () => void;
}

interface Trade {
  time: string;
  price: string | number;
  vol: number;
  side: 'M' | 'B';
  big?: boolean;
}

interface FinancialData {
  periods: string[];
  ratiosTable: { name: string; values: number[]; format?: string }[];
  revenueChart: { period: string; revenue: number; profit: number; growth: number }[];
  profitChart: { period: string; gross: number; net: number; growth: number }[];
  balanceSheetChart: { period: string; shortAsset: number; longAsset: number; liabilities: number; equity: number }[];
  incomeStatement: { id: number; label: string; values: number[]; yoy: number; trend: number[]; highlight?: boolean; color?: string; subRow?: boolean; isPercent?: boolean }[];
}

interface Message {
  role: 'user' | 'ai';
  text: string;
}

interface ChartPoint {
  time: string;
  price: string;
  ma20: string;
  ma50: string;
  vol: number;
}

// --- MOCK DATA GENERATION ---

const generateChartData = () => {
  const data: ChartPoint[] = [];
  let price = 28.0;
  for (let i = 0; i < 50; i++) {
    const change = (Math.random() - 0.45) * 0.5;
    price += change;
    data.push({
      time: `10:${i < 10 ? '0' + i : i}`,
      price: price.toFixed(2),
      ma20: (price - 0.2).toFixed(2),
      ma50: (price - 0.5).toFixed(2),
      vol: Math.floor(Math.random() * 5000) + 1000,
    });
  }
  return data;
};

const orderBookData = {
  asks: [
    { price: 28.55, vol: 50200, percent: 80 },
    { price: 28.50, vol: 20500, percent: 40 },
    { price: 28.45, vol: 15000, percent: 30 },
    { price: 28.40, vol: 5000, percent: 10 },
    { price: 28.35, vol: 2000, percent: 5 },
  ],
  bids: [
    { price: 28.30, vol: 12000, percent: 25 },
    { price: 28.25, vol: 45000, percent: 70 },
    { price: 28.20, vol: 100000, percent: 100 },
    { price: 28.15, vol: 30000, percent: 50 },
    { price: 28.10, vol: 15000, percent: 25 },
  ]
};

const initialLiveTape: Trade[] = [
  { time: '10:45:05', price: 28.50, vol: 100000, side: 'M', big: true },
  { time: '10:45:02', price: 28.50, vol: 10000, side: 'M', big: false },
  { time: '10:44:55', price: 28.45, vol: 5000, side: 'B', big: false },
  { time: '10:44:48', price: 28.45, vol: 60000, side: 'B', big: true },
  { time: '10:44:30', price: 28.50, vol: 2000, side: 'M', big: false },
];

const financialDataV2: FinancialData = {
  periods: ['Q3/2023', 'Q4/2023', 'Q1/2024', 'Q2/2024', 'Q3/2024'],
  ratiosTable: [
    { name: 'P/E', values: [15.2, 14.8, 13.5, 14.1, 14.2] },
    { name: 'P/B', values: [1.8, 1.9, 2.0, 2.1, 2.1] },
    { name: 'ROE (%)', values: [16.2, 17.1, 17.5, 18.0, 18.5] },
    { name: 'Vốn hóa (Tỷ)', values: [145230, 152100, 160500, 158200, 165400], format: 'number' },
  ],
  revenueChart: [
    { period: 'Q3/23', revenue: 28700, profit: 2000, growth: 5.5 },
    { period: 'Q4/23', revenue: 29500, profit: 2200, growth: 8.2 },
    { period: 'Q1/24', revenue: 31000, profit: 2500, growth: 12.5 },
    { period: 'Q2/24', revenue: 33000, profit: 2800, growth: 15.0 },
    { period: 'Q3/24', revenue: 35000, profit: 3500, growth: 18.6 },
  ],
  profitChart: [
    { period: 'Q3/23', gross: 3800, net: 2000, growth: 10.2 },
    { period: 'Q4/23', gross: 4000, net: 2200, growth: 15.5 },
    { period: 'Q1/24', gross: 4500, net: 2500, growth: 18.2 },
    { period: 'Q2/24', gross: 5000, net: 2800, growth: 22.0 },
    { period: 'Q3/24', gross: 6000, net: 3500, growth: 25.0 },
  ],
  balanceSheetChart: [
    { period: 'Q3/23', shortAsset: 45000, longAsset: 100000, liabilities: 65000, equity: 80000 },
    { period: 'Q4/23', shortAsset: 48000, longAsset: 102000, liabilities: 68000, equity: 82000 },
    { period: 'Q1/24', shortAsset: 50000, longAsset: 105000, liabilities: 70000, equity: 85000 },
    { period: 'Q2/24', shortAsset: 55000, longAsset: 108000, liabilities: 75000, equity: 88000 },
    { period: 'Q3/24', shortAsset: 60000, longAsset: 110000, liabilities: 78000, equity: 92000 },
  ],
  incomeStatement: [
    { id: 1, label: 'Doanh thu thuần', values: [35000, 33000, 31000, 29500, 28700], yoy: 18.6, trend: [28700, 29500, 31000, 33000, 35000] },
    { id: 2, label: 'Lợi nhuận gộp', values: [6000, 5000, 4500, 4000, 3800], yoy: 20.0, trend: [3800, 4000, 4500, 5000, 6000], highlight: true },
    { id: 3, label: 'LNST (Lãi ròng)', values: [3500, 2800, 2500, 2200, 2000], yoy: 25.0, trend: [2000, 2200, 2500, 2800, 3500], highlight: true, color: 'text-emerald-400' },
  ],
};

const newsData = [
  {
    id: 1,
    time: '10:30 AM',
    date: '14/01',
    source: 'CafeF',
    type: 'press',
    title: 'HPG báo lãi quý 3 đạt 3.500 tỷ, cao nhất trong 2 năm qua',
    summary: 'Tập đoàn Hòa Phát (HPG) vừa công bố kết quả kinh doanh quý 3/2024 với doanh thu đạt 35.000 tỷ đồng, lợi nhuận sau thuế đạt 3.500 tỷ đồng, tăng trưởng 25% so với cùng kỳ.',
    content: `
      <p class="mb-4">Tập đoàn Hòa Phát (HPG) vừa công bố báo cáo tài chính hợp nhất quý 3/2024 với những con số ấn tượng, đánh dấu sự hồi phục mạnh mẽ của ngành thép trong nửa cuối năm.</p>
      <h4 class="font-bold text-white mb-2">Doanh thu và lợi nhuận tăng trưởng mạnh</h4>
      <p class="mb-4">Theo đó, doanh thu thuần trong kỳ đạt 35.000 tỷ đồng, tăng 18.6% so với cùng kỳ năm trước. Động lực chính đến từ sản lượng tiêu thụ thép xây dựng và thép cuộn cán nóng (HRC) tăng mạnh nhờ nhu cầu trong nước phục hồi và thị trường xuất khẩu khởi sắc.</p>
      <div class="my-4 p-4 bg-gray-800 rounded border-l-4 border-emerald-500 italic text-gray-300">
        "Đây là mức lợi nhuận cao nhất của Tập đoàn trong vòng 8 quý trở lại đây, cho thấy các biện pháp quản trị hàng tồn kho và tối ưu hóa chi phí đầu vào đã phát huy tác dụng." - Đại diện Hòa Phát chia sẻ.
      </div>
      <p class="mb-4">Lợi nhuận gộp đạt 6.000 tỷ đồng, biên lợi nhuận gộp được cải thiện đáng kể lên mức 17.1% so với mức 13.5% của quý 4/2023. Kết quả, Hòa Phát báo lãi ròng 3.500 tỷ đồng, vượt xa dự báo của nhiều công ty chứng khoán.</p>
      <h4 class="font-bold text-white mb-2">Triển vọng quý 4</h4>
      <p>Ban lãnh đạo kỳ vọng nhu cầu thép sẽ tiếp tục tăng trong mùa xây dựng cuối năm, đặc biệt là các dự án đầu tư công trọng điểm.</p>
    `,
    image: true,
    isHot: false
  },
  {
    id: 2,
    time: '09:15 AM',
    date: '14/01',
    source: 'HSX',
    type: 'official',
    title: 'CBTT: Nghị quyết HĐQT về việc trả cổ tức bằng tiền mặt tỷ lệ 10%',
    summary: 'Hội đồng quản trị Công ty CP Tập đoàn Hòa Phát thông qua Nghị quyết chốt danh sách cổ đông để chi trả cổ tức bằng tiền mặt năm 2023.',
    content: `...`,
    isHot: true,
    image: false
  },
];

const shareholderData = {
  structure: [
    { name: 'Nước ngoài', value: 25, color: '#3b82f6' }, 
    { name: 'Ban lãnh đạo & TC', value: 40, color: '#10b981' }, 
    { name: 'Trôi nổi (Free float)', value: 35, color: '#6b7280' }, 
  ],
  majorHolders: [
    { id: 1, name: 'Trần Đình Long (Chủ tịch HĐQT)', shares: '1,500,000,000', percent: '26.5%', date: '30/06/2024' },
    { id: 2, name: 'Dragon Capital (Quỹ ngoại)', shares: '350,000,000', percent: '6.2%', date: '15/12/2024' },
    { id: 3, name: 'Vũ Thị Hiền (Vợ CT)', shares: '280,000,000', percent: '5.1%', date: '30/06/2024' },
    { id: 4, name: 'Trần Vũ Minh (Con trai CT)', shares: '100,000,000', percent: '1.8%', date: '30/06/2024' },
    { id: 5, name: 'VinaCapital', shares: '50,000,000', percent: '0.9%', date: '10/12/2024' },
  ],
  insiderDeals: [
    { id: 1, person: 'Nguyễn Văn A', position: 'TV HĐQT', type: 'Mua khớp lệnh', vol: '+500,000', price: '27,500', date: '10/01/2026', tag: 'Đăng ký mới', color: 'text-emerald-400' },
    { id: 2, person: 'Trần Thị B', position: 'Người LQ', type: 'Bán khớp lệnh', vol: '-200,000', price: '29,100', date: '05/12/2025', tag: 'Đã kết thúc', color: 'text-red-400' },
    { id: 3, person: 'Phạm Văn C', position: 'Phó TGĐ', type: 'Mua ESOP', vol: '+1,000,000', price: '10,000', date: '01/11/2025', tag: 'Hoàn tất', color: 'text-blue-400' },
  ],
  dividends: [
    { year: 2024, type: 'Tiền mặt', ratio: '10%', exDate: '25/05/2024' },
    { year: 2024, type: 'Cổ phiếu', ratio: '15%', exDate: '25/05/2024' },
    { year: 2023, type: 'Tiền mặt', ratio: '5%', exDate: '10/06/2023' },
    { year: 2022, type: 'Tiền mặt', ratio: '5%', exDate: '20/06/2022' },
    { year: 2022, type: 'Cổ phiếu', ratio: '30%', exDate: '20/06/2022' },
  ]
};

// Component Sparkline nhỏ cho bảng
const TableSparkline = ({ data, color = "#10b981" }: { data: number[], color?: string }) => (
  <div className="h-8 w-24">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data.map((v, i) => ({ i, v }))}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// --- COPILOT LOGIC ENGINE ---
const generateAIResponse = (context: string | null) => {
  switch (context) {
    case 'valuation':
      return `**Định giá đắt hay rẻ? (Góc nhìn Pro)**\n\n- **P/E hiện tại:** 14.2x\n- **P/E TB 5 năm:** 15.5x\n\n👉 **Kết luận: HẤP DẪN.**\nĐịnh giá đang rẻ hơn lịch sử ~10%. Quan trọng hơn, đây là mức P/E của giai đoạn "phục hồi lợi nhuận". Khi LNST tiếp tục tăng trong các quý tới, P/E forward sẽ còn rẻ hơn nữa. Đây là vùng mua tích sản an toàn.`;
    case 'growth':
      return `**Soi động lực tăng trưởng**\n\n**Tín hiệu: TÍCH CỰC (Chất lượng cao)**\n\n1. **Tốc độ:** Lợi nhuận ròng tăng 25% (nhanh hơn doanh thu 18%).\n2. **Chất lượng:** Động lực chính đến từ **Biên lãi gộp (Gross Margin)** mở rộng mạnh mẽ (giá vốn giảm, hiệu quả lò cao tốt).\n👉 Doanh nghiệp đang làm ăn thực chất, không phải lãi từ thủ thuật tài chính.`;
    case 'health':
      return `**Check sức khỏe tài chính**\n\n**Đánh giá: AN TOÀN CAO**\n\n- **Đòn bẩy:** Tỷ lệ D/E ~ 0.8x (Thấp hơn nhiều mức báo động 1.5x).\n- **Thanh khoản:** Dòng tiền từ HĐKD dương mạnh (+5000 tỷ), dư sức chi trả lãi vay và funding cho dự án Dung Quất 2 mà không cần vay mới quá nhiều.\n- **Rủi ro:** Không đáng ngại.`;
    default:
      return "Tôi có thể giúp gì thêm cho bạn về mã cổ phiếu này?";
  }
};

// --- COPILOT COMPONENT ---
const CopilotWidget = ({ isOpen, onClose, contextQuery, type, onAsk }: { isOpen: boolean; onClose: () => void; contextQuery: string; type: string | null; onAsk: (q: string) => void }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && type) {
      let userText = "";
      if (type === 'valuation') userText = "Phân tích định giá HPG: Đắt hay Rẻ so với lịch sử?";
      if (type === 'growth') userText = "Động lực tăng trưởng quý này đến từ đâu? Có bền vững không?";
      if (type === 'health') userText = "Sức khỏe tài chính HPG thế nào? Nợ vay có rủi ro không?";
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
         setMessages(prev => [...prev, { role: 'ai', text: "Tôi đang phân tích dữ liệu..." }]);
         setIsTyping(false);
       }, 1000);
    } else {
        setMessages([]); 
    }
  }, [isOpen, type, contextQuery]);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  if (!isOpen) return null;

  return (
    <div className="absolute right-4 bottom-4 w-[350px] h-[500px] bg-[#1a2029] border border-blue-500/50 rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-gradient-to-r from-blue-900 to-[#1a2029] p-3 flex justify-between items-center border-b border-gray-700 shrink-0">
        <div className="flex items-center gap-2 text-white font-bold">
          <div className="p-1 bg-blue-500 rounded-lg"><Bot size={16} /></div>
          <span>Finpath Copilot</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition"><X size={18} /></button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#0b0e11]" ref={scrollRef}>
        {messages.length === 0 && (
           <div className="text-center text-gray-500 mt-10">
              <Sparkles size={32} className="mx-auto mb-2 opacity-50"/>
              <p className="text-xs">Chọn một chỉ số để Copilot phân tích...</p>
           </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed whitespace-pre-wrap shadow-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-[#1e2530] text-gray-200 border border-gray-700 rounded-bl-none'
            }`}>
              {msg.role === 'ai' && <div className="flex items-center gap-1 mb-1 text-emerald-400 font-bold border-b border-gray-700 pb-1"><Sparkles size={10}/> Phân tích chuyên sâu</div>}
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#1e2530] text-gray-400 p-3 rounded-lg rounded-bl-none border border-gray-700 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-75"></span>
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 bg-[#151a21] border-t border-gray-700 flex gap-2 shrink-0">
        <input type="text" placeholder="Hỏi thêm về HPG..." className="flex-1 bg-[#0b0e11] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 transition"/>
        <button className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"><Send size={14} /></button>
      </div>
    </div>
  );
};

const StockDetailSuperPopupComponent: React.FC<StockDetailSuperPopupProps> = ({ 
  symbol,
  onClose,
}) => {
  const ticker = symbol || "HPG";
  const isOpen = true;

  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const [chartData, setChartData] = useState(generateChartData());
  const [liveTape, setLiveTape] = useState<Trade[]>(initialLiveTape);
  const [financeView, setFinanceView] = useState<'quarter' | 'year'>('quarter');
  const [newsFilter, setNewsFilter] = useState('all');
  const [selectedNews, setSelectedNews] = useState(newsData[0]);
  
  // Copilot State
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [copilotType, setCopilotType] = useState<string | null>(null);
  const [copilotQuery, setCopilotQuery] = useState('');

  const handleAskCopilot = (type: string | null, query = "") => {
    setCopilotType(type);
    setCopilotQuery(query);
    setCopilotOpen(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newTrade: Trade = {
        time: new Date().toLocaleTimeString('vi-VN', { hour12: false }).slice(0, 8),
        price: (28.50 + (Math.random() - 0.5) * 0.1).toFixed(2),
        vol: Math.floor(Math.random() * 60000) + 100,
        side: Math.random() > 0.5 ? 'M' : 'B',
        big: false
      };
      newTrade.big = newTrade.vol > 50000;
      setLiveTape(prev => [newTrade, ...prev].slice(0, 15));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredNews = newsData.filter(item => {
    if (newsFilter === 'all') return true;
    return item.type === newsFilter;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 font-sans text-xs">
      
      {/* POPUP CONTAINER */}
      <div className="relative w-full max-w-[1400px] h-[90vh] bg-[#0b0e11] text-gray-300 rounded-xl shadow-2xl border border-gray-800 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* --- HEADER --- */}
        <header className="h-12 bg-[#151a21] border-b border-gray-800 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-6">
            <div className="flex items-baseline gap-2">
              <h1 className="text-2xl font-bold text-white tracking-tighter">{ticker}</h1>
              <span className="text-xl font-bold text-emerald-500">28.50</span>
              <div className="flex flex-col text-[10px] leading-3">
                <span className="text-emerald-500">▲ +0.65</span>
                <span className="text-emerald-500">+2.3%</span>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex flex-col">
              <span className="text-gray-400 text-[10px]">Tổng KL</span>
              <span className="text-white font-mono font-bold">35,102,400</span>
            </div>
            <div className="hidden md:block px-2 py-0.5 rounded bg-yellow-900/30 text-yellow-500 border border-yellow-700/50 text-[10px] font-bold">
              Đột biến KL
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleAskCopilot(null, `Tổng quan mã ${ticker} hôm nay thế nào?`)}
              className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:scale-105 transition border border-blue-400/30"
            >
              <Bot size={14} /> Hỏi Copilot
            </button>
            <div className="h-4 w-px bg-gray-700 mx-1"></div>
            <button className="p-2 hover:bg-gray-700 rounded-full transition text-gray-400"><Bell size={16} /></button>
            <div className="flex gap-1 ml-2">
              <button className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded font-bold transition shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                <Zap size={14} /> MUA
              </button>
              <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 rounded font-bold transition">
                BÁN
              </button>
            </div>
            {/* CLOSE BUTTON */}
            <button onClick={onClose} className="ml-2 p-1.5 hover:bg-red-500/20 hover:text-red-500 rounded-full transition text-gray-400">
                <X size={20} />
            </button>
          </div>
        </header>

        {/* --- TAB NAVIGATION --- */}
        <nav className="bg-[#151a21] border-b border-gray-800 px-4 flex gap-1 shrink-0">
          {['DASHBOARD', 'TÀI CHÍNH', 'TIN TỨC', 'CỘ ĐÔNG & CỔ TỨC', 'BIỂU ĐỒ KỸ THUẬT'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-[11px] font-bold border-b-2 transition ${
                activeTab === tab 
                  ? 'border-blue-500 text-blue-400 bg-[#1e2530]' 
                  : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-[#1e2530]'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 overflow-hidden relative">
          
          {/* VIEW: DASHBOARD (Full Version) */}
          {activeTab === 'DASHBOARD' && (
            <div className="flex h-full w-full">
              {/* Cột 1: Cung Cầu */}
              <aside className="w-[22%] border-r border-gray-800 flex flex-col min-w-[250px] overflow-y-auto custom-scrollbar">
                {/* Sổ lệnh */}
                <div className="p-2 border-b border-gray-800">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-gray-400 flex items-center gap-1"><Layers size={12}/> SỔ LỆNH</h3>
                    <span className="text-[10px] text-gray-500">x10</span>
                  </div>
                  <div className="grid grid-cols-3 text-[10px] text-gray-500 mb-1 px-1">
                    <span>Mua</span><span className="text-center">Giá</span><span className="text-right">Bán</span>
                  </div>
                  <div className="flex flex-col-reverse gap-[1px]">
                    {orderBookData.asks.map((item, idx) => (
                      <div key={idx} className="relative h-6 flex items-center text-[11px] group hover:bg-[#1e2530] cursor-pointer">
                        <div className="absolute right-0 top-0 bottom-0 bg-red-900/20 z-0" style={{ width: `${item.percent}%` }}></div>
                        <div className="grid grid-cols-3 w-full relative z-10 px-1 font-mono">
                            <span></span><span className="text-center text-red-400 font-medium">{item.price.toFixed(2)}</span><span className="text-right text-gray-300">{ (item.vol/1000).toFixed(1) }k</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="py-1 my-1 bg-[#1e2530] border-y border-gray-700 text-center font-bold text-emerald-400 text-sm">28.50</div>
                  <div className="flex flex-col gap-[1px]">
                    {orderBookData.bids.map((item, idx) => (
                      <div key={idx} className="relative h-6 flex items-center text-[11px] group hover:bg-[#1e2530] cursor-pointer">
                        <div className="absolute left-0 top-0 bottom-0 bg-emerald-900/20 z-0" style={{ width: `${item.percent}%` }}></div>
                        <div className="grid grid-cols-3 w-full relative z-10 px-1 font-mono">
                            <span className="text-gray-300">{ (item.vol/1000).toFixed(1) }k</span><span className="text-center text-emerald-400 font-medium">{item.price.toFixed(2)}</span><span></span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Thanh tỷ lệ */}
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] mb-1 font-bold">
                      <span className="text-emerald-500">T.Mua: 65%</span>
                      <span className="text-red-500">35% :T.Bán</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden flex">
                      <div className="h-full bg-emerald-500 w-[65%] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                      <div className="h-full bg-red-500 w-[35%]"></div>
                    </div>
                  </div>
                </div>

                {/* Khớp lệnh (Live Tape) */}
                <div className="flex-1 flex flex-col min-h-0 border-b border-gray-800">
                  <div className="p-2 bg-[#101317] border-b border-gray-800 sticky top-0">
                    <h3 className="font-bold text-gray-400 text-[11px] flex items-center gap-1"><Activity size={12}/> KHỚP LỆNH (LIVE)</h3>
                  </div>
                  <div className="overflow-y-auto flex-1 p-1">
                    <table className="w-full text-[11px] font-mono border-collapse">
                      <tbody>
                        {liveTape.map((trade, idx) => (
                          <tr key={idx} className={`${trade.big ? 'bg-[#1f2937]' : ''} hover:bg-gray-800 border-b border-gray-800/50`}>
                            <td className="p-1 text-gray-500">{trade.time}</td>
                            <td className={`p-1 font-bold text-right ${Number(trade.price) >= 28.50 ? 'text-emerald-400' : 'text-red-400'}`}>{trade.price}</td>
                            <td className="p-1 text-right text-white">
                              {trade.big && <span className="mr-1 text-xs">🦈</span>}
                              {trade.vol.toLocaleString()}
                              <span className={`ml-1 text-[9px] ${trade.side === 'M' ? 'text-emerald-500' : 'text-red-500'}`}>{trade.side}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="p-2 bg-[#101317]">
                  <h3 className="font-bold text-gray-400 text-[10px] mb-2 uppercase">Thống kê phiên</h3>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-[#1a2029] p-1.5 rounded border border-gray-800"><div className="text-gray-500 text-[9px]">Mở cửa</div><div className="font-mono text-yellow-500">28.00</div></div>
                    <div className="bg-[#1a2029] p-1.5 rounded border border-gray-800"><div className="text-gray-500 text-[9px]">Cao nhất</div><div className="font-mono text-emerald-500">28.60</div></div>
                    <div className="bg-[#1a2029] p-1.5 rounded border border-gray-800"><div className="text-gray-500 text-[9px]">Thấp nhất</div><div className="font-mono text-red-500">27.90</div></div>
                    <div className="bg-[#1a2029] p-1.5 rounded border border-gray-800"><div className="text-gray-500 text-[9px]">Trung bình</div><div className="font-mono text-white">28.42</div></div>
                  </div>
                </div>
              </aside>

              {/* Cột 2: Kỹ thuật */}
              <section className="w-[53%] flex flex-col bg-[#0b0e11]">
                <div className="h-10 border-b border-gray-800 flex items-center px-4 gap-4 bg-[#101317]">
                  <div className="flex bg-[#1e2530] rounded p-0.5">
                    {['1D', '1W', '1M', '3M', '1Y'].map(t => (<button key={t} className={`px-2 py-0.5 text-[10px] rounded ${t === '1D' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>{t}</button>))}
                  </div>
                  <div className="h-4 w-px bg-gray-700"></div>
                  <div className="flex gap-3 text-[11px] font-medium text-gray-400">
                    <button className="hover:text-blue-400 flex items-center gap-1"><TrendingUp size={12}/> Indicators</button>
                    <button className="hover:text-blue-400 flex items-center gap-1 text-blue-400"><Activity size={12}/> MA (20, 50)</button>
                    <button className="hover:text-blue-400">RSI</button>
                    <button className="hover:text-blue-400">So sánh</button>
                  </div>
                </div>
                <div className="flex-1 relative p-1 flex flex-col">
                  <div className="absolute top-2 left-4 z-10 flex gap-4 text-[10px] font-mono pointer-events-none">
                    <span className="text-emerald-400">{ticker}: 28.50</span><span className="text-yellow-500">MA20: 28.30</span><span className="text-purple-400">MA50: 28.00</span><span className="text-gray-500">Vol: 35M</span>
                  </div>
                  <div className="flex-[3] w-full min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                          <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="time" hide />
                          <YAxis domain={['auto', 'auto']} orientation="right" tick={{fontSize: 10, fill: '#6b7280'}} tickLine={false} axisLine={false} />
                          <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', fontSize: '11px', color: '#fff' }} itemStyle={{ padding: 0 }} />
                          <Line type="monotone" dataKey="ma20" stroke="#eab308" dot={false} strokeWidth={1} />
                          <Line type="monotone" dataKey="ma50" stroke="#a855f7" dot={false} strokeWidth={1} strokeDasharray="5 5" />
                          <Area type="monotone" dataKey="price" stroke="#10b981" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={2} />
                          <ReferenceLine y={28.50} stroke="red" strokeDasharray="3 3" label={{ position: 'left', value: 'Kháng cự', fontSize: 9, fill: 'red' }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="h-[60px] w-full border-t border-gray-800/50">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={chartData} margin={{ top: 5, right: 20, bottom: 0, left: 0 }}>
                          <YAxis hide domain={[0, 'dataMax']} />
                          <Bar dataKey="vol" fill="#374151">
                            {chartData.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={Number(entry.price) > Number(entry.ma20) ? '#10b981' : '#ef4444'} fillOpacity={0.5} />
                            ))}
                          </Bar>
                        </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="h-[80px] w-full border-t border-gray-800 bg-[#101317] p-1">
                    <div className="text-[9px] text-gray-500 absolute ml-2 mt-1">RSI (14)</div>
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={chartData} margin={{ top: 15, right: 20, bottom: 0, left: 0 }}>
                          <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" vertical={false} />
                          <YAxis orientation="right" domain={[0, 100]} tick={{fontSize: 9, fill: '#6b7280'}} tickCount={3} axisLine={false} tickLine={false} />
                          <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="2 2" />
                          <ReferenceLine y={30} stroke="#10b981" strokeDasharray="2 2" />
                          <Line type="monotone" dataKey={(d) => Math.floor(Math.random() * 40) + 30} stroke="#60a5fa" dot={false} strokeWidth={1.5} />
                        </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </section>

              {/* Cột 3: Sức mạnh & Cá Mập */}
              <aside className="w-[25%] border-l border-gray-800 bg-[#0b0e11] flex flex-col overflow-y-auto custom-scrollbar">
                {/* 1. Cá Mập */}
                <div className="p-3 border-b border-gray-800">
                  <div className="flex items-center justify-between mb-3">
                     <div className="flex items-center gap-2 text-emerald-400">
                        <div className="p-1.5 bg-emerald-900/30 rounded"><Zap size={14}/></div>
                        <h3 className="font-bold text-sm uppercase">Cá Mập</h3>
                     </div>
                     <button onClick={() => handleAskCopilot(null, `Phân tích dòng tiền và động thái cá mập của ${ticker} hôm nay?`)} className="text-[10px] flex items-center gap-1 text-blue-400 hover:text-white bg-blue-900/20 px-2 py-1 rounded border border-blue-800 hover:border-blue-500 transition"><Sparkles size={10} /> AI Insight</button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-[#151a21] p-2 rounded border border-gray-800">
                        <div className="flex justify-between text-[11px] mb-1"><span className="text-gray-400">Cá mập ({'>'}1 tỷ/lệnh)</span></div>
                        <div className="flex justify-between items-center"><div className="flex flex-col"><span className="text-emerald-500 font-bold text-xs">MUA: 15</span></div><div className="text-[10px] text-gray-500">vs</div><div className="flex flex-col items-end"><span className="text-red-500 font-bold text-xs">BÁN: 4</span></div></div>
                        <div className="mt-1 text-[10px] text-emerald-400 italic bg-emerald-900/10 px-1 py-0.5 rounded text-center">Phe Mua đang gom mạnh</div>
                    </div>
                    <div className="bg-[#151a21] p-2 rounded border border-gray-800">
                        <div className="flex justify-between text-[11px] mb-1"><span className="text-gray-400">Nước ngoài (NN)</span></div>
                        <div className="flex items-center gap-2"><div className="flex-1 h-1.5 bg-gray-700 rounded-full"><div className="h-full bg-emerald-500 w-[80%] rounded-full"></div></div><span className="font-bold text-emerald-500 text-xs">+25.5 Tỷ</span></div>
                    </div>
                  </div>
                </div>

                {/* 2. SỨC MẠNH (RS) */}
                <div className="p-3 border-b border-gray-800">
                  <div className="flex items-center gap-2 mb-3 text-purple-400"><div className="p-1.5 bg-purple-900/30 rounded"><Star size={14}/></div><h3 className="font-bold text-sm uppercase">Sức mạnh (RS)</h3></div>
                  <div className="flex items-center justify-between mb-2"><span className="text-3xl font-bold text-white">85<span className="text-sm text-gray-500 font-normal">/99</span></span><span className="px-2 py-1 bg-purple-600 text-white text-[10px] font-bold rounded shadow-lg shadow-purple-900/50">RẤT KHỎE</span></div>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex justify-between items-center py-1 border-b border-gray-800/50"><span className="text-gray-400">Vs VN-Index</span><span className="text-emerald-400 font-bold">[Mạnh hơn]</span></div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-800/50"><span className="text-gray-400">Vs Ngành Thép</span><span className="text-yellow-500 font-bold">[Trung bình]</span></div>
                  </div>
                </div>

                {/* 3. CƠ BẢN (Fundamental) */}
                <div className="p-3">
                   <div className="flex items-center gap-2 mb-3 text-blue-400"><div className="p-1.5 bg-blue-900/30 rounded"><BarChart2 size={14}/></div><h3 className="font-bold text-sm uppercase">Cơ bản (Fundamental)</h3></div>
                   <div className="mb-4"><div className="flex justify-between text-[10px] text-gray-500 mb-1"><span>Rẻ</span><span>Đắt</span></div><div className="relative h-2 bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-500 rounded-full"><div className="absolute top-1/2 -translate-y-1/2 left-[60%] w-3 h-3 bg-white border-2 border-blue-900 rounded-full shadow-md transform -translate-x-1/2"></div></div><div className="text-center mt-1 text-[10px] text-gray-400">P/E: 14.5 (Trung tính)</div></div>
                   <button className="w-full py-1.5 bg-[#1e2530] hover:bg-[#2a3441] text-blue-400 text-[11px] rounded border border-blue-900/30 transition">Xem chi tiết BCTC &gt;</button>
                </div>
              </aside>
            </div>
          )}

          {/* VIEW: TÀI CHÍNH (UPDATED WITH INTERACTIVE COPILOT & BALANCE SHEET CHART) */}
          {activeTab === 'TÀI CHÍNH' && (
            <div className="h-full w-full bg-[#0b0e11] flex flex-col p-4 overflow-y-auto custom-scrollbar gap-4">
              
              {/* Sub-Filter Toolbar */}
              <div className="flex justify-between items-center pb-2 border-b border-gray-800 shrink-0">
                <div className="flex gap-4 items-center">
                   <div className="flex bg-[#1e2530] rounded p-1">
                      <button onClick={() => setFinanceView('quarter')} className={`px-3 py-1 text-xs font-medium rounded transition ${financeView === 'quarter' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}>Theo Quý</button>
                      <button onClick={() => setFinanceView('year')} className={`px-3 py-1 text-xs font-medium rounded transition ${financeView === 'year' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}>Theo Năm</button>
                   </div>
                   <div className="h-4 w-px bg-gray-700"></div>
                   <span className="text-gray-500 text-xs">Đơn vị: <span className="text-gray-300 font-bold">Tỷ VNĐ</span></span>
                </div>
                <div className="flex gap-2">
                   <button 
                      onClick={() => handleAskCopilot(null, `Phân tích tình hình tài chính quý gần nhất của ${ticker} có điểm gì nổi bật?`)}
                      className="flex items-center gap-1 px-3 py-1 bg-purple-900/30 hover:bg-purple-800/50 rounded text-[10px] text-purple-300 border border-purple-500/30 transition"
                   >
                     <Sparkles size={10}/> AI Phân tích BCTC
                   </button>
                </div>
              </div>

              {/* TOP SECTION: CHỈ SỐ TÀI CHÍNH TABLE */}
              <div className="bg-[#151a21] border border-gray-800 rounded-lg overflow-hidden shrink-0">
                 <div className="p-3 border-b border-gray-800 flex justify-between items-center bg-[#1a2029]">
                    <div className="flex items-center gap-2">
                       <Activity size={16} className="text-purple-400"/>
                       <h3 className="text-sm font-bold text-white uppercase">Chỉ số tài chính</h3>
                    </div>
                    {/* TRIGGER 1: VALUATION */}
                    <button 
                      onClick={() => handleAskCopilot('valuation')}
                      className="flex items-center gap-1 px-3 py-1 bg-purple-900/30 hover:bg-purple-800/50 rounded text-[10px] text-purple-300 border border-purple-500/30 transition animate-pulse"
                    >
                      <Sparkles size={10}/> ✨ Định giá đắt hay rẻ?
                    </button>
                 </div>
                 <div className="overflow-x-auto">
                   <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-[#1e2530] text-gray-400 border-b border-gray-800">
                          <th className="py-3 px-4 text-left font-semibold w-[20%]">Chỉ số</th>
                          {financialDataV2.periods.map(p => (<th key={p} className="py-3 px-4 text-right font-semibold">{p}</th>))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {financialDataV2.ratiosTable.map((row, idx) => (
                          <tr key={idx} className="hover:bg-[#1f2937] transition">
                            <td className="py-3 px-4 text-gray-300 font-medium">{row.name}</td>
                            {row.values.map((val, i) => (<td key={i} className="py-3 px-4 text-right font-mono text-white">{row.format === 'number' ? val.toLocaleString() : val}</td>))}
                          </tr>
                        ))}
                      </tbody>
                   </table>
                 </div>
              </div>

              {/* MIDDLE SECTION: 2 CARDS (REVENUE & PROFIT) */}
              <div className="grid grid-cols-2 gap-4 h-[320px]">
                 {/* LEFT CARD: DOANH THU */}
                 <div className="bg-[#151a21] border border-gray-800 rounded-lg flex flex-col">
                    <div className="p-3 border-b border-gray-800 flex justify-between items-center">
                       <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2"><BarChart2 size={16} className="text-blue-400"/> Doanh thu</h3>
                       {/* TRIGGER 2: GROWTH */}
                       <button 
                          onClick={() => handleAskCopilot('growth')}
                          className="flex items-center gap-1 px-2 py-1 bg-blue-900/30 hover:bg-blue-800/50 rounded text-[10px] text-blue-300 border border-blue-500/30 transition"
                       >
                         <LineChartIcon size={10}/> ✨ Soi động lực tăng trưởng
                       </button>
                    </div>
                    <div className="flex-1 w-full p-2">
                       <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={financialDataV2.revenueChart} margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
                             <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" vertical={false} />
                             <XAxis dataKey="period" tick={{fontSize: 10, fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                             <YAxis yAxisId="left" orientation="left" tick={{fontSize: 10, fill: '#9ca3af'}} axisLine={false} tickLine={false} tickFormatter={(val) => val/1000 + 'k'}/>
                             <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', fontSize: '11px', color: '#fff' }} />
                             <Bar yAxisId="left" dataKey="revenue" fill="#2563eb" barSize={30} radius={[4, 4, 0, 0]} name="Doanh thu" />
                             <Bar yAxisId="left" dataKey="profit" fill="#a855f7" barSize={30} radius={[4, 4, 0, 0]} name="Lợi nhuận" />
                          </ComposedChart>
                       </ResponsiveContainer>
                    </div>
                 </div>

                 {/* RIGHT CARD: LỢI NHUẬN */}
                 <div className="bg-[#151a21] border border-gray-800 rounded-lg flex flex-col">
                    <div className="p-3 border-b border-gray-800 flex justify-between items-center">
                       <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2"><DollarSign size={16} className="text-emerald-400"/> Lợi nhuận</h3>
                    </div>
                    <div className="flex-1 w-full p-2">
                       <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={financialDataV2.profitChart} margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
                             <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" vertical={false} />
                             <XAxis dataKey="period" tick={{fontSize: 10, fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                             <YAxis yAxisId="left" orientation="left" tick={{fontSize: 10, fill: '#9ca3af'}} axisLine={false} tickLine={false} tickFormatter={(val) => val/1000 + 'k'}/>
                             <YAxis yAxisId="right" orientation="right" tick={{fontSize: 10, fill: '#9ca3af'}} axisLine={false} tickLine={false} unit="%" />
                             <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', fontSize: '11px', color: '#fff' }} />
                             <Bar yAxisId="left" dataKey="gross" stackId="a" fill="#3b82f6" barSize={30} radius={[0, 0, 0, 0]} name="LN gộp" />
                             <Bar yAxisId="left" dataKey="net" stackId="a" fill="#22d3ee" barSize={30} radius={[4, 4, 0, 0]} name="LN ròng" />
                          </ComposedChart>
                       </ResponsiveContainer>
                    </div>
                 </div>
              </div>

              {/* BOTTOM SECTION: BALANCE SHEET CHART */}
              <div className="bg-[#151a21] border border-gray-800 rounded-lg flex flex-col h-[350px]">
                  <div className="p-3 border-b border-gray-800 flex justify-between items-center">
                     <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                        <Scale size={16} className="text-yellow-500"/> Cơ cấu Tài sản & Nguồn vốn
                     </h3>
                     {/* TRIGGER 3: HEALTH */}
                     <button 
                        onClick={() => handleAskCopilot('health')}
                        className="flex items-center gap-1 px-2 py-1 bg-yellow-900/20 hover:bg-yellow-800/40 rounded text-[10px] text-yellow-500 border border-yellow-600/30 transition"
                     >
                       <ShieldCheck size={10}/> ✨ Check sức khỏe tài chính
                     </button>
                  </div>
                  <div className="flex-1 w-full p-4">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={financialDataV2.balanceSheetChart} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                           <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" vertical={false} />
                           <XAxis dataKey="period" tick={{fontSize: 10, fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                           <YAxis tick={{fontSize: 10, fill: '#9ca3af'}} axisLine={false} tickLine={false} tickFormatter={(val) => val/1000 + 'k'}/>
                           <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', fontSize: '11px', color: '#fff' }} cursor={{fill: '#2a3441'}}/>
                           {/* Stack 1: Assets */}
                           <Bar dataKey="shortAsset" stackId="a" fill="#3b82f6" name="TS Ngắn hạn" barSize={40} />
                           <Bar dataKey="longAsset" stackId="a" fill="#1e40af" name="TS Dài hạn" radius={[4, 4, 0, 0]} barSize={40} />
                           {/* Stack 2: Resources */}
                           <Bar dataKey="liabilities" stackId="b" fill="#ef4444" name="Nợ phải trả" barSize={40} />
                           <Bar dataKey="equity" stackId="b" fill="#10b981" name="Vốn chủ sở hữu" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
              </div>

              {/* Detailed Table (Optional/Collapsed) */}
              <div className="bg-[#151a21] border border-gray-800 rounded-lg overflow-hidden flex-1 min-h-[300px]">
                   <div className="p-3 border-b border-gray-800 bg-[#1a2029]">
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide">Số liệu chi tiết</h3>
                   </div>
                   <div className="overflow-y-auto max-h-[300px]">
                     <table className="w-full text-xs">
                        <thead className="sticky top-0 z-10">
                          <tr className="bg-[#1e2530] text-gray-400 shadow-sm">
                            <th className="py-3 px-4 text-left font-semibold w-[30%]">Chỉ tiêu</th>
                            {financialDataV2.periods.map(p => (
                              <th key={p} className="py-3 px-2 text-right font-semibold">{p}</th>
                            ))}
                            <th className="py-3 px-4 text-right font-semibold w-[15%] text-blue-400">%YoY</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                          {financialDataV2.incomeStatement.map((row) => (
                            <tr key={row.id} className={`hover:bg-[#1f2937] transition group ${row.highlight ? 'bg-[#1a2029]/50 font-bold' : ''}`}>
                              <td className={`py-3 px-4 ${row.subRow ? 'pl-8 text-gray-500 italic' : 'text-gray-300'}`}>
                                 {row.label}
                              </td>
                              {row.values.map((val, idx) => (
                                <td key={idx} className={`py-3 px-2 text-right font-mono ${row.color || (val < 0 ? 'text-red-400' : 'text-white')} ${row.subRow ? 'text-[11px]' : ''}`}>
                                  {row.isPercent ? `${val}%` : val.toLocaleString()}
                                </td>
                              ))}
                              <td className="py-3 px-4 text-right font-mono">
                                {row.yoy && (
                                  <span className={`px-2 py-0.5 rounded ${row.yoy > 0 ? 'bg-emerald-900/30 text-emerald-400' : 'bg-red-900/30 text-red-400'}`}>
                                    {row.yoy > 0 ? '+' : ''}{row.yoy}%
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                     </table>
                   </div>
              </div>
            </div>
          )}

          {/* VIEW: TIN TỨC */}
          {activeTab === 'TIN TỨC' && (
            <div className="flex h-full w-full bg-[#0b0e11]">
              <div className="w-[40%] border-r border-gray-800 flex flex-col min-w-[320px]">
                 <div className="p-2 border-b border-gray-800 flex gap-2 overflow-x-auto no-scrollbar bg-[#101317]">
                   {['all', 'official', 'press', 'rumor'].map(f => (
                     <button key={f} onClick={() => setNewsFilter(f)} className={`px-3 py-1.5 rounded text-[11px] font-medium whitespace-nowrap transition ${newsFilter === f ? 'bg-blue-600 text-white' : 'bg-[#1e2530] text-gray-400 hover:text-white hover:bg-[#2a3441]'}`}>{f === 'all' ? 'Tất cả' : f}</button>
                   ))}
                 </div>
                 <div className="flex-1 overflow-y-auto custom-scrollbar">
                   {filteredNews.map((news) => (
                     <div key={news.id} onClick={() => setSelectedNews(news)} className={`p-3 border-b border-gray-800 cursor-pointer transition hover:bg-[#1e2530] group ${selectedNews?.id === news.id ? 'bg-[#1e2530] border-l-2 border-l-blue-500' : 'border-l-2 border-l-transparent'}`}>
                       <div className="flex justify-between items-center mb-1"><div className="flex items-center gap-2"><span className={`text-[10px] font-mono px-1.5 rounded ${news.type === 'official' ? 'bg-purple-900/40 text-purple-400 border border-purple-700/50' : news.type === 'rumor' ? 'bg-yellow-900/40 text-yellow-500 border border-yellow-700/50' : 'bg-blue-900/30 text-blue-400 border border-blue-800/50'}`}>{news.source}</span>{news.isHot && <span className="text-[10px] text-red-500 animate-pulse font-bold">LIVE 🔥</span>}</div><span className="text-[10px] text-gray-500">{news.time}</span></div>
                       <h4 className={`text-xs font-medium mb-1 line-clamp-2 ${selectedNews?.id === news.id ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>{news.title}</h4>
                       <p className="text-[10px] text-gray-500 line-clamp-2">{news.summary}</p>
                     </div>
                   ))}
                 </div>
              </div>
              <div className="w-[60%] bg-[#0b0e11] flex flex-col">
                {selectedNews ? (
                  <>
                    <div className="p-4 border-b border-gray-800 bg-[#101317]">
                       <div className="flex justify-between items-start mb-2"><span className="text-[10px] text-gray-500 flex items-center gap-1"><Clock size={12}/> {selectedNews.date} lúc {selectedNews.time}</span><button onClick={() => handleAskCopilot(null, `Tóm tắt tin: "${selectedNews.title}" và đánh giá tác động đến giá cổ phiếu?`)} className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded text-[10px] text-white shadow-lg border border-emerald-500/30 transition"><Sparkles size={10}/> AI: Tóm tắt & Tác động</button></div>
                       <h2 className="text-lg font-bold text-white leading-snug">{selectedNews.title}</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-[#0b0e11]">
                      {selectedNews.image && <div className="mb-6 w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700 relative overflow-hidden group"><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div><div className="text-gray-500 flex flex-col items-center z-10"><FileText size={48} strokeWidth={1} className="mb-2 opacity-50"/><span className="text-xs italic">[Ảnh minh họa bài viết]</span></div></div>}
                      <div className="prose prose-invert prose-sm max-w-none text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedNews.content }}></div>
                    </div>
                  </>
                ) : <div className="flex-1 flex flex-col items-center justify-center text-gray-500"><Globe size={48} strokeWidth={1} className="mb-2 opacity-20"/><p>Chọn một tin để xem chi tiết</p></div>}
              </div>
            </div>
          )}

          {/* VIEW: CỘ ĐÔNG & CỔ TỨC */}
          {activeTab === 'CỘ ĐÔNG & CỔ TỨC' && (
            <div className="h-full w-full bg-[#0b0e11] flex flex-col p-4 overflow-y-auto custom-scrollbar gap-4">
              <div className="grid grid-cols-12 gap-4 min-h-[300px]">
                <div className="col-span-5 bg-[#151a21] border border-gray-800 rounded-lg p-4 flex flex-col">
                  <div className="flex items-center gap-2 mb-4"><PieChartIcon size={16} className="text-blue-400"/><h3 className="text-sm font-bold text-white uppercase">Tổng quan sở hữu</h3></div>
                  <div className="flex-1 flex flex-col items-center">
                     <div className="h-40 w-full">
                       <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                           <Pie data={shareholderData.structure} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value" stroke="none">
                             {shareholderData.structure.map((entry, index) => <PieCell key={`cell-${index}`} fill={entry.color} />)}
                           </Pie>
                           <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', fontSize: '11px', color: '#fff' }} itemStyle={{ color: '#fff' }}/>
                         </PieChart>
                       </ResponsiveContainer>
                     </div>
                     <div className="w-full space-y-2 mt-2">
                        <div className="flex justify-between text-xs items-center"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div><span className="text-gray-400">Nước ngoài</span></div><span className="text-white font-bold">25% <span className="text-[10px] font-normal text-gray-500">(Room còn 24%)</span></span></div>
                        <div className="flex justify-between text-xs items-center"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-gray-400">Ban lãnh đạo & TC</span></div><span className="text-white font-bold">40%</span></div>
                        <div className="flex justify-between text-xs items-center"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gray-500"></div><span className="text-gray-400">Trôi nổi (Free float)</span></div><span className="text-white font-bold">35%</span></div>
                     </div>
                  </div>
                </div>
                <div className="col-span-7 bg-[#151a21] border border-gray-800 rounded-lg p-4 flex flex-col">
                  <div className="flex justify-between items-center mb-4"><div className="flex items-center gap-2"><Users size={16} className="text-emerald-400"/><h3 className="text-sm font-bold text-white uppercase">Top Cổ đông lớn nhất</h3></div><button className="text-[10px] text-blue-400 hover:text-blue-300">Xem tất cả &gt;</button></div>
                  <div className="overflow-x-auto"><table className="w-full text-xs text-left"><thead><tr className="text-gray-500 border-b border-gray-800"><th className="pb-2 font-medium">Tên cổ đông</th><th className="pb-2 text-right font-medium">Số lượng CP</th><th className="pb-2 text-right font-medium">Tỷ lệ %</th><th className="pb-2 text-right font-medium">Cập nhật</th></tr></thead><tbody className="divide-y divide-gray-800/50">{shareholderData.majorHolders.map((holder) => (<tr key={holder.id} className="group hover:bg-[#1e2530] transition"><td className="py-2.5 text-gray-300 font-medium">{holder.id}. {holder.name}</td><td className="py-2.5 text-right font-mono text-gray-400 group-hover:text-white">{holder.shares}</td><td className="py-2.5 text-right font-mono text-emerald-400 font-bold">{holder.percent}</td><td className="py-2.5 text-right text-gray-500 text-[10px]">{holder.date}</td></tr>))}</tbody></table></div>
                </div>
              </div>
              <div className="bg-[#151a21] border border-gray-800 rounded-lg p-4">
                 <div className="flex justify-between items-center mb-2"><div className="flex items-center gap-2"><Briefcase size={16} className="text-yellow-500"/><h3 className="text-sm font-bold text-white uppercase">Giao dịch nội bộ (Insider Trading)</h3><span className="px-2 py-0.5 rounded bg-yellow-900/30 text-yellow-500 text-[9px] font-bold border border-yellow-700/30">QUAN TRỌNG ⚠️</span></div><button onClick={() => handleAskCopilot(null, `Đánh giá tín hiệu từ các giao dịch nội bộ gần đây của ${ticker}?`)} className="text-[10px] flex items-center gap-1 text-yellow-400 hover:text-white bg-yellow-900/20 px-3 py-1.5 rounded-full border border-yellow-600/30 hover:border-yellow-500 transition"><Sparkles size={10} /> AI: Tốt hay Xấu?</button></div>
                 <div className="overflow-x-auto"><table className="w-full text-xs text-left"><thead><tr className="bg-[#1e2530] text-gray-400"><th className="py-2 px-3 font-medium rounded-l">Người thực hiện</th><th className="py-2 px-2 font-medium">Chức vụ</th><th className="py-2 px-2 font-medium">Loại GD</th><th className="py-2 px-2 text-right font-medium">Khối lượng</th><th className="py-2 px-2 text-right font-medium">Giá (Ước tính)</th><th className="py-2 px-3 text-right font-medium rounded-r">Ngày k.thuc</th></tr></thead><tbody className="divide-y divide-gray-800">{shareholderData.insiderDeals.map((deal) => (<tr key={deal.id} className="hover:bg-[#1f2937] transition"><td className="py-3 px-3"><div className="text-white font-medium">{deal.person}</div>{deal.tag && <span className="text-[9px] text-gray-500 bg-gray-800 px-1 rounded border border-gray-700 mt-1 inline-block">{deal.tag}</span>}</td><td className="py-3 px-2 text-gray-400">{deal.position}</td><td className={`py-3 px-2 ${deal.type.includes('Mua') ? 'text-emerald-400' : 'text-red-400'}`}>{deal.type}</td><td className={`py-3 px-2 text-right font-mono font-bold ${deal.color}`}>{deal.vol}</td><td className="py-3 px-2 text-right font-mono text-gray-300">{deal.price}</td><td className="py-3 px-3 text-right text-gray-400">{deal.date}</td></tr>))}</tbody></table></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-[#151a21] border border-gray-800 rounded-lg p-4"><div className="flex items-center gap-2 mb-4"><DollarSign size={16} className="text-emerald-400"/><h3 className="text-sm font-bold text-white uppercase">Lịch sử trả cổ tức & Tăng vốn</h3></div><div className="overflow-x-auto"><table className="w-full text-xs text-left"><thead><tr className="text-gray-500 border-b border-gray-800"><th className="pb-2 font-medium">Năm</th><th className="pb-2 font-medium">Loại hình</th><th className="pb-2 text-center font-medium">Tỷ lệ</th><th className="pb-2 text-right font-medium">Ngày GDKHQ</th></tr></thead><tbody className="divide-y divide-gray-800/50">{shareholderData.dividends.map((div, idx) => (<tr key={idx} className="hover:bg-[#1e2530]"><td className="py-2 text-gray-300 font-bold">{div.year}</td><td className={`py-2 ${div.type === 'Tiền mặt' ? 'text-emerald-400' : 'text-purple-400'}`}>{div.type}</td><td className="py-2 text-center font-mono text-white bg-gray-800/50 rounded">{div.ratio}</td><td className="py-2 text-right text-gray-500">{div.exDate}</td></tr>))}</tbody></table></div></div>
                 <div className="bg-[#151a21] border border-gray-800 rounded-lg p-4 flex flex-col"><div className="flex items-center gap-2 mb-4"><Calendar size={16} className="text-blue-400"/><h3 className="text-sm font-bold text-white uppercase">Thống kê & Sự kiện</h3></div><div className="space-y-4 flex-1"><div className="bg-[#1e2530] p-3 rounded border border-gray-700/50"><div className="text-xs text-gray-400 mb-1">Tỷ suất cổ tức (Yield)</div><div className="text-2xl font-bold text-emerald-400 font-mono">4.5% <span className="text-[10px] text-gray-500 font-sans font-normal">/ năm</span></div><div className="mt-2 text-[10px] text-yellow-500 flex items-center gap-1"><AlertCircle size={10}/> So với lãi suất bank (5.5%): Thấp hơn</div></div><div><div className="text-xs font-bold text-gray-300 mb-2 uppercase tracking-wide">Sự kiện sắp tới</div><div className="bg-[#1e2530] p-3 rounded border border-gray-700/50 flex gap-3 items-center"><div className="bg-blue-900/30 p-2 rounded text-blue-400"><Calendar size={18}/></div><div><div className="font-bold text-white text-xs">28/04/2026: Họp ĐHCĐ Thường niên</div><div className="text-[10px] text-gray-500 italic">(Dự kiến chốt quyền chia cổ tức 2025)</div></div></div></div></div></div>
              </div>
            </div>
          )}

          {/* --- COPILOT WIDGET (OVERLAY) --- */}
          <CopilotWidget 
            isOpen={copilotOpen} 
            onClose={() => setCopilotOpen(false)} 
            contextQuery={copilotQuery} 
            type={copilotType}
            onAsk={(q) => console.log(q)}
          />

        </main>

        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: #0b0e11; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #374151; border-radius: 2px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4b5563; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </div>
  );
};

export const StockDetailSuperPopup = StockDetailSuperPopupComponent;
export default StockDetailSuperPopupComponent;
