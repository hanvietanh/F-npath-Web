export type TabId = 'market' | 'watchlist' | 'community' | 'chart' | 'news_feed';
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