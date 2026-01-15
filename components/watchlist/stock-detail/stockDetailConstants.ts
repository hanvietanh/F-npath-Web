
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

export const companyProfileData = {
  introduction: "Tổng Công ty Điện lực Dầu khí Việt Nam (POW) được thành lập vào năm 2007 theo Quyết định 1468/QĐ-DKVN của Hội đồng quản trị Tập đoàn Dầu khí Quốc gia Việt Nam. Tổng Công ty hoạt động chính trong lĩnh vực sản xuất, truyền tải, kinh doanh, xuất nhập khẩu điện năng. Tổng Công ty chính thức hoạt động theo mô hình công ty cổ phần từ tháng 07/2018. PV Power đang quản lý vận hành 7 Nhà máy điện với tổng công suất lắp đặt là 4205 MW, gồm điện khí, than và thủy điện. Hàng năm PV Power cung cấp khoảng 21 tỷ kWh điện lên lưới điện quốc gia.",
  basicInfo: [
    { label: 'Mã SIC', value: 'POW' },
    { label: 'Mã ngành ICB', value: '7535' },
    { label: 'Năm thành lập', value: '31/05/2007' },
    { label: 'Vốn điều lệ', value: '27,868 Tỷ' },
    { label: 'Số lượng nhân sự', value: '2,112' },
  ],
  listingInfo: [
    { label: 'Ngày niêm yết', value: '06/03/2018' },
    { label: 'Nơi niêm yết', value: 'HOSE' },
    { label: 'Giá chào sàn (VNĐ)', value: '14,900' },
    { label: 'Vốn hoá', value: '40,688 Tỷ' },
    { label: 'KL đang niêm yết', value: '2.79 Tỷ' },
  ],
  leaders: [
    { name: 'Hoàng Văn Quang', position: 'Chủ tịch Hội đồng Quản trị' },
    { name: 'Lê Như Linh', position: 'Tổng Giám đốc' },
    { name: 'Phạm Minh Đức', position: 'Trưởng Ban kiểm soát' },
    { name: 'Chu Quang Toản', position: 'Kế toán trưởng' },
    { name: 'Trương Việt Phương', position: 'Phó Tổng Giám đốc' },
    { name: 'Nguyễn Duy Giang', position: 'Phó Tổng Giám đốc' },
    { name: 'Nguyễn Kiên', position: 'Phó Tổng Giám đốc' },
    { name: 'Ngô Văn Chiến', position: 'Phó Tổng Giám đốc' },
    { name: 'Phan Ngọc Hiền', position: 'Phó Tổng Giám đốc' },
    { name: 'Nguyễn Thị Thanh Hường', position: 'Thành viên Ban kiểm soát' },
    { name: 'Vũ Thị Ngọc Dung', position: 'Thành viên Ban kiểm soát' },
    { name: 'Hà Thị Minh Nguyệt', position: 'Thành viên Ban kiểm soát' },
  ]
};

