
export interface Trade {
  time: string;
  price: string | number;
  vol: number;
  side: 'M' | 'B';
  big?: boolean;
}

export interface ChartPoint {
  time: string;
  price: string;
  ma20: string;
  ma50: string;
  vol: number;
}

export interface FinancialData {
  periods: string[];
  ratiosTable: { name: string; values: number[]; format?: string }[];
  revenueChart: { period: string; revenue: number; profit: number; growth: number }[];
  profitChart: { period: string; gross: number; net: number; growth: number }[];
  balanceSheetChart: { period: string; shortAsset: number; longAsset: number; liabilities: number; equity: number }[];
  incomeStatement: { id: number; label: string; values: number[]; yoy: number; trend: number[]; highlight?: boolean; color?: string; subRow?: boolean; isPercent?: boolean }[];
}

export const generateChartData = (): ChartPoint[] => {
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

export const orderBookData = {
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

export const initialLiveTape: Trade[] = [
  { time: '10:45:05', price: 28.50, vol: 100000, side: 'M', big: true },
  { time: '10:45:02', price: 28.50, vol: 10000, side: 'M', big: false },
  { time: '10:44:55', price: 28.45, vol: 5000, side: 'B', big: false },
  { time: '10:44:48', price: 28.45, vol: 60000, side: 'B', big: true },
  { time: '10:44:30', price: 28.50, vol: 2000, side: 'M', big: false },
];

export const financialDataV2: FinancialData = {
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

export const newsData = [
  {
    id: 1,
    time: '10:30 AM',
    date: '14/01',
    source: 'CafeF',
    type: 'press',
    title: 'HPG báo lãi quý 3 đạt 3.500 tỷ, cao nhất trong 2 năm qua',
    summary: 'Tập đoàn Hòa Phát (HPG) vừa công bố kết quả kinh doanh quý 3/2024 với doanh thu đạt 35.000 tỷ đồng, lợi nhuận sau thuế đạt 3.500 tỷ đồng, tăng trưởng 25% so với cùng kỳ.',
    content: `...`,
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

export const shareholderData = {
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
