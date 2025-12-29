import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Globe, 
  Search, 
  Filter, 
  MoreHorizontal, 
  BarChart2, 
  ArrowUpRight, 
  ArrowDownRight,
  BrainCircuit,
  Bookmark,
  Share2, 
  PieChart, 
  Activity, 
  Layers, 
  Clock, 
  ChevronRight, 
  LayoutGrid, 
  List, 
  Briefcase, 
  Heart, 
  MessageCircle, 
  MessageSquare, 
  BadgeCheck, 
  Flame, 
  ChevronLeft, 
  ChevronDown, 
  Sparkles, 
  ArrowRight, 
  Eye, 
  UserPlus 
} from 'lucide-react';
import { StockData } from '../types';

// --- Mock Data ---

const INDICES = [
  { id: 'VNINDEX', name: 'VNINDEX', val: '1,254.30', chg: '+12.5', color: '#00c853', vol: '540M', valTx: '15.4k Tỷ', path: 'M0,15 C10,12 20,18 30,10 S50,5 60,2' },
  { id: 'VN30', name: 'VN30', val: '1,280.10', chg: '+15.2', color: '#00c853', vol: '180M', valTx: '8.2k Tỷ', path: 'M0,18 C15,15 25,12 35,8 S50,4 60,3' },
  { id: 'HNX', name: 'HNX', val: '240.50', chg: '+1.2', color: '#00c853', vol: '85M', valTx: '1.8k Tỷ', path: 'M0,10 C15,12 25,8 35,12 S50,6 60,5' },
  { id: 'UPCOM', name: 'UPCOM', val: '90.20', chg: '-0.5', color: '#f23645', vol: '45M', valTx: '800 Tỷ', path: 'M0,5 C10,8 20,10 30,15 S50,18 60,22' },
];

const WORLD_INDICES = [
  { id: 'DJI', name: 'Dow Jones', val: '33,800.5', chg: '+120.5', color: '#00c853', vol: '300M', valTx: '-', path: 'M0,15 C10,12 20,18 30,10 S50,5 60,2' },
  { id: 'NDX', name: 'Nasdaq', val: '13,200.1', chg: '-50.2', color: '#f23645', vol: '500M', valTx: '-', path: 'M0,5 C10,8 20,10 30,15 S50,18 60,22' },
  { id: 'SPX', name: 'S&P 500', val: '4,100.2', chg: '+10.2', color: '#00c853', vol: '400M', valTx: '-', path: 'M0,18 C15,15 25,12 35,8 S50,4 60,3' },
  { id: 'NI225', name: 'Nikkei 225', val: '28,500.0', chg: '+200.0', color: '#00c853', vol: '100M', valTx: '-', path: 'M0,10 C15,12 25,8 35,12 S50,6 60,5' },
];

const MOCK_HEATMAP: StockData[] = [
  { symbol: 'VCB', price: 88.1, change: -0.9, changePercent: -1.01, volume: 980200 },
  { symbol: 'BID', price: 45.2, change: 0.8, changePercent: 1.8, volume: 1500000 },
  { symbol: 'FPT', price: 98.2, change: 1.2, changePercent: 1.24, volume: 1200300 },
  { symbol: 'HPG', price: 28.9, change: -0.2, changePercent: -0.69, volume: 22100500 },
  { symbol: 'TCB', price: 34.5, change: 0.0, changePercent: 0.0, volume: 5600400 },
  { symbol: 'VPB', price: 19.4, change: 0.15, changePercent: 0.78, volume: 11200900 },
  { symbol: 'MBB', price: 18.6, change: 0.05, changePercent: 0.27, volume: 8900100 },
  { symbol: 'VNM', price: 67.2, change: -0.3, changePercent: -0.44, volume: 1800600 },
  { symbol: 'VIC', price: 44.5, change: 0.1, changePercent: 0.23, volume: 2300500 },
  { symbol: 'VHM', price: 42.8, change: 0.3, changePercent: 0.71, volume: 4500100 },
  { symbol: 'MWG', price: 45.1, change: -0.5, changePercent: -1.1, volume: 3400200 },
  { symbol: 'ACB', price: 25.45, change: 0.15, changePercent: 0.59, volume: 4500000 },
  { symbol: 'STB', price: 31.2, change: 0.4, changePercent: 1.3, volume: 15600800 },
  { symbol: 'GAS', price: 75.4, change: -0.8, changePercent: -1.05, volume: 800000 },
  { symbol: 'MSN', price: 65.0, change: 1.1, changePercent: 1.72, volume: 1100000 },
  { symbol: 'SAB', price: 58.2, change: -0.1, changePercent: -0.17, volume: 400000 },
  { symbol: 'GVR', price: 21.5, change: 0.6, changePercent: 2.87, volume: 2100000 },
  { symbol: 'PLX', price: 35.8, change: 0.2, changePercent: 0.56, volume: 600000 },
  { symbol: 'POW', price: 11.2, change: 0.05, changePercent: 0.45, volume: 3500000 },
  { symbol: 'VRE', price: 22.1, change: -0.15, changePercent: -0.67, volume: 2800000 },
  { symbol: 'SSI', price: 34.2, change: 0.85, changePercent: 2.55, volume: 9500000 },
  { symbol: 'VND', price: 22.6, change: 0.4, changePercent: 1.8, volume: 7200000 },
  { symbol: 'HDB', price: 23.5, change: 0.25, changePercent: 1.08, volume: 3100000 },
  { symbol: 'TPB', price: 17.8, change: 0.1, changePercent: 0.56, volume: 4200000 },
  { symbol: 'CTG', price: 32.1, change: 0.3, changePercent: 0.94, volume: 2200000 },
  { symbol: 'VIB', price: 20.8, change: 0.1, changePercent: 0.48, volume: 1800000 },
  { symbol: 'EIB', price: 18.2, change: -0.2, changePercent: -1.09, volume: 1500000 },
  { symbol: 'LPB', price: 15.6, change: 0.2, changePercent: 1.3, volume: 3100000 },
  { symbol: 'SHB', price: 11.4, change: 0.0, changePercent: 0.0, volume: 8200000 },
  { symbol: 'SSB', price: 22.8, change: -0.1, changePercent: -0.44, volume: 500000 },
  { symbol: 'OCB', price: 13.9, change: 0.1, changePercent: 0.72, volume: 1200000 },
  { symbol: 'MSB', price: 14.2, change: 0.15, changePercent: 1.07, volume: 2500000 },
];

const IMPACT_DATA = [
  { symbol: 'VHM', val: 8.0, type: 'inc' },
  { symbol: 'VJC', val: 1.88, type: 'inc' },
  { symbol: 'GAS', val: 1.45, type: 'inc' },
  { symbol: 'VRE', val: 1.08, type: 'inc' },
  { symbol: 'VPL', val: 0.87, type: 'inc' },
  { symbol: 'VCB', val: 0.72, type: 'inc' },
  { symbol: 'TCB', val: 0.39, type: 'inc' },
  { symbol: 'REE', val: 0.11, type: 'inc' },
  { symbol: 'PLX', val: 0.1, type: 'inc' },
  { symbol: 'VNM', val: 0.09, type: 'inc' },
  { symbol: 'HVN', val: -0.2, type: 'dec' },
  { symbol: 'SSI', val: -0.24, type: 'dec' },
  { symbol: 'VPB', val: -0.25, type: 'dec' },
  { symbol: 'MWG', val: -0.28, type: 'dec' },
  { symbol: 'LPB', val: -0.28, type: 'dec' },
  { symbol: 'HPG', val: -0.33, type: 'dec' },
  { symbol: 'TCX', val: -0.41, type: 'dec' },
  { symbol: 'HDB', val: -0.48, type: 'dec' },
  { symbol: 'STB', val: -0.71, type: 'dec' },
  { symbol: 'VIC', val: -2.94, type: 'dec' },
];

// --- Featured Posts Data (Intelligence Tab) ---
const INTELLIGENCE_POSTS = [
  {
    id: 'intro',
    type: 'hot_event',
    title: 'Sự kiện nóng hôm nay',
    content: 'Tất cả những gì bạn cần đọc về NÂNG HẠNG, cập nhật liên tục'
  },
  {
    id: 1,
    author: 'Dương Văn Duy',
    avatar: 'https://i.pravatar.cc/150?u=duy',
    verified: true,
    role: 'Chuyên gia nổi bật',
    tag: 'Theo dõi',
    time: '1 giờ trước',
    title: 'Tại Sao 90% Nhà Đầu Tư Mắc Kẹt Ở Mức Hòa Vốn?',
    content: 'Giấc mơ nâng hạng đã chính thức trở thành hiện thực, Việt Nam sẽ thoát bỏ chiếc áo chật chội và bước... Xem thêm',
    likes: 112,
    comments: 26,
    saves: 12,
    hasImage: false
  },
  {
    id: 2,
    author: 'Xuân Tiệp Vision',
    avatar: 'https://i.pravatar.cc/150?u=tiep',
    verified: true,
    role: null,
    tag: 'Theo dõi',
    time: '1 giờ trước',
    title: 'Làm Thế Nào Để Tìm Ra Cổ Phiếu Chất Lượng Sau Mùa Báo Cáo Kết Quả Kinh Doanh?',
    content: 'Giấc mơ nâng hạng đã chính thức trở thành hiện thực, Việt Nam sẽ thoát bỏ chiếc áo chật chội và bước... Xem thêm',
    likes: 112,
    comments: 26,
    saves: 12,
    hasImage: false
  },
  {
    id: 3,
    author: 'Quỳnh Anh _ Canslim',
    avatar: 'https://i.pravatar.cc/150?u=quynhanh',
    verified: true,
    role: 'Chuyên gia nổi bật',
    tag: 'Theo dõi',
    time: '1h',
    isQuote: true,
    content: 'Dự báo Vnindex có thể sẽ tiếp tục đà tăng trong những phiên tới. Dòng tiền lan tỏa mạnh mẽ sang nhóm Midcap và Penny, xác nhận xu hướng uptrend bền vững. Nhà đầu tư nên tập trung vào các mã có câu chuyện tăng trưởng lợi nhuận đột biến trong Q4 sắp tới.',
    likes: 112,
    comments: 26,
    saves: 12,
    hasImage: false
  }
];