export const shareholderData = {
  structure: [
    { name: 'Ban lãnh đạo', value: 40, color: '#10b981' },
    { name: 'Nước ngoài', value: 25, color: '#3b82f6' },
    { name: 'Khác', value: 35, color: '#6b7280' },
  ],
  majorHolders: [
    { id: 1, name: 'Trần Đình Long', shares: '1,516,320,000', percent: '26.08%', date: '30/06/2024' },
    { id: 2, name: 'Dragon Capital', shares: '350,200,000', percent: '6.02%', date: '15/07/2024' },
    { id: 3, name: 'VinaCapital', shares: '120,500,000', percent: '2.07%', date: '20/06/2024' },
    { id: 4, name: 'Vũ Thị Hiền', shares: '426,500,000', percent: '7.34%', date: '30/06/2024' },
    { id: 5, name: 'Trần Tuấn Dương', shares: '134,800,000', percent: '2.32%', date: '30/06/2024' },
  ],
  insiderDeals: [
    { id: 1, person: 'Nguyễn Văn A', position: 'Thành viên HĐQT', type: 'Bán khớp lệnh', vol: '200,000', price: '28,500', date: '12/01/2025', color: 'text-red-400' },
    { id: 2, person: 'Lê Thị B', tag: 'Vợ CT HĐQT', position: 'Người có lquan', type: 'Mua thỏa thuận', vol: '5,000,000', price: '27,000', date: '05/01/2025', color: 'text-emerald-400' },
    { id: 3, person: 'Quỹ Đầu tư X', position: 'Cổ đông lớn', type: 'Bán khớp lệnh', vol: '1,500,000', price: '28,200', date: '28/12/2024', color: 'text-red-400' },
  ],
  dividends: [
    { year: '2023', type: 'Tiền mặt', ratio: '10%', exDate: '25/05/2024' },
    { year: '2022', type: 'Cổ phiếu', ratio: '30%', exDate: '10/06/2023' },
    { year: '2022', type: 'Tiền mặt', ratio: '5%', exDate: '10/06/2023' },
    { year: '2021', type: 'Cổ phiếu', ratio: '40%', exDate: '01/06/2022' },
    { year: '2020', type: 'Tiền mặt', ratio: '5%', exDate: '15/05/2021' },
  ]
};

export const stockAnalysisFeed = [
  {
    id: 1,
    type: 'post',
    author: {
      name: 'Dương Văn Duy',
      avatar: 'https://i.pravatar.cc/150?u=duy',
      verified: true,
      role: 'Chuyên gia nổi bật',
      isFollowing: false
    },
    time: '1 giờ trước',
    title: 'HPG tăng trần 3 phiên liên tiếp, động lực tăng trưởng là gì?',
    content: 'Giấc mơ nâng hạng đã chính thức trở thành hiện thực, Việt Nam sẽ thoát bỏ chiếc áo chật chội và bước vào sân chơi lớn hơn. Dòng tiền ngoại đang quay trở lại mạnh mẽ...',
    stats: { likes: 112, comments: 26, shares: 12 }
  },
  {
    id: 2,
    type: 'signal',
    author: {
      name: 'Dương Văn Duy',
      avatar: 'https://i.pravatar.cc/150?u=duy',
      verified: true,
      role: 'Chuyên gia nổi bật',
      isFollowing: false
    },
    time: '1 giờ trước',
    signal: {
      action: 'Mua',
      symbol: 'HPG',
      price: 28.50,
      profit: 17.68,
      duration: '45 ngày'
    },
    stats: { likes: 85, comments: 14, shares: 5 }
  },
  {
    id: 3,
    type: 'post',
    author: {
      name: 'Lý Phạm',
      avatar: 'https://i.pravatar.cc/150?u=lypham',
      verified: true,
      role: null,
      isFollowing: false
    },
    time: '1 giờ trước',
    title: '5 lí do bạn nên mua HPG ở giá này',
    content: 'Ngành thép đang phục hồi mạnh mẽ từ đáy. HPG với lợi thế quy mô và chuỗi giá trị khép kín sẽ là doanh nghiệp hưởng lợi đầu tiên khi cầu xây dựng tăng trở lại...',
    stats: { likes: 112, comments: 26, shares: 12 }
  },
  {
    id: 4,
    type: 'post',
    author: {
      name: 'Dương Văn Duy',
      avatar: 'https://i.pravatar.cc/150?u=duy',
      verified: true,
      role: 'Chuyên gia nổi bật',
      isFollowing: false
    },
    time: '2 giờ trước',
    title: 'Cập nhật nhanh phiên sáng: HPG tiếp tục dẫn sóng',
    content: 'Thanh khoản bùng nổ ngay từ ATO cho thấy dòng tiền lớn đang quyết liệt gom hàng. Kháng cự 28.0 đã bị phá vỡ...',
    stats: { likes: 45, comments: 8, shares: 2 }
  }
];

