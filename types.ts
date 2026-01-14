
export type TabId = 'market' | 'watchlist' | 'community' | 'chart' | 'news_feed' | 'opportunities' | 'ai_bot_signals';
export type PanelMode = 'closed' | 'floating' | 'pinned';
export type ToolId = 'intelligence' | 'news' | 'chat' | 'ask-ai';

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockTicker {
  symbol: string;
  ceiling: number;  // Trần
  floor: number;    // Sàn
  ref: number;      // TC
  
  // Bid Side (Bên mua)
  bid3_price: number;
  bid3_vol: number;
  bid2_price: number;
  bid2_vol: number;
  bid1_price: number;
  bid1_vol: number;

  // Matched (Khớp lệnh)
  close: number;
  change: number;
  changePercent: number;
  matched_vol: number;

  // Ask Side (Bên bán)
  ask1_price: number;
  ask1_vol: number;
  ask2_price: number;
  ask2_vol: number;
  ask3_price: number;
  ask3_vol: number;

  // Stats
  total_vol: number;
  high: number;
  avg: number;
  low: number;
  
  // Foreign (Nước ngoài)
  foreign_buy: number;
  foreign_sell: number;
}