// --- News Posts Data (News Tab) ---
const NEWS_POSTS = [
  {
    id: 4,
    author: 'Finpath Master',
    avatar: 'logo',
    verified: false,
    role: null,
    time: '10:48',
    title: 'Với VIC, định giá căng nhất chỉ khoảng 70',
    subtitle: 'Team tư vấn Tvi',
    content: `• Nhìn vào bản chất, VIC với lợi nhuận toàn từ các khoản đột biến, lợi nhuận ngoài lề thì không đáng để đầu tư dài hạn.
• Khi Vin không làm đường sắt nữa, kỳ vọng đã hết - tất cả dự án đã khởi công, bây giờ phải đi thực hiện.
• Dòng tiền sẽ khó vào VIC khi câu chuyện không còn gì vĩ đại để kể.
• Ngày mai VIC khó dư sàn vì hàng bên ngoài không nhiều, nhưng sẽ đi ngang và tìm vùng cân bằng mới.
• Nhà đầu tư nhỏ lẻ nên tránh xa nhóm này - ai đu đỉnh nhóm Vin mới cần lo lắng, còn lại cứ bám theo cổ phiếu tăng trưởng định giá hấp dẫn như ngân hàng, chứng khoán, bán lẻ và Hòa Phát.`,
    disclaimer: 'Thông tin chỉ sử dụng với mục đích tham khảo, KHÔNG phải khuyến nghị đầu tư.',
    likes: 28,
    comments: 0,
    saves: 0,
    hasImage: false
  },
  {
    id: 5,
    author: 'Finpath Master',
    avatar: 'logo',
    verified: false,
    role: null,
    time: '13:25',
    title: 'VIN KHÔNG LÀM ĐSCT, KHÔNG PHẢI LÀ THIÊN NGA ĐEN',
    subtitle: 'Chuyên gia Long Lãng tử buôn nước mắm.',
    content: `Thị trường có nhịp giảm mạnh do 4 cp Vin nằm sau tiếp sau tin bỏ làm dsct bắc nam hôm qua, Tuy nhiên đây là ảnh hưởng mang tính tâm lí là chủ yếu bởi vì :
• Xét về thiệt hại vs nhóm vin : gần như ko có , thậm chí còn có lợi khi đường sắt cao tốc phải bỏ rất nhiều vốn mà bài toán lỗ là rất cao
• Xét về ảnh hưởng đến vĩ mô và các cổ phiếu khác dẫn đến thị trường chứng khoán : gần như không có sự liên can lắm .

Do vậy em thấy 1-2 phiên có thể tâm lí, nhưng đến phiên thứ 3 gần như chắc chắn ttck sẽ hồi (thậm chí sớm nhất là chiều nay).

Mọi người nếu còn sức mua thì nhập các cổ phiếu tốt, triển vọng dài hạn như mwg hpg pvs ctg mbb ctd hhv nt2 hah dgw, còn nếu đang cầm nhiều rồi thì cứ bình tĩnh.
Đây là sự kiến rất nhỏ theo kinh nghiệm em thấy ko ảnh hưởng quá 2 phiên đâu ạ

Em gặp khá nhiều sự kiến mang tính thiên nga đen rồi , có thể khẳng định luôn là sự kiện này rất rất nhỏ, sang tuần sau có khi ndt quên luôn`,
    likes: 37,
    comments: 0,
    saves: 0,
    hasImage: false,
    highlightLinks: true
  },
  {
    id: 6,
    author: 'Finpath Master',
    avatar: 'logo',
    verified: false,
    role: null,
    time: '10:07',
    title: 'ĐỪNG CÓ HAM BẮT ĐÁY GIÁ SÀN VỚI CỔ PHIẾU VIN',
    subtitle: 'Chuyên gia Hùng Canslim',
    content: `• Kinh nghiệm cho thấy nên né các mã mới có tin xấu vĩ mô sau khi tăng cực mạnh ra, như họ nhà V thì phải né thật xa ra, khi đã có tin xấu như vậy là cú đảo chiều lớn rồi, nó như kiểu FPT năm ngoái ấy, khi giá tăng dài, ai cũng kỳ vọng lớn, thì có tin xấu cái là giảm giá cả năm luôn, thì V cũng đang là như vậy
• Đừng ham giá sàn mà tưởng ngon, cp đã tăng 8 lần, thì việc giảm 40-50 % là bình thường luôn, như vậy còn là quá đắt
• Năm mới phải tìm dòng mới, bỏ hẳn dòng V luôn đi

Nguồn: bản quyền thuộc về team chuyên gia trong bài. Chúng tôi chỉ tổng hợp/ trích dẫn 1 phần, quý vị có thể đăng ký dịch vụ với chuyên gia để sử dụng được full quyền lợi.`,
    disclaimer: 'Thông tin chỉ mang tính THAM KHẢO, không phải khuyến nghị đầu tư.',
    likes: 7,
    comments: 0,
    saves: 0,
    hasImage: false
  }
];

// --- Top Movers Data ---
const TOP_MOVERS_MOCK = [
  { s: 'HPG', p: 27.40, d: 4.38, w: 2.62 },
  { s: 'PVS', p: 32.90, d: 1.54, w: 1.86 },
  { s: 'BSR', p: 16.20, d: 1.89, w: 1.57 },
  { s: 'HUT', p: 16.20, d: 1.25, w: -4.71 },
  { s: 'PVD', p: 26.80, d: 1.13, w: -2.90 },
  { s: 'NVL', p: 13.50, d: 1.50, w: -2.53 },
  { s: 'CII', p: 22.50, d: 0.00, w: -4.05 },
  { s: 'POW', p: 12.70, d: 0.79, w: 4.10 },
  { s: 'HVN', p: 25.90, d: 0.78, w: 0.78 },
  { s: 'VCG', p: 23.35, d: 0.65, w: -2.10 },
  { s: 'NLG', p: 31.20, d: 0.65, w: -1.58 },
  { s: 'SAB', p: 48.40, d: 0.41, w: -2.62 },
  { s: 'TCB', p: 34.20, d: 0.59, w: 1.79 },
  { s: 'TPB', p: 17.10, d: 0.59, w: 1.48 },
  { s: 'VCI', p: 34.55, d: 0.44, w: -0.58 },
  { s: 'VHC', p: 53.40, d: 0.75, w: -2.02 },
  { s: 'VNM', p: 61.60, d: 0.49, w: -3.75 },
  { s: 'GVR', p: 25.75, d: 0.39, w: -2.65 },
];

const TOP_VOLUME_MOCK = [
  { s: 'HPG', p: 27.40, v: 1884.7, d: 4.38 },
  { s: 'VRE', p: 30.15, v: 1280.5, d: -6.51 },
  { s: 'MSR', p: 24.50, v: 1095.2, d: -2.39 },
  { s: 'VHM', p: 106.30, v: 995.2, d: -7.00 },
  { s: 'TCH', p: 18.60, v: 332.0, d: -1.33 },
  { s: 'HCM', p: 22.90, v: 617.0, d: 0.00 },
  { s: 'IDC', p: 36.60, v: 674.3, d: -0.54 },
  { s: 'GVR', p: 25.75, v: 581.4, d: 0.39 },
  { s: 'PVS', p: 32.90, v: 450.7, d: 1.54 },
  { s: 'KDH', p: 31.95, v: 601.9, d: -0.62 },
  { s: 'TCB', p: 34.20, v: 523.2, d: 0.59 },
  { s: 'PVD', p: 26.80, v: 423.8, d: 1.13 },
  { s: 'ABB', p: 15.80, v: 515.3, d: 0.00 }, 
  { s: 'VIC', p: 147.00, v: 462.4, d: -6.96 }, 
  { s: 'EIB', p: 21.85, v: 461.2, d: -0.68 },
  { s: 'MBB', p: 24.95, v: 446.5, d: -0.20 },
  { s: 'REE', p: 61.40, v: 445.2, d: 0.00 },
  { s: 'VPB', p: 28.65, v: 404.5, d: -0.35 },
];

const TOP_FOREIGN_MOCK = [
  { b: 'MWG', bv: 618.1, s: 'DGC', sv: 843.3 },
  { b: 'SSI', bv: 491.2, s: 'VIC', sv: 647.5 },
  { b: 'STB', bv: 440.0, s: 'FPT', sv: 412.5 },
  { b: 'HPG', bv: 322.6, s: 'GMD', sv: 134.9 },
  { b: 'VIX', bv: 298.2, s: 'DGW', sv: 108.0 },
  { b: 'VPB', bv: 287.3, s: 'DIG', sv: 93.4 },
  { b: 'MBB', bv: 269.6, s: 'LPB', sv: 82.7 },
  { b: 'VND', bv: 266.8, s: 'CII', sv: 79.1 },
  { b: 'GEX', bv: 263.8, s: 'MBS', sv: 77.5 },
  { b: 'VJC', bv: 262.6, s: 'HDB', sv: 76.6 },
  { b: 'VPL', bv: 239.8, s: 'ACB', sv: 71.6 },
  { b: 'BSR', bv: 238.2, s: 'NLG', sv: 71.3 },
  { b: 'VHM', bv: 236.9, s: 'HCM', sv: 62.2 },
  { b: 'GAS', bv: 189.1, s: 'HVN', sv: 58.5 },
  { b: 'MSN', bv: 179.1, s: 'ACV', sv: 55.8 },
  { b: 'KDH', bv: 124.6, s: 'VPX', sv: 44.0 },
  { b: 'POW', bv: 123.3, s: 'CEO', sv: 33.8 },
  { b: 'VRE', bv: 116.7, s: 'SAB', sv: 28.1 },
  { b: 'PVD', bv: 112.5, s: 'PC1', sv: 27.1 },
  { b: 'TPB', bv: 108.5, s: 'NVL', sv: 26.6 },
  { b: 'MCH', bv: 100.3, s: 'SHS', sv: 24.5 },
  { b: 'CTG', bv: 98.6, s: 'BSI', sv: 19.2 },
  { b: 'TAL', bv: 91.1, s: 'DBC', sv: 16.8 },
];

// --- Sub-Components ---

const TreemapBlock = ({ symbol, percent, color, className }: { symbol: string, percent: string, color: string, className?: string }) => (
  <div 
    className={`relative flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer overflow-hidden p-1 transition-all ${className}`} 
    style={{ backgroundColor: color }}
  >
    <span className="font-bold text-white text-xs md:text-sm drop-shadow-md truncate">{symbol}</span>
    <span className="text-white/90 text-[10px] md:text-xs font-bold">{percent}</span>
  </div>
);