export const historicalPriceData = [
  { id: 1, date: '15/01/2026', change: -7.20, changePercent: -4.49, open: 160.10, high: 160.20, low: 150.90, close: 153.00, avg: 153.90, adjClose: 153.00, putThroughVol: 900000, matchedVol: 8278800, totalVol: 9178800, rsi1m: 3, rsi3m: 94, rsi6m: 99, rsi52w: 99 },
  { id: 2, date: '14/01/2026', change: -7.70, changePercent: -4.59, open: 171.20, high: 171.20, low: 159.00, close: 160.20, avg: 162.60, adjClose: 160.20, putThroughVol: 0, matchedVol: 4416000, totalVol: 4416000, rsi1m: 19, rsi3m: 96, rsi6m: 99, rsi52w: 99 },
  { id: 3, date: '13/01/2026', change: 4.20, changePercent: 2.57, open: 159.00, high: 173.30, low: 158.00, close: 167.90, avg: 167.00, adjClose: 167.90, putThroughVol: 4000000, matchedVol: 5382600, totalVol: 9382600, rsi1m: 74, rsi3m: 98, rsi6m: 99, rsi52w: 99 },
  { id: 4, date: '12/01/2026', change: -12.30, changePercent: -6.99, open: 174.60, high: 175.40, low: 163.70, close: 163.70, avg: 166.10, adjClose: 163.70, putThroughVol: 4000000, matchedVol: 9379500, totalVol: 13379500, rsi1m: 78, rsi3m: 98, rsi6m: 99, rsi52w: 99 },
  { id: 5, date: '09/01/2026', change: -0.60, changePercent: -0.34, open: 176.00, high: 180.20, low: 172.60, close: 176.00, avg: 176.70, adjClose: 176.00, putThroughVol: 5929000, matchedVol: 5389600, totalVol: 11318600, rsi1m: 94, rsi3m: 99, rsi6m: 99, rsi52w: 99 },
  { id: 6, date: '08/01/2026', change: -2.40, changePercent: -1.34, open: 183.50, high: 190.00, low: 176.60, close: 176.60, avg: 182.80, adjClose: 176.60, putThroughVol: 5954800, matchedVol: 6593700, totalVol: 12548500, rsi1m: 93, rsi3m: 99, rsi6m: 99, rsi52w: 99 },
  { id: 7, date: '07/01/2026', change: 5.90, changePercent: 3.41, open: 173.10, high: 179.00, low: 168.60, close: 179.00, avg: 174.10, adjClose: 179.00, putThroughVol: 377000, matchedVol: 7674800, totalVol: 8051800, rsi1m: 97, rsi3m: 99, rsi6m: 99, rsi52w: 99 },
  { id: 8, date: '06/01/2026', change: 0.00, changePercent: 0.00, open: 173.60, high: 176.00, low: 171.40, close: 173.10, avg: 173.50, adjClose: 173.10, putThroughVol: 20000, matchedVol: 7681000, totalVol: 7701000, rsi1m: 97, rsi3m: 99, rsi6m: 99, rsi52w: 99 },
  { id: 9, date: '05/01/2026', change: 3.50, changePercent: 2.06, open: 169.60, high: 174.50, low: 166.80, close: 173.10, avg: 171.60, adjClose: 173.10, putThroughVol: 81000, matchedVol: 6644800, totalVol: 6725800, rsi1m: 98, rsi3m: 99, rsi6m: 99, rsi52w: 99 },
  { id: 10, date: '31/12/2025', change: 6.60, changePercent: 4.05, open: 163.00, high: 172.00, low: 158.80, close: 169.60, avg: 166.80, adjClose: 169.60, putThroughVol: 0, matchedVol: 9438700, totalVol: 9438700, rsi1m: 98, rsi3m: 99, rsi6m: 99, rsi52w: 99 },
  { id: 11, date: '30/12/2025', change: 3.30, changePercent: 2.07, open: 159.70, high: 163.00, low: 151.60, close: 163.00, avg: 159.10, adjClose: 163.00, putThroughVol: 0, matchedVol: 8091800, totalVol: 8091800, rsi1m: 94, rsi3m: 99, rsi6m: 99, rsi52w: 99 },
  { id: 12, date: '29/12/2025', change: 4.70, changePercent: 3.03, open: 155.00, high: 159.90, low: 155.00, close: 159.70, avg: 158.00, adjClose: 159.70, putThroughVol: 70000, matchedVol: 6667000, totalVol: 6737000, rsi1m: 87, rsi3m: 99, rsi6m: 99, rsi52w: 99 },
  { id: 13, date: '26/12/2025', change: -3.00, changePercent: -1.90, open: 147.00, high: 155.20, low: 147.00, close: 155.00, avg: 147.80, adjClose: 155.00, putThroughVol: 148700, matchedVol: 15336300, totalVol: 15485000, rsi1m: 91, rsi3m: 99, rsi6m: 99, rsi52w: 99 },
  { id: 14, date: '25/12/2025', change: -11.80, changePercent: -6.95, open: 167.60, high: 174.50, low: 158.00, close: 158.00, avg: 164.50, adjClose: 158.00, putThroughVol: 3973500, matchedVol: 6373600, totalVol: 10347100, rsi1m: 97, rsi3m: 99, rsi6m: 99, rsi52w: 99 },
  { id: 15, date: '24/12/2025', change: -0.10, changePercent: -0.06, open: 174.00, high: 176.60, low: 164.00, close: 169.80, avg: 168.30, adjClose: 169.80, putThroughVol: 4000000, matchedVol: 8749100, totalVol: 12749100, rsi1m: 99, rsi3m: 99, rsi6m: 99, rsi52w: 99 },
  { id: 16, date: '23/12/2025', change: 11.10, changePercent: 6.99, open: 165.00, high: 169.90, low: 163.00, close: 169.90, avg: 168.40, adjClose: 169.90, putThroughVol: 300000, matchedVol: 6615800, totalVol: 6915800, rsi1m: 99, rsi3m: 99, rsi6m: 99, rsi52w: 99 },
  { id: 17, date: '22/12/2025', change: 10.30, changePercent: 6.94, open: 153.80, high: 158.80, low: 151.80, close: 158.80, avg: 156.80, adjClose: 158.80, putThroughVol: 4500000, matchedVol: 4500800, totalVol: 9000800, rsi1m: 98, rsi3m: 99, rsi6m: 99, rsi52w: 99 },
  { id: 18, date: '19/12/2025', change: 5.80, changePercent: 4.06, open: 142.70, high: 152.10, low: 142.00, close: 148.50, avg: 148.70, adjClose: 148.50, putThroughVol: 509800, matchedVol: 12784300, totalVol: 13294100, rsi1m: 95, rsi3m: 99, rsi6m: 99, rsi52w: 99 },
  { id: 19, date: '18/12/2025', change: -0.20, changePercent: -0.14, open: 143.00, high: 143.00, low: 139.70, close: 142.70, avg: 141.30, adjClose: 142.70, putThroughVol: 4000000, matchedVol: 5429000, totalVol: 9429000, rsi1m: 93, rsi3m: 99, rsi6m: 99, rsi52w: 99 },
  { id: 20, date: '17/12/2025', change: 0.00, changePercent: 0.00, open: 143.70, high: 146.80, low: 142.60, close: 142.90, avg: 143.80, adjClose: 142.90, putThroughVol: 579800, matchedVol: 2867800, totalVol: 3447600, rsi1m: 96, rsi3m: 99, rsi6m: 99, rsi52w: 99 },
  { id: 21, date: '16/12/2025', change: 0.00, changePercent: 0.00, open: 142.90, high: 149.30, low: 140.40, close: 142.90, avg: 143.40, adjClose: 142.90, putThroughVol: 6000000, matchedVol: 5330200, totalVol: 11330200, rsi1m: 96, rsi3m: 99, rsi6m: 99, rsi52w: 99 },
  { id: 22, date: '15/12/2025', change: -1.10, changePercent: -0.76, open: 143.80, high: 147.00, low: 140.00, close: 142.90, avg: 142.50, adjClose: 142.90, putThroughVol: 5000000, matchedVol: 5214800, totalVol: 10214800, rsi1m: 94, rsi3m: 99, rsi6m: 99, rsi52w: 99 },
];

