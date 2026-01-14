
export interface SignalItem {
  time: string;
  symbol: string;
  signalName: string;
  entryPrice: number;
  pctFromEntry: number;
  currentPrice: number;
  pctToday: number;
  pctWeek: number;
  pctMonth: number;
  pb: number;
  pe: number;
  marketCap: string;
  volForecastPct: number;
  chartData: number[];
}

export const MOCK_BOT_SIGNALS: SignalItem[] = [
  {
    time: '09/01/2026 14:47',
    symbol: 'CEO',
    signalName: 'CEO - Phát hiện lệnh cá mập bán',
    entryPrice: 18.40,
    pctFromEntry: 0,
    currentPrice: 18.4,
    pctToday: -8.91,
    pctWeek: -12.8,
    pctMonth: -12.8,
    pb: 2.08,
    pe: 62.81,
    marketCap: '10,440.5 tỷ',
    volForecastPct: 331.44,
    chartData: [20, 19.5, 19.8, 19.2, 18.8, 18.4]
  },
  {
    time: '09/01/2026 14:33',
    symbol: 'FOX',
    signalName: 'FOX - Giảm -2.09% chi trong 5 phút',
    entryPrice: 65.30,
    pctFromEntry: 1.99,
    currentPrice: 66.6,
    pctToday: 2.15,
    pctWeek: 4.16,
    pctMonth: 4.16,
    pb: 4.47,
    pe: 14.25,
    marketCap: '49,201.6 tỷ',
    volForecastPct: 174.14,
    chartData: [64, 64.5, 65, 65.2, 66, 66.6]
  },
  {
    time: '09/01/2026 14:29',
    symbol: 'DIG',
    signalName: 'DIG - Phát hiện lệnh cá mập bán',
    entryPrice: 16.05,
    pctFromEntry: -0.31,
    currentPrice: 16,
    pctToday: -5.88,
    pctWeek: -4.48,
    pctMonth: -4.48,
    pb: 1.79,
    pe: 34.19,
    marketCap: '12,742.9 tỷ',
    volForecastPct: 257.9,
    chartData: [17, 16.8, 16.5, 16.2, 16.1, 16]
  },
  {
    time: '09/01/2026 14:25',
    symbol: 'HQC',
    signalName: 'HQC - Giảm -1.77% chi trong 5 phút',
    entryPrice: 2.78,
    pctFromEntry: 0.72,
    currentPrice: 2.8,
    pctToday: -4.11,
    pctWeek: -6.98,
    pctMonth: -6.98,
    pb: 0.33,
    pe: 71.29,
    marketCap: '1,614.5 tỷ',
    volForecastPct: 216.33,
    chartData: [2.9, 2.92, 2.88, 2.85, 2.82, 2.8]
  },
  {
    time: '09/01/2026 14:21',
    symbol: 'PLX',
    signalName: 'PLX - Giảm -1.74% chi trong 5 phút',
    entryPrice: 42.40,
    pctFromEntry: 1.42,
    currentPrice: 43,
    pctToday: 3.61,
    pctWeek: 21.81,
    pctMonth: 21.81,
    pb: 1.73,
    pe: 16.67,
    marketCap: '55,636.8 tỷ',
    volForecastPct: 134.4,
    chartData: [41, 41.5, 42, 42.5, 42.8, 43]
  },
  {
    time: '09/01/2026 13:58',
    symbol: 'SHB',
    signalName: 'SHB - Phát hiện lệnh cá mập bán',
    entryPrice: 16.55,
    pctFromEntry: -0.3,
    currentPrice: 16.5,
    pctToday: -0.6,
    pctWeek: 0.92,
    pctMonth: 1.13,
    pb: 1.13,
    pe: 6.27,
    marketCap: '75,804.3 tỷ',
    volForecastPct: 85.58,
    chartData: [16.6, 16.65, 16.6, 16.55, 16.5, 16.5]
  },
  {
    time: '09/01/2026 13:54',
    symbol: 'BSR',
    signalName: 'BSR - Phát hiện lệnh cá mập bán',
    entryPrice: 19.75,
    pctFromEntry: -0.25,
    currentPrice: 19.7,
    pctToday: 5.91,
    pctWeek: 22.36,
    pctMonth: 22.36,
    pb: 1.39,
    pe: 38.62,
    marketCap: '98,643.8 tỷ',
    volForecastPct: 232.25,
    chartData: [18.5, 18.8, 19.0, 19.2, 19.5, 19.7]
  },
  {
    time: '09/01/2026 13:46',
    symbol: 'HPG',
    signalName: 'HPG - Phát hiện lệnh cá mập bán',
    entryPrice: 26.35,
    pctFromEntry: -0.57,
    currentPrice: 26.2,
    pctToday: -0.76,
    pctWeek: -0.76,
    pctMonth: -0.76,
    pb: 1.63,
    pe: 14.23,
    marketCap: '201,097.2 tỷ',
    volForecastPct: 94.98,
    chartData: [26.4, 26.35, 26.3, 26.25, 26.2, 26.2]
  },
  {
    time: '09/01/2026 13:42',
    symbol: 'PDR',
    signalName: 'PDR - Giảm -2.54% chi trong 5 phút',
    entryPrice: 17.35,
    pctFromEntry: -0.58,
    currentPrice: 17.25,
    pctToday: -6.76,
    pctWeek: -8.24,
    pctMonth: -8.24,
    pb: 1.59,
    pe: 91.47,
    marketCap: '16,901.7 tỷ',
    volForecastPct: 350.44,
    chartData: [18.5, 18.2, 18.0, 17.8, 17.5, 17.25]
  },
];