const LiquidityChart = () => {
    const timeLabels = ["09:15", "09:26", "09:37", "09:48", "09:59", "10:10", "10:21", "10:32", "10:43", "10:54", "11:05", "11:16", "11:27", "13:07", "13:18", "13:29", "13:40", "13:51", "14:02", "14:13", "14:24", "14:35"];
    
    const yLabels = [35000, 30000, 25000, 20000, 15000, 10000, 5000, 0];
    
    const width = 1000;
    const height = 400;
    const padding = { top: 40, right: 20, bottom: 30, left: 50 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const yesterdayPoints = [];
    let yVal = 1500;
    for(let i=0; i <= 210; i++) { 
        yVal += (Math.random() * 150 + 50); 
        if (i > 100 && i < 130) yVal += 50; 
        yesterdayPoints.push({ x: (i / 210) * chartW, y: Math.min(yVal, 33000) });
    }
    
    const todayPoints = [];
    let tVal = 500;
    for(let i=0; i <= 85; i++) { 
        tVal += (Math.random() * 100 + 20);
        todayPoints.push({ x: (i / 210) * chartW, y: tVal });
    }

    const getY = (val: number) => chartH - (val / 35000) * chartH;

    const makePath = (points: {x: number, y: number}[]) => {
        return points.map((p, i) => `${i===0?'M':'L'} ${padding.left + p.x},${padding.top + getY(p.y)}`).join(' ');
    };
    
    const makeArea = (points: {x: number, y: number}[]) => {
        const line = makePath(points);
        const lastX = padding.left + points[points.length-1].x;
        const bottomY = padding.top + chartH;
        const firstX = padding.left + points[0].x;
        return `${line} L ${lastX},${bottomY} L ${firstX},${bottomY} Z`;
    };

    return (
        <div className="flex-1 w-full h-full bg-[#000000] relative flex flex-col p-4 select-none">
             <div className="flex items-center justify-between mb-2">
                 <div className="text-xs text-gray-400 font-bold">GTGD (Tỷ)</div>
                 <div className="flex items-center gap-4 text-xs font-bold">
                     <div className="flex items-center gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-[#2962ff]"></div>
                         <span className="text-white">GTGD hôm nay</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-[#ffab00]"></div>
                         <span className="text-white">GTGD Hôm qua</span>
                     </div>
                 </div>
                 <div className="flex bg-[#1c1c1e] rounded text-[10px] font-bold overflow-hidden border border-[#2c2c2e]">
                     {['0D', '5D', '10D', '20D'].map(d => (
                         <button key={d} className={`px-2 py-1 ${d === '0D' ? 'bg-[#2962ff] text-white' : 'text-gray-400 hover:text-white'}`}>{d}</button>
                     ))}
                 </div>
             </div>

             <div className="flex-1 relative">
                <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2962ff" stopOpacity="0.4"/>
                            <stop offset="100%" stopColor="#2962ff" stopOpacity="0.05"/>
                        </linearGradient>
                    </defs>

                    {yLabels.map((val) => {
                        const y = padding.top + getY(val);
                        return (
                            <g key={val}>
                                <line x1={padding.left} y1={y} x2={width} y2={y} stroke="#1c1c1e" strokeWidth="1" strokeDasharray="4 4" />
                                <text x={0} y={y + 4} fill="#6b7280" fontSize="11" textAnchor="start">{val.toLocaleString()}</text>
                            </g>
                        )
                    })}

                    <path d={makePath(yesterdayPoints)} fill="none" stroke="#ffab00" strokeWidth="2" />
                    
                    <path d={makeArea(todayPoints)} fill="url(#blueGradient)" />
                    <path d={makePath(todayPoints)} fill="none" stroke="#2962ff" strokeWidth="2" />

                    {timeLabels.map((t, i) => {
                        const x = padding.left + (i / (timeLabels.length - 1)) * chartW;
                        return (
                             <text key={i} x={x} y={height - 5} fill="#6b7280" fontSize="11" textAnchor="middle">{t}</text>
                        )
                    })}
                </svg>
                
                 <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                   <div className="flex items-center gap-2 text-6xl font-bold text-white">
                      <Zap size={60} /> Finpath
                   </div>
                </div>
             </div>
        </div>
    )
}

const ImpactChart = () => {
  const maxVal = 10;
  const minVal = -4;
  const totalRange = maxVal - minVal; 
  const zeroPosPercent = (Math.abs(minVal) / totalRange) * 100; 

  return (
    <div className="flex-1 w-full h-full bg-[#000000] relative flex flex-col pt-8 pb-4 px-4 select-none">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
           <div className="flex items-center gap-2 text-6xl font-bold text-white">
              <Zap size={60} /> Finpath
           </div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
            {[10, 8, 6, 4, 2, 0, -2, -4].map(val => {
                const bottomPct = ((val - minVal) / totalRange) * 100;
                return (
                    <div 
                        key={val} 
                        className="absolute w-full border-t border-[#1c1c1e] border-dashed flex items-center"
                        style={{ bottom: `${bottomPct}%`, left: 0, right: 0 }}
                    >
                         <span className="absolute -left-0 -translate-y-1/2 text-[10px] text-gray-500 w-6 text-right pr-1">{val}</span>
                    </div>
                );
            })}
        </div>
        
        <div className="absolute top-2 left-8 text-xs text-gray-400">Điểm</div>
        
        <div className="absolute top-2 right-4 flex gap-4 text-xs font-medium z-10">
             <div className="flex items-center gap-1.5">
                 <div className="w-2 h-2 rounded-full bg-[#00c853]"></div>
                 <span className="text-gray-300">Tác động tăng</span>
             </div>
             <div className="flex items-center gap-1.5">
                 <div className="w-2 h-2 rounded-full bg-[#f23645]"></div>
                 <span className="text-gray-300">Tác động giảm</span>
             </div>
        </div>

        <div className="flex-1 flex items-end justify-between ml-8 relative z-10 h-full gap-1">
            {IMPACT_DATA.map((item) => {
                const heightPct = (Math.abs(item.val) / totalRange) * 100;
                return (
                    <div key={item.symbol} className="flex-1 h-full relative group flex flex-col justify-end">
                         <div 
                            className={`absolute w-full rounded-t-sm transition-all hover:brightness-110 ${item.val >= 0 ? 'bg-gradient-to-t from-[#00c853]/50 to-[#00c853]' : 'bg-gradient-to-b from-[#f23645]/50 to-[#f23645] rounded-b-sm rounded-t-none'}`}
                            style={{
                                height: `${heightPct}%`,
                                bottom: item.val >= 0 ? `${zeroPosPercent}%` : 'auto',
                                top: item.val < 0 ? `${100 - zeroPosPercent}%` : 'auto'
                            }}
                         >
                            <div className={`
                                absolute w-full text-center text-[9px] text-gray-400 font-mono
                                ${item.val >= 0 ? '-top-4' : '-bottom-4'}
                            `}>
                                {item.val}
                            </div>
                         </div>
                         
                         <div className="absolute bottom-[-18px] w-full text-center text-[9px] text-gray-400 font-bold truncate">
                             {item.symbol}
                         </div>

                         <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-1/2 left-1/2 -translate-x-1/2 bg-[#1c1c1e] border border-[#2c2c2e] p-2 rounded shadow-xl z-50 pointer-events-none whitespace-nowrap">
                             <div className="font-bold text-white">{item.symbol}</div>
                             <div className={`${item.val >= 0 ? 'text-[#00c853]' : 'text-[#f23645]'}`}>
                                 {item.val > 0 ? '+' : ''}{item.val} điểm
                             </div>
                         </div>
                    </div>
                )
            })}
        </div>
        
        <div className="absolute w-full border-t border-gray-500 opacity-50" style={{ bottom: `${zeroPosPercent}%`, left: 0 }}></div>
    </div>
  );
};

const ForeignMarketDashboard = () => {
    return (
        <div className="flex-1 flex flex-col min-h-0 bg-[#000000] text-white overflow-hidden">
            <div className="h-[220px] flex border-b border-[#1c1c1e] shrink-0">
                <div className="w-[30%] border-r border-[#1c1c1e] p-4 flex flex-col justify-center gap-6">
                    <h3 className="text-base font-bold text-white mb-2">Tổng quan</h3>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Mua</span>
                        <div className="text-right">
                            <div className="font-mono font-bold text-[#00c853]">37,802,230</div>
                            <div className="font-mono text-xs text-[#00c853]">1,659.0 tỷ</div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Bán</span>
                        <div className="text-right">
                            <div className="font-mono font-bold text-[#f23645]">38,603,794</div>
                            <div className="font-mono text-xs text-[#f23645]">1,406.1 tỷ</div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-[#1c1c1e]">
                        <span className="text-gray-400 text-sm">Mua - Bán</span>
                        <div className="text-right">
                            <div className="font-mono font-bold text-[#f23645]">-801,564</div>
                            <div className="font-mono text-xs text-[#00c853]">252.8 tỷ</div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 p-4 flex flex-col relative">
                     <div className="flex justify-between items-center mb-4 z-10">
                        <h3 className="text-sm font-bold text-gray-200">NN mua ròng (tỷ)</h3>
                        <div className="flex bg-[#1c1c1e] rounded p-0.5">
                            <button className="px-2 py-0.5 text-[10px] bg-[#2962ff] text-white rounded shadow-sm">10 phiên</button>
                            <button className="px-2 py-0.5 text-[10px] text-gray-400 hover:text-white">Hôm nay</button>
                        </div>
                     </div>
                     
                     <div className="flex-1 relative flex items-end gap-3 pb-6 border-b border-[#1c1c1e]/50 ml-6">
                        <div className="absolute left-0 top-0 bottom-6 w-[1px] bg-[#1c1c1e]"></div>
                        <div className="absolute left-0 right-0 top-[50%] h-[1px] bg-[#1c1c1e]/50 border-dashed"></div>
                        
                        <div className="absolute -left-8 top-0 text-[9px] text-gray-500">1,500</div>
                        <div className="absolute -left-8 top-[25%] text-[9px] text-gray-500">1,000</div>
                        <div className="absolute -left-8 top-[50%] text-[9px] text-gray-500">500</div>
                        <div className="absolute -left-8 top-[75%] text-[9px] text-gray-500">0</div>
                        <div className="absolute -left-8 bottom-6 text-[9px] text-gray-500">-500</div>

                        {[
                            { d: '12/12', v: -600, c: '#f23645' },
                            { d: '15/12', v: 700, c: '#00c853' },
                            { d: '16/12', v: 10, c: '#00c853' },
                            { d: '17/12', v: 20, c: '#00c853' },
                            { d: '18/12', v: -900, c: '#f23645' },
                            { d: '19/12', v: 550, c: '#00c853' },
                            { d: '22/12', v: 550, c: '#00c853' },
                            { d: '23/12', v: 750, c: '#00c853' },
                            { d: '24/12', v: 1100, c: '#00c853' },
                            { d: '00:00', v: 300, c: '#00c853' },
                        ].map((item, i) => (
                             <div key={i} className="flex-1 flex flex-col justify-end h-full relative group">
                                  <div 
                                    className="w-full rounded-sm opacity-90 group-hover:opacity-100 transition-opacity"
                                    style={{ 
                                        height: `${Math.abs(item.v) / 15}%`, 
                                        backgroundColor: item.c,
                                        marginBottom: item.v > 0 ? '50%' : `calc(50% - ${Math.abs(item.v) / 15}%)`
                                    }}
                                  ></div>
                                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-gray-500 whitespace-nowrap">{item.d}</span>
                             </div>
                        ))}
                     </div>
                </div>
            </div>

            <div className="flex-1 bg-[#13171b] overflow-hidden p-1 relative">
                <div className="w-full h-full grid grid-cols-6 grid-rows-4 gap-0.5">
                    <div className="col-span-2 row-span-2 bg-[#00c853] p-2 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-lg drop-shadow">VHM</span>
                         <span className="text-xs font-medium">118.63 tỷ</span>
                    </div>
                    <div className="col-span-2 row-span-2 bg-[#00c853] p-2 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-lg drop-shadow">VPB</span>
                         <span className="text-xs font-medium">63.51 tỷ</span>
                    </div>
                    
                    <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-sm drop-shadow">GAS</span>
                         <span className="text-[10px]">49.98 tỷ</span>
                    </div>
                    <div className="col-span-1 row-span-1 bg-[#f23645] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-sm drop-shadow">DGC</span>
                         <span className="text-[10px]">-49.19 tỷ</span>
                    </div>

                    <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-sm drop-shadow">VND</span>
                         <span className="text-[10px]">39.59 tỷ</span>
                    </div>
                     <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-sm drop-shadow">CTG</span>
                         <span className="text-[10px]">16.84 tỷ</span>
                    </div>

                    <div className="col-span-2 row-span-2 bg-[#00c853] p-2 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-lg drop-shadow">STB</span>
                         <span className="text-xs font-medium">117.39 tỷ</span>
                    </div>

                     <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-sm drop-shadow">FPT</span>
                         <span className="text-[10px]">31.32 tỷ</span>
                    </div>
                    <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-xs drop-shadow">TAL</span>
                         <span className="text-[9px]">19.93 tỷ</span>
                    </div>
                    <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-xs drop-shadow">SSI</span>
                         <span className="text-[9px]">18.29 tỷ</span>
                    </div>
                    <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-xs drop-shadow">MSN</span>
                         <span className="text-[9px]">17.4 tỷ</span>
                    </div>

                    <div className="col-span-1 row-span-1 bg-[#f23645] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-sm drop-shadow">VIX</span>
                         <span className="text-[10px]">-24.91 tỷ</span>
                    </div>
                    <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-xs drop-shadow">GEX</span>
                         <span className="text-[9px]">16.55 tỷ</span>
                    </div>
                    <div className="col-span-1 row-span-1 bg-[#f23645] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-xs drop-shadow">NLG</span>
                         <span className="text-[9px]">-16.45 tỷ</span>
                    </div>
                     <div className="col-span-1 row-span-1 bg-[#00c853] p-1 flex flex-col items-center justify-center border border-[#0b0e11] hover:brightness-110 cursor-pointer">
                         <span className="font-bold text-xs drop-shadow">KDH</span>
                         <span className="text-[9px]">16.29 tỷ</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

const MarketOverviewCard: React.FC<{ 
    title: string; 
    children: React.ReactNode; 
    icon: any; 
    active?: boolean; 
    onClick?: () => void;
}> = ({ title, children, icon: Icon, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`
        bg-[#13171b] border rounded p-2 flex flex-col h-full relative overflow-hidden group cursor-pointer transition-all duration-200
        ${active ? 'border-[#2962ff] shadow-[0_0_10px_rgba(41,98,255,0.2)] bg-[#1a1f26]' : 'border-[#2a2e39] hover:border-gray-500'}
    `}
  >
    <div className="flex items-center gap-2 mb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
      <Icon size={12} className={active ? 'text-white' : 'text-[#2962ff]'} />
      <span className={active ? 'text-white' : ''}>{title}</span>
    </div>
    <div className="flex-1 flex flex-col justify-center">
      {children}
    </div>
    
    {active && (
        <div className="absolute top-0 right-0 w-2 h-2 bg-[#2962ff] rounded-bl"></div>
    )}
  </div>
);

const HeatmapItem: React.FC<{ stock: StockData }> = ({ stock }) => {
  const isPositive = stock.changePercent >= 0;
  return (
    <div 
      className={`
        relative flex flex-col items-center justify-center p-1 cursor-pointer transition-all hover:z-10 hover:scale-105 hover:shadow-xl border border-[#0b0e11]
        ${stock.changePercent >= 2 ? 'bg-[#00c853]' : 
          stock.changePercent >= 0.5 ? 'bg-[#00c853]/80' : 
          stock.changePercent >= 0 ? 'bg-[#00c853]/60' : 
          stock.changePercent > -1 ? 'bg-[#f23645]/60' : 
          stock.changePercent > -2 ? 'bg-[#f23645]/80' : 'bg-[#f23645]'}
      `}
    >
      <span className="font-bold text-white text-sm md:text-base drop-shadow-md">{stock.symbol}</span>
      <span className="text-white/90 text-xs font-mono font-medium">{stock.changePercent > 0 ? '+' : ''}{stock.changePercent}%</span>
      <span className="text-white/80 text-[10px] hidden lg:block">{stock.price}</span>
    </div>
  );
};

const PostCard: React.FC<{ post: any }> = ({ post }) => {
  if (post.type === 'hot_event') {
    return (
      <div className="flex items-start gap-3 p-3 bg-[#000000] border border-[#2a2e39] rounded-lg mb-2 cursor-pointer hover:bg-[#121212] transition-colors">
         <div className="bg-[#1c1c1e] p-2 rounded-full border border-[#2c2c2e]">
             <Flame size={20} className="text-orange-500 fill-orange-500 animate-pulse" />
         </div>
         <div>
             <div className="text-orange-500 font-bold text-sm mb-0.5 flex items-center gap-1">
                 {post.title}
             </div>
             <div className="text-gray-300 text-sm font-medium leading-tight">
                 {post.content}
             </div>
         </div>
      </div>
    );
  }

  if (post.isQuote) {
     return (
        <div className="border-b border-[#1c1c1e] py-4 px-1">
             <div className="flex justify-between items-start mb-3">
                 <div className="flex gap-3">
                     <div className="relative">
                         <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full border-2 border-[#1c1c1e]" />
                         {post.verified && <div className="absolute -bottom-0 -right-0 bg-blue-500 rounded-full p-[2px]"><BadgeCheck size={10} className="text-white fill-blue-500" /></div>}
                     </div>
                     <div>
                         <div className="flex items-center gap-1">
                             <h3 className="font-bold text-sm text-white">{post.author}</h3>
                             {post.verified && <BadgeCheck size={14} className="text-[#2962ff] fill-white" />}
                             <button className="ml-2 text-xs font-bold text-[#2962ff] hover:underline">Theo dõi</button>
                         </div>
                         <div className="flex items-center gap-2">
                             {post.role && <span className="text-[10px] text-orange-400 font-medium bg-orange-400/10 px-1 rounded">{post.role}</span>}
                             <span className="text-[10px] text-gray-500">• {post.time}</span>
                         </div>
                     </div>
                 </div>
                 <MoreHorizontal size={16} className="text-gray-500" />
             </div>
             
             <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white text-center font-medium text-lg leading-relaxed shadow-lg mb-3">
                 "{post.content}"
             </div>

             <div className="flex items-center gap-6 mt-3 text-gray-400">
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
  }

  if (post.author === 'Finpath Master') {
      return (
        <div className="border-b border-[#1c1c1e] py-4 px-1 last:border-0 hover:bg-[#0b0e11] transition-colors">
            <div className="flex justify-between items-start mb-2">
                <div className="flex gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-[#2962ff] flex items-center justify-center text-white font-bold text-lg border-2 border-[#1c1c1e]">
                            <Zap size={20} fill="white" />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm text-[#2962ff]">{post.author}</h3>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-gray-500">{post.time}</span>
                        </div>
                    </div>
                </div>
                <MoreHorizontal size={16} className="text-gray-500 hover:text-white cursor-pointer" />
            </div>

            <h3 className="text-sm font-bold text-gray-100 mb-1 leading-snug mt-2">
                {post.title}
            </h3>
            
            {post.subtitle && (
                <div className="text-xs font-bold text-gray-400 mb-2">{post.subtitle}</div>
            )}
            
            <div className="text-sm text-gray-300 leading-relaxed mb-3 whitespace-pre-line">
                {post.highlightLinks ? (
                    post.content.split(' ').map((word: string, i: number) => {
                        if (['mwg', 'hpg', 'pvs', 'ctg', 'mbb', 'ctd', 'hhv', 'nt2', 'hah', 'dgw'].includes(word.toLowerCase())) {
                            return <span key={i} className="text-[#2962ff] font-bold cursor-pointer hover:underline uppercase">{word} </span>
                        }
                        return word + ' ';
                    })
                ) : (
                    post.content
                )}
            </div>

            {post.disclaimer && (
                <div className="text-[10px] text-gray-500 italic mb-3">
                    {post.disclaimer}
                </div>
            )}

            <div className="flex items-center gap-6 mt-3 text-gray-400">
                <button className="flex items-center gap-1.5 hover:text-[#f23645] transition-colors group">
                    <Heart size={16} className={`group-hover:fill-[#f23645] ${post.likes > 0 ? 'fill-[#f23645] text-[#f23645]' : ''}`} />
                    <span className="text-xs font-bold">{post.likes}</span>
                </button>
                 <button className="flex items-center gap-1.5 hover:text-[#2962ff] transition-colors">
                    <MessageCircle size={16} />
                </button>
                <button className="flex items-center gap-1.5 hover:text-[#2962ff] transition-colors ml-auto">
                    <Sparkles size={16} />
                    <span className="text-xs font-bold">Hỏi AI</span>
                </button>
                 <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <Share2 size={16} />
                </button>
            </div>
        </div>
      );
  }

  return (
    <div className="border-b border-[#1c1c1e] py-4 px-1 last:border-0 hover:bg-[#0b0e11] transition-colors">
      <div className="flex justify-between items-start mb-2">
         <div className="flex gap-3">
             <div className="relative">
                 <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full border-2 border-[#1c1c1e]" />
                 <div className="absolute -bottom-1 -right-1 bg-[#13171b] rounded-full p-[1px]">
                     <BadgeCheck size={14} className="text-[#2962ff] fill-white" />
                 </div>
             </div>
             <div>
                 <div className="flex items-center gap-2">
                     <h3 className="font-bold text-sm text-white">{post.author}</h3>
                     {post.tag && <button className="text-xs font-bold text-[#2962ff] hover:underline">{post.tag}</button>}
                 </div>
                 <div className="flex items-center gap-2 mt-0.5">
                     {post.role && <span className="text-[10px] text-orange-400 font-medium">{post.role}</span>}
                     <span className="text-[10px] text-gray-500">• {post.time}</span>
                 </div>
             </div>
         </div>
         <MoreHorizontal size={16} className="text-gray-500 hover:text-white cursor-pointer" />
      </div>

      <h3 className="text-sm font-bold text-gray-100 mb-2 leading-snug mt-2">
          {post.title}
      </h3>
      
      <p className="text-sm text-gray-300 leading-relaxed mb-1">
          {post.content} <span className="text-[#2962ff] cursor-pointer hover:underline">Xem thêm</span>
      </p>

      {post.hasImage && (
          <div className="mb-3 mt-2 rounded-lg overflow-hidden border border-[#2a2e39] relative group">
               <div className="w-full h-48 bg-[#1e2329] flex items-center justify-center text-gray-600 relative overflow-hidden">
                  <img src={post.imageUrl} alt="Post content" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               </div>
          </div>
      )}

      <div className="flex items-center gap-6 mt-3 text-gray-400">
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

const IndicesTickerRow: React.FC<{ selected: string; onSelect: (id: string) => void }> = ({ selected, onSelect }) => {
  const [showWorld, setShowWorld] = useState(false);
  const displayedIndices = showWorld ? WORLD_INDICES : INDICES;

  return (
    <div className="flex items-center w-full h-[40px] border-b border-[#1c1c1e] bg-[#000000] text-xs shrink-0 select-none relative group">
        <div className="flex-1 flex overflow-hidden">
            {displayedIndices.map((idx) => {
               const isActive = selected === idx.id;
               return (
                   <button 
                      key={idx.id} 
                      onClick={() => onSelect(idx.id)}
                      className={`
                          flex-1 h-full flex items-center justify-between px-3 border-r border-[#1c1c1e] last:border-r-0 relative transition-colors group
                          ${isActive ? 'bg-[#121212]' : 'hover:bg-[#121212]'}
                      `}
                   >
                       {isActive && <div className="absolute top-0 left-0 w-full h-[2px] bg-[#2962ff]" />}
                       
                       <div className="flex flex-col items-start gap-0.5 min-w-[50px]">
                           <span className={`font-bold text-[11px] ${isActive ? 'text-white' : 'text-gray-400'}`}>{idx.name}</span>
                           <span className="text-[9px] text-gray-500 font-mono tracking-tight">{idx.vol}</span>
                       </div>

                       <div className="flex-1 mx-2 h-6 opacity-60 group-hover:opacity-100 transition-opacity">
                          <svg width="100%" height="100%" viewBox="0 0 60 25" preserveAspectRatio="none">
                               <defs>
                                  <linearGradient id={`grad-${idx.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" stopColor={idx.color} stopOpacity="0.2" />
                                      <stop offset="100%" stopColor={idx.color} stopOpacity="0" />
                                  </linearGradient>
                               </defs>
                               <path d={idx.path} fill="none" stroke={idx.color} strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
                               <path d={`${idx.path} L60,25 L0,25 Z`} fill={`url(#grad-${idx.id})`} stroke="none" />
                          </svg>
                       </div>

                       <div className="flex flex-col items-end gap-0.5 min-w-[60px]">
                           <div className="flex items-center gap-1">
                              <span className={`font-mono font-bold text-[11px] ${idx.color === '#00c853' ? 'text-[#00c853]' : 'text-[#f23645]'}`}>{idx.val}</span>
                              <span className={`font-mono text-[10px] ${idx.color === '#00c853' ? 'text-[#00c853]' : 'text-[#f23645]'}`}>{idx.chg}</span>
                           </div>
                           <span className="text-[9px] text-gray-500 font-mono tracking-tight">{idx.valTx}</span>
                       </div>
                   </button>
               );
            })}
        </div>
        
        <button 
             onClick={() => setShowWorld(!showWorld)}
             className="absolute right-0 top-0 bottom-0 w-6 bg-[#1c1c1e]/90 hover:bg-[#2962ff] text-gray-400 hover:text-white border-l border-[#2c2c2e] flex items-center justify-center transition-all z-20 shadow-[-5px_0_10px_rgba(0,0,0,0.5)]"
             title={showWorld ? "Quay lại chỉ số VN" : "Xem chỉ số Thế giới"}
        >
              {showWorld ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
    </div>
  );
};

const MiniStockRow = ({ symbol, value, maxVal }: { symbol: string, value: number, maxVal: number }) => {
    const isPos = value >= 0;
    const widthPct = Math.min((Math.abs(value) / maxVal) * 100, 100);
    
    return (
        <div className="flex items-center justify-between text-[10px] h-5">
             <span className="text-gray-300 font-bold w-8">{symbol}</span>
             
             <div className="flex-1 mx-2 h-1.5 bg-[#2a2e39] rounded-full overflow-hidden flex items-center">
                 <div 
                    className={`h-full rounded-full ${isPos ? 'bg-[#00c853]' : 'bg-[#f23645]'}`} 
                    style={{ width: `${widthPct}%` }}
                 />
             </div>

             <span className={`${isPos ? 'text-[#00c853]' : 'text-[#f23645]'} font-medium text-right w-12`}>
                 {value > 0 ? '+' : ''}{value} tỷ
             </span>
        </div>
    );
};

export const MarketDashboard = () => {
  const [activeDashboardTab, setActiveDashboardTab] = useState<'market' | 'top_stocks' | 'industry' | 'derivatives'>('market');
  const [activeMoverTab, setActiveMoverTab] = useState<'gainers' | 'losers' | 'vol'>('gainers');
  const [selectedIndex, setSelectedIndex] = useState('VN30');
  const [viewMode, setViewMode] = useState<'heatmap' | 'impact'>('heatmap');
  const [activeRightTab, setActiveRightTab] = useState<'news' | 'intelligence' | 'ai_news'>('intelligence');
  
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const displayedStocks = useMemo(() => {
    switch(selectedIndex) {
        case 'VNINDEX':
            return [...MOCK_HEATMAP].sort(() => 0.5 - Math.random());
        case 'HNX':
            return MOCK_HEATMAP.slice(0, 15).map(s => ({...s, symbol: s.symbol + '*'}));
        case 'UPCOM':
            return MOCK_HEATMAP.slice(15).map(s => ({...s, symbol: s.symbol + '**'}));
        case 'VN30':
        default:
            return MOCK_HEATMAP;
    }
  }, [selectedIndex]);

  const currentIndex = INDICES.find(i => i.id === selectedIndex) || INDICES[0];

  const handleCardClick = (id: string) => {
      setActiveCardId(prev => prev === id ? null : id);
  };

  const currentPosts = activeRightTab === 'intelligence' ? NEWS_POSTS : (activeRightTab === 'news' ? INTELLIGENCE_POSTS : []);

  return (
    <div className="flex h-full w-full bg-[#000000] overflow-hidden font-sans">
      
      <div className="w-[65%] flex flex-col border-r border-[#1c1c1e] h-full min-w-0">
        
        <div className="flex h-10 border-b border-[#1c1c1e] bg-[#000000] shrink-0">
             {['THỊ TRƯỜNG', 'CỔ PHIẾU NỔI BẬT', 'NGÀNH', 'PHÁI SINH'].map((tabLabel) => {
                 const tabKey = tabLabel === 'THỊ TRƯỜNG' ? 'market' 
                              : tabLabel === 'CỔ PHIẾU NỔI BẬT' ? 'top_stocks' 
                              : tabLabel === 'NGÀNH' ? 'industry' : 'derivatives';
                 const isActive = activeDashboardTab === tabKey;
                 
                 return (
                     <button 
                        key={tabKey}
                        onClick={() => setActiveDashboardTab(tabKey as any)}
                        className={`
                            px-4 text-xs font-bold uppercase tracking-wide transition-colors relative
                            ${isActive ? 'text-[#2962ff] bg-[#121212]' : 'text-gray-500 hover:text-white hover:bg-[#121212]/50'}
                        `}
                     >
                        {tabLabel}
                        {isActive && <div className="absolute top-0 left-0 w-full h-[2px] bg-[#2962ff]" />}
                     </button>
                 );
             })}
        </div>

        {activeDashboardTab === 'market' && (
          <>
            <IndicesTickerRow selected={selectedIndex} onSelect={setSelectedIndex} />

            <div className="h-[110px] p-2 grid grid-cols-4 gap-2 border-b border-[#1c1c1e] bg-[#000000] shrink-0">
              <MarketOverviewCard 
                title="BIẾN ĐỘNG" 
                icon={Activity} 
                active={activeCardId === 'biendong'}
                onClick={() => handleCardClick('biendong')}
              >
                 <div className="flex h-full items-center">
                    <div className="flex flex-col justify-center w-[35%] border-r border-[#1c1c1e]/50 pr-2">
                        <div className="text-[10px] text-gray-400 font-bold mb-0.5">{currentIndex.name}</div>
                        <div className={`text-xl font-bold tracking-tight ${currentIndex.color === '#00c853' ? 'text-[#00c853]' : 'text-[#f23645]'}`}>
                            {currentIndex.val.split('.')[0]}
                        </div>
                        <div className={`text-[10px] font-medium ${currentIndex.color === '#00c853' ? 'text-[#00c853]' : 'text-[#f23645]'}`}>
                            {currentIndex.chg}
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center pl-2 gap-1.5">
                        <div className="flex items-center justify-between text-[10px]">
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-sm bg-[#00c853]"></div>
                                <span className="text-gray-400">Tăng</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-[#00c853]">280</span>
                                <span className="text-[9px] text-gray-500 w-10 text-right">8.2k tỷ</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-sm bg-yellow-500"></div>
                                <span className="text-gray-400">0 đổi</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-yellow-500">45</span>
                                <span className="text-[9px] text-gray-500 w-10 text-right">---</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-sm bg-[#f23645]"></div>
                                <span className="text-gray-400">Giảm</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-[#f23645]">115</span>
                                <span className="text-[9px] text-gray-500 w-10 text-right">6.7k tỷ</span>
                            </div>
                        </div>
                    </div>
                 </div>
              </MarketOverviewCard>
              
              <MarketOverviewCard 
                title="THANH KHOẢN" 
                icon={Layers}
                active={activeCardId === 'thanhkhoan'}
                onClick={() => handleCardClick('thanhkhoan')}
              >
                 <div className="flex flex-col justify-center h-full pb-2">
                    <div className="flex items-baseline gap-2 mb-1">
                       <span className="text-2xl font-bold text-white tracking-tight">15.4K tỷ</span>
                       <span className="text-[10px] px-1.5 py-0.5 bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/30 rounded font-bold">
                          +12%
                       </span>
                    </div>
                    <div className="text-[10px] text-gray-500">So với phiên trước</div>
                 </div>
              </MarketOverviewCard>
    
              <MarketOverviewCard 
                title="NƯỚC NGOÀI" 
                icon={Globe}
                active={activeCardId === 'nuocngoai'}
                onClick={() => handleCardClick('nuocngoai')}
              >
                 <div className="flex h-full items-center">
                    <div className="w-[35%] flex flex-col justify-center border-r border-[#1c1c1e]/50 pr-2">
                        <div className="text-lg font-bold text-[#f23645]">-245 Tỷ</div>
                        <div className="text-[9px] text-gray-500 mt-0.5">Giá trị ròng</div>
                    </div>
                    <div className="flex-1 pl-2 flex flex-col justify-center gap-1">
                        <MiniStockRow symbol="HPG" value={-5.8} maxVal={6} />
                        <MiniStockRow symbol="TCB" value={3.0} maxVal={6} />
                        <MiniStockRow symbol="SSI" value={4.0} maxVal={6} />
                    </div>
                 </div>
              </MarketOverviewCard>

              <MarketOverviewCard 
                title="TỰ DOANH" 
                icon={Briefcase}
                active={activeCardId === 'tudoanh'}
                onClick={() => handleCardClick('tudoanh')}
              >
                 <div className="flex h-full items-center">
                    <div className="w-[35%] flex flex-col justify-center border-r border-[#1c1c1e]/50 pr-2">
                        <div className="text-lg font-bold text-[#00c853]">+54.2 Tỷ</div>
                        <div className="text-[9px] text-gray-500 mt-0.5">Giá trị ròng</div>
                    </div>
                    <div className="flex-1 pl-2 flex flex-col justify-center gap-1">
                         <MiniStockRow symbol="TCB" value={3.1} maxVal={4} />
                         <MiniStockRow symbol="HPG" value={-1.2} maxVal={4} />
                         <MiniStockRow symbol="SST" value={0.8} maxVal={4} />
                    </div>
                 </div>
              </MarketOverviewCard>
            </div>
    
            {activeCardId === 'nuocngoai' ? (
                 <ForeignMarketDashboard />
            ) : activeCardId === 'thanhkhoan' ? (
                 <LiquidityChart />
            ) : (
                <div className="flex-1 min-h-0 bg-[#000000] p-1 overflow-hidden relative flex flex-col">
                   <div className="absolute top-2 left-3 z-20 flex bg-[#13171b]/90 backdrop-blur rounded border border-[#1c1c1e] p-0.5 shadow-sm opacity-20 hover:opacity-100 transition-opacity duration-300">
                       <button 
                           onClick={() => setViewMode('heatmap')}
                           className={`px-3 py-1 rounded text-[10px] font-bold transition-all flex items-center gap-1.5 ${viewMode === 'heatmap' ? 'bg-[#2962ff] text-white shadow' : 'text-gray-400 hover:text-gray-200'}`}
                       >
                           <PieChart size={12} /> Heatmap
                       </button>
                       <button 
                           onClick={() => setViewMode('impact')}
                           className={`px-3 py-1 rounded text-[10px] font-bold transition-all flex items-center gap-1.5 ${viewMode === 'impact' ? 'bg-[#2962ff] text-white shadow' : 'text-gray-400 hover:text-gray-200'}`}
                       >
                           <BarChart2 size={12} /> Tác động
                       </button>
                   </div>

                   {viewMode === 'heatmap' ? (
                       <>
                           <div className="flex-1 p-1 flex flex-col gap-1 min-h-0 bg-[#000000] overflow-hidden">
                              <div className="flex-1 flex gap-1 min-h-0">
                                 <div className="w-[22%] flex flex-col">
                                    <TreemapBlock symbol="HPG" percent="+2.48%" color="#00c853" className="flex-1" />
                                 </div>

                                 <div className="w-[43%] flex flex-col bg-[#1c1c1e] relative">
                                    <div className="absolute top-0 left-0 bg-black/40 text-[9px] text-white px-1 z-10 font-bold">Bất động sản</div>
                                    <div className="flex-1 grid grid-cols-4 grid-rows-4 gap-0.5 mt-0.5">
                                         <TreemapBlock symbol="CII" percent="+0.44%" color="#00c853" className="col-span-1 row-span-1" />
                                         <TreemapBlock symbol="DXG" percent="0%" color="#fbc02d" className="col-span-1 row-span-1" />
                                         <TreemapBlock symbol="VIC" percent="-1.9%" color="#f23645" className="col-span-1 row-span-1" />
                                         <div className="col-span-1 row-span-1 grid grid-cols-2 gap-0.5">
                                            <TreemapBlock symbol="PDR" percent="-0.7%" color="#f23645" />
                                            <TreemapBlock symbol="DIG" percent="-1.6%" color="#f23645" />
                                         </div>

                                         <TreemapBlock symbol="VRE" percent="-0.78%" color="#f23645" className="col-span-2 row-span-1" />
                                         <TreemapBlock symbol="NVL" percent="-0.38%" color="#f23645" className="col-span-1 row-span-1" />
                                         <div className="col-span-1 row-span-1 grid grid-cols-2 gap-0.5">
                                            <TreemapBlock symbol="NKG" percent="+2.3%" color="#00c853" />
                                            <TreemapBlock symbol="TCH" percent="-0.8%" color="#f23645" />
                                         </div>

                                         <TreemapBlock symbol="VHM" percent="-3.76%" color="#f23645" className="col-span-2 row-span-2" />
                                         <div className="col-span-2 row-span-2 grid grid-cols-3 grid-rows-3 gap-0.5">
                                             <TreemapBlock symbol="KHG" percent="-1.4%" color="#f23645" className="col-span-2" />
                                             <TreemapBlock symbol="VCG" percent="-1.2%" color="#f23645" />
                                             <TreemapBlock symbol="HQC" percent="-1.9%" color="#f23645" className="col-span-2" />
                                             <TreemapBlock symbol="IJC" percent="-0.9%" color="#f23645" />
                                             <TreemapBlock symbol="HDC" percent="-2.9%" color="#f23645" />
                                             <TreemapBlock symbol="NLG" percent="-2.9%" color="#f23645" />
                                             <TreemapBlock symbol="SCR" percent="+0.1%" color="#00c853" />
                                         </div>
                                    </div>
                                 </div>

                                 <div className="w-[35%] flex flex-col bg-[#1c1c1e] relative">
                                    <div className="absolute top-0 left-0 bg-black/40 text-[9px] text-white px-1 z-10 font-bold">Chứng khoán</div>
                                    <div className="flex-1 grid grid-cols-3 grid-rows-3 gap-0.5 mt-0.5">
                                        <TreemapBlock symbol="VIX" percent="-0.87%" color="#f23645" className="col-span-2 row-span-2" />
                                        <TreemapBlock symbol="SSI" percent="+0.82%" color="#00c853" className="col-span-1 row-span-2" />
                                        <TreemapBlock symbol="VND" percent="0%" color="#fbc02d" className="col-span-2 row-span-1" />
                                        <div className="col-span-1 row-span-1 grid grid-rows-2 gap-0.5">
                                           <TreemapBlock symbol="HCM" percent="0%" color="#fbc02d" />
                                           <TreemapBlock symbol="FTS" percent="+1.2%" color="#00c853" />
                                        </div>
                                        <div className="col-span-3 row-span-1 grid grid-cols-2 gap-0.5 h-8 mt-auto absolute bottom-0 w-full hidden"></div>
                                        <div className="absolute bottom-0 w-full h-[25%] flex gap-0.5">
                                             <TreemapBlock symbol="VCI" percent="+3.49%" color="#00c853" className="w-[70%]" />
                                             <div className="flex-1 bg-[#00c853] flex items-center justify-center text-[8px] font-bold text-white">FTS</div>
                                        </div>
                                    </div>
                                 </div>
                              </div>

                              <div className="flex-1 flex gap-1 min-h-0">
                                 <div className="w-[65%] flex flex-col bg-[#1c1c1e] relative">
                                    <div className="absolute top-0 left-0 bg-black/40 text-[9px] text-white px-1 z-10 font-bold">Ngân hàng</div>
                                    <div className="flex-1 grid grid-cols-5 grid-rows-4 gap-0.5 mt-0.5">
                                        <TreemapBlock symbol="SHB" percent="-0.91%" color="#f23645" className="col-span-2 row-span-4" />
                                        
                                        <div className="col-span-2 row-span-4 grid grid-rows-4 gap-0.5">
                                            <TreemapBlock symbol="VPB" percent="-2.09%" color="#f23645" className="row-span-2" />
                                            <TreemapBlock symbol="MBB" percent="-0.6%" color="#f23645" className="row-span-1" />
                                            <div className="row-span-1 grid grid-cols-2 gap-0.5">
                                                <TreemapBlock symbol="HDB" percent="+0.18%" color="#00c853" />
                                                <TreemapBlock symbol="EIB" percent="-2.05%" color="#f23645" />
                                            </div>
                                        </div>

                                        <div className="col-span-1 row-span-4 grid grid-rows-5 gap-0.5">
                                            <TreemapBlock symbol="STB" percent="+2.86%" color="#00c853" className="row-span-2" />
                                            <div className="row-span-1 grid grid-cols-2 gap-0.5">
                                                <TreemapBlock symbol="TCB" percent="-0.29%" color="#f23645" />
                                                <TreemapBlock symbol="CTG" percent="+0.57%" color="#00c853" />
                                            </div>
                                            <TreemapBlock symbol="MSB" percent="-0.81%" color="#f23645" className="row-span-1" />
                                            <div className="row-span-1 grid grid-cols-2 gap-0.5">
                                                <div className="flex flex-col gap-0.5">
                                                    <TreemapBlock symbol="VIB" percent="-1.1%" color="#f23645" className="flex-1" />
                                                </div>
                                                <div className="grid grid-rows-2 gap-0.5">
                                                    <TreemapBlock symbol="ACB" percent="-0.4%" color="#f23645" />
                                                    <TreemapBlock symbol="VCB" percent="0%" color="#fbc02d" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                 </div>

                                 <div className="w-[35%] flex flex-col gap-0.5">
                                     <div className="flex-1 flex gap-0.5">
                                         <div className="flex-1 flex flex-col bg-[#1c1c1e] relative">
                                             <div className="absolute top-0 left-0 bg-black/40 text-[9px] text-white px-1 z-10 font-bold">Tiêu dùng</div>
                                             <div className="flex-1 grid grid-cols-2 grid-rows-3 gap-0.5 mt-0.5">
                                                 <TreemapBlock symbol="MWG" percent="+1.16%" color="#00c853" className="col-span-1 row-span-2" />
                                                 <TreemapBlock symbol="DBC" percent="-0.9%" color="#f23645" className="col-span-1 row-span-2" />
                                                 <TreemapBlock symbol="MSN" percent="-1.31%" color="#f23645" className="col-span-1 row-span-1" />
                                                 <div className="col-span-1 row-span-1 grid grid-rows-2 gap-0.5">
                                                     <TreemapBlock symbol="PET" percent="+1.6%" color="#00c853" />
                                                     <TreemapBlock symbol="VNM" percent="0%" color="#00c853" />
                                                 </div>
                                             </div>
                                         </div>
                                         <div className="flex-1 flex flex-col bg-[#1c1c1e] relative">
                                             <div className="absolute top-0 left-0 bg-black/40 text-[9px] text-white px-1 z-10 font-bold">Dầu khí</div>
                                             <div className="flex-1 grid grid-cols-2 gap-0.5 mt-0.5">
                                                 <TreemapBlock symbol="BSR" percent="+2.2%" color="#00c853" />
                                                 <TreemapBlock symbol="PVD" percent="+3.21%" color="#00c853" />
                                             </div>
                                         </div>
                                     </div>
                                     <div className="h-[40%] flex gap-0.5">
                                         <div className="w-1/2 flex flex-col bg-[#1c1c1e] relative">
                                             <div className="absolute top-0 left-0 bg-black/40 text-[9px] text-white px-1 z-10 font-bold">Phòng thủ</div>
                                             <div className="flex-1 grid grid-cols-2 gap-0.5 mt-0.5">
                                                 <TreemapBlock symbol="POW" percent="+1.59%" color="#00c853" className="col-span-1" />
                                                 <TreemapBlock symbol="FPT" percent="-0.54%" color="#f23645" className="col-span-1" /> 
                                             </div>
                                         </div>
                                         <div className="w-1/2 flex flex-col bg-[#1c1c1e] relative">
                                             <div className="absolute top-0 left-0 bg-black/40 text-[9px] text-white px-1 z-10 font-bold">Logistics</div>
                                             <div className="flex-1 p-0.5 mt-0.5">
                                                 <TreemapBlock symbol="VSC" percent="-2.18%" color="#f23645" className="w-full h-full" />
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                              </div>
                           </div>
                       </>
                   ) : (
                       <ImpactChart />
                   )}
                </div>
            )}
          </>
        )}

        {activeDashboardTab === 'top_stocks' && (
             <div className="flex-1 grid grid-cols-3 gap-1 bg-[#000000] p-1 overflow-hidden">
                <div className="flex flex-col bg-[#000000] border border-[#1c1c1e] rounded overflow-hidden">
                     <div className="px-3 py-2 flex justify-between items-center border-b border-[#1c1c1e]">
                         <span className="text-sm font-bold text-white">Top biến động</span>
                         <Filter size={14} className="text-gray-500" />
                     </div>
                     <div className="px-3 py-2 flex justify-between items-center bg-[#000000] border-b border-[#1c1c1e]/50">
                         <div className="flex gap-2">
                             <button className="px-2 py-1 bg-[#2962ff] text-white text-[10px] font-bold rounded">Tăng giá</button>
                             <button className="px-2 py-1 text-gray-400 hover:text-white text-[10px] font-medium transition-colors">Giảm giá</button>
                         </div>
                         <div className="flex items-center gap-1 text-[10px] text-[#2962ff] font-medium cursor-pointer">
                             Hôm nay <ChevronDown size={12} />
                         </div>
                     </div>
                     <div className="flex-1 overflow-auto custom-scrollbar">
                         <table className="w-full text-left border-collapse">
                             <thead className="text-[9px] text-gray-500 uppercase sticky top-0 bg-[#000000] z-10">
                                 <tr>
                                     <th className="px-3 py-2 font-medium">Mã CK</th>
                                     <th className="px-2 py-2 font-medium text-right">Giá</th>
                                     <th className="px-2 py-2 font-medium text-right">%Hôm nay</th>
                                     <th className="px-2 py-2 font-medium text-right">%Tuần này</th>
                                 </tr>
                             </thead>
                             <tbody className="divide-y divide-[#1c1c1e]/30 text-[11px] font-mono">
                                 {TOP_MOVERS_MOCK.map((item, i) => (
                                     <tr key={i} className="hover:bg-[#121212]">
                                         <td className="px-3 py-1.5 font-bold text-white">{item.s}</td>
                                         <td className={`px-2 py-1.5 text-right font-medium ${item.d > 0 ? 'text-[#00c853]' : item.d < 0 ? 'text-[#f23645]' : 'text-yellow-500'}`}>{item.p.toFixed(2)}</td>
                                         <td className="px-2 py-1.5 text-right">
                                             <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] text-white font-bold w-12 text-center ${item.d > 0 ? 'bg-[#00c853]' : item.d < 0 ? 'bg-[#f23645]' : 'bg-yellow-500'}`}>
                                                {item.d > 0 ? '+' : ''}{item.d}%
                                             </span>
                                         </td>
                                         <td className={`px-2 py-1.5 text-right font-medium ${item.w > 0 ? 'text-[#00c853]' : item.w < 0 ? 'text-[#f23645]' : 'text-yellow-500'}`}>
                                            {item.w > 0 ? '+' : ''}{item.w}%
                                         </td>
                                     </tr>
                                 ))}
                             </tbody>
                         </table>
                     </div>
                </div>

                <div className="flex flex-col bg-[#000000] border border-[#1c1c1e] rounded overflow-hidden">
                     <div className="px-3 py-2 flex justify-between items-center border-b border-[#1c1c1e]">
                         <div className="flex items-center gap-1">
                            <span className="text-sm font-bold text-white">Top đột biến khối lượng</span>
                            <ChevronDown size={14} className="text-gray-500" />
                         </div>
                         <Filter size={14} className="text-[#f23645]" />
                     </div>
                     <div className="px-3 py-2 flex justify-between items-center bg-[#000000] border-b border-[#1c1c1e]/50">
                         <div className="flex gap-2">
                             <button className="px-2 py-1 bg-[#2a2e39] text-white text-[10px] font-bold rounded">Bùng nổ KL</button>
                             <button className="px-2 py-1 text-gray-400 hover:text-white text-[10px] font-medium transition-colors">Cạn cung</button>
                         </div>
                         <div className="flex items-center gap-1 text-[10px] text-[#2962ff] font-medium cursor-pointer">
                             Hôm nay <ChevronDown size={12} />
                         </div>
                     </div>
                     <div className="flex-1 overflow-auto custom-scrollbar">
                         <table className="w-full text-left border-collapse">
                             <thead className="text-[9px] text-gray-500 uppercase sticky top-0 bg-[#000000] z-10">
                                 <tr>
                                     <th className="px-3 py-2 font-medium">Mã CK</th>
                                     <th className="px-2 py-2 font-medium text-right">Giá</th>
                                     <th className="px-2 py-2 font-medium text-right text-gray-300">% KL dự kiến</th>
                                     <th className="px-2 py-2 font-medium text-right">%Hôm nay</th>
                                 </tr>
                             </thead>
                             <tbody className="divide-y divide-[#1c1c1e]/30 text-[11px] font-mono">
                                 {TOP_VOLUME_MOCK.map((item, i) => (
                                     <tr key={i} className="hover:bg-[#121212]">
                                         <td className="px-3 py-1.5 font-bold text-white">{item.s}</td>
                                         <td className={`px-2 py-1.5 text-right font-medium ${item.d > 0 ? 'text-[#00c853]' : item.d < 0 ? 'text-[#f23645]' : 'text-yellow-500'}`}>{item.p.toFixed(2)}</td>
                                         <td className="px-2 py-1.5 text-right text-[#dadada] font-bold">
                                             {item.v.toLocaleString()}%
                                         </td>
                                         <td className="px-2 py-1.5 text-right">
                                             <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] text-white font-bold w-12 text-center ${item.d > 0 ? 'bg-[#00c853]' : item.d < 0 ? 'bg-[#f23645]' : 'bg-yellow-500'}`}>
                                                {item.d > 0 ? '+' : ''}{item.d}%
                                             </span>
                                         </td>
                                     </tr>
                                 ))}
                             </tbody>
                         </table>
                     </div>
                </div>

                <div className="flex flex-col bg-[#000000] border border-[#1c1c1e] rounded overflow-hidden">
                     <div className="px-3 py-2 flex justify-between items-center border-b border-[#1c1c1e]">
                         <span className="text-sm font-bold text-white">Top nước ngoài</span>
                         <div className="flex bg-[#1c1c1e] rounded p-0.5">
                             <button className="px-1.5 py-0.5 text-[9px] text-gray-400 hover:text-white">1D</button>
                             <button className="px-1.5 py-0.5 text-[9px] bg-[#2a2e39] text-white rounded font-bold">1W</button>
                             <button className="px-1.5 py-0.5 text-[9px] text-gray-400 hover:text-white">1M</button>
                         </div>
                     </div>
                     
                     <div className="grid grid-cols-3 gap-2 px-3 py-2 border-b border-[#1c1c1e] bg-[#000000]">
                         <div className="flex flex-col">
                             <span className="text-[9px] text-gray-400">Tổng giá trị Mua</span>
                             <span className="text-[11px] font-bold text-[#00c853]">23,174.3 tỷ</span>
                         </div>
                         <div className="flex flex-col text-center">
                             <span className="text-[9px] text-gray-400">Tổng giá trị Bán</span>
                             <span className="text-[11px] font-bold text-[#f23645]">19,958.1 tỷ</span>
                         </div>
                         <div className="flex flex-col text-right">
                             <span className="text-[9px] text-gray-400">Giá trị ròng</span>
                             <span className="text-[11px] font-bold text-[#00c853]">3,216.2 tỷ</span>
                         </div>
                     </div>

                     <div className="px-3 py-1 flex items-center justify-between border-b border-[#1c1c1e]/50 text-[10px] font-medium text-gray-400">
                         <div className="flex gap-4">
                             <span className="text-white border-b border-white pb-0.5">Mua/Bán ròng</span>
                             <span className="hover:text-white cursor-pointer">KLGD</span>
                             <span className="hover:text-white cursor-pointer">Tổng GTGD (Tỷ)</span>
                         </div>
                     </div>

                     <div className="flex-1 overflow-auto custom-scrollbar px-2 py-1">
                         <div className="space-y-1">
                             {TOP_FOREIGN_MOCK.map((row, i) => {
                                 const maxVal = 900;
                                 return (
                                     <div key={i} className="flex items-center text-[10px] h-5">
                                         <div className="flex-1 flex items-center justify-end gap-2">
                                             <span className="text-gray-400 w-8 text-right font-mono">{row.bv.toFixed(1)}</span>
                                             <div className="flex-1 h-3 flex justify-end">
                                                 <div style={{ width: `${(row.bv / maxVal) * 100}%` }} className="bg-[#00c853] rounded-sm h-full max-w-full"></div>
                                             </div>
                                             <span className="font-bold text-white w-8 text-center">{row.b}</span>
                                         </div>
                                         
                                         <div className="w-[1px] h-full bg-[#1c1c1e] mx-1"></div>

                                         <div className="flex-1 flex items-center gap-2">
                                             <span className="font-bold text-white w-8 text-center">{row.s}</span>
                                             <div className="flex-1 h-3 flex justify-start">
                                                 <div style={{ width: `${(row.sv / maxVal) * 100}%` }} className="bg-[#f23645] rounded-sm h-full max-w-full"></div>
                                             </div>
                                             <span className="text-gray-400 w-8 text-left font-mono">{row.sv.toFixed(1)}</span>
                                         </div>
                                     </div>
                                 );
                             })}
                         </div>
                     </div>
                     
                     <div className="px-3 py-1.5 border-t border-[#1c1c1e] flex justify-center gap-4 text-[9px] bg-[#000000]">
                         <div className="flex items-center gap-1.5">
                             <div className="w-2 h-2 rounded-full bg-[#00c853]"></div>
                             <span className="text-gray-300 font-bold">Top mua ròng (Tỷ)</span>
                         </div>
                         <div className="flex items-center gap-1.5">
                             <div className="w-2 h-2 rounded-full bg-[#f23645]"></div>
                             <span className="text-gray-300 font-bold">Top bán ròng (Tỷ)</span>
                         </div>
                     </div>
                </div>
             </div>
        )}

        {(activeDashboardTab === 'industry' || activeDashboardTab === 'derivatives') && (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-4">
                <LayoutGrid size={48} className="opacity-20" />
                <p>Tính năng đang phát triển</p>
            </div>
        )}

      </div>

      <div className="w-[35%] flex flex-col h-full bg-[#13171b] border-l border-[#1c1c1e]">
          
          <div className="h-12 border-b border-[#1c1c1e] flex items-center justify-between px-3 bg-[#000000] shrink-0">
             <div className="flex gap-4 h-full">
                 <button 
                    onClick={() => setActiveRightTab('intelligence')}
                    className={`h-full border-b-2 text-xs px-1 transition-colors relative ${activeRightTab === 'intelligence' ? 'border-[#2962ff] text-[#2962ff] font-bold' : 'border-transparent hover:border-gray-600 text-gray-400 font-medium'}`}
                 >
                    Tình báo
                    <span className="absolute top-2.5 right-[-2px] w-1.5 h-1.5 bg-[#f23645] rounded-full"></span>
                 </button>
                 <button 
                    onClick={() => setActiveRightTab('news')}
                    className={`h-full border-b-2 text-xs px-1 transition-colors ${activeRightTab === 'news' ? 'border-[#2962ff] text-[#2962ff] font-bold' : 'border-transparent hover:border-gray-600 text-gray-400 font-medium'}`}
                 >
                    Bảng tin
                 </button>
                 <button 
                    onClick={() => setActiveRightTab('ai_news')}
                    className={`h-full border-b-2 text-xs px-1 transition-colors ${activeRightTab === 'ai_news' ? 'border-[#2962ff] text-[#2962ff] font-bold' : 'border-transparent hover:border-gray-600 text-gray-400 font-medium'}`}
                 >
                    AI News
                 </button>
             </div>
             <div className="flex items-center gap-2">
                 <button className="p-1.5 hover:bg-[#1c1c1e] rounded text-gray-400 transition-colors"><Search size={16} /></button>
                 <button className="p-1.5 hover:bg-[#1c1c1e] rounded text-gray-400 transition-colors"><Filter size={16} /></button>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4 bg-[#000000]">
             {currentPosts.map((post) => (
                 <PostCard key={post.id} post={post} />
             ))}
             
             {currentPosts.length === 0 && (
                 <div className="flex items-center justify-center h-40 text-gray-500 text-xs">
                     Chưa có tin tức mới.
                 </div>
             )}
             
             {currentPosts.length > 0 && (
                <div className="text-center py-4">
                    <div className="w-6 h-6 border-2 border-[#2962ff] border-t-transparent rounded-full animate-spin mx-auto opacity-50"></div>
                </div>
             )}
          </div>
      </div>

    </div>
  );
};

const NewsFeedHero = () => (
    <div className="w-full rounded-2xl border border-[#2c2c2e] bg-[#13171b] p-6 mb-8 hover:border-[#2962ff] transition-colors cursor-pointer group shadow-lg">
        <span className="inline-block px-2 py-1 bg-[#2962ff] text-white text-[10px] font-bold uppercase rounded mb-3">Tiêu điểm</span>
        <h1 className="text-3xl font-bold text-white mb-3 leading-tight group-hover:text-[#2962ff] transition-colors">
            Thị trường chứng khoán năm 2025: Cơ hội nâng hạng và dòng vốn ngoại
        </h1>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
            Với việc áp dụng hệ thống KRX và triển vọng nâng hạng thị trường mới nổi của FTSE Russell, chứng khoán Việt Nam đang đứng trước cơ hội thu hút hàng tỷ USD vốn ngoại trong năm nay.
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <span className="text-white">Ban biên tập Finpath</span>
            <span>•</span>
            <span>2 giờ trước</span>
        </div>
    </div>
);

const SidebarWidget = ({ title, children }: { title: string, children?: React.ReactNode }) => (
    <div className="bg-[#13171b] rounded-xl border border-[#2c2c2e] overflow-hidden">
        <div className="px-4 py-3 border-b border-[#2c2c2e]">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">{title}</h3>
        </div>
        <div className="p-4">
            {children}
        </div>
    </div>
);

export const NewsFeed = () => {
  return (
    <div className="w-full h-full bg-[#000000] overflow-y-auto custom-scrollbar">
      <div className="w-full max-w-5xl mx-auto p-6">
         <NewsFeedHero />
         
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             <div className="lg:col-span-2 space-y-4">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Zap size={20} className="text-yellow-500 fill-yellow-500" /> Tin nổi bật
                </h2>
                {INTELLIGENCE_POSTS.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
             </div>

             <div className="space-y-6">
                 
                 <SidebarWidget title="Chủ đề quan tâm">
                     <div className="flex flex-wrap gap-2">
                         {['#NângHạng', '#BấtĐộngSản', '#NgânHàng', '#LãiSuất', '#VinGroup', '#FPT'].map(tag => (
                             <span key={tag} className="px-3 py-1 bg-[#1c1c1e] hover:bg-[#2962ff] hover:text-white text-gray-400 rounded-full text-xs cursor-pointer transition-colors border border-[#2c2c2e]">
                                 {tag}
                             </span>
                         ))}
                     </div>
                 </SidebarWidget>

                 <SidebarWidget title="Bài thịnh hành">
                     <div className="space-y-4">
                         {[
                             { title: "Nhận định thị trường tuần 25-29/12: Cơ hội bắt đáy?", views: "15K" },
                             { title: "Top 5 cổ phiếu ngân hàng đáng mua nhất Q1/2025", views: "12K" },
                             { title: "Phân tích kỹ thuật VNINDEX: Vượt đỉnh 1300?", views: "10K" },
                         ].map((item, i) => (
                             <div key={i} className="group cursor-pointer">
                                 <h4 className="text-sm font-medium text-gray-200 group-hover:text-[#2962ff] transition-colors line-clamp-2 leading-snug mb-1">
                                     {item.title}
                                 </h4>
                                 <div className="flex items-center gap-1 text-[10px] text-gray-500">
                                     <Eye size={12} /> {item.views} lượt xem
                                 </div>
                             </div>
                         ))}
                     </div>
                 </SidebarWidget>

                 <SidebarWidget title="Cổ phiếu tìm kiếm nhiều">
                     <div className="space-y-2">
                         {[
                             { symbol: "HPG", name: "Hòa Phát", change: "+2.5%", color: "#00c853" },
                             { symbol: "NVL", name: "Novaland", change: "-1.2%", color: "#f23645" },
                             { symbol: "DIG", name: "DIC Corp", change: "+0.8%", color: "#00c853" },
                             { symbol: "SSI", name: "SSI Securities", change: "+1.5%", color: "#00c853" },
                             { symbol: "VHM", name: "Vinhomes", change: "-0.5%", color: "#f23645" },
                         ].map((stock, i) => (
                             <div key={i} className="flex items-center justify-between py-1 hover:bg-[#1c1c1e] rounded px-1 transition-colors cursor-pointer group">
                                 <div className="flex items-center gap-3">
                                     <span className="font-bold text-sm text-white group-hover:text-[#2962ff]">{stock.symbol}</span>
                                     <span className="text-xs text-gray-500">{stock.name}</span>
                                 </div>
                                 <span className="text-xs font-bold" style={{ color: stock.color }}>{stock.change}</span>
                             </div>
                         ))}
                     </div>
                 </SidebarWidget>

                 <SidebarWidget title="Chuyên gia đề xuất">
                     <div className="space-y-4">
                         {[
                             { name: "Dương Văn Duy", role: "Chuyên gia kỹ thuật", avatar: "https://i.pravatar.cc/150?u=duy" },
                             { name: "Lý Phạm Stock", role: "Phân tích cơ bản", avatar: "https://i.pravatar.cc/150?u=lypham" },
                             { name: "Team TVI", role: "Tư vấn đầu tư", avatar: "https://i.pravatar.cc/150?u=tvi" },
                         ].map((expert, i) => (
                             <div key={i} className="flex items-center justify-between group cursor-pointer">
                                 <div className="flex items-center gap-3">
                                     <img src={expert.avatar} alt={expert.name} className="w-8 h-8 rounded-full border border-[#2c2c2e]" />
                                     <div>
                                         <div className="text-sm font-bold text-gray-200 group-hover:text-[#2962ff]">{expert.name}</div>
                                         <div className="text-[10px] text-gray-500">{expert.role}</div>
                                     </div>
                                 </div>
                                 <button className="text-gray-400 hover:text-[#2962ff] transition-colors">
                                     <UserPlus size={16} />
                                 </button>
                             </div>
                         ))}
                     </div>
                 </SidebarWidget>

             </div>
         </div>

         <div className="h-20 flex items-center justify-center text-xs text-gray-600 mt-8">
             ~ Đã hiển thị hết tin mới ~
         </div> 
      </div>
    </div>
  )
};