export const commonPeriods = [
    'Q2/2022', 'Q3/2022', 'Q4/2022', 
    'Q1/2023', 'Q2/2023', 'Q3/2023', 'Q4/2023', 
    'Q1/2024', 'Q2/2024', 'Q3/2024', 'Q4/2024', 
    'Q1/2025', 'Q2/2025', 'Q3/2025'
];

export const detailedReportData = {
  periods: commonPeriods,
  groups: [
    {
      title: 'ĐỊNH GIÁ & SINH LỜI',
      rows: [
        { name: 'P/E', values: [4.3, 4.8, 5.1, 5.8, 6.4, 7.1, 9.3, 8.1, 8.0, 7.4, 8.5, 11.6, 13.5, 11.8] },
        { name: 'P/B', values: [0.8, 0.9, 0.9, 1.0, 0.9, 1.0, 1.3, 1.2, 1.3, 1.2, 1.3, 1.6, 1.8, 1.6] },
        { name: 'ROE', values: [21.2, 21.1, 19.1, 17.3, 15.5, 14.4, 14.8, 15.4, 16.2, 16.5, 15.6, 14.7, 14.3, 14.2] },
        { name: 'CASA', values: [43.4, 42.5, 34.3, 30.5, 32.8, 32.0, 38.0, 39.1, 36.0, 34.9, 35.9, 33.7, 35.2, 37.1], unit: '%' },
        { name: 'Vốn hoá', values: [86524.1, 100944.7, 101999.9, 111320.6, 114310.3, 122055.0, 166967.0, 160626.5, 171546.3, 166730.5, 183686.1, 247976.3, 289118.6, 259710.7] },
      ]
    },
    {
      title: 'TĂNG TRƯỞNG',
      rows: [
        { name: 'Tăng trưởng TN lãi thuần', values: [18.3, 12.2, -5.9, -19.5, -19.2, -3.9, 11.4, 30.2, 50.6, 22.8, 13.2, -2.3, -3.6, 11.2], unit: '%' },
        { name: 'Tăng trưởng LNST', values: [23.2, 22.1, -22.8, -18.3, -23.2, -12.9, 25.2, 38.3, 39.0, 24.4, -24.1, -4.4, 0.9, 11.9], unit: '%' },
        { name: 'Tăng trưởng tín dụng', values: [11.2, 0.8, 13.9, 17.8, 18.8, 28.3, 26.9, 18.3, 26.2, 21.0, 17.3, 16.1, 13.1, 20.2], unit: '%' },
        { name: 'Tăng trưởng tổng tài sản', values: [23.7, 0, 0, 17.6, 17.4, 16.4, 21.5, 22.4, 24.0, 18.7, 15.2, 11.7, 14.2, 21.8], unit: '%' },
      ]
    },
    {
      title: 'HIỆU QUẢ HOẠT ĐỘNG',
      rows: [
        { name: 'COF - Chi phí vốn', values: [0.6, 0.7, 1.0, 1.3, 1.3, 1.2, 1.0, 0.8, 0.8, 0.8, 0.8, 0.8, 0.9, 0.9], unit: '%' },
        { name: 'NIM', values: [5.6, 5.5, 5.2, 4.7, 4.3, 4.1, 4.0, 4.1, 4.3, 4.2, 4.2, 4.0, 3.8, 3.7], unit: '%' },
        { name: 'YOEA', values: [1.9, 1.9, 2.0, 2.2, 2.2, 2.2, 2.0, 1.9, 1.9, 1.8, 1.7, 1.6, 1.7, 1.7], unit: '%' },
      ]
    },
    {
      title: 'AN TOÀN VỐN',
      rows: [
        { name: 'Tỷ lệ nợ xấu', values: [0.6, 0.6, 0.9, 0.8, 1.0, 1.4, 1.2, 1.1, 1.2, 1.4, 1.3, 1.2, 1.2, 1.1], unit: '%' },
        { name: 'Bao phủ nợ xấu', values: [171.6, 162.1, 134.3, 133.8, 115.8, 87.3, 102.1, 105.9, 101.0, 87.3, 85.0, 95.0, 98.0, 102.5], unit: '%' },
      ]
    }
  ]
};

