import { Crown, Zap, Radar, BookOpen } from 'lucide-react';
import { CandleData } from '../../types';

// --- FEATURE CONFIGURATION ---
export const FEATURE_TIERS = [
  {
    id: 'tier1',
    name: 'TIER 1: ALPHA GENERATORS (VŨ KHÍ HẠNG NẶNG)',
    icon: Crown,
    color: 'text-yellow-500',
    items: [
      { id: 'smart_money_divergence', label: '1. Phân Kỳ Cá Mập' },
      { id: 'vip_room_heatmap', label: '2. Vết Dầu Loang Room VIP' },
      { id: 'foreign_room_arbitrage', label: '3. Radar Soi Room Ngoại' },
      { id: 'rumor_timeline', label: '4. Trục Thời Gian Tin Đồn' },
      { id: 'trapped_volume', label: '5. Vùng Kẹp Hàng' },
    ]
  },
  {
    id: 'tier2',
    name: 'TIER 2: EFFICIENCY BOOSTERS (TỐI ƯU)',
    icon: Zap,
    color: 'text-blue-400',
    items: [
      { id: 'native_trade', label: '6. Giao Dịch One-Click & P&L' },
      { id: 'etf_rebalancing', label: '7. Radar Cơ Cấu ETF' },
      { id: 'prop_trading', label: '8. Dấu Chân Tự Doanh' },
      { id: 'earnings_replay', label: '9. Phản Ứng BCTC' },
      { id: 'consensus_cloud', label: '10. Vùng Mây Định Giá' },
    ]
  },
  {
    id: 'tier3',
    name: 'TIER 3: CONTEXT & VALIDATION (BỐI CẢNH)',
    icon: Radar,
    color: 'text-purple-400',
    items: [
      { id: 'bull_bear_debate', label: '11. Đấu Trường Quan Điểm' },
      { id: 'whale_whisperer', label: '12. Giải Mã Lệnh Lớn' },
      { id: 'sector_rotation', label: '13. Radar Ngành & Dòng Tiền' },
      { id: 'visual_fundamentals', label: '14. Hiển Thị Cơ Bản Trực Quan' },
      { id: 'fractal_context', label: '15. So Sánh Bối Cảnh (Fractal)' },
      { id: 'rumor_credibility', label: '16. Chấm Điểm Tin Cậy Nguồn Tin' },
      { id: 'social_buzz', label: '17. Chỉ báo Độ Nhiệt' },
    ]
  },
  {
    id: 'tier4',
    name: 'TIER 4: LEARNING & SUPPORT (HỖ TRỢ)',
    icon: BookOpen,
    color: 'text-green-400',
    items: [
      { id: 'ai_context', label: '18. AI Context Hover' },
      { id: 'event_impact', label: '19. Tác Động Sự Kiện' },
      { id: 'scenario_planner', label: '20. Mô Phỏng Kịch Bản' },
      { id: 'ghost_trade', label: '21. Giao Dịch Bóng Ma' },
      { id: 'ai_fundamental_insight', label: '22. AI Fundamental Insight' },
    ]
  }
];

// --- MOCK DATA GENERATOR ---
export const generateCandleData = (count: number): CandleData[] => {
  let price = 56.30; 
  const data: CandleData[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const time = new Date(now.getTime() - (count - i) * 60000 * 60).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const move = (Math.random() - 0.48) * 0.5;
    const open = price;
    const close = price + move;
    const high = Math.max(open, close) + Math.random() * 0.2;
    const low = Math.min(open, close) - Math.random() * 0.2;
    const volume = Math.floor(Math.random() * 10000 + 1000);
    
    data.push({ time, open, high, low, close, volume });
    price = close;
  }
  return data;
};