export const detailedIncomeData = {
  periods: commonPeriods,
  groups: [
    {
      title: 'KẾT QUẢ KINH DOANH (Tỷ VNĐ)',
      rows: [
        { name: 'Doanh thu thuần', values: [15432, 16120, 17500, 16800, 17200, 18500, 19200, 18900, 19500, 20100, 21500, 20800, 21200, 22500] },
        { name: 'Giá vốn hàng bán', values: [12500, 13200, 14000, 13500, 13800, 14500, 15000, 14800, 15200, 15800, 16500, 16000, 16200, 17000] },
        { name: 'Lợi nhuận gộp', values: [2932, 2920, 3500, 3300, 3400, 4000, 4200, 4100, 4300, 4300, 5000, 4800, 5000, 5500] },
        { name: 'Chi phí tài chính', values: [500, 550, 600, 580, 590, 620, 650, 630, 640, 660, 700, 680, 690, 720] },
        { name: 'Chi phí bán hàng', values: [800, 850, 900, 880, 890, 950, 980, 960, 990, 1050, 1100, 1080, 1120, 1150] },
        { name: 'Chi phí QLDN', values: [400, 420, 450, 440, 460, 480, 500, 490, 510, 530, 550, 540, 560, 580] },
        { name: 'Lợi nhuận thuần', values: [1232, 1100, 1550, 1400, 1460, 1950, 2070, 2020, 2160, 2060, 2650, 2500, 2630, 3050] },
        { name: 'LNST', values: [985, 880, 1240, 1120, 1168, 1560, 1656, 1616, 1728, 1648, 2120, 2000, 2104, 2440] },
      ]
    }
  ]
};

export const detailedCashFlowData = {
  periods: commonPeriods,
  groups: [
    {
      title: 'LƯU CHUYỂN TIỀN TỆ (Tỷ VNĐ)',
      rows: [
        { name: 'LCTT từ HĐKD', values: [2500, 1800, 3200, -500, 1200, 4500, 3800, 2100, 1500, 4200, 5100, 3000, 2800, 4600] },
        { name: 'LCTT từ HĐĐT', values: [-1200, -800, -1500, -2000, -1800, -1200, -3000, -2500, -1500, -2200, -1800, -1600, -1400, -2000] },
        { name: 'LCTT từ HĐTC', values: [-500, -200, -1000, 3000, 800, -2000, -500, -800, 200, -1500, -2500, -1000, -800, -1800] },
        { name: 'Lưu chuyển tiền thuần', values: [800, 800, 700, 500, 200, 1300, 300, -1200, 200, 500, 800, 400, 600, 800] },
        { name: 'Tiền đầu kỳ', values: [5000, 5800, 6600, 7300, 7800, 8000, 9300, 9600, 8400, 8600, 9100, 9900, 10300, 10900] },
        { name: 'Tiền cuối kỳ', values: [5800, 6600, 7300, 7800, 8000, 9300, 9600, 8400, 8600, 9100, 9900, 10300, 10900, 11700] },
      ]
    }
  ]
};